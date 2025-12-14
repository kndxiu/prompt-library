import { SUPPORTED_SITES } from "../shared/sites";
import type { SupportedSite } from "../shared/types";
import { attachButton } from "./attachButton";
import { observeInputs } from "./observer";

const url = new URL(window.location.href);
const site = SUPPORTED_SITES.find((site) => site.match(url));

if (site) initPromptLibrary(site);

function initPromptLibrary(site: SupportedSite) {
  if (site.features.buttonType === "inline") {
    observeInputs((input) => attachButton(input));
  }
}
