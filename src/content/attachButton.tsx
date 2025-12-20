import { createRoot, type Root } from "react-dom/client";
import PromptButton from "./components/PromptButton";
import buttonStyles from "./components/PromptButton.css?inline";
import { Provider } from "react-redux";
import { store } from "@store/index";
import { NavigationProvider } from "@shared/contexts";
import { getSiteProvider } from "@shared/sites";
import { createShadowHost } from "@content/bootstrap";
import { siteThemes } from "@shared/theme/sites";

export const attachButton = (input: HTMLElement) => {
  const provider = getSiteProvider();
  if (!provider) return;

  const themeCss = provider.themeId ? siteThemes[provider.themeId] || "" : "";

  const {
    host,
    mountPoint,
    cleanup: cleanupHost,
  } = createShadowHost({
    additionalStyles: buttonStyles + themeCss,
  });

  let root: Root | null = createRoot(mountPoint);

  root.render(
    <Provider store={store}>
      <NavigationProvider inputElement={input}>
        <PromptButton />
      </NavigationProvider>
    </Provider>
  );

  provider.injectButton(input, host);

  const cleanup = () => {
    cleanupHost();
    if (root) {
      root.unmount();
      root = null;
    }
  };

  return cleanup;
};
