import React from "react";
import { NavigateAll } from "./navigateAll";
import { CustomThemeProvider } from "./ThemeContext";

function App() {
  document.title = "Maps 'n Bags";
  return (
    <CustomThemeProvider>
      <NavigateAll />
    </CustomThemeProvider>
  );
}

export default App;
