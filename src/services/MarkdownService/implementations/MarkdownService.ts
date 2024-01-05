import { IMarkdownService } from '@vyrnnstudios/documentation/services/MarkdownService/interfaces/IMarkdownService';

import { readFileSync } from 'node:fs';

import { Content } from '@vyrnnstudios/documentation/schemas/Content';
import { Section } from '@vyrnnstudios/documentation/schemas/Section';

export class MarkdownService implements IMarkdownService {
  public fetchTitleFromMarkdown(markdown: string): string | undefined {
    const lines = markdown.split('\n');

    return lines.find(line => {
      return line.match(/(?<!#)#{1}\s(.+)/g);
    })?.split(/#+\s/)[1];
  }

  public fetchTitlesFromMarkdown(markdown: string): Array<string> {
    const titles = new Array<string>();

    const lines = markdown.split('\n');

    for (const line of lines) {
      const heading = line.match(/(?<!#)#{1}\s(.+)/g);

      if (heading) {
        titles.push(heading[0].split(/#+\s/)[1]);
      }
    }

    return titles;
  }

  public fetchSectionsFromMarkdown(markdown: string): Array<Section>| undefined {
    let sections: Array<Section> = undefined;

    const lines = markdown.split('\n');

    for (const line of lines) {
      const heading = line.match(/(?<!#)#{2}\s(.+)/g);

      if (heading) {
        sections ??= new Array<Section>();

        const title = heading[0].split(/#+\s/)[1];

        const section = new Section(title);

        sections.push(section);
      }
    }

    return sections;
  }

  public fetchSubSectionsFromMarkdown(markdown: string, sections: Array<Section>, index = 2): Array<Section> | undefined {
    const regex = this.findSectionRegexByIndex(index);

    if (!regex.subSection) {
      return;
    }

    for (const section of sections) {
      let sections: Array<Section> = undefined;

      const lines = markdown.split('\n');

      const currentIndex = lines.findIndex(line => {
        return line.match(regex.section)?.[0].split(/#+\s/)[1] === section.title;
      });

      const nextIndex = lines.findIndex((line, index) => {
        return index > currentIndex && line.match(regex.section)?.[0].split(/#+\s/);
      });

      for (const line of lines.slice(currentIndex, nextIndex !== -1 ? nextIndex : lines.length)) {
        const heading = line.match(regex.subSection);

        if (heading) {
          sections ??= new Array<Section>();

          const title = heading[0].split(/#+\s/)[1];

          const section = new Section(title);

          this.fetchSubSectionsFromMarkdown(markdown, [ section ], index + 1);

          sections.push(section);
        }
      }

      section.sections = sections;
    }

    return sections;
  }

  public fetchContentsFromMarkdown(markdown: string, sections: Section[], index = 2): Array<string> {
    const contents = new Array<string>();

    const regex = this.findContentRegexByIndex(index);

    if (!sections) {
      return;
    }

    for (let i = 0; i < sections.length; i++) {
      const lines = markdown.split('\n');

      const currentIndex = lines.findIndex(line => {
        return line.match(regex)?.[0].split(/#+\s/)[1] === sections[i].title;
      });

      const nextIndex = lines.findIndex((line, index) => {
        return index > currentIndex && line.match(/#\s(.+)/g);
      });

      sections[i].content = lines.slice(currentIndex + 1, nextIndex !== -1 ? nextIndex : lines.length).filter(line => {
        return line !== '';
      });

      this.fetchContentsFromMarkdown(markdown, sections[i].sections, index + 1);
    }

    return contents;
  }

  public parseToJSON(pathname: string): Content {
    const content = new Content();

    const markdown = readFileSync(pathname, 'utf-8');

    const title = this.fetchTitleFromMarkdown(markdown);

    if (title) {
      content.title = title;
    }

    const sections = this.fetchSectionsFromMarkdown(markdown);

    if (sections) {
      content.sections = sections;
    }

    // for loop to fetch sub sections
    this.fetchSubSectionsFromMarkdown(markdown, sections);
    // for loop to fetch contents for all sections and sub sections
    this.fetchContentsFromMarkdown(markdown, sections);

    return content;
  }

  private findSectionRegexByIndex(index: number): { section: RegExp, subSection: RegExp | undefined } {
    switch (index) {
      case 2: {
        return {
          section: new RegExp(/(?<!#)#{2}\s(.+)/g),
          subSection: new RegExp(/(?<!#)#{3}\s(.+)/g)
        };
      }
      case 3: {
        return {
          section: new RegExp(/(?<!#)#{3}\s(.+)/g),
          subSection: new RegExp(/(?<!#)#{4}\s(.+)/g)
        };
      }
      case 4: {
        return {
          section: new RegExp(/(?<!#)#{4}\s(.+)/g),
          subSection: new RegExp(/(?<!#)#{5}\s(.+)/g)
        };
      }
      case 5: {
        return {
          section: new RegExp(/(?<!#)#{5}\s(.+)/g),
          subSection: new RegExp(/(?<!#)#{6}\s(.+)/g)
        };

        break;
      }
      case 6: {
        return {
          section: new RegExp(/(?<!#)#{6}\s(.+)/g),
          subSection: undefined
        };
      }
      default: {
        return;
      }
    }
  }

  private findContentRegexByIndex(index: number): RegExp {
    switch (index) {
      case 2: {
        return new RegExp(/(?<!#)#{2}\s(.+)/g);
      }
      case 3: {
        return new RegExp(/(?<!#)#{3}\s(.+)/g);
      }
      case 4: {
        return new RegExp(/(?<!#)#{4}\s(.+)/g);
      }
      case 5: {
        return new RegExp(/(?<!#)#{5}\s(.+)/g);
      }
      case 6: {
        return new RegExp(/(?<!#)#{6}\s(.+)/g);
      }
      default: {
        return;
      }
    }
  }
}
