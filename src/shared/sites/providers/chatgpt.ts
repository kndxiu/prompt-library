import type { SiteProvider } from "../types";

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
};
