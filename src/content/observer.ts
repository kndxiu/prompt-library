export const observeInputs = (
  onFound: (input: HTMLDivElement) => (() => void) | void
) => {
  const activeElements = new Map<HTMLElement, (() => void) | void>();
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  const performScan = () => {
    for (const [element, cleanup] of activeElements.entries()) {
      if (!element.isConnected) {
        if (typeof cleanup === "function") cleanup();
        activeElements.delete(element);
      }
    }

    const inputs = document.querySelectorAll(
      "div[contentEditable='true'], textarea, input[type='text']"
    );

    inputs.forEach((node) => {
      if (node instanceof HTMLElement && node.offsetParent !== null) {
        if (!activeElements.has(node)) {
          // Initialize component and store cleanup
          const cleanupFn = onFound(node as HTMLDivElement);
          activeElements.set(node, cleanupFn);
        }
      }
    });
  };

  const debouncedScan = () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      performScan();
      timeoutId = null;
    }, 300);
  };

  performScan();

  const observer = new MutationObserver((mutations) => {
    let shouldScan = false;
    for (const mutation of mutations) {
      if (mutation.type === "childList") {
        shouldScan = true;
        break;
      }
    }

    if (shouldScan) {
      debouncedScan();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  return () => {
    observer.disconnect();
    if (timeoutId) clearTimeout(timeoutId);
    for (const cleanup of activeElements.values()) {
      if (typeof cleanup === "function") cleanup();
    }
    activeElements.clear();
  };
};
