import type { ThemeMode } from "@shared/theme/types";

export interface SiteProvider {
  name: string;
  themeId: string;

  isMatch(url: URL): boolean;

  inputSelector: string;

  injectButton(input: HTMLElement, buttonHost: HTMLElement): void;

  detectLocalTheme?(input: HTMLElement): ThemeMode | null;
  watchLocalTheme?(
    input: HTMLElement,
    callback: (theme: ThemeMode) => void
  ): () => void;
}
