import React from "react";
import { Link } from "react-router-dom";
import ActivityCard from "./activityCard";
import { PLACE_PLACEHOLDER } from "../utils/placeholders";

const ContentForActivity = ({ item, addList, region_id, setRegions }) => {
  const { id, title, rating, rating_count, images, activities } = item;

  return (
    <div className="rounded-xl bg-surface-container border border-outline/10 overflow-hidden w-52 flex-shrink-0">
      <div className="h-32 overflow-hidden bg-surface">
        <img
          src={images?.[0] || PLACE_PLACEHOLDER}
          alt={title}
          onError={(e) => { e.target.src = PLACE_PLACEHOLDER; }}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-3">
        <Link to={`/PlaceDetails/${id}`} className="no-underline">
          <h4 className="text-sm font-semibold text-on-surface hover:text-primary transition-colors leading-tight mb-1">
            {title}
          </h4>
        </Link>
        <p className="text-xs text-on-surface-variant mb-2">
          ⭐ {rating} ({rating_count})
        </p>
        <div className="border-t border-outline/10 pt-2 space-y-0.5">
          {activities?.map((ac, idx) => (
            <ActivityCard
              key={idx}
              item={ac}
              place_id={id}
              setAddList={addList}
              region_id={region_id}
              setRegions={setRegions}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentForActivity;
