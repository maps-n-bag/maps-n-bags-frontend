import React, { createContext, useContext, useState, useEffect } from 'react';
import { lightTheme, darkTheme } from './themes';

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export function CustomThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  // Keep the theme shim in sync so legacy pages that read theme.palette.mode still work
  const theme = isDark ? darkTheme : lightTheme;

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  const toggleThemeMode = () => setIsDark((prev) => !prev);

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleThemeMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
