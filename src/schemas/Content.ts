import { Section } from '@vyrnnstudios/documentation/schemas/Section';

export class Content {
  #title?: string;
  #content?: Array<string>;
  #sections?: Array<Section>;

  constructor(title?: string, content?: Array<string>, sections?: Array<Section>) {
    this.#title = title;
    this.#content = content;
    this.#sections = sections;
  }

  public get title(): string | undefined {
    return this.#title;
  }

  public set title(title: string | undefined) {
    this.#title = title;
  }

  public get content(): Array<string> | undefined {
    return this.#content;
  }

  public set content(content: Array<string> | undefined) {
    this.#content = content;
  }

  public get sections(): Array<Section> | undefined {
    return this.#sections;
  }

  public set sections(sections: Array<Section> | undefined) {
    this.#sections = sections;
  }

  public toJSON(): Record<string, unknown> {
    const record = new Map<string, unknown>();

    if (this.#title) {
      record.set('title', this.#title);
    }

    if (this.#content) {
      record.set('content', this.#content);
    }

    if (this.#sections) {
      record.set('sections', this.#sections);
    }

    return Object.fromEntries(record);
  }

  [Symbol.for('nodejs.util.inspect.custom')]() {
    return this.toJSON();
  }
}
