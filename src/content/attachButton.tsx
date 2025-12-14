import { createRoot, type Root } from "react-dom/client";
import PromptButton from "./components/PromptButton";
import buttonStyles from "./components/PromptButton.css?inline";
import { Provider } from "react-redux";
import { store } from "../store";
import { NavigationProvider } from "./context/NavigationContext";

export const attachButton = (input: HTMLDivElement) => {
  const findContainer = (): Node | null => {
    const deepContainer =
      input.parentElement?.parentElement?.parentElement?.lastChild?.firstChild;
    if (deepContainer) return deepContainer;

    return input.parentElement;
  };

  const container = findContainer();
  if (!container) return;

  const host = document.createElement("div");
  host.className = "prompt-library-host";
  host.style.position = "relative";
  host.style.display = "inline-block";

  const shadow = host.attachShadow({ mode: "open" });

  const style = document.createElement("style");
  style.textContent = buttonStyles;
  shadow.appendChild(style);

  const mountPoint = document.createElement("div");
  shadow.appendChild(mountPoint);

  let root: Root | null = createRoot(mountPoint);

  root.render(
    <Provider store={store}>
      <NavigationProvider inputElement={input}>
        <PromptButton />
      </NavigationProvider>
    </Provider>
  );

  if (container.firstChild) {
    container.insertBefore(host, container.firstChild);
  } else {
    container.appendChild(host);
  }

  const cleanup = () => {
    if (root) {
      root.unmount();
      root = null;
    }
    host.remove();
  };

  return cleanup;
};
