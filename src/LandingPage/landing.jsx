import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SideBar from "../App drawer/sideBar";
import { PLAN_PLACEHOLDER } from "../utils/placeholders";

const baseURL = import.meta.env.VITE_BASE_URL;

// ── Plan Card ────────────────────────────────────────────────────────────────

function PlanCard({ item, onSavePlan, isLoggedIn }) {
  return (
    <div className="group relative flex flex-col rounded-xl overflow-hidden bg-surface-container-low dark:bg-[#1a1710] border border-[#807b68]/10 hover:shadow-xl hover:shadow-on-surface/5 transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image || PLAN_PLACEHOLDER}
          alt={item.title}
          onError={(e) => { e.target.src = PLAN_PLACEHOLDER; }}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3
          className="text-lg font-headline italic text-on-surface dark:text-[#fff9eb] leading-snug"
          style={{ fontFamily: "'Newsreader', serif" }}
        >
          {item.title}
        </h3>
        {item.description && (
          <p className="text-sm text-on-surface-variant dark:text-[#fff9eb]/60 leading-relaxed line-clamp-2 flex-1">
            {item.description}
          </p>
        )}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#807b68]/10">
          <span className="text-xs text-on-surface-variant dark:text-[#fff9eb]/40 flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">content_copy</span>
            {item.copy_count ?? 0} copies
          </span>
          <button
            onClick={() => onSavePlan(item)}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary/10 hover:bg-primary hover:text-on-primary text-primary dark:text-[#ffac9f] dark:hover:bg-[#ffac9f] dark:hover:text-[#100e07] text-xs font-bold transition-all duration-200"
          >
            <span className="material-symbols-outlined text-[14px]">bookmark_add</span>
            Save Plan
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Landing Page ─────────────────────────────────────────────────────────────

export default function Landingpage() {
  const navigate = useNavigate();
  const plansRef = useRef(null);
  const userId = localStorage.getItem("userId");
  const isLoggedIn = !!userId;

  const [regions, setRegions] = useState([]);
  const [plans, setPlans] = useState([]);
  const [checkedRegions, setCheckedRegions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination
  const CHRONICLES_PAGE = 6;
  const PLANS_PAGE = 8;
  const [visibleChronicles, setVisibleChronicles] = useState(CHRONICLES_PAGE);
  const [visiblePlans, setVisiblePlans] = useState(PLANS_PAGE);

  // Copy-plan modal
  const [copyModalPlan, setCopyModalPlan] = useState(null); // plan object or null
  const [copyDate, setCopyDate] = useState(new Date());
  const [copying, setCopying] = useState(false);

  // Fetch regions (public endpoint)
  useEffect(() => {
    axios
      .get(`${baseURL}public/regions`, {
        headers: isLoggedIn
          ? { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
          : {},
      })
      .then((r) => setRegions(r.data))
      .catch(console.error);
  }, []);

  // Fetch plans whenever filters change
  useEffect(() => {
    setLoading(true);
    axios
      .post(
        `${baseURL}plan/others`,
        { user_id: isLoggedIn ? userId : null, regions: [...checkedRegions] },
        {
          headers: isLoggedIn
            ? { Authorization: `Bearer ${localStorage.getItem("accessToken")}` }
            : {},
        }
      )
      .then((r) => {
        setPlans(Array.isArray(r.data) ? r.data : []);
        setVisibleChronicles(CHRONICLES_PAGE);
        setVisiblePlans(PLANS_PAGE);
        setLoading(false);
      })
      .catch(() => { setPlans([]); setLoading(false); });
  }, [checkedRegions.length, isLoggedIn]);

  const toggleRegion = (id) =>
    setCheckedRegions((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );

  // Called when user clicks "Save Plan" on any card
  const handleSavePlan = (item) => {
    if (!isLoggedIn) { navigate("/Register"); return; }
    setCopyDate(new Date());
    setCopyModalPlan(item);
  };

  // Called when user confirms the date in the modal
  const handleConfirmCopy = async () => {
    if (!copyModalPlan) return;
    setCopying(true);
    try {
      const r = await axios.post(
        `${baseURL}plan/copy`,
        { plan_id: copyModalPlan.id, user_id: userId, start_date: copyDate },
        { headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` } }
      );
      if (r.status === 201) navigate(`/FullTour/${r.data.id}`);
    } catch (e) {
      console.error(e);
    } finally {
      setCopying(false);
      setCopyModalPlan(null);
    }
  };

  return (
    <div className="min-h-screen bg-surface dark:bg-[#100e07] text-on-surface dark:text-[#fff9eb]">
      <SideBar />

      {/* ── Hero (guests only) ── */}
      {!isLoggedIn && (
        <section className="relative min-h-[90vh] flex items-center overflow-hidden px-8 md:px-16 pt-16">
          {/* Background */}
          <div className="absolute inset-0 z-0">
            <div className="w-full h-full bg-gradient-to-br from-surface-container via-surface to-surface-container-low dark:from-[#1a1710] dark:to-[#100e07]" />
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #b6271a 1px, transparent 0)", backgroundSize: "32px 32px" }} />
          </div>

          <div className="relative z-10 w-full max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center py-24">
            {/* Left: copy */}
            <div>
              <span className="font-body uppercase tracking-[0.3em] text-primary text-xs font-bold mb-6 block">
                Curated Expeditions
              </span>
              <h1
                className="text-6xl md:text-7xl xl:text-8xl leading-tight text-on-surface dark:text-[#fff9eb] font-headline"
                style={{ fontFamily: "'Newsreader', serif", letterSpacing: "-0.02em" }}
              >
                Plan the trip <span className="italic text-primary font-medium">you've always</span> dreamed of
              </h1>
              <p className="mt-8 text-lg leading-relaxed text-on-surface-variant dark:text-[#fff9eb]/60 max-w-lg font-body">
                Browse real itineraries crafted by fellow travellers. Copy any plan, customise it day by day, and hit the road.
              </p>
              <div className="mt-12 flex flex-wrap items-center gap-6">
                <Link
                  to="/Register"
                  className="px-8 py-4 rounded-xl bg-primary text-on-primary font-bold shadow-xl shadow-primary/20 hover:-translate-y-0.5 transition-transform"
                >
                  Start Planning
                </Link>
                <button
                  onClick={() => plansRef.current?.scrollIntoView({ behavior: "smooth" })}
                  className="flex items-center gap-2 font-bold text-primary group"
                >
                  <span className="border-b border-primary">Browse Plans</span>
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Right: stacked plan card previews */}
            <div className="hidden lg:flex items-center justify-center relative h-[480px]">
              {plans.slice(0, 3).map((plan, i) => (
                <div
                  key={plan.id}
                  className="absolute w-72 rounded-2xl overflow-hidden shadow-2xl border border-[#807b68]/10 bg-surface-container transition-all duration-500"
                  style={{
                    transform: `rotate(${[-7, 4, -1][i]}deg) translate(${[-55, 55, 0][i]}px, ${[30, -30, 0][i]}px)`,
                    zIndex: [1, 2, 3][i],
                  }}
                >
                  <div className="aspect-[4/3] overflow-hidden bg-surface">
                    <img
                      src={plan.image || PLAN_PLACEHOLDER}
                      alt={plan.title}
                      onError={(e) => { e.target.src = PLAN_PLACEHOLDER; }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm font-semibold text-on-surface truncate" style={{ fontFamily: "'Newsreader', serif" }}>{plan.title}</p>
                    <p className="text-xs text-on-surface-variant mt-1 line-clamp-1">{plan.description}</p>
                  </div>
                </div>
              ))}

              {/* Placeholder cards if plans haven't loaded yet */}
              {plans.length === 0 && [0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="absolute w-72 rounded-2xl overflow-hidden shadow-2xl border border-[#807b68]/10 bg-surface-container"
                  style={{
                    transform: `rotate(${[-7, 4, -1][i]}deg) translate(${[-55, 55, 0][i]}px, ${[30, -30, 0][i]}px)`,
                    zIndex: [1, 2, 3][i],
                  }}
                >
                  <div className="aspect-[4/3] bg-surface-container animate-pulse" />
                  <div className="p-4 space-y-2">
                    <div className="h-3 bg-surface rounded-full w-3/4 animate-pulse" />
                    <div className="h-2 bg-surface rounded-full w-1/2 animate-pulse" />
                  </div>
                </div>
              ))}

              {/* Floating stat badge */}
              <div className="absolute top-4 right-0 bg-[#100e07] text-[#fff9eb] rounded-2xl px-5 py-3 shadow-xl z-10">
                <p className="text-[10px] uppercase tracking-widest text-[#fff9eb]/50 mb-1">Community</p>
                <p className="text-2xl font-bold" style={{ fontFamily: "'Newsreader', serif" }}>{plans.length}+</p>
                <p className="text-xs text-[#fff9eb]/60">itineraries</p>
              </div>
            </div>
          </div>

          {/* Decorative angled divider */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-surface-container-low dark:bg-[#1a1710]" style={{ clipPath: "polygon(0 100%, 100% 100%, 100% 0)" }} />
        </section>
      )}

      {/* ── Community Chronicles (blog teasers) ── */}
      {plans.length > 0 && (
        <section className="px-8 md:px-16 py-14 bg-surface dark:bg-[#100e07]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2">Community Chronicles</p>
                <h2
                  className="text-3xl font-light tracking-tight text-on-surface dark:text-[#fff9eb]"
                  style={{ fontFamily: "'Newsreader', serif" }}
                >
                  Travel stories from the community
                </h2>
              </div>
              <Link
                to="/Register"
                className="hidden md:inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-primary no-underline hover:underline"
              >
                Start your own
                <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {plans.slice(0, visibleChronicles).map((item) => (
                <Link
                  key={item.id}
                  to={`/ShareBlog/${item.id}/false`}
                  className="group no-underline flex gap-4 p-4 rounded-xl border border-[#807b68]/10 hover:border-primary/30 hover:shadow-md transition-all duration-200 bg-surface-container dark:bg-[#1a1710]"
                >
                  {/* Thumbnail */}
                  <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                    <img
                      src={item.image || PLAN_PLACEHOLDER}
                      alt={item.title}
                      onError={(e) => { e.target.src = PLAN_PLACEHOLDER; }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  {/* Text */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <p
                        className="text-sm font-semibold text-on-surface group-hover:text-primary transition-colors line-clamp-2 leading-snug"
                        style={{ fontFamily: "'Newsreader', serif" }}
                      >
                        {item.title}
                      </p>
                      {item.description && (
                        <p className="text-xs text-on-surface-variant mt-1 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary mt-2 flex items-center gap-1">
                      Read Chronicle
                      <span className="material-symbols-outlined text-[12px] group-hover:translate-x-0.5 transition-transform">arrow_forward</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Show more chronicles */}
            {visibleChronicles < plans.length && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setVisibleChronicles((n) => n + CHRONICLES_PAGE)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#807b68]/30 text-sm font-bold text-on-surface-variant dark:text-[#fff9eb]/50 hover:border-primary hover:text-primary dark:hover:text-[#ffac9f] transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">expand_more</span>
                  Show more stories
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── Plans Section ── */}
      <section
        ref={plansRef}
        className={`px-8 md:px-16 py-16 bg-surface-container-low dark:bg-[#1a1710] ${isLoggedIn ? "pt-24" : ""}`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <h2
                className="text-4xl font-headline text-on-surface dark:text-[#fff9eb]"
                style={{ fontFamily: "'Newsreader', serif" }}
              >
                {isLoggedIn ? "Discover Plans" : "Explore Itineraries"}
              </h2>
              <p className="text-on-surface-variant dark:text-[#fff9eb]/60 mt-2 max-w-md text-sm">
                Real travel plans from the Maps 'n Bags community. Find inspiration and copy a plan to make it your own.
              </p>
            </div>

          </div>

          {/* Region filter chips */}
          {regions.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {regions.map((rgn) => (
                <button
                  key={rgn.id}
                  onClick={() => toggleRegion(rgn.id)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                    checkedRegions.includes(rgn.id)
                      ? "bg-primary text-on-primary border-primary"
                      : "border-[#807b68]/30 text-on-surface-variant dark:text-[#fff9eb]/60 hover:border-primary hover:text-primary dark:hover:text-[#ffac9f]"
                  }`}
                >
                  {rgn.title}
                </button>
              ))}
              {checkedRegions.length > 0 && (
                <button
                  onClick={() => setCheckedRegions([])}
                  className="px-4 py-1.5 rounded-full text-sm font-semibold border border-dashed border-[#807b68]/30 text-on-surface-variant dark:text-[#fff9eb]/40 hover:border-primary/50 transition-all"
                >
                  Clear
                </button>
              )}
            </div>
          )}

          {/* Plans grid */}
          {loading ? (
            <div className="flex justify-center items-center py-24">
              <span className="material-symbols-outlined text-primary text-4xl animate-spin">progress_activity</span>
            </div>
          ) : plans.length === 0 ? (
            <div className="text-center py-24 flex flex-col items-center gap-4">
              <span className="material-symbols-outlined text-5xl text-on-surface/20">travel_explore</span>
              <p className="text-on-surface-variant dark:text-[#fff9eb]/50">
                {isLoggedIn ? "No plans found. Try a different region filter." : "Sign in to explore all community plans."}
              </p>
              {!isLoggedIn && (
                <Link to="/Register" className="mt-2 px-6 py-2 rounded-full bg-primary text-on-primary text-sm font-bold hover:-translate-y-0.5 transition-transform">
                  Join for free
                </Link>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {plans.slice(0, visiblePlans).map((item) => (
                  <PlanCard key={item.id} item={item} onSavePlan={handleSavePlan} isLoggedIn={isLoggedIn} />
                ))}
              </div>

              {/* Show more plans */}
              {visiblePlans < plans.length && (
                <div className="mt-10 flex flex-col items-center gap-2">
                  <button
                    onClick={() => setVisiblePlans((n) => n + PLANS_PAGE)}
                    className="flex items-center gap-2 px-8 py-3 rounded-full bg-primary/10 hover:bg-primary hover:text-on-primary text-primary dark:text-[#ffac9f] dark:hover:bg-[#ffac9f] dark:hover:text-[#100e07] font-bold text-sm transition-all duration-200"
                  >
                    <span className="material-symbols-outlined text-[18px]">expand_more</span>
                    Show more plans
                  </button>
                  <p className="text-xs text-on-surface-variant dark:text-[#fff9eb]/40">
                    Showing {Math.min(visiblePlans, plans.length)} of {plans.length}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* ── CTA banner (guests only) ── */}
      {!isLoggedIn && (
        <section className="px-8 md:px-16 py-16">
          <div className="max-w-7xl mx-auto">
            <div
              className="rounded-[2rem] p-12 md:p-20 text-center relative overflow-hidden"
              style={{ backgroundColor: "#100e07" }}
            >
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 2px 2px, #fff9eb 1px, transparent 0)", backgroundSize: "40px 40px" }} />
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2
                  className="text-4xl md:text-6xl font-headline text-[#fff9eb] mb-6 italic"
                  style={{ fontFamily: "'Newsreader', serif" }}
                >
                  Start your own chronicle
                </h2>
                <p className="text-[#fff9eb]/60 text-lg mb-10">
                  Create day-by-day travel plans, share them with friends, and discover what the world is exploring right now.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/Register" className="px-8 py-4 rounded-xl bg-primary text-on-primary font-bold hover:scale-105 transition-transform">
                    Create free account
                  </Link>
                  <Link to="/Login" className="px-8 py-4 rounded-xl border border-[#fff9eb]/20 text-[#fff9eb]/80 font-bold hover:border-[#fff9eb]/60 transition-colors">
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── Copy-Plan Modal ── */}
      {copyModalPlan && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(16,14,7,0.6)", backdropFilter: "blur(4px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setCopyModalPlan(null); }}
        >
          <div className="w-full max-w-sm rounded-2xl bg-surface dark:bg-[#1a1710] border border-[#807b68]/20 shadow-2xl p-8 flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-1">Save Plan</p>
                <h3
                  className="text-xl font-light text-on-surface dark:text-[#fff9eb] leading-snug"
                  style={{ fontFamily: "'Newsreader', serif" }}
                >
                  {copyModalPlan.title}
                </h3>
              </div>
              <button
                onClick={() => setCopyModalPlan(null)}
                className="text-on-surface-variant hover:text-on-surface transition-colors mt-0.5"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Date picker */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant dark:text-[#fff9eb]/50">
                When does your trip start?
              </label>
              <DatePicker
                selected={copyDate}
                onChange={(d) => setCopyDate(d)}
                dateFormat="dd MMM yyyy"
                className="w-full border border-[#807b68]/30 rounded-xl px-4 py-3 text-sm bg-surface-container dark:bg-[#100e07] text-on-surface dark:text-[#fff9eb] focus:outline-none focus:ring-2 focus:ring-primary/30"
                wrapperClassName="w-full"
                minDate={new Date()}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setCopyModalPlan(null)}
                className="flex-1 py-3 rounded-xl border border-[#807b68]/30 text-sm font-bold text-on-surface-variant dark:text-[#fff9eb]/50 hover:border-primary/50 hover:text-primary transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmCopy}
                disabled={copying}
                className="flex-1 py-3 rounded-xl bg-primary text-on-primary text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {copying
                  ? <><span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span> Saving…</>
                  : <><span className="material-symbols-outlined text-[16px]">bookmark_add</span> Confirm</>
                }
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Footer ── */}
      <footer className="px-12 py-8 border-t border-[#807b68]/10 flex flex-col md:flex-row justify-between items-center gap-4 bg-surface-container dark:bg-[#1a1710]">
        <span
          className="text-lg font-headline italic text-on-surface dark:text-[#fff9eb]/70"
          style={{ fontFamily: "'Newsreader', serif" }}
        >
          Maps 'n Bags
        </span>
        <span className="text-sm text-on-surface-variant dark:text-[#fff9eb]/40">
          © {new Date().getFullYear()} Maps 'n Bags. All rights reserved.
        </span>
      </footer>
    </div>
  );
}
