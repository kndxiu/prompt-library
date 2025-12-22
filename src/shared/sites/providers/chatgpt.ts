const getThemeInSubtree = (element: Element): ThemeMode | null => {
  if (element.querySelector(".dark")) return "dark";
  if (element.querySelector(".light")) return "light";
  return null;
};

import type { SiteProvider } from "../types";
import type { ThemeMode } from "@shared/theme/types";
import { HOST_CLASS_NAME } from "@shared/constants";

export const chatgptProvider: SiteProvider = {
  name: "ChatGPT",
  themeId: "chatgpt",

  isMatch: (url: URL) =>
    url.hostname.includes("chatgpt.com") ||
    url.hostname.includes("chat.openai.com"),

  inputSelector: "#prompt-textarea",

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

  detectLocalTheme: (input: HTMLElement): ThemeMode | null => {
    const form = input.closest("form");
    return form ? getThemeInSubtree(form) : null;
  },

  watchLocalTheme: (
    input: HTMLElement,
    callback: (theme: ThemeMode) => void
  ): (() => void) => {
    const form = input.closest("form");
    if (!form) return () => {};

    const observer = new MutationObserver((mutations) => {
      const isSelfMutation = mutations.some((m) =>
        (m.target as Element).classList?.contains(HOST_CLASS_NAME)
      );

      if (isSelfMutation) return;

      callback(getThemeInSubtree(form) ?? "light");
    });

    observer.observe(form, {
      attributes: true,
      attributeFilter: ["class"],
      subtree: true,
    });

    return () => observer.disconnect();
  },
};
