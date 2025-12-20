import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@store/index";
import type { Prompt } from "../types";
import {
  loadPrompts,
  addPrompt,
  updatePrompt,
  deletePrompt,
  updateLastUsed,
} from "../store/promptsSlice";

export function usePrompts() {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.prompts.items);
  const status = useSelector((state: RootState) => state.prompts.status);
  const error = useSelector((state: RootState) => state.prompts.error);

  const load = useCallback(() => {
    return dispatch(loadPrompts());
  }, [dispatch]);

  const add = useCallback(
    (prompt: Prompt) => {
      return dispatch(addPrompt(prompt));
    },
    [dispatch]
  );

  const update = useCallback(
    (prompt: Prompt) => {
      return dispatch(updatePrompt(prompt));
    },
    [dispatch]
  );

  const remove = useCallback(
    (id: string) => {
      return dispatch(deletePrompt(id));
    },
    [dispatch]
  );

  const markUsed = useCallback(
    (id: string) => {
      return dispatch(updateLastUsed(id));
    },
    [dispatch]
  );

  const findById = useCallback(
    (id: string) => {
      return items.find((p) => p.id === id);
    },
    [items]
  );

  return {
    items,
    status,
    error,
    isLoading: status === "loading",
    isIdle: status === "idle",
    load,
    add,
    update,
    remove,
    markUsed,
    findById,
  };
}
