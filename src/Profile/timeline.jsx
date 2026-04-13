import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { uploadFiles } from "../utils/upload";
import SideBar from "../App drawer/sideBar";
import PlanCard from "../Plan/planCard";
import { useThemeContext } from "../ThemeContext";

const baseURL = import.meta.env.VITE_BASE_URL;

const Profile = () => {
  const { user_id } = useParams();
  const [itemBasic, setItemBasic] = useState({});
  const [isEditingBasic, setIsEditingBasic] = useState(false);
  const [plans, setPlans] = useState([]);
  const [coverUrl, setCoverUrl] = useState(null); // only set after explicit upload
  const { theme, toggleThemeMode } = useThemeContext();

  useEffect(() => {
    axios
      .get(`${baseURL}user?id=${user_id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      })
      .then((res) => {
        localStorage.setItem("userImage", res.data.profile_pic);
        localStorage.setItem("userName", res.data.username || "");
        localStorage.setItem("firstName", res.data.first_name || "");
        localStorage.setItem("lastName", res.data.last_name || "");
        setItemBasic(res.data);
        // cover_pic is separate from profile_pic only if they differ
        if (res.data.cover_pic && res.data.cover_pic !== res.data.profile_pic) {
          setCoverUrl(res.data.cover_pic);
        }
      })
      .catch(console.error);
  }, [user_id]);

  useEffect(() => {
    axios
      .get(`${baseURL}plan/all?user_id=${user_id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      })
      .then((res) => setPlans(res.data))
      .catch(console.error);
  }, [user_id]);

  const handleTogglePublic = (plan_id) => {
    axios.put(`${baseURL}plan/edit/public?plan_id=${plan_id}`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    }).catch(console.error);
  };

  const handlePlanDelete = (plan_id) => {
    axios
      .delete(`${baseURL}plan?id=${plan_id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      })
      .then(() => setPlans((prev) => prev.filter((p) => p.id !== plan_id)))
      .catch(console.error);
  };

  const handlePlanEdit = (plan) => {
    axios.put(`${baseURL}plan/edit?plan_id=${plan.id}`, plan, {
      headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
    }).then(() => {
      setPlans((prev) => prev.map((p) => (p.id === plan.id ? plan : p)));
    }).catch(console.error);
  };

  const handleImageUpload = async (type, event) => {
    const image = event.target.files[0];
    if (!image) return;
    try {
      const [url] = await uploadFiles([image], "profiles");
      if (type === "cover") {
        setCoverUrl(url);
        setItemBasic((p) => ({ ...p, cover_pic: url }));
      } else {
        setItemBasic((p) => ({ ...p, profile_pic: url }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = () => {
    setIsEditingBasic(false);
    axios
      .put(`${baseURL}user?id=${itemBasic.id}`, itemBasic, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      })
      .catch(console.error);
  };

  return (
    <div className="min-h-screen bg-surface dark:bg-[#100e07] text-on-surface dark:text-[#fff9eb]">
      <SideBar theme={theme} toggleTheme={toggleThemeMode} />

      <main className="pt-24 pb-16 px-6 md:px-12 max-w-5xl mx-auto">

        {/* ── Profile Header ── */}
        <section className="mb-14">

          {/* Cover banner — only shown if explicitly uploaded */}
          {coverUrl && (
            <div className="relative w-full h-40 rounded-xl overflow-hidden mb-6">
              <img src={coverUrl} alt="Cover" className="w-full h-full object-cover" />
              {isEditingBasic && (
                <label className="absolute top-3 right-3 bg-surface/80 backdrop-blur-sm text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded cursor-pointer hover:bg-surface transition-colors flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">wallpaper</span>
                  Change
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload("cover", e)} />
                </label>
              )}
            </div>
          )}

          {/* Name + avatar row */}
          <div className="flex items-center gap-4 mb-4">
            {/* Small inline avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-outline/20 bg-surface-container">
                {itemBasic.profile_pic
                  ? <img src={itemBasic.profile_pic} alt="Profile" className="w-full h-full object-cover" />
                  : <span className="material-symbols-outlined text-2xl text-outline w-full h-full flex items-center justify-center">account_circle</span>
                }
              </div>
              {isEditingBasic && (
                <label className="absolute -bottom-1 -right-1 bg-primary text-on-primary rounded-full p-0.5 cursor-pointer hover:bg-primary-dim transition-colors shadow">
                  <span className="material-symbols-outlined text-[12px]">photo_camera</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload("profile", e)} />
                </label>
              )}
            </div>

            {/* Name */}
            {isEditingBasic ? (
              <div className="flex flex-wrap gap-2">
                <input
                  className="bg-surface-container dark:bg-[#1a1710] border border-outline/30 focus:border-primary rounded-lg px-3 py-1.5 text-sm text-on-surface dark:text-[#fff9eb] outline-none transition-all"
                  value={itemBasic.first_name || ""}
                  placeholder="First name"
                  onChange={(e) => setItemBasic((p) => ({ ...p, first_name: e.target.value }))}
                />
                <input
                  className="bg-surface-container dark:bg-[#1a1710] border border-outline/30 focus:border-primary rounded-lg px-3 py-1.5 text-sm text-on-surface dark:text-[#fff9eb] outline-none transition-all"
                  value={itemBasic.last_name || ""}
                  placeholder="Last name"
                  onChange={(e) => setItemBasic((p) => ({ ...p, last_name: e.target.value }))}
                />
              </div>
            ) : (
              <h1 className="text-4xl md:text-5xl font-light tracking-tight leading-tight" style={{ fontFamily: "'Newsreader', serif" }}>
                {itemBasic.first_name}{" "}
                <span className="italic text-primary">{itemBasic.last_name}</span>
              </h1>
            )}
          </div>

          {/* Actions row */}
          <div className="flex items-center gap-2 flex-wrap">
            {!isEditingBasic ? (
              <button
                onClick={() => setIsEditingBasic(true)}
                className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 border border-outline/30 rounded-full hover:border-primary hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">edit</span>
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 bg-primary text-on-primary rounded-full hover:bg-primary-dim transition-colors"
                >
                  <span className="material-symbols-outlined text-[14px]">save</span>
                  Save
                </button>
                <button
                  onClick={() => setIsEditingBasic(false)}
                  className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 border border-outline/30 rounded-full hover:border-error hover:text-error transition-colors"
                >
                  Cancel
                </button>
                {!coverUrl && (
                  <label className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 border border-outline/30 rounded-full hover:border-primary hover:text-primary transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-[14px]">wallpaper</span>
                    Add Cover Photo
                    <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload("cover", e)} />
                  </label>
                )}
              </>
            )}
            <a
              href="#plans"
              className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 border border-outline/30 rounded-full hover:border-primary hover:text-primary transition-colors no-underline"
            >
              <span className="material-symbols-outlined text-[14px]">slideshow</span>
              View Plans
            </a>
          </div>
        </section>

        {/* ── Plans Section ── */}
        <section id="plans">
          <div className="flex items-baseline justify-between mb-8">
            <h2 className="text-3xl italic" style={{ fontFamily: "'Newsreader', serif" }}>
              My Journeys
            </h2>
            <div className="h-px flex-1 mx-6 bg-outline-variant/30 hidden sm:block" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
              {plans.length} {plans.length === 1 ? "Plan" : "Plans"}
            </span>
          </div>

          {plans.length === 0 ? (
            <div className="text-center py-20 text-on-surface-variant">
              <span className="material-symbols-outlined text-5xl opacity-30 block mb-4">map</span>
              <p className="text-sm">No plans yet. Start your first journey!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {plans.map((plan) => (
                <PlanCard
                  key={plan.id}
                  plan={plan}
                  togglePublic={handleTogglePublic}
                  deletePlan={handlePlanDelete}
                  editPlan={handlePlanEdit}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Profile;
