import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import FullTour from "./Overview-Plan/fulltour";
import Tour_overview from "./Overview-Plan/tour_overview";
import CreatePlan from "./Create Plan/createPlan";
import DaywisePlan from "./Day-By_Day_DayWise/daywiseplan";

import PlanDayOne from "./Day-By_Day_DayWise/daywiseplan2";
import PlaceDetails from "./Day-By_Day_DayWise/placedetails";
import DaybyDay from "./Blog-all-event/daybyday1";
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
            <CreatePlan />
          </Route>
          <Route path="/TourOverview">
            {" "}
            <Tour_overview />
          </Route>
          {/* <Route path="/target/:id" component={TargetPage} /> */}
          <Route path="/FullTour">
            <FullTour />
          </Route>

          <Route path="/DaywisePlan/:dayStart/:totalDays/:id">
            <DaywisePlan />
          </Route>

          <Route path="/Blog">
            <DaybyDay />
          </Route>

          <Route path="/DaywisePlan2/:dayStart/:totalDays/:id">
            <PlanDayOne />
          </Route>

          <Route path="/PlaceDetails/:id">
            <PlaceDetails />
          </Route>

          <Route path="/DaybyDay">
            <DaybyDay />
          </Route>

          {/* <Route path="/LoginPage/:id">
            <LoginPage />
          </Route> */}
        </Switch>
      </BrowserRouter>
    );
  }
}
