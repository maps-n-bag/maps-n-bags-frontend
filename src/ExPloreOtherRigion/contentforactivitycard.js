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
import ActivityCard from "./activityCard";

import { makeStyles } from "@mui/styles";
import SideBar from "../App drawer/sideBar";
import { ScheduleOutlined } from "@mui/icons-material";

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
    // width: "95%",
    // Height: "50%",
    // fontFamily: "sans-serif",
    // marginLeft: "50%",
    // marginTop: "20%",
  },
  cardimg: {
    backgroundColor: "#ff5722",
    overflow: "hidden",
    marginLeft: "15%",
  },

  img: {
    height: "100%",
    position: "centre",
  },
  cardimg: {
    // height: "100%",
  },
});

const ContentForActivity = (item) => {
  const classes = useStyles();
  const id = item.item.id;
  const title = item.item.title;
  const rating = item.item.rating;
  const rating_count = item.item.rating_count;
  const images = item.item.images;
  const activities = item.item.activities;

  return (
    <div>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <Card
          sx={{
            minWidth: 300,
            marginRight: "5%",
            marginTop: "15%",
            marginBottom: "15%",
          }}
        >
          {/* <CardMedia
            component="img"
            images={images}
          /> */}
          {/* {images.map((image) => (
            <img src={image} style={{maxHeight: "300px" , AlignItems: "center"}} />
          ))} */}

          <div style={{ display: "flex", justifyContent: "center" }}>
            {images.map((image, index) => (
              <img key={index} src={image} style={{ maxHeight: "300px" }} />
            ))}
          </div>

          <CardContent>
            <Typography variant="h6" style={{ marginLeft: "5%" }}>
              <b>{title} </b>
            </Typography>
            <br />
            <Typography variant="h6" style={{ marginLeft: "5%" }}>
              {" "}
              Rating: {rating} ( count: {rating_count})
            </Typography>
          </CardContent>
          <CardContent>
            <Typography variant="h6" style={{ marginLeft: "5%" }}>
              <b>Activity: </b>
              {activities.map((ac) => (
                <div>
                  <ActivityCard
                    item={ac}
                    place_id={id}
                    setAddList={item.addList}
                    region_id={item.region_id}
                    setRegions={item.setRegions}
                  />
                </div>
              ))}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default ContentForActivity;
