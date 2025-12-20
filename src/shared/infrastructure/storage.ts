import type { Prompt } from "@features/prompts/types";

const STORAGE_KEY = "prompts";

export const storage = {
  fetchPrompts: async (): Promise<Prompt[]> => {
    try {
      const result = await chrome.storage.local.get(STORAGE_KEY);
      return (result[STORAGE_KEY] as Prompt[]) || [];
    } catch (error) {
      console.error("Failed to fetch prompts:", error);
      return [];
    }
  },

  savePrompts: async (prompts: Prompt[]): Promise<void> => {
    try {
      await chrome.storage.local.set({ [STORAGE_KEY]: prompts });
    } catch (error) {
      console.error("Failed to save prompts:", error);
      throw error;
    }
  },

  addPrompt: async (prompt: Prompt): Promise<void> => {
    const prompts = await storage.fetchPrompts();
    prompts.push(prompt);
    await storage.savePrompts(prompts);
  },

  updatePrompt: async (updatedPrompt: Prompt): Promise<void> => {
    const prompts = await storage.fetchPrompts();
    const index = prompts.findIndex((p) => p.id === updatedPrompt.id);
    if (index !== -1) {
      prompts[index] = updatedPrompt;
      await storage.savePrompts(prompts);
    }
  },

  deletePrompt: async (id: string): Promise<void> => {
    const prompts = await storage.fetchPrompts();
    const newPrompts = prompts.filter((p) => p.id !== id);
    await storage.savePrompts(newPrompts);
  },
};
