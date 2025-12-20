import modalStyles from "./components/Modal/Modal.css?inline";
import { detectHostTheme, watchHostTheme } from "@shared/theme";
import { getSiteProvider } from "@shared/sites";
import { siteThemes } from "@shared/theme/sites";

let modalShadowRoot: ShadowRoot | null = null;
let modalContainer: HTMLDivElement | null = null;

export const getModalRoot = (): HTMLDivElement => {
  if (modalContainer) return modalContainer;

  const hostElement = document.createElement("div");
  hostElement.id = "prompt-library-modal-host";
  hostElement.style.position = "fixed";
  hostElement.style.top = "0";
  hostElement.style.left = "0";
  hostElement.style.width = "0";
  hostElement.style.height = "0";
  hostElement.style.zIndex = "1000";

  const applyTheme = () => {
    const theme = detectHostTheme();
    hostElement.classList.remove("theme-light", "theme-dark");
    hostElement.classList.add(`theme-${theme}`);
  };
  applyTheme();

  watchHostTheme(applyTheme);

  document.body.appendChild(hostElement);

  modalShadowRoot = hostElement.attachShadow({ mode: "open" });

  const provider = getSiteProvider();
  const themeCss = provider?.themeId ? siteThemes[provider.themeId] || "" : "";

  const style = document.createElement("style");
  style.textContent = themeCss + modalStyles;

  modalShadowRoot.appendChild(style);

  modalContainer = document.createElement("div");
  modalContainer.id = "prompt-library-modal-root";
  modalShadowRoot.appendChild(modalContainer);

  return modalContainer;
};
