import React from "react";
import { useState } from "react";
import { Typography } from "@mui/material";

import Button from "@mui/material/Button";

const ActivityCard = (item) => {
  const place_id = item.place_id;
  const setAddList = item.setAddList;
  const setRemoveList = item.setRemoveList;
  const activity = item.item;

  const [in_plan, setInPlan] = useState(activity.in_plan);
  const Handler = (event) => {
    if (event.target.id === "add") {
      setAddList((previous) => {
        return [...previous, { place_id: place_id, activity_id: parseInt(event.target.value) }];
      });
    }
    else if (event.target.id === "remove") {
      setRemoveList((previous) => {
        return [...previous, { place_id: place_id, activity_id: parseInt(event.target.value) }];
      });
    }
    setInPlan(!in_plan);
  };

  return (
    <>
      <Typography
        variant="body2"
      >
        {activity.title}
        {in_plan ? (
          <Button onClick={Handler} id="remove" value={activity.id} size="small">
            Remove
          </Button>
        ) : (
          <Button onClick={Handler} id="add" value={activity.id} size="small">
            Add
          </Button>
        )}
      </Typography>
    </>
  );
};

export default ActivityCard;
