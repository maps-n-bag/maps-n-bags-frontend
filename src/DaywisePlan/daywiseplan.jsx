import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import SideBar from "../App drawer/sideBar";
import EventCards from "./eventCards";
import { useThemeContext } from "../ThemeContext";
import * as dateformat from "../formatDate";

const baseURL = import.meta.env.VITE_BASE_URL;

const DaywisePlan = () => {
  const navigate = useNavigate();
  const { plan_id, dayStart, totalDays, day } = useParams();
  const [day_int, setDay] = useState(parseInt(day));
  const { theme, toggleThemeMode } = useThemeContext();
  const [needToUpdate, setNeedToUpdate] = useState(false);
  const [addList, setAddList] = useState([]);
  const [removeList, setRemoveList] = useState([]);
  const [itemBasic, setItemBasic] = useState([]);

  const day_start = dateformat.formatDate(dayStart);
  const dayStartObj = new Date(day_start);
  const today = new Date();
  today.setDate(dayStartObj.getDate() + (day_int - 1));
  const dateString = today.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  const totalDaysInt = parseInt(totalDays);

  useEffect(() => {
    axios
      .get(`${baseURL}event?plan_id=${plan_id}&day=${day_int}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      })
      .then((resp) => setItemBasic(resp.data))
      .catch(console.error);
  }, [day_int]);

  const changeDay = (delta) => {
    const next = day_int + delta;
    setDay(next);
    window.history.replaceState(null, null, `/DaywisePlan/${plan_id}/${dayStart}/${totalDays}/${next}`);
  };

  const postUpdateHandler = () => {
    axios
      .post(
        `${baseURL}plan/update?plan_id=${plan_id}`,
        { add: addList, remove: removeList, regions: [] },
        { headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` } }
      )
      .then(() => navigate(`/FullTour/${plan_id}`))
      .catch(console.error);
  };

  return (
    <div className="min-h-screen bg-surface dark:bg-[#100e07] text-on-surface dark:text-[#fff9eb]">
      <SideBar theme={theme} toggleTheme={toggleThemeMode} />

      <main className="pt-24 pb-20 px-6 md:px-12 max-w-5xl mx-auto">

        {/* Hero header */}
        <div className="mb-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2">Journey Narrative</p>
          <h1 className="text-5xl md:text-6xl font-light tracking-tight leading-none" style={{ fontFamily: "'Newsreader', serif" }}>
            Day <span className="italic text-primary">{day_int}</span>
          </h1>
          <p className="text-on-surface-variant mt-2 text-sm">{dateString}</p>
        </div>

        {/* Day selector strip */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-10 scrollbar-hide">
          {Array.from({ length: totalDaysInt }, (_, i) => i + 1).map((d) => (
            <button
              key={d}
              onClick={() => { setDay(d); window.history.replaceState(null, null, `/DaywisePlan/${plan_id}/${dayStart}/${totalDays}/${d}`); }}
              className={`flex-shrink-0 flex flex-col items-center gap-1 transition-all ${
                d === day_int ? "opacity-100" : "opacity-40 hover:opacity-80"
              }`}
            >
              <span className="text-[9px] uppercase tracking-widest font-bold text-on-surface-variant">Day {String(d).padStart(2, "0")}</span>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shadow transition-all ${
                d === day_int ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface"
              }`}>
                {d}
              </div>
            </button>
          ))}
        </div>

        {/* Events */}
        <div className="space-y-4 mb-10">
          {itemBasic.length === 0 ? (
            <div className="text-center py-16 text-on-surface-variant">
              <span className="material-symbols-outlined text-5xl opacity-30 block mb-4">event_note</span>
              <p className="text-sm italic">No events scheduled for this day yet.</p>
            </div>
          ) : (
            itemBasic.map((item, index) => (
              <EventCards
                key={index}
                item={item}
                theme={theme}
                plan_id={plan_id}
                setNeedToUpdate={setNeedToUpdate}
                setAddList={setAddList}
                setRemoveList={setRemoveList}
                addList={addList}
                removeList={removeList}
              />
            ))
          )}
        </div>

        {/* Action bar */}
        <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-outline/10">
          {day_int > 1 && (
            <button
              onClick={() => changeDay(-1)}
              className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-4 py-2 border border-outline/30 rounded-full hover:border-primary hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">arrow_back</span>
              Previous Day
            </button>
          )}
          {day_int < totalDaysInt && (
            <button
              onClick={() => changeDay(1)}
              className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-4 py-2 bg-primary text-on-primary rounded-full hover:bg-primary-dim transition-colors"
            >
              Next Day
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          )}
          <Link
            to={`/Blog/${plan_id}`}
            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-4 py-2 border border-outline/30 rounded-full hover:border-primary hover:text-primary transition-colors no-underline"
          >
            <span className="material-symbols-outlined text-[14px]">menu_book</span>
            Blog
          </Link>
          <Link
            to={`/Explore/${plan_id}`}
            className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-4 py-2 border border-outline/30 rounded-full hover:border-primary hover:text-primary transition-colors no-underline"
          >
            <span className="material-symbols-outlined text-[14px]">explore</span>
            Explore
          </Link>
          {needToUpdate && (
            <button
              onClick={postUpdateHandler}
              className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-4 py-2 bg-tertiary text-on-tertiary rounded-full hover:opacity-90 transition-colors ml-auto"
            >
              <span className="material-symbols-outlined text-[14px]">save</span>
              Save Changes
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default DaywisePlan;
