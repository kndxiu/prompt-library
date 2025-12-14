import type { SupportedSite } from "./types";

export const SUPPORTED_SITES: SupportedSite[] = [
  {
    name: "ChatGPT",
    match: (url: URL) =>
      url.hostname.includes("chat.openai.com") ||
      url.hostname.includes("chatgpt.com"),
    features: {
      buttonType: "inline",
    },
  },
];
