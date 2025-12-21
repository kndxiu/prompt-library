import type { SiteProvider } from "../types";

export const claudeProvider: SiteProvider = {
  name: "Claude",
  themeId: "claude",

  isMatch: (url: URL) => url.hostname.includes("claude.ai"),

  inputSelector: ".ProseMirror",

  injectButton: (input: HTMLElement, buttonHost: HTMLElement) => {
    const deepContainer =
      input.parentElement?.parentElement?.parentElement?.lastChild?.firstChild;

    let container = input.parentElement;
    if (deepContainer instanceof HTMLElement) {
      container = deepContainer;
    }

    if (container) {
      if (container.firstChild) {
        container.insertBefore(buttonHost, container.firstChild);
      } else {
        container.appendChild(buttonHost);
      }
    }
  },
};
