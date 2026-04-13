import React from "react";
import ContentForActivity from "./contentforactivitycard";

const TagWise = ({ item, addedList, removedList }) => {
  const placesOfATag = item.places;

  return (
    <div className="mb-6">
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary mb-3">
        {item.tag_name}
      </p>
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {placesOfATag.map((pl, idx) => (
          <ContentForActivity
            key={idx}
            item={pl}
            addList={addedList}
            removeList={removedList}
          />
        ))}
      </div>
    </div>
  );
};

export default TagWise;
