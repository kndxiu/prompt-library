import { useState, useMemo, type ReactNode } from "react";
import { NavigationContext, type View } from "./shared";

export function NavigationProvider({
  children,
  inputElement,
}: {
  children: ReactNode;
  inputElement: HTMLElement;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewStack, setViewStack] = useState<View[]>([]);

  const open = () => setIsOpen(true);
  const close = () => {
    setIsOpen(false);
    setViewStack([]);
  };

  const pushView = (view: View) => {
    setViewStack((prev) => [...prev, view]);
  };

  const popView = () => {
    setViewStack((prev) => prev.slice(0, -1));
  };

  const insertPrompt = (content: string) => {
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
  };

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
    [isOpen, currentView, viewStack, insertPrompt]
  );

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
}
