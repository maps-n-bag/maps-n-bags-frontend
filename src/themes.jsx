// Minimal theme shim — no MUI dependency.
// Provides enough shape for legacy pages that check theme.palette.mode / theme.palette.primary.main
// while we migrate them to Tailwind one by one.

export const lightTheme = {
  palette: {
    mode: 'light',
    primary: { main: '#b6271a' },
    secondary: { main: '#745c00' },
  },
};

export const darkTheme = {
  palette: {
    mode: 'dark',
    primary: { main: '#ffac9f' },
    secondary: { main: '#f8d056' },
  },
};
