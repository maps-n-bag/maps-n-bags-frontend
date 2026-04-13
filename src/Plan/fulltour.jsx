import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import SideBar from "../App drawer/sideBar";
import { useThemeContext } from "../ThemeContext";
import * as dateformat from "../formatDate";
import { PLAN_PLACEHOLDER } from "../utils/placeholders";

const baseURL = import.meta.env.VITE_BASE_URL;

const FullTour = () => {
  const { theme, toggleThemeMode } = useThemeContext();
  const { plan_id } = useParams();
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseURL}plan?id=${plan_id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      })
      .then((resp) => setPlan(resp.data))
      .catch(console.error);
  }, [plan_id]);

  const dateStart = plan ? dateformat.formatDate(plan.start_date) : "";
  const dateEnd = plan ? dateformat.formatDate(plan.end_date) : "";

  const daysTotal = plan
    ? Math.ceil(Math.abs(new Date(dateEnd) - new Date(dateStart)) / (1000 * 60 * 60 * 24)) + 1
    : 0;

  return (
    <div className="min-h-screen bg-surface dark:bg-[#100e07] text-on-surface dark:text-[#fff9eb]">
      <SideBar theme={theme} toggleTheme={toggleThemeMode} />

      <main className="pt-24 pb-16 px-6 md:px-12 max-w-5xl mx-auto">
        {!plan ? (
          <div className="text-center py-24 text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl opacity-30 block mb-4 animate-spin">autorenew</span>
            <p className="text-sm italic">Loading plan…</p>
          </div>
        ) : (
          <>
            {/* ── Hero ── */}
            <section className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-14 items-start">
              {/* Cover image */}
              <div className="md:col-span-7 relative">
                <div className="rounded-xl overflow-hidden shadow-xl aspect-[4/3]">
                  <img
                    src={plan.image || PLAN_PLACEHOLDER}
                    alt={plan.title}
                    onError={(e) => { e.target.src = PLAN_PLACEHOLDER; }}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative blobs */}
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-tertiary-container rounded-full mix-blend-multiply opacity-30 -z-10" />
                <div className="absolute -top-6 -right-2 w-48 h-48 bg-primary-container rounded-full mix-blend-multiply opacity-20 -z-10" />
              </div>

              {/* Meta */}
              <div className="md:col-span-5 flex flex-col gap-5">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2">
                    {plan.public ? "Public Plan" : "Private Plan"}
                  </p>
                  <h1
                    className="text-4xl md:text-5xl font-light tracking-tight leading-tight italic"
                    style={{ fontFamily: "'Newsreader', serif" }}
                  >
                    {plan.title}
                  </h1>
                </div>

                <p className="text-sm text-on-surface-variant leading-relaxed italic">
                  {plan.description}
                </p>

                {/* Date range */}
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                  <span className="material-symbols-outlined text-primary text-[16px]">calendar_today</span>
                  {dateStart} — {dateEnd}
                  <span className="text-primary">·</span>
                  {daysTotal} {daysTotal === 1 ? "day" : "days"}
                </div>

                {/* Journey path summary */}
                <div className="bg-surface-container-low rounded-xl p-5 space-y-3">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-3">Journey Path</p>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">flight_takeoff</span>
                    <div>
                      <p className="text-xs font-bold">{dateStart}</p>
                      <p className="text-xs text-on-surface-variant">Departure</p>
                    </div>
                  </div>
                  <div className="w-px h-6 bg-outline/20 ml-[9px]" />
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-tertiary text-[18px] mt-0.5">hotel</span>
                    <div>
                      <p className="text-xs font-bold">{dateStart} — {dateEnd}</p>
                      <p className="text-xs text-on-surface-variant">Staying at {plan.title}</p>
                    </div>
                  </div>
                  <div className="w-px h-6 bg-outline/20 ml-[9px]" />
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-[18px] mt-0.5">flight_land</span>
                    <div>
                      <p className="text-xs font-bold">{dateEnd}</p>
                      <p className="text-xs text-on-surface-variant">Return</p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <Link
                    to={`/DaywisePlan/${plan_id}/${plan.start_date}/${daysTotal}/1`}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-primary text-on-primary font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-primary-dim transition-colors no-underline shadow-lg shadow-primary/20"
                  >
                    <span className="material-symbols-outlined text-[16px]">calendar_view_day</span>
                    View Day by Day Plan
                  </Link>
                  <Link
                    to={`/Blog/${plan_id}`}
                    className="inline-flex items-center gap-2 px-4 py-3 border border-outline/30 rounded-xl text-xs font-bold uppercase tracking-widest hover:border-primary hover:text-primary transition-colors no-underline"
                  >
                    <span className="material-symbols-outlined text-[16px]">menu_book</span>
                    Blog
                  </Link>
                  <Link
                    to={`/Explore/${plan_id}`}
                    className="inline-flex items-center gap-2 px-4 py-3 border border-outline/30 rounded-xl text-xs font-bold uppercase tracking-widest hover:border-primary hover:text-primary transition-colors no-underline"
                  >
                    <span className="material-symbols-outlined text-[16px]">explore</span>
                    Explore
                  </Link>
                </div>
              </div>
            </section>

            {/* ── Stats bar ── */}
            <div className="flex flex-wrap gap-8 py-6 border-t border-b border-outline/10 mb-14">
              {[
                { label: "Duration", value: `${daysTotal} days` },
                { label: "From", value: dateStart },
                { label: "To", value: dateEnd },
                { label: "Visibility", value: plan.public ? "Public" : "Private" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">{label}</p>
                  <p className="text-lg italic" style={{ fontFamily: "'Newsreader', serif" }}>{value}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default FullTour;
