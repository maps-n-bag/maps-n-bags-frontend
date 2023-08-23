import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FullTour from "./Overview-Plan/fulltour";
import Tour_overview from "./Overview-Plan/tour_overview";
import CreatePlan from "./Create Plan/createPlan";
import DaywisePlan from "./Day-By_Day_DayWise/daywiseplan";
// import TimeLine from "./Profile/timeline";
import PlanDayOne from "./Day-By_Day_DayWise/daywiseplan2";
import PlaceDetails from "./Day-By_Day_DayWise/placedetails";
import DaybyDay from "./Blog-all-event/daybyday1";
import Landingpage from "./LandingPage/landing";
import Register from "./Registration/register";
// import BlogGenerated from "./Blog-generated/saveddaybyday1";
import LoginPage from "./login/loginPage";
export class NavigateAll extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landingpage />} />

          <Route path="/TourOverview" element={<Tour_overview />} />

          <Route path="/FullTour" element={<FullTour />} />
          <Route
            path="/DaywisePlan/:dayStart/:totalDays/:id"
            element={<DaywisePlan />}
          />

          <Route path="/Register" element={<Register />} />

          <Route
            path="/DaywisePlan2/:dayStart/:totalDays/:id"
            element={<PlanDayOne />}
          />

          <Route path="/PlaceDetails/:id" element={<PlaceDetails />} />

          <Route path="/DaybyDay" element={<DaybyDay />} />

          <Route path="/Login" element={<LoginPage />} />

          <Route path="/Login/:id" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
