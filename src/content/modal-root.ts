import modalStyles from "./components/Modal/Modal.css?inline";

let modalShadowRoot: ShadowRoot | null = null;
let modalContainer: HTMLDivElement | null = null;

export const getModalRoot = () => {
  if (modalContainer && modalShadowRoot) {
    return modalContainer;
  }

  const host = document.createElement("div");
  host.id = "prompt-library-modal-host";
  host.style.position = "fixed";
  host.style.top = "0";
  host.style.left = "0";
  host.style.width = "0";
  host.style.height = "0";
  host.style.zIndex = "1000";

  document.body.appendChild(host);

  modalShadowRoot = host.attachShadow({ mode: "open" });

  const style = document.createElement("style");
  style.textContent = modalStyles;
  modalShadowRoot.appendChild(style);

  modalContainer = document.createElement("div");
  modalShadowRoot.appendChild(modalContainer);

  return modalContainer;
};
