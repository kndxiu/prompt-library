import type { ThemeMode } from "./types";

export function detectHostTheme(): ThemeMode {
  const html = document.documentElement;

  if (html.classList.contains("dark")) return "dark";
  if (html.classList.contains("light")) return "light";

  const dataMode = html.getAttribute("data-mode");
  const dataTheme = html.getAttribute("data-theme");

  if (dataMode === "dark" || dataTheme === "dark") return "dark";
  if (dataMode === "light" || dataTheme === "light") return "light";

  if (window.matchMedia?.("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }

  return "light";
}

export function watchHostTheme(
  callback: (theme: ThemeMode) => void
): () => void {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (
        mutation.attributeName === "class" ||
        mutation.attributeName === "data-mode" ||
        mutation.attributeName === "data-theme"
      ) {
        callback(detectHostTheme());
        break;
      }
    }
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class", "data-mode", "data-theme"],
  });

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleMediaChange = () => callback(detectHostTheme());
  mediaQuery.addEventListener("change", handleMediaChange);

  return () => {
    observer.disconnect();
    mediaQuery.removeEventListener("change", handleMediaChange);
  };
}
