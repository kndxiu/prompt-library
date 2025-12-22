import type { ThemeMode } from "@shared/theme/types";
import { detectHostTheme, watchHostTheme } from "@shared/theme";

import { HOST_CLASS_NAME } from "@shared/constants";

interface ShadowHostOptions {
  id?: string;
  className?: string;
  additionalStyles?: string;
  fixed?: boolean;
  skipThemeWatch?: boolean;
}

interface ShadowHostResult {
  host: HTMLDivElement;
  shadow: ShadowRoot;
  mountPoint: HTMLDivElement;
  cleanup: () => void;
}

export function createShadowHost(
  options: ShadowHostOptions = {}
): ShadowHostResult {
  const {
    id,
    className = HOST_CLASS_NAME,
    additionalStyles = "",
    fixed = false,
    skipThemeWatch = false,
  } = options;

  const host = document.createElement("div");
  if (id) host.id = id;
  host.className = className;

  if (fixed) {
    host.style.position = "fixed";
    host.style.top = "0";
    host.style.left = "0";
    host.style.width = "0";
    host.style.height = "0";
    host.style.zIndex = "1000";
  } else {
    host.style.position = "relative";
    host.style.display = "inline-block";
  }

  const shadow = host.attachShadow({ mode: "open" });

  let cleanupThemeWatch: (() => void) | null = null;

  if (!skipThemeWatch) {
    const applyTheme = (theme: ThemeMode) => {
      shadow.host.classList.remove("theme-light", "theme-dark");
      shadow.host.classList.add(`theme-${theme}`);
    };

    applyTheme(detectHostTheme());
    cleanupThemeWatch = watchHostTheme(applyTheme);
  }

  const style = document.createElement("style");
  style.textContent = additionalStyles;
  shadow.appendChild(style);

  const mountPoint = document.createElement("div");
  shadow.appendChild(mountPoint);

  const cleanup = () => {
    cleanupThemeWatch?.();
    host.remove();
  };

  return { host, shadow, mountPoint, cleanup };
}
