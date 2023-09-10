// themes.js
import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#000000', // Your primary color
    },
    secondary: {
      main: '#ffffff', // Your secondary color
    },
    // Other light theme properties...
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff', // Your primary color for dark mode
    },
    secondary: {
      main: '#000000', // Your secondary color for dark mode
    },
    // Other dark theme properties...
  },
});
