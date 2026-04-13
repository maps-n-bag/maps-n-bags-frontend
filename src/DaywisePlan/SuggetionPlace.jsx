import React from "react";
import { Link } from "react-router-dom";
import { PLACE_PLACEHOLDER } from "../utils/placeholders";

const activityIcons = {
  "Sight-seeing": "🏛️",
  "Shopping": "🛍️",
  "Eating": "🍽️",
  "Drinking": "🍺",
  "Clubbing": "🎉",
  "Gambling": "🎰",
  "Relaxing": "🛀",
  "Golfing": "⛳",
  "Hiking": "🥾",
  "Swimming": "🏊",
  "Fishing": "🎣",
  "Boating": "⛵",
  "Skiing": "🎿",
  "Hunting": "🔫",
  "Biking": "🚴",
};

const getActivityBool = (place_id, activity_name, activityList) => {
  return !!activityList.find((a) => a.place_id === place_id && a.name === activity_name)?.is_selected;
};

const SuggestionPlace = (props) => {
  const placeItem = props.item;
  const { setNeedToUpdate, setAddList, setRemoveList, setActivityList, activityList } = props;

  if (!placeItem) return null;

  const handleToggle = (place_id, activity_name, activity_id) => {
    let willBeSelected = false;
    setActivityList((prev) =>
      prev.map((a) => {
        if (a.place_id === place_id && a.name === activity_name) {
          const next = { ...a, is_selected: !a.is_selected };
          willBeSelected = next.is_selected;
          return next;
        }
        return a;
      })
    );
    setNeedToUpdate(true);
    if (willBeSelected) {
      setRemoveList((prev) => prev.filter((a) => !(a.place_id === place_id && a.activity_id === activity_id)));
      setAddList((prev) => [...prev, { place_id, activity_id }]);
    } else {
      setAddList((prev) => prev.filter((a) => !(a.place_id === place_id && a.activity_id === activity_id)));
      setRemoveList((prev) => [...prev, { place_id, activity_id }]);
    }
  };

  return (
    <div className="rounded-xl bg-surface border border-outline/20 overflow-hidden ml-4">
      <div className="flex gap-4 p-4">
        <Link to={`/PlaceDetails/${placeItem.id}`} className="flex-shrink-0">
          <div className="w-20 h-20 rounded-lg overflow-hidden bg-surface-container">
            <img src={placeItem.image || PLACE_PLACEHOLDER} alt={placeItem.title} onError={(e) => { e.target.src = PLACE_PLACEHOLDER; }} className="w-full h-full object-cover" />
          </div>
        </Link>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">📍 Nearby Place</p>
          <Link to={`/PlaceDetails/${placeItem.id}`} className="no-underline">
            <h4 className="text-sm font-bold text-on-surface hover:text-primary transition-colors">{placeItem.title}</h4>
          </Link>
          <p className="text-xs text-on-surface-variant mt-0.5">
            ⭐ {placeItem.rating}/5 · {placeItem.rating_count} votes
          </p>
          <p className="text-xs text-on-surface-variant mt-0.5 line-clamp-2">{placeItem.description}</p>
        </div>
      </div>

      {placeItem.activities?.length > 0 && (
        <div className="px-4 pb-3 flex flex-wrap gap-1.5 border-t border-outline/10 pt-3">
          {placeItem.activities.map((activity, idx) => {
            const isActive = getActivityBool(placeItem.id, activity.title, activityList);
            return (
              <button
                key={idx}
                onClick={() => handleToggle(placeItem.id, activity.title, activity.id)}
                className={`inline-flex items-center gap-1 text-[11px] font-semibold px-3 py-1 rounded-full transition-all ${
                  isActive
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container border border-outline/30 text-on-surface-variant hover:border-primary hover:text-primary"
                }`}
              >
                {activityIcons[activity.title] || "🎯"} {activity.title}
                <span className="ml-0.5 opacity-70">{isActive ? "✕" : "+"}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SuggestionPlace;
