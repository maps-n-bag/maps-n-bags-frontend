import React from "react";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import ScheduleIcon from "@mui/icons-material/Schedule";
import CardActions from "@mui/material/CardActions";
import { Grid, Card, CardContent, Typography } from "@mui/material";

import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

import axios from "axios";
import ContentCards from "./contentcards3";
import { makeStyles } from "@mui/styles";
import SideBar from "../App drawer/sideBar";
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

    // marginRight: "20%",
  },
  cardimg: {
    backgroundColor: "#ff5722",
    overflow: "hidden",
    marginBottom: "15%",
  },

  img: {
    height: "100%",
    position: "centre",
  },
  cardimg: {
    height: "100%",
  },
});

const DayCards = (props) => {
  const classes = useStyles();
  const cardsData = [props.item];
  console.log(cardsData);

  return (
    <div className={classes.places}>
      <div className={classes.postcard}>
        {cardsData.map((item) => (
          <ContentCards key={item.place_id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default DayCards;
