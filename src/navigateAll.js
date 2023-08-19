import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import FullTour from "./Overview-Plan/fulltour";
import DaybyDay from "./Day-By-Day-Plan/daybyday1";
import Tour_overview from "./Overview-Plan/tour_overview";
//import PlaceDetails from "./Day-By-Day-Plan/placedetails";
// import LoginPage from "./login/loginPage";
export class NavigateAll extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          {/* <Route path="/" element={<HomeAni />}></Route>
          <Route path="/HomeAni" element={<HomeAni />}></Route> */}
          <Route exact path="/">
            {" "}
            <Tour_overview />
          </Route>
          <Route path="/TourOverview">
            {" "}
            <Tour_overview />
          </Route>
          {/* <Route path="/target/:id" component={TargetPage} /> */}
          <Route path="/FullTour">
            <FullTour />
          </Route>
          {/* <Route path="/DayByDay">
            <DaybyDay />
          </Route>
          <Route path="/PlaceDetails/:id">
            <PlaceDetails />
          </Route> */}
          {/* <Route path="/LoginPage/:id">
            <LoginPage />
          </Route> */}
        </Switch>
      </BrowserRouter>
    );
  }
}
