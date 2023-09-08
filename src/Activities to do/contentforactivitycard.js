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
    fontFamily: "sans-serif",
    marginLeft: "50%",
    // marginRight: "20%",
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
  //const { plan_id } = useParams();
  const id = item.item.id;
  const title = item.item.title;
  const rating = item.item.rating;
  const rating_count = item.item.rating_count;
  const images = item.item.images;
  const activities = item.item.activities;

  const addHandle = (event) => {
    item.addList((previous) => {
      //console.log(previous);
      return [...previous, { place_id: id, activity_id: event.target.value }];
    });
  };

  //const places = item.places;

  //const [placeItem, setPlaceItem] = useState([]);

  //   useEffect(() => {
  //     axios
  //       .get(`${baseURL}plan/explore?plan_id=${plan_id}`, {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  //         },
  //       })
  //       .then((resp) => {
  //         console.log(resp.data);
  //         setPlaceItem(resp.data);
  //       })
  //       .catch((rejected) => {
  //         console.log(rejected);
  //       });
  //   }, [plan_id]);

  // console.log(placeItem);

  return (
    <div className={classes.places}>
      <div className={classes.postcard}>
        <Card
          className={classes.cardimg}
          style={{
            width: "80%",
            //marginLeft: "2%",
            marginTop: "5%",
            color: "fffff",
          }}
        >
          <Typography
            variant="h6"
            style={{ marginLeft: "5%", marginTop: "5%" }}
          >
            <b>{title} </b>
          </Typography>
          <br />
          <Typography
            variant="h6"
            style={{ marginLeft: "5%", marginTop: "5%" }}
          >
            {" "}
            Rating: {rating} ( count: {rating_count})
          </Typography>
          {images.map((img) => (
            <img
              src={img}
              // alt={name_arr}
              style={{ width: "85%", marginLeft: "5%" }}
              // Adjust the percentage value as needed
            />
          ))}
          <Typography
            variant="h6"
            style={{ marginLeft: "5%", marginTop: "5%" }}
          >
            Activity:
          </Typography>
          {activities.map((ac) => (
            <div>
              <Typography
                variant="h6"
                style={{ marginLeft: "5%", marginTop: "5%" }}
              >
                {" "}
                {ac.title}
                <Button onClick={addHandle} value={ac.id}>
                  Add
                </Button>
              </Typography>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

export default ContentForActivity;
