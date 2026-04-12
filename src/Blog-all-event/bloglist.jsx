import React, { useEffect, useState } from "react";
import axios from "axios";
import SideBar from "../App drawer/sideBar";
import BloglistCard from "./blogListCard";
import { useThemeContext } from "../ThemeContext";

const baseURL = import.meta.env.VITE_BASE_URL;

const Bloglist = () => {
  const user_id = localStorage.getItem("userId");
  const { theme, toggleThemeMode } = useThemeContext();
  const [itemBasic, setItemBasic] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}plan/all?user_id=${user_id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      })
      .then((resp) => setItemBasic(resp.data))
      .catch(console.error);
  }, [user_id]);

  return (
    <div className="min-h-screen bg-surface dark:bg-[#100e07] text-on-surface dark:text-[#fff9eb]">
      <SideBar theme={theme} toggleTheme={toggleThemeMode} />

      <main className="pt-24 pb-16 px-6 md:px-12 max-w-4xl mx-auto">
        <div className="mb-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-3">Journey Journal</p>
          <h1 className="text-5xl font-light tracking-tight" style={{ fontFamily: "'Newsreader', serif" }}>
            Your <span className="italic text-primary">Blogs</span>
          </h1>
        </div>

        {itemBasic.length === 0 ? (
          <div className="text-center py-20 text-on-surface-variant">
            <span className="material-symbols-outlined text-5xl opacity-30 block mb-4">menu_book</span>
            <p className="text-sm">No blogs yet. Complete a plan to generate your first journal entry.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {itemBasic.map((item) => (
              <BloglistCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Bloglist;
