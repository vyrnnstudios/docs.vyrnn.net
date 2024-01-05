export class Section {
  #title: string;
  #content?: Array<string>;
  #sections?: Array<Section>;

  constructor(title: string, content?: Array<string>, sections?: Array<Section>) {
    this.#title = title;
    this.#content = content;
    this.#sections = sections;
  }

  public get title(): string {
    return this.#title;
  }

  public set title(title: string) {
    this.#title = title;
  }

  public get content(): Array<string> | undefined {
    return this.#content;
  }

  public set content(content: Array<string>) {
    this.#content = content;
  }

  public get sections(): Array<Section> {
    return this.#sections;
  }

  public set sections(sections: Array<Section>) {
    this.#sections = sections;
  }

  public toJSON(): Record<string, unknown> {
    const record = new Map<string, unknown>();

    record.set('title', this.#title);

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
