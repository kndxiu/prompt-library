import { createContext, useContext, type ReactNode } from "react";

export interface View {
  title: string;
  content: ReactNode;
  hasBackBtn?: boolean;
}

export interface NavigationContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  pushView: (view: View) => void;
  popView: () => void;
  currentView: View | undefined;
  insertPrompt: (content: string) => void;
}

export const NavigationContext = createContext<
  NavigationContextType | undefined
>(undefined);

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}
