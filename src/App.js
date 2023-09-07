import React from "react";
import { NavigateAll } from "./navigateAll";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({});
console.log(process.env.REACT_APP_BASE_URL)
function App() {
  const classes = useStyles();
  return (
    <div className="App">
      <NavigateAll />
    </div>
  );
}

export default App;
