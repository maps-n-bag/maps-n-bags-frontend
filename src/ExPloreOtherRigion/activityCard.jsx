import React, { useState } from "react";

const ActivityCard = ({ item: activity, place_id, setAddList, setRegions, region_id }) => {
  const [inPlan, setInPlan] = useState(activity.in_plan);

  const handleToggle = () => {
    if (!inPlan) {
      setAddList((prev) => [...prev, { place_id, activity_id: activity.id }]);
      setRegions((prev) =>
        prev.includes(region_id) ? prev : [...prev, region_id]
      );
    } else {
      setAddList((prev) => prev.filter((a) => a.activity_id !== activity.id));
    }
    setInPlan(!inPlan);
  };

  return (
    <div className="flex items-center justify-between gap-2 py-1">
      <span className="text-xs text-on-surface">{activity.title}</span>
      <button
        onClick={handleToggle}
        className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full transition-colors flex-shrink-0 ${
          inPlan
            ? "bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-on-primary"
            : "border border-outline/30 text-on-surface-variant hover:border-primary hover:text-primary"
        }`}
      >
        {inPlan ? "✕ Remove" : "+ Add"}
      </button>
    </div>
  );
};

export default ActivityCard;
