import { useState, useMemo, useCallback, type ReactNode } from "react";
import { NavigationContext } from "./NavigationContext";
import type { View } from "./types";

interface NavigationProviderProps {
  children: ReactNode;
  inputElement: HTMLElement;
}

export function NavigationProvider({
  children,
  inputElement,
}: NavigationProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewStack, setViewStack] = useState<View[]>([]);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => {
    setIsOpen(false);
    setViewStack([]);
  }, []);

  const pushView = useCallback((view: View) => {
    setViewStack((prev) => [...prev, view]);
  }, []);

  const popView = useCallback(() => {
    setViewStack((prev) => prev.slice(0, -1));
  }, []);

  const insertPrompt = useCallback(
    (content: string) => {
      if (!inputElement) return;

      inputElement.focus();

      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        range.deleteContents();
        const textNode = document.createTextNode(content);
        range.insertNode(textNode);

        range.setStartAfter(textNode);
        range.setEndAfter(textNode);
        selection.removeAllRanges();
        selection.addRange(range);

        inputElement.dispatchEvent(new Event("input", { bubbles: true }));
      }

      close();
    },
    [inputElement, close]
  );

  const currentView = viewStack[viewStack.length - 1];

  const value = useMemo(
    () => ({
      isOpen,
      open,
      close,
      pushView,
      popView,
      currentView,
      insertPrompt,
    }),
    [isOpen, open, close, pushView, popView, currentView, insertPrompt]
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}
