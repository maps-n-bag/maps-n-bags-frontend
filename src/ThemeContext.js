import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from './themes'; // Import your customized themes

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export function CustomThemeProvider({ children }) {
  const [theme, setTheme] = useState(lightTheme); // Default to light theme

  const toggleThemeMode = () => {
    // Toggle between light and dark themes
    setTheme(theme.palette.mode === 'light' ? darkTheme : lightTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleThemeMode }}>
      <ThemeProvider theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
