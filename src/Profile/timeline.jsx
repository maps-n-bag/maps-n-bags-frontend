import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { storage } from "../Firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import SideBar from "../App drawer/sideBar";
import PlanCard from "../Plan/planCard";
import { useThemeContext } from "../ThemeContext";

const baseURL = import.meta.env.VITE_BASE_URL;

const Profile = () => {
  const { user_id } = useParams();
  const [itemBasic, setItemBasic] = useState({});
  const [isEditingBasic, setIsEditingBasic] = useState(false);
  const [plans, setPlans] = useState([]);
  const [savingProfile, setSavingProfile] = useState(false);
  const { theme, toggleThemeMode } = useThemeContext();

  useEffect(() => {
    axios
      .get(`${baseURL}user?id=${user_id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      })
      .then((res) => {
        localStorage.setItem("userImage", res.data.profile_pic);
        setItemBasic(res.data);
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

  const handleImageUpload = (type, event) => {
    const image = event.target.files[0];
    if (!image) return;
    const storageRef = ref(storage, `${type}/${user_id}/${type}`);
    uploadBytes(storageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((downloadURL) => {
        if (type === "cover") setItemBasic((p) => ({ ...p, cover_pic: downloadURL }));
        else setItemBasic((p) => ({ ...p, profile_pic: downloadURL }));
      });
    }).catch(console.error);
  };

  const handleSave = () => {
    setSavingProfile(true);
    setIsEditingBasic(false);
    axios
      .put(`${baseURL}user?id=${itemBasic.id}`, itemBasic, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      })
      .then(() => setSavingProfile(false))
      .catch((e) => { console.error(e); setSavingProfile(false); });
  };

  return (
    <div className="min-h-screen bg-surface dark:bg-[#100e07] text-on-surface dark:text-[#fff9eb]">
      <SideBar theme={theme} toggleTheme={toggleThemeMode} />

      <main className="pt-24 pb-16 px-6 md:px-12 max-w-5xl mx-auto">

        {/* ── Profile Header ── */}
        <section className="mb-14">

          {/* Cover photo strip */}
          {itemBasic.cover_pic && (
            <div className="mt-8 w-full h-40 rounded-xl overflow-hidden">
              <img src={itemBasic.cover_pic} alt="Cover" className="w-full h-full object-cover" />
            </div>
          )}
          
           <div className="flex flex-col sm:flex-row items-start gap-8">
 
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-surface-container bg-surface-container">
                {itemBasic.profile_pic
                  ? <img src={itemBasic.profile_pic} alt="Profile" className="w-full h-full object-cover" />
                  : <span className="material-symbols-outlined text-5xl text-outline w-full h-full flex items-center justify-center">account_circle</span>
                }
              </div>
              {isEditingBasic && (
                <label className="absolute -bottom-1 -right-1 bg-primary text-on-primary rounded-full p-1 cursor-pointer hover:bg-primary-dim transition-colors shadow">
                  <span className="material-symbols-outlined text-[16px]">photo_camera</span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload("profile", e)} />
                </label>
              )}
            </div>
 
            {/* Name + meta */}
            <div className="flex-1 min-w-0">
              {isEditingBasic ? (
                <div className="flex flex-wrap gap-3 mb-3">
                  <input
                    className="bg-surface-container dark:bg-[#1a1710] border border-outline/30 focus:border-primary rounded-lg px-3 py-2 text-sm text-on-surface dark:text-[#fff9eb] outline-none transition-all"
                    value={itemBasic.first_name || ""}
                    placeholder="First name"
                    onChange={(e) => setItemBasic((p) => ({ ...p, first_name: e.target.value }))}
                  />
                  <input
                    className="bg-surface-container dark:bg-[#1a1710] border border-outline/30 focus:border-primary rounded-lg px-3 py-2 text-sm text-on-surface dark:text-[#fff9eb] outline-none transition-all"
                    value={itemBasic.last_name || ""}
                    placeholder="Last name"
                    onChange={(e) => setItemBasic((p) => ({ ...p, last_name: e.target.value }))}
                  />
                </div>
              ) : (
                <h1
                  className="text-5xl md:text-6xl font-light tracking-tight mb-1 leading-tight"
                  style={{ fontFamily: "'Newsreader', serif" }}
                >
                  {itemBasic.first_name}{" "}
                  <span className="italic text-primary">{itemBasic.last_name}</span>
                </h1>
              )}

              {/* Cover photo edit */}
              {isEditingBasic && (
                <label className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors cursor-pointer mt-1">
                  <span className="material-symbols-outlined text-[14px]">wallpaper</span>
                  Change cover photo
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload("cover", e)} />
                </label>
              )}

              <div className="flex items-center gap-3 mt-3">
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
            </div>
          </div>

        </section>

        {/* ── Plans Section ── */}
        <section id="plans">
          <div className="flex items-baseline justify-between mb-8">
            <h2
              className="text-3xl italic"
              style={{ fontFamily: "'Newsreader', serif" }}
            >
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
