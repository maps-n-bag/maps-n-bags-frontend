import React from "react";
import { NavigateAll } from "./navigateAll";
import { makeStyles } from "@mui/styles";
import { CustomThemeProvider } from "./ThemeContext";

const useStyles = makeStyles({});
console.log(process.env.REACT_APP_BASE_URL);
function App() {
  const classes = useStyles();
  document.title = "Maps 'n Bags";
  return (
    <div className="App">
      <CustomThemeProvider>
        <NavigateAll />
      </CustomThemeProvider>
    </div>
  );
}

export default App;
