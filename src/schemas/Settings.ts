export class Settings {
  #title: string;
  #icon: string;
  #children: Array<{
    title: string;
    documentation: string;
  }>;

  public set title(title: string) {
    this.#title = title;
  }

  public get title(): string {
    return this.#title;
  }

  public set icon(icon: string) {
    this.#icon = icon;
  }

  public get icon(): string {
    return this.#icon;
  }

  public set children(children: Array<{
    title: string;
    documentation: string;
  }>) {
    this.#children = children;
  }

  public get children(): Array<{
    title: string;
    documentation: string;
  }> {
    return this.#children;
  }
}
