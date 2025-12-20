import { getSiteProvider } from "@shared/sites";

let observer: MutationObserver | null = null;
const activeElements = new WeakMap<HTMLElement, (() => void) | null>();
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

export function observeInputs(
  onFound: (element: HTMLElement) => (() => void) | void
) {
  if (observer) observer.disconnect();

  const provider = getSiteProvider();

  if (!provider) return;

  const selector = provider.inputSelector;

  const scan = () => {
    const inputs = document.querySelectorAll(selector);
    inputs.forEach((node) => {
      if (node instanceof HTMLElement && node.offsetParent !== null) {
        if (!activeElements.has(node)) {
          const cleanupFn = onFound(node);
          activeElements.set(node, cleanupFn || null);
        }
      }
    });
  };

  const debouncedScan = () => {
    if (debounceTimer) clearTimeout(debounceTimer);
    debounceTimer = setTimeout(scan, 1000);
  };

  observer = new MutationObserver((mutations) => {
    let shouldScan = false;
    for (const mutation of mutations) {
      if (mutation.addedNodes.length > 0 || mutation.removedNodes.length > 0) {
        shouldScan = true;
        break;
      }
    }
    if (shouldScan) debouncedScan();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  scan();
}
