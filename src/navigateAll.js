import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import FullTour from "./Overview-Plan/fulltour";
import Tour_overview from "./Overview-Plan/tour_overview";
import CreateAPlan from "./Create Plan/createPlan";
import DaywisePlan from "./Day-By_Day_DayWise/daywiseplan";
import Profile from "./Profile/timeline";

import PlaceDetails from "./Day-By_Day_DayWise/placedetails";
import DaybyDay from "./Blog-all-event/daybyday1";
import Landingpage from "./LandingPage/landing";
import Register from "./Registration/register";
// import BlogGenerated from "./Blog-generated/saveddaybyday1";
import LoginPage from "./login/loginPage";
import ExploreMain from "./Explore/exploreMainPage";
export class NavigateAll extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landingpage />} />
          <Route path="/Home" element={<Landingpage />} />
          <Route path="/TourOverview/:plan_id" element={<Tour_overview />} />
          <Route path="/Blog" element={<DaybyDay />} />
          <Route path="/Explore" element={<ExploreMain />} />

          <Route path="/FullTour/:plan_id" element={<FullTour />} />
          <Route path="/createPlan" element={<CreateAPlan />} />
          <Route
            path="/DaywisePlan/:plan_id/:dayStart/:totalDays/:day"
            element={<DaywisePlan />}
          />

          <Route path="/Register" element={<Register />} />

          <Route path="/PlaceDetails/:id" element={<PlaceDetails />} />

          <Route path="/DaybyDay" element={<DaybyDay />} />

          <Route path="/Profile/:user_id" element={<Profile />} />

          <Route path="/Login" element={<LoginPage />} />

          <Route path="/Login/:id" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    );
  }
}
