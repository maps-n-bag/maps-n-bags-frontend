import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import NearbyRestaurant from "./nearbyRestaurant";
import SuggestionPlace from "./SuggetionPlace";
import * as timeformat from "../formatTime";
import { PLACE_PLACEHOLDER } from "../utils/placeholders";

const baseURL = import.meta.env.VITE_BASE_URL;

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

const getActivityBool = (place_id, activity_name, activityList, addList, removeList) => {
  if (!activityList.length) return false;
  if (addList.find((a) => a.place_id === place_id && a.name === activity_name)) return true;
  if (removeList.find((a) => a.place_id === place_id && a.name === activity_name)) return false;
  return !!activityList.find((a) => a.place_id === place_id && a.name === activity_name)?.is_selected;
};

const EventCards = (props) => {
  const cardsData = props.item;
  const plan_id = props.plan_id;
  const [placeItem, setPlaceItem] = useState({});
  const [restaurantSuggestion, setRestaurantSuggestion] = useState(false);
  const [suggestions, setSuggestions] = useState({});
  const [activityList, setActivityList] = useState([]);
  const [placeSuggestion, setPlaceSuggestion] = useState(false);

  const { setNeedToUpdate, setAddList, setRemoveList, addList, removeList } = props;

  const handleActivityToggle = (place_id, activity_name, activity_id) => {
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

  useEffect(() => {
    if (!cardsData.event?.place_id) return;
    axios
      .get(`${baseURL}public/place?id=${cardsData.event.place_id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      })
      .then((resp) => {
        setPlaceItem(resp.data);
        setActivityList([{
          name: cardsData.event.activity ?? "",
          place_id: cardsData.event.place_id,
          activity_id: cardsData.event.activity_id,
          is_selected: true,
        }]);
        setPlaceSuggestion(false);
      })
      .catch(console.error);
  }, [cardsData.event?.place_id]);

  useEffect(() => {
    if (!cardsData.event?.place_id) return;
    axios
      .get(`${baseURL}event/suggestion?plan_id=${plan_id}&event_id=${cardsData.event.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      })
      .then((resp) => {
        setSuggestions(resp.data);
        const list = [];
        resp.data.activities?.forEach((a) =>
          list.push({ name: a.title, place_id: cardsData.event.place_id, activity_id: a.id, is_selected: false })
        );
        resp.data.place?.activities?.forEach((a) =>
          list.push({ name: a.title, place_id: resp.data.place.id, activity_id: a.id, is_selected: false })
        );
        setActivityList((prev) => {
          const newOnes = list.filter(
            (a1) => !prev.find((a) => a.place_id === a1.place_id && a.name === a1.name)
          );
          return [...prev, ...newOnes];
        });
      })
      .catch(console.error);
  }, [cardsData.event?.place_id]);

  return (
    <div className="space-y-2">
      {/* Journey card */}
      {cardsData.journey && (
        <div className="flex items-center gap-4 px-4 py-3 rounded-xl bg-surface-container border border-outline/10">
          <span className="text-2xl flex-shrink-0">
            {cardsData.journey.journey_type === "car" ? "🚗" : "✈️"}
          </span>
          <div>
            <p className="text-sm font-semibold text-on-surface">
              {cardsData.journey.from} → {cardsData.journey.to}
            </p>
            <p className="text-xs text-on-surface-variant mt-0.5">
              ~{cardsData.journey.distance} km · ~{cardsData.journey.est_time} mins
            </p>
          </div>
        </div>
      )}

      {/* Event card */}
      {cardsData.event && (
        <div className="rounded-xl bg-surface-container border border-outline/10 overflow-hidden">
          <div className="flex gap-4 p-4">
            {/* Thumbnail */}
            <Link to={`/PlaceDetails/${cardsData.event.place_id}`} className="flex-shrink-0">
              <div className="w-20 h-20 rounded-lg overflow-hidden bg-surface border border-outline/10">
                <img
                  src={placeItem.images || PLACE_PLACEHOLDER}
                  alt={placeItem.title}
                  onError={(e) => { e.target.src = PLACE_PLACEHOLDER; }}
                  className="w-full h-full object-cover"
                />
              </div>
            </Link>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <Link to={`/PlaceDetails/${cardsData.event.place_id}`} className="no-underline">
                <h3 className="text-sm font-bold text-on-surface hover:text-primary transition-colors leading-snug">
                  {placeItem.title}
                </h3>
              </Link>
              <p className="text-xs text-on-surface-variant mt-0.5 line-clamp-2">{placeItem.description}</p>
              <p className="text-xs text-on-surface-variant mt-1">
                ⭐ {placeItem.rating}/5 · {placeItem.rating_count} votes
              </p>
            </div>

            {/* Time + toggles */}
            <div className="flex-shrink-0 flex flex-col items-end gap-1.5 text-right">
              <p className="text-xs font-mono text-on-surface-variant whitespace-nowrap">
                🕒 {timeformat.formatTime(cardsData.event.start_time)}–{timeformat.formatTime(cardsData.event.end_time)}
              </p>
              <button
                onClick={() => setRestaurantSuggestion(!restaurantSuggestion)}
                className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-outline/30 hover:border-primary hover:text-primary transition-colors"
              >
                {restaurantSuggestion ? "Hide" : "🍽"} Restaurant
              </button>
              <button
                onClick={() => setPlaceSuggestion(!placeSuggestion)}
                className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-outline/30 hover:border-primary hover:text-primary transition-colors"
              >
                {placeSuggestion ? "Hide" : "📍"} Nearby Place
              </button>
            </div>
          </div>

          {/* Activity pills */}
          {activityList.length > 0 && (
            <div className="px-4 pb-3 flex flex-wrap gap-1.5 border-t border-outline/10 pt-3">
              {activityList.map((activity, idx) => {
                const isActive = getActivityBool(activity.place_id, activity.name, activityList, addList, removeList);
                return (
                  <button
                    key={idx}
                    onClick={() => handleActivityToggle(activity.place_id, activity.name, activity.activity_id)}
                    className={`inline-flex items-center gap-1 text-[11px] font-semibold px-3 py-1 rounded-full transition-all ${
                      isActive
                        ? "bg-primary text-on-primary"
                        : "bg-surface border border-outline/30 text-on-surface-variant hover:border-primary hover:text-primary"
                    }`}
                  >
                    {activityIcons[activity.name] || "🎯"} {activity.name}
                    <span className="ml-0.5 opacity-70">{isActive ? "✕" : "+"}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      {restaurantSuggestion && cardsData.event && (
        <NearbyRestaurant place_id={cardsData.event.place_id} />
      )}
      {placeSuggestion && cardsData.event && suggestions.place && (
        <SuggestionPlace
          item={suggestions.place}
          activityList={activityList}
          setActivityList={setActivityList}
          setNeedToUpdate={setNeedToUpdate}
          setAddList={setAddList}
          setRemoveList={setRemoveList}
        />
      )}
    </div>
  );
};

export default EventCards;
