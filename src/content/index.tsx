import { getSiteProvider } from "@shared/sites";
import { attachButton } from "./attachButton";
import { observeInputs } from "./observer";

const provider = getSiteProvider();

if (provider) {
  observeInputs((input) => attachButton(input));
}
