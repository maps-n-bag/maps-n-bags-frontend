import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../App drawer/sideBar";
import { useThemeContext } from "../ThemeContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as dateFormat from "../formatDate";

const baseURL = import.meta.env.VITE_BASE_URL;

const CreateAPlan = () => {
  const { theme, toggleThemeMode } = useThemeContext();
  const [regions, setRegions] = useState([]);
  const [tags, setTags] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [checkedItemsTag, setCheckedItemsTag] = useState([]);
  const [checkedItemsRgn, setCheckedItemsRgn] = useState([]);
  const navigate = useNavigate();
  const { handleSubmit, register, getValues, setValue } = useForm();

  useEffect(() => {
    const headers = { Authorization: `Bearer ${localStorage.getItem("accessToken")}` };
    axios.get(`${baseURL}public/regions`, { headers }).then((r) => setRegions(r.data)).catch(console.error);
    axios.get(`${baseURL}public/tags`, { headers }).then((r) => setTags(r.data)).catch(console.error);
  }, []);

  const toggleTag = (id) => {
    setCheckedItemsTag((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleRgn = (id) => {
    setCheckedItemsRgn((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
    setValue("start_date", dateFormat.formatDate(startDate));
    setValue("end_date", dateFormat.formatDate(endDate));
    setValue("tags", checkedItemsTag);
    setValue("regions", checkedItemsRgn);
    setValue("user_id", localStorage.getItem("userId"));
    const values = getValues();
    axios
      .post(`${baseURL}plan`, values, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      })
      .then((response) => {
        if (response.status == "201") navigate("/FullTour/" + response.data.id);
      })
      .catch(console.error);
  };

  const onError = (errors) => console.log(errors);

  return (
    <div className="min-h-screen bg-surface dark:bg-[#100e07] text-on-surface dark:text-[#fff9eb]">
      <SideBar theme={theme} toggleTheme={toggleThemeMode} />

      <main className="pt-24 pb-16 px-6 md:px-12 flex flex-col items-center">

        {/* Header */}
        <div className="max-w-5xl w-full mb-10 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary mb-3">New Expedition</p>
          <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-4" style={{ fontFamily: "'Newsreader', serif" }}>
            Draft Your Next <span className="italic text-primary">Journey</span>
          </h1>
          <p className="text-on-surface-variant text-sm max-w-xl mx-auto">
            Set your dates, choose your regions, and tag the experience — we'll build the itinerary canvas for you.
          </p>
        </div>

        {/* Form + Preview grid */}
        <form onSubmit={handleSubmit(onSubmit, onError)} className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ── Left: Form panel ── */}
          <div className="lg:col-span-7 bg-surface-container-low dark:bg-[#1a1710] rounded-xl p-8 space-y-10 relative overflow-hidden">
            {/* Decorative corner */}
            <div className="absolute top-0 right-0 w-28 h-28 bg-surface-container opacity-40 rounded-bl-full -mr-6 -mt-6 pointer-events-none" />

            {/* Title & Description */}
            <section className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="material-symbols-outlined text-primary">edit_note</span>
                <h2 className="text-2xl" style={{ fontFamily: "'Newsreader', serif" }}>Details</h2>
              </div>
              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Title</label>
                  <input
                    {...register("title")}
                    required
                    placeholder="e.g. Alpine Discovery"
                    className="bg-surface-container dark:bg-[#25231a] border border-outline/20 focus:border-primary focus:ring-0 rounded-lg py-3 px-4 text-on-surface dark:text-[#fff9eb] placeholder:text-on-surface-variant/50 outline-none transition-all text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Description</label>
                  <textarea
                    {...register("description")}
                    rows={3}
                    placeholder="A short description of your journey…"
                    className="bg-surface-container dark:bg-[#25231a] border border-outline/20 focus:border-primary focus:ring-0 rounded-lg py-3 px-4 text-on-surface dark:text-[#fff9eb] placeholder:text-on-surface-variant/50 outline-none transition-all text-sm resize-none"
                  />
                </div>
              </div>
            </section>

            {/* Dates */}
            <section className="relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <span className="material-symbols-outlined text-primary">calendar_today</span>
                <h2 className="text-2xl" style={{ fontFamily: "'Newsreader', serif" }}>Temporal Scope</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Arrival</label>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="w-full bg-surface-container dark:bg-[#25231a] border border-outline/20 focus:border-primary rounded-lg py-3 px-4 text-on-surface dark:text-[#fff9eb] outline-none transition-all text-sm"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Departure</label>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    className="w-full bg-surface-container dark:bg-[#25231a] border border-outline/20 focus:border-primary rounded-lg py-3 px-4 text-on-surface dark:text-[#fff9eb] outline-none transition-all text-sm"
                  />
                </div>
              </div>
            </section>

            {/* Regions */}
            {regions.length > 0 && (
              <section className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <span className="material-symbols-outlined text-primary">public</span>
                  <h2 className="text-2xl" style={{ fontFamily: "'Newsreader', serif" }}>Desired Terrains</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {regions.map((rgn) => (
                    <button
                      key={rgn.id}
                      type="button"
                      onClick={() => toggleRgn(rgn.id)}
                      className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all hover:-translate-y-px ${
                        checkedItemsRgn.includes(rgn.id)
                          ? "bg-primary text-on-primary shadow-md"
                          : "bg-surface-container dark:bg-[#25231a] text-on-surface-variant hover:bg-surface-container-high"
                      }`}
                    >
                      {rgn.title}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Tags */}
            {tags.length > 0 && (
              <section className="relative z-10">
                <div className="flex items-center gap-3 mb-5">
                  <span className="material-symbols-outlined text-primary">label</span>
                  <h2 className="text-2xl" style={{ fontFamily: "'Newsreader', serif" }}>Narrative Pace</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => toggleTag(tag.id)}
                      className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all hover:-translate-y-px ${
                        checkedItemsTag.includes(tag.id)
                          ? "bg-secondary text-on-secondary shadow-md"
                          : "bg-surface-container dark:bg-[#25231a] text-on-surface-variant hover:bg-surface-container-high"
                      }`}
                    >
                      {tag.title}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Submit */}
            <div className="relative z-10 pt-2">
              <button
                type="submit"
                className="w-full py-4 bg-primary hover:bg-primary-dim text-on-primary font-bold rounded-xl shadow-lg shadow-primary/20 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined">map</span>
                Create Your Plan
              </button>
            </div>
          </div>

          {/* ── Right: Visual panel ── */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Decorative map placeholder */}
            <div className="bg-surface-container dark:bg-[#1a1710] rounded-xl overflow-hidden h-64 lg:h-80 relative flex items-center justify-center">
              <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #807b68 1px, transparent 0)", backgroundSize: "20px 20px" }} />
              <div className="absolute top-4 left-4 bg-surface/80 dark:bg-[#100e07]/80 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 shadow">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse inline-block" />
                <span className="text-[10px] font-bold uppercase tracking-widest">Planning your route</span>
              </div>
              <div className="relative z-10 text-center">
                <span className="material-symbols-outlined text-5xl text-outline/30 block mb-3">explore</span>
                <p className="text-xs text-on-surface-variant italic">Your itinerary map will appear here</p>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-surface-container-low dark:bg-[#1a1710] rounded-xl p-6 space-y-5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Planning Tips</h3>
              {[
                { icon: "calendar_today", text: "Set realistic date ranges — allow buffer days for travel transitions." },
                { icon: "public", text: "Select multiple regions to build a multi-destination journey." },
                { icon: "label", text: "Tags help you filter and find your plan later." },
              ].map(({ icon, text }) => (
                <div key={icon} className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-[18px] mt-0.5 flex-shrink-0">{icon}</span>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

        </form>
      </main>
    </div>
  );
};

export default CreateAPlan;
