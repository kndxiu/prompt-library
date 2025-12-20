import type { ReactNode } from "react";

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
