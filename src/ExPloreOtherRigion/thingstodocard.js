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

import TagWise from "./showtagwise";
import TagBar from "./tagBar";

import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import axios from "axios";

import { makeStyles } from "@mui/styles";
import SideBar from "../App drawer/sideBar";
import { ScheduleOutlined } from "@mui/icons-material";

const baseURL = process.env.REACT_APP_BASE_URL;
const timeformat = require("../formatTime");

const ThingsToDo = (props) => {
  const { plan_id } = useParams();
  const placeItem = props.item.tags_places_activities;

  const setAddList = props.addedList;
  const setRemoveList = props.removedList;
  const filter = props.filter;

  return (
    <div>
      {placeItem.map((pl) => (
        <Grid
          item
          // xs={12}
          container
          direction="column"
        >
          {getTagBool(filter, pl.tag_id) && (
            <TagWise
              item={pl}
              addedList={setAddList}
              region_id={props.item.region_id}
              setRegions={props.setRegions}
            />
          )}
        </Grid>
      ))}
    </div>
  );
};

const getTagBool = (filter, tag_id) => {
  let temp = filter.filter((item) => item.tag_id === tag_id);
  return temp[0].isShow;
};

export default ThingsToDo;
