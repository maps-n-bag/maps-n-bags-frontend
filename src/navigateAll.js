import React from "react";
import { BrowserRouter, Route, Routes, Switch } from "react-router-dom";
import FullTour from "./Plan/fulltour";
import CreateAPlan from "./Plan/createPlan";
import DaywisePlan from "./DaywisePlan/daywiseplan";
import Profile from "./Profile/timeline";

import PlaceDetails from "./DaywisePlan/placedetails";
import DaybyDay from "./Blog-all-event/daybyday1";
import Landingpage from "./LandingPage/landing";
import Register from "./Registration/register";
import Bloglist from "./Blog-all-event/bloglist";
import LoginPage from "./login/loginPage";
import ExploreMain from "./Explore/exploreMainPage";
import ThingsToDo from "./Activities to do/thingstodocard";
import GenerateBlog from "./Blog-all-event/showGeneratedBlog";
import ExploreNearbyRegions from "./ExPloreOtherRigion/exploreOtherRegion";
import OthersPlan from "./OthersPlan/otherPlans";
import PrivateRoute from "./privateRoute";

export class NavigateAll extends React.Component {

  render() {

    const userId = localStorage.getItem("userId");

    return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Landingpage />} />
          <Route path="/Login" element={<LoginPage />} />
          <Route path="/Register" element={<Register />} />

          <Route path="/Profile/:user_id" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          <Route path="/CreatePlan" element={
            <PrivateRoute>
              <CreateAPlan />
            </PrivateRoute>
          } />
          <Route path="/FullTour/:plan_id" element={
            <PrivateRoute>
              <FullTour />
            </PrivateRoute>
          } />
          <Route path="/DaywisePlan/:plan_id/:dayStart/:totalDays/:day" element={
            <PrivateRoute>
              <DaywisePlan />
            </PrivateRoute>
          } />
          <Route path="/PlaceDetails/:id" element={
            <PrivateRoute>
              <PlaceDetails />
            </PrivateRoute>
          } />
          <Route path="/AllBlog" element={
            <PrivateRoute>
              <Bloglist />
            </PrivateRoute>
          } />
          <Route path="/Blog/:plan_id" element={
            <PrivateRoute>
              <DaybyDay />
            </PrivateRoute>
          } />
          <Route path="/ShareBlog/:plan_id/:publish" element={
            <PrivateRoute>
              <GenerateBlog />
            </PrivateRoute>
          } />
          <Route path="/Explore/:plan_id" element={
            <PrivateRoute>
              <ExploreMain />
            </PrivateRoute>
          } />
          <Route path="/OthersPlan" element={
            <PrivateRoute>
              <OthersPlan />
            </PrivateRoute>
          } />
          <Route path="/ThingsToDo/:plan_id" element={
            <PrivateRoute>
              <ThingsToDo />
            </PrivateRoute>
          } />
          <Route path="/ExploreNearbyRegions/:plan_id" element={
            <PrivateRoute>
              <ExploreNearbyRegions />
            </PrivateRoute>
          } />

          {/** send to landing page if no route is matched */}
          <Route path="*" element={<Landingpage />} />

        </Routes>
      </BrowserRouter>
    );
  }
}