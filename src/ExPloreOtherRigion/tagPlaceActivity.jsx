import React from "react";
import TagWise from "./showtagwise";

const getTagBool = (filter, tag_id) => {
  const match = filter.find((item) => item.id === tag_id);
  return match?.isShow ?? false;
};

const TagPlaceActivity = ({ item, filter, addedList, setRegions }) => {
  const placeItem = item.tags_places_activities;

  return (
    <>
      {placeItem.map((pl, idx) =>
        getTagBool(filter, pl.tag_id) ? (
          <TagWise
            key={idx}
            item={pl}
            addedList={addedList}
            region_id={item.region_id}
            region_name={item.region_name}
            setRegions={setRegions}
          />
        ) : null
      )}
    </>
  );
};

export default TagPlaceActivity;
