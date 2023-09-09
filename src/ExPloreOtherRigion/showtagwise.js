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

import { makeStyles } from "@mui/styles";
import SideBar from "../App drawer/sideBar";
import { ScheduleOutlined } from "@mui/icons-material";
import ContentForActivity from "./contentforactivitycard";
const baseURL = process.env.REACT_APP_BASE_URL;
const timeformat = require("../formatTime");

const TagWise = (item) => {
  const tag_title = item.item.tag_name;

  const placesOfATag = item.item.places;

  return (
    <Grid item container direction="column">
      <Grid item xs>
        <Typography
          variant="h4"
          style={{
            fontFamily: "Special Elite",
            fontSize: "130%",
            color: "black",
          }}
        >
          {tag_title}:
        </Typography>
      </Grid>
      <Grid item xs={10} container direction="row" spacing={2}>
        {placesOfATag.map((place) => (
          <ContentForActivity
            item={place}
            addList={item.addedList}
            region_id={item.region_id}
            setRegions={item.setRegions}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default TagWise;
