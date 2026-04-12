import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useThemeContext } from "../ThemeContext";

const NAV_LINKS = [
  { label: "Discover", to: "/" },
  { label: "Others' Plans", to: "/OthersPlan" },
  { label: "Blog", to: "/AllBlog" },
  { label: "Create Plan", to: "/CreatePlan" },
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const userId = localStorage.getItem("userId");
  const userImage = localStorage.getItem("userImage");

  const handleLogout = () => {
    localStorage.clear();
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

          {/* Profile avatar */}
          {userId ? (
            <Link to={`/Profile/${userId}`} className="flex items-center" title="Profile">
              {userImage ? (
                <img
                  src={userImage}
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover border-2 border-primary/30 hover:border-primary transition-colors"
                />
              ) : (
                <span className="material-symbols-outlined text-primary dark:text-[#ffac9f] p-1 text-[26px]">
                  account_circle
                </span>
              )}
            </Link>
          ) : (
            <Link
              to="/Login"
              className="text-sm font-semibold text-primary dark:text-[#ffac9f] hover:underline"
            >
              Sign in
            </Link>
          )}

          {/* Logout (only when logged in) */}
          {userId && (
            <Link
              to="/"
              onClick={handleLogout}
              className="hidden md:inline-flex items-center gap-1 text-xs text-on-surface/50 dark:text-[#fff9eb]/50 hover:text-primary dark:hover:text-[#ffac9f] transition-colors ml-1"
              title="Logout"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
            </Link>
          )}

          {/* Mobile burger */}
          <button
            className="md:hidden material-symbols-outlined text-on-surface dark:text-[#fff9eb] p-2 text-[22px]"
            onClick={() => setMobileMenuOpen((v) => !v)}
          >
            {mobileMenuOpen ? "close" : "menu"}
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      {mobileMenuOpen && (
        <div className="fixed top-[57px] left-0 right-0 z-40 bg-[#fff9eb]/95 dark:bg-[#100e07]/95 backdrop-blur-xl border-b border-[#807b68]/10 py-4 px-6 flex flex-col gap-3 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileMenuOpen(false)}
              className="font-headline italic text-on-surface dark:text-[#fff9eb] hover:text-primary dark:hover:text-[#ffac9f] transition-colors py-1 text-lg"
              style={{ fontFamily: "'Newsreader', serif" }}
            >
              {link.label}
            </Link>
          ))}
          {userId && (
            <Link
              to="/"
              onClick={() => { handleLogout(); setMobileMenuOpen(false); }}
              className="font-headline italic text-on-surface/60 dark:text-[#fff9eb]/60 hover:text-primary transition-colors py-1 text-lg flex items-center gap-2"
              style={{ fontFamily: "'Newsreader', serif" }}
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              Logout
            </Link>
          )}
        </div>
      )}

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
