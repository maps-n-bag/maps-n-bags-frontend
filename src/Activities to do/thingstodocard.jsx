import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import SideBar from "../App drawer/sideBar";
import TagBar from "./tagBar";
import TagWise from "./showtagwise";
import { useThemeContext } from "../ThemeContext";

const baseURL = import.meta.env.VITE_BASE_URL;

const getTagBool = (filter, tag_id) => {
  const match = filter.find((item) => item.id === tag_id);
  return match?.isShow ?? false;
};

const ThingsToDo = () => {
  const { plan_id } = useParams();
  const navigate = useNavigate();
  const { theme, toggleThemeMode } = useThemeContext();

  const [placeItem, setPlaceItem] = useState([]);
  const [addList, setAddList] = useState([]);
  const [removeList, setRemoveList] = useState([]);
  const [filter, setFilter] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}plan/explore?plan_id=${plan_id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      })
      .then((resp) => {
        setPlaceItem(resp.data);
        setFilter(
          resp.data.map((item) => ({ id: item.tag_id, name: item.tag_name, isShow: false }))
        );
      })
      .catch(console.error);
  }, [plan_id]);

  const handleUpdate = () => {
    axios
      .post(
        `${baseURL}plan/update?plan_id=${plan_id}`,
        { add: addList, remove: removeList, regions: [] },
        { headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` } }
      )
      .then(() => navigate(`/FullTour/${plan_id}`))
      .catch(console.error);
  };

  const hasActive = filter.some((t) => t.isShow);

  return (
    <div className="min-h-screen bg-surface dark:bg-[#100e07] text-on-surface dark:text-[#fff9eb]">
      <SideBar theme={theme} toggleTheme={toggleThemeMode} />

      <main className="pt-24 pb-20 px-6 md:px-12 max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-2">Explore</p>
          <h1
            className="text-5xl md:text-6xl font-light tracking-tight leading-none"
            style={{ fontFamily: "'Newsreader', serif" }}
          >
            Things to <span className="italic text-primary">Do</span>
          </h1>
          <p className="text-sm text-on-surface-variant mt-2">Activities and experiences at your destination.</p>
        </div>

        <div className="flex gap-8">
          {/* Sidebar filters */}
          <aside className="w-52 flex-shrink-0 hidden md:block">
            <div className="sticky top-24 rounded-2xl bg-surface-container border border-outline/10 p-5">
              <TagBar tags={filter} setTags={setFilter} />
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {!hasActive ? (
              <div className="text-center py-20 text-on-surface-variant">
                <p className="text-4xl mb-4">🎯</p>
                <p className="text-sm italic">Toggle a tag to browse activities.</p>
              </div>
            ) : (
              placeItem.map((pl, idx) =>
                getTagBool(filter, pl.tag_id) ? (
                  <TagWise
                    key={idx}
                    item={pl}
                    addedList={setAddList}
                    removedList={setRemoveList}
                  />
                ) : null
              )
            )}

            {(addList.length > 0 || removeList.length > 0) && (
              <div className="mt-10 flex justify-center">
                <button
                  onClick={handleUpdate}
                  className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest px-8 py-3 bg-primary text-on-primary rounded-full hover:opacity-90 transition-colors shadow-lg"
                >
                  <span className="material-symbols-outlined text-[16px]">save</span>
                  Update Plan
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ThingsToDo;
