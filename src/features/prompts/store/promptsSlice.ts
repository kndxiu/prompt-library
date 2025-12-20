import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { Prompt } from "../types";
import { storage } from "@shared/infrastructure/storage";

interface PromptsState {
  items: Prompt[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: PromptsState = {
  items: [],
  status: "idle",
  error: null,
};

export const loadPrompts = createAsyncThunk("prompts/loadPrompts", async () => {
  const prompts = await storage.fetchPrompts();
  return prompts;
});

export const addPrompt = createAsyncThunk(
  "prompts/addPrompt",
  async (prompt: Prompt) => {
    await storage.addPrompt(prompt);
    return prompt;
  }
);

export const updatePrompt = createAsyncThunk(
  "prompts/updatePrompt",
  async (prompt: Prompt) => {
    await storage.updatePrompt(prompt);
    return prompt;
  }
);

export const deletePrompt = createAsyncThunk(
  "prompts/deletePrompt",
  async (id: string) => {
    await storage.deletePrompt(id);
    return id;
  }
);

export const updateLastUsed = createAsyncThunk(
  "prompts/updateLastUsed",
  async (id: string) => {
    const prompts = await storage.fetchPrompts();
    const prompt = prompts.find((p) => p.id === id);
    if (prompt) {
      const updatedPrompt = { ...prompt, lastUsedAt: Date.now() };
      await storage.updatePrompt(updatedPrompt);
      return updatedPrompt;
    }
    throw new Error("Prompt not found");
  }
);

export const promptsSlice = createSlice({
  name: "prompts",
  initialState,
  reducers: {
    syncPrompts: (state, action) => {
      const newItems = action.payload;
      const uniqueItems = new Map();
      newItems.forEach((item: Prompt) => uniqueItems.set(item.id, item));
      state.items = Array.from(uniqueItems.values());
      state.status = "succeeded";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPrompts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loadPrompts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(loadPrompts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to load prompts";
      });
  },
});

export const { syncPrompts } = promptsSlice.actions;

export default promptsSlice.reducer;
