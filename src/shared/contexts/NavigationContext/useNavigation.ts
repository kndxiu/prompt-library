import { useContext } from "react";
import type { NavigationContextType } from "./types";
import { NavigationContext } from "./NavigationContext";

export function useNavigation(): NavigationContextType {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error("useNavigation must be used within a NavigationProvider");
  }
  return context;
}
