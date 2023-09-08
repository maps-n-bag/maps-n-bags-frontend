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
const useStyles = makeStyles({
  places: {
    // height: "90%",
    // width: "112%",
    // backgroundColor: "rgba(250, 233, 171, 0.78)",
    // backgroundRepeat: "no-repeat",
    // backgroundSize: "cover",
  },
  btn: {
    minWidth: "100%",
  },

  postcard: {
    //height: "100%",
    width: "95%",
    Height: "50%",
    //marginLeft: "15%",
    // marginRight: "20%",
  },
  cardimg: {
    backgroundColor: "#ff5722",
    overflow: "hidden",
  },

  img: {
    height: "100%",
    position: "centre",
  },
  cardimg: {
    // height: "100%",
  },
});

const TagWise = (item) => {

  const classes = useStyles();
  //const { plan_id } = useParams();
  const tag_id = item.item.tag_id;
  const tag_title = item.item.tag_name;

  const placesOfATag = item.item.places;

  return (
    <div className={classes.places}>
      <div className={classes.postcard}>

      <Typography variant="h6" style={{marginLeft:"40%"}}>{tag_id} {tag_title}</Typography>
        {placesOfATag.map((place) => (
          <div>
          
            
              <ContentForActivity item={place} addList={item.addedList}  region_id={item.region_id} setRegions={item.setRegions} />
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagWise;
