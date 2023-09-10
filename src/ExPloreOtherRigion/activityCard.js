import React from "react";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material";
import {
  Grid,
  Card,
  ButtonBase,
  Paper,
  CardContent,
  Typography,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import axios from "axios";


import SideBar from "../App drawer/sideBar";
import { ScheduleOutlined } from "@mui/icons-material";
import { set } from "date-fns";

const baseURL = process.env.REACT_APP_BASE_URL;
const timeformat = require("../formatTime");

const ActivityCard = (item) => {

  const place_id = item.place_id;
  const setAddList = item.setAddList;
  const activity = item.item;
  const setRegions = item.setRegions;

  const [in_plan, setInPlan] = useState(activity.in_plan);
  const Handler = (event) => {
    if (event.target.id === "add") {
      setAddList((previous) => {
        return [
          ...previous,
          { place_id: place_id, activity_id: parseInt(event.target.value) },
        ];
      });
      setRegions((previous) => {
        if (previous.includes(item.region_id)) {
          return previous;
        } else {
          return [...previous, item.region_id];
        }
      });
    } else if (event.target.id === "remove") {
      setAddList((previous) => {
        let temp = previous.filter((item) => {
          return item.activity_id !== parseInt(event.target.value);
        });
        return temp;
      });
    }
    setInPlan(!in_plan);
  };

  return (
    <div>
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
    </div>
  );
};

export default ActivityCard;
