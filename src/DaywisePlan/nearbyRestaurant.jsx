import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { PLACE_PLACEHOLDER } from "../utils/placeholders";

const baseURL = import.meta.env.VITE_BASE_URL;

const NearbyRestaurant = ({ place_id }) => {
  const [place, setPlace] = useState(null);

  useEffect(() => {
    axios
      .get(`${baseURL}public/nearby/restaurant?place_id=${place_id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("accessToken")}` },
      })
      .then((resp) => setPlace(resp.data))
      .catch(console.error);
  }, [place_id]);

  if (!place) return null;

  return (
    <div className="flex gap-3 px-4 py-3 rounded-xl bg-surface border border-outline/20 ml-4">
      <div className="flex-shrink-0 text-xs font-bold uppercase tracking-widest text-primary self-start pt-0.5">
        🍽️ Nearby
      </div>
      <Link to={`/PlaceDetails/${place_id}`} className="flex-shrink-0">
        <div className="w-14 h-14 rounded-lg overflow-hidden bg-surface-container">
          <img src={place.images || PLACE_PLACEHOLDER} alt={place.title} onError={(e) => { e.target.src = PLACE_PLACEHOLDER; }} className="w-full h-full object-cover" />
        </div>
      </Link>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-on-surface leading-tight">{place.title}</p>
        <p className="text-xs text-on-surface-variant mt-0.5">
          ⭐ {place.rating}/5 · {place.rating_count} votes
        </p>
        <p className="text-xs text-on-surface-variant mt-0.5 line-clamp-1">{place.description}</p>
      </div>
    </div>
  );
};

export default NearbyRestaurant;
