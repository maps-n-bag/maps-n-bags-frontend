import React from "react";
import Tour_overview from "./Overview-Plan/tour_overview";
import View_Gallery from "./Gallery/view_Gallery";
import ImageUpload from "./imageUpload";
import SideBar from "./App drawer/sideBar";
import FullTour from "./Overview-Plan/fulltour";
import { NavigateAll } from "./navigateAll";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({});
function App() {
  const classes = useStyles();
  return (
    <div className="App">
      {/* <ImageUpload />  */}
      <NavigateAll />
    </div>
  );
}

export default App;
