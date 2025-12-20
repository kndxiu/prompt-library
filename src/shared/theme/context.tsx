import { useState, useEffect, type ReactNode } from "react";
import type { ThemeMode } from "./types";
import { detectHostTheme, watchHostTheme } from "./detector";
import { ThemeContext } from "./ThemeContext";

interface ThemeProviderProps {
  children: ReactNode;
  /** Optional: element to apply theme class to */
  rootElement?: HTMLElement | null;
}

export function ThemeProvider({ children, rootElement }: ThemeProviderProps) {
  const [theme, setTheme] = useState<ThemeMode>(() => detectHostTheme());

  useEffect(() => {
    const cleanup = watchHostTheme((newTheme) => {
      setTheme(newTheme);
    });
    return cleanup;
  }, []);

  useEffect(() => {
    const target = rootElement ?? document.documentElement;

    target.classList.remove("theme-light", "theme-dark");

    target.classList.add(`theme-${theme}`);
  }, [theme, rootElement]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
