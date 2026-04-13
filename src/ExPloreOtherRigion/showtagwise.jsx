import React from "react";
import ContentForActivity from "./contentforactivitycard";

const TagWise = ({ item, addedList, region_id, region_name, setRegions }) => {
  const placesOfATag = item.places;

  return (
    <div className="mb-6">
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-3">
        {item.tag_name} <span className="text-on-surface-variant font-normal normal-case tracking-normal">at {region_name}</span>
      </p>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {placesOfATag.map((place, idx) => (
          <ContentForActivity
            key={idx}
            item={place}
            addList={addedList}
            region_id={region_id}
            setRegions={setRegions}
          />
        ))}
      </div>
    </div>
  );
};

export default TagWise;
