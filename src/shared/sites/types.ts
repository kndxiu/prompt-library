export interface SiteProvider {
  name: string;
  themeId: string;

  isMatch(url: URL): boolean;

  inputSelector: string;

  injectButton(input: HTMLElement, buttonHost: HTMLElement): void;
}
