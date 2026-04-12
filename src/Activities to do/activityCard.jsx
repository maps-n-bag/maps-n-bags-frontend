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
      setRemoveList((previous) => {
        let temp = previous.filter((activity) => {
          return activity.place_id != place_id || activity.activity_id != parseInt(event.target.value);
        });
        return temp;
      });

      setAddList((previous) => {
        return [...previous, { place_id: place_id, activity_id: parseInt(event.target.value) }];
      });
    }
    else if (event.target.id === "remove") {
      setAddList((previous) => {
        let temp = previous.filter((activity) => {
          return activity.place_id != place_id || activity.activity_id != parseInt(event.target.value);
        });
        return temp;
      });

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
          <Button onClick={Handler} id="remove" value={activity.id} size="small" color="error">
            Remove
          </Button>
        ) : (
          <Button onClick={Handler} id="add" value={activity.id} size="small" color="success">
            Add
          </Button>
        )}
      </Typography>
    </>
  );
};

export default ActivityCard;
