import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useThemeContext } from "../ThemeContext";

const NAV_LINKS = [
  { label: "Discover", to: "/", icon: "explore" },
  { label: "Blog", to: "/AllBlog", icon: "menu_book" },
  { label: "Create Plan", to: "/CreatePlan", icon: "add_circle" },
];

const THEMES = [
  { name: "Ethereal Chronicle", icon: "history_edu", active: true },
  { name: "Feature coming soon", icon: "forest", active: false },
  { name: "Feature coming soon", icon: "terrain", active: false },
  { name: "Feature coming soon", icon: "beach_access", active: false },
  { name: "Feature coming soon", icon: "location_city", active: false },
];

export default function SideBar() {
  const { isDark, toggleThemeMode } = useThemeContext();
  const [themeModalOpen, setThemeModalOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const userImage = localStorage.getItem("userImage");

  // Read fresh from localStorage whenever dropdown opens
  const getUserDisplay = () => {
    const username = localStorage.getItem("userName") || "";
    const first = localStorage.getItem("firstName") || "";
    const last = localStorage.getItem("lastName") || "";
    if (first) return { name: `${first}${last ? " " + last : ""}`, sub: username ? `@${username}` : null };
    if (username) return { name: username, sub: null };
    return { name: "Traveller", sub: null };
  };
  const userDisplay = getUserDisplay();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setProfileDropdownOpen(false);
    navigate("/Login");
  };

  return (
    <>
      {/* ── Top Navigation Bar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-[#fff9eb]/90 dark:bg-[#100e07]/90 backdrop-blur-xl border-b border-[#807b68]/10">
        {/* Left: Brand + Desktop Nav */}
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-2xl font-headline italic text-on-surface dark:text-[#fff9eb] hover:text-primary transition-colors select-none"
            style={{ fontFamily: "'Newsreader', serif" }}
          >
            Maps 'n Bags
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="font-headline italic text-[#363323]/70 dark:text-[#fff9eb]/70 hover:text-primary dark:hover:text-[#ffac9f] transition-colors text-sm tracking-tight"
                style={{ fontFamily: "'Newsreader', serif" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Action Icons */}
        <div className="flex items-center gap-2">
          {/* Palette / Theme switcher */}
          <button
            onClick={() => setThemeModalOpen(true)}
            className="material-symbols-outlined text-primary dark:text-[#ffac9f] p-2 rounded-full hover:bg-surface-container dark:hover:bg-[#363323] transition-colors text-[22px]"
            title="Switch theme"
          >
            palette
          </button>

          {/* Dark mode toggle */}
          <button
            onClick={toggleThemeMode}
            className="material-symbols-outlined text-primary dark:text-[#ffac9f] p-2 rounded-full hover:bg-surface-container dark:hover:bg-[#363323] transition-colors text-[22px]"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? "light_mode" : "dark_mode"}
          </button>

          {/* Profile avatar / dropdown */}
          {userId ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProfileDropdownOpen((v) => !v)}
                className="flex items-center focus:outline-none ml-1"
                title="Account"
              >
                {userImage ? (
                  <img
                    src={userImage}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover border-2 border-primary/30 hover:border-primary transition-colors"
                  />
                ) : (
                  <span className="material-symbols-outlined text-primary dark:text-[#ffac9f] text-[26px]">
                    account_circle
                  </span>
                )}
              </button>

              {/* Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-[#fff9eb] dark:bg-[#1a1710] rounded-xl shadow-2xl border border-[#807b68]/10 overflow-hidden z-50">
                  {/* User info */}
                  <div className="px-4 py-3 border-b border-[#807b68]/10">
                    <p className="text-sm font-semibold text-on-surface dark:text-[#fff9eb] truncate">{userDisplay.name}</p>
                    {userDisplay.sub && (
                      <p className="text-[11px] text-on-surface-variant dark:text-[#fff9eb]/50 truncate">{userDisplay.sub}</p>
                    )}
                  </div>
                  {/* Profile link */}
                  <Link
                    to={`/Profile/${userId}`}
                    onClick={() => setProfileDropdownOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-on-surface dark:text-[#fff9eb] hover:bg-surface-container dark:hover:bg-[#25231a] transition-colors no-underline"
                  >
                    <span className="material-symbols-outlined text-[18px] text-primary">person</span>
                    My Profile
                  </Link>
                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-error hover:bg-error/5 transition-colors border-t border-[#807b68]/10"
                  >
                    <span className="material-symbols-outlined text-[18px]">logout</span>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/Login"
              className="text-sm font-semibold text-primary dark:text-[#ffac9f] hover:underline ml-1"
            >
              Sign in
            </Link>
          )}
        </div>
      </nav>

      {/* ── Mobile Bottom Nav ── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-[#fff9eb]/95 dark:bg-[#100e07]/95 backdrop-blur-xl border-t border-[#807b68]/10 flex items-center justify-around px-2 py-1">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className="flex flex-col items-center gap-0.5 px-4 py-2 text-on-surface/60 dark:text-[#fff9eb]/60 hover:text-primary dark:hover:text-[#ffac9f] no-underline transition-colors"
          >
            <span className="material-symbols-outlined text-[22px]">{link.icon}</span>
            <span className="text-[9px] font-bold uppercase tracking-wide">{link.label}</span>
          </Link>
        ))}
        {userId && (
          <Link
            to={`/Profile/${userId}`}
            className="flex flex-col items-center gap-0.5 px-4 py-2 text-on-surface/60 dark:text-[#fff9eb]/60 hover:text-primary dark:hover:text-[#ffac9f] no-underline transition-colors"
          >
            {userImage ? (
              <img src={userImage} alt="" className="w-6 h-6 rounded-full object-cover" />
            ) : (
              <span className="material-symbols-outlined text-[22px]">account_circle</span>
            )}
            <span className="text-[9px] font-bold uppercase tracking-wide">Profile</span>
          </Link>
        )}
      </nav>

      {/* ── Theme Switcher Modal ── */}
      {themeModalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#363323]/40 backdrop-blur-sm"
          onClick={() => setThemeModalOpen(false)}
        >
          <div
            className="bg-[#fff9eb] dark:bg-[#1a1710] rounded-xl shadow-2xl p-6 w-[340px] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h2
                className="text-xl font-headline italic text-on-surface dark:text-[#fff9eb]"
                style={{ fontFamily: "'Newsreader', serif" }}
              >
                Choose a Theme
              </h2>
              <button
                onClick={() => setThemeModalOpen(false)}
                className="material-symbols-outlined text-on-surface/50 dark:text-[#fff9eb]/50 hover:text-primary transition-colors"
              >
                close
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {THEMES.map((t, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg border transition-colors ${
                    t.active
                      ? "border-primary bg-primary/5 text-on-surface dark:text-[#fff9eb]"
                      : "border-[#807b68]/20 text-on-surface/40 dark:text-[#fff9eb]/30 cursor-not-allowed"
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      t.active ? "text-primary" : "text-on-surface/30 dark:text-[#fff9eb]/20"
                    }`}
                  >
                    {t.icon}
                  </span>
                  <div className="flex-1">
                    {t.active ? (
                      <span className="text-sm font-semibold">{t.name}</span>
                    ) : (
                      <span className="text-sm italic">{t.name}</span>
                    )}
                  </div>
                  {t.active && (
                    <span className="material-symbols-outlined text-primary text-[16px]">
                      check_circle
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
