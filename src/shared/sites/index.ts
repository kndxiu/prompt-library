import { chatgptProvider } from "./providers/chatgpt";
import { claudeProvider } from "./providers/claude";
import type { SiteProvider } from "./types";

const providers: SiteProvider[] = [chatgptProvider, claudeProvider];

export function getSiteProvider(
  url: URL = new URL(window.location.href)
): SiteProvider | undefined {
  return providers.find((p) => p.isMatch(url));
}

export * from "./types";
