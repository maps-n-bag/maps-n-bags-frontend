import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import SideBar from "../App drawer/sideBar";
import DayCards from "./daycards2";
import { useThemeContext } from "../ThemeContext";

const baseURL = import.meta.env.VITE_BASE_URL;

const DaybyDay = () => {
  const { plan_id } = useParams();
  const [itemBasic, setItemBasic] = useState([]);
  const { theme, toggleThemeMode } = useThemeContext();

  useEffect(() => {
    axios
      .get(`${baseURL}event?plan_id=${plan_id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      })
      .then((resp) => setItemBasic(resp.data))
      .catch(console.error);
  }, [plan_id]);

  return (
    <div className="min-h-screen bg-surface dark:bg-[#100e07] text-on-surface dark:text-[#fff9eb]">
      <SideBar theme={theme} toggleTheme={toggleThemeMode} />

      <main className="pt-24 pb-16 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-3">Journey Journal</p>
          <h1 className="text-5xl font-light tracking-tight" style={{ fontFamily: "'Newsreader', serif" }}>
            Day-by-Day <span className="italic text-primary">Chronicle</span>
          </h1>
        </div>

        {itemBasic.length === 0 ? (
          <div className="text-center py-20 text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl opacity-30 block mb-4">event_note</span>
            <p className="text-sm italic">No events found for this plan.</p>
          </div>
        ) : (
          <div className="space-y-10">
            {itemBasic.map((subArray, index) => (
              <section key={index}>
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <h2 className="text-2xl italic text-on-surface" style={{ fontFamily: "'Newsreader', serif" }}>
                    Day {index + 1}
                  </h2>
                  <div className="h-px flex-1 bg-outline/10" />
                </div>
                <DayCards item={subArray} />
              </section>
            ))}
          </div>
        )}

        {/* Action bar */}
        <div className="flex flex-wrap gap-3 mt-12 pt-6 border-t border-outline/10">
          <Link
            to={`/FullTour/${plan_id}`}
            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-4 py-2 border border-outline/30 rounded-full hover:border-primary hover:text-primary transition-colors no-underline"
          >
            <span className="material-symbols-outlined text-[14px]">map</span>
            Go to Plan
          </Link>
          <Link
            to={`/ShareBlog/${plan_id}/false`}
            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-4 py-2 border border-outline/30 rounded-full hover:border-primary hover:text-primary transition-colors no-underline"
          >
            <span className="material-symbols-outlined text-[14px]">menu_book</span>
            View Blog
          </Link>
          <Link
            to={`/ShareBlog/${plan_id}/true`}
            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-4 py-2 bg-primary text-on-primary rounded-full hover:bg-primary-dim transition-colors no-underline"
          >
            <span className="material-symbols-outlined text-[14px]">publish</span>
            Publish Changes
          </Link>
        </div>
      </main>
    </div>
  );
};

export default DaybyDay;
