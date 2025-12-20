import { configureStore } from "@reduxjs/toolkit";
import promptsReducer, {
  syncPrompts,
} from "@features/prompts/store/promptsSlice";

export const store = configureStore({
  reducer: {
    prompts: promptsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

if (
  typeof chrome !== "undefined" &&
  chrome.storage &&
  chrome.storage.onChanged
) {
  chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === "local" && changes["prompts"]) {
      const { newValue } = changes["prompts"];
      if (newValue) {
        store.dispatch(syncPrompts(newValue));
      }
    }
  });
}
