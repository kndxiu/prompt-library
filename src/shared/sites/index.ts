import { chatgptProvider } from "./providers/chatgpt";
import type { SiteProvider } from "./types";

const providers: SiteProvider[] = [chatgptProvider];

export function getSiteProvider(
  url: URL = new URL(window.location.href)
): SiteProvider | undefined {
  return providers.find((p) => p.isMatch(url));
}

export * from "./types";
