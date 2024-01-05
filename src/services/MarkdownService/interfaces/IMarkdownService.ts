import { Content } from '@vyrnnstudios/documentation/schemas/Content';
import { Section } from '@vyrnnstudios/documentation/schemas/Section';

export interface IMarkdownService {
  fetchTitleFromMarkdown(markdown: string): string | undefined;

  fetchTitlesFromMarkdown(markdown: string): Array<string>;

  fetchSectionsFromMarkdown(markdown: string): Array<Section> | undefined;

  fetchSubSectionsFromMarkdown(markdown: string, sections: Array<Section>): Array<Section> | undefined;

  fetchContentsFromMarkdown(markdown: string, sections: Array<Section>): Array<string>;

  parseToJSON(pathname: string): Content;
}
