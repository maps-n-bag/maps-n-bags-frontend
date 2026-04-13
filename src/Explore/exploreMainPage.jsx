import React from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import SideBar from "../App drawer/sideBar";
import { useThemeContext } from "../ThemeContext";

const ExploreMain = () => {
  const { theme, toggleThemeMode } = useThemeContext();
  const { plan_id } = useParams();

  return (
    <div className="min-h-screen bg-surface dark:bg-[#100e07] text-on-surface dark:text-[#fff9eb]">
      <SideBar theme={theme} toggleTheme={toggleThemeMode} />

      <main className="pt-24 pb-20 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="mb-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2">Explore</p>
          <h1
            className="text-5xl md:text-6xl font-light tracking-tight leading-none"
            style={{ fontFamily: "'Newsreader', serif" }}
          >
            Discover <span className="italic text-primary">More</span>
          </h1>
          <p className="text-sm text-on-surface-variant mt-3">
            Expand your journey — find activities at your destination or explore what's nearby.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Link
            to={`/ExploreNearbyRegions/${plan_id}`}
            className="group no-underline rounded-2xl bg-surface-container border border-outline/10 p-8 hover:border-primary/40 hover:shadow-lg transition-all duration-200"
          >
            <div className="text-4xl mb-4">🗺️</div>
            <h2
              className="text-2xl font-light text-on-surface group-hover:text-primary transition-colors mb-2"
              style={{ fontFamily: "'Newsreader', serif" }}
            >
              Explore Nearby Regions
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Discover places and activities in regions close to your destination and add them to your plan.
            </p>
            <div className="mt-6 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-primary">
              Explore
              <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
            </div>
          </Link>

          <Link
            to={`/ThingsToDo/${plan_id}`}
            className="group no-underline rounded-2xl bg-surface-container border border-outline/10 p-8 hover:border-primary/40 hover:shadow-lg transition-all duration-200"
          >
            <div className="text-4xl mb-4">🎯</div>
            <h2
              className="text-2xl font-light text-on-surface group-hover:text-primary transition-colors mb-2"
              style={{ fontFamily: "'Newsreader', serif" }}
            >
              Things to Do Here
            </h2>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Browse activities and experiences available at your current destination and customise your itinerary.
            </p>
            <div className="mt-6 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-primary">
              Browse
              <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default ExploreMain;
