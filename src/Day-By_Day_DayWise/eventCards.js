import React from "react";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
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

import axios from "axios";

import { makeStyles } from "@mui/styles";
import SideBar from "../App drawer/sideBar";
import { ScheduleOutlined } from "@mui/icons-material";
const baseURL = "https://maps-n-bags.onrender.com/api/";
const timeformat = require("../formateTime");
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

const EventCards = (props) => {
  const classes = useStyles();
  const cardsData = props.item;

  //console.log(cardsData.event.place_id);
  const [placeItem, setPlaceItem] = useState([]);

  useEffect(() => {
    if (cardsData.event != null) {
      fetch(`${baseURL}public/place?id=${cardsData.event.place_id}`)
        .then((resp) => resp.json())
        .then((resp) => {
          setPlaceItem(resp);
        })
        .catch((rejected) => {
          console.log(rejected);
        });
    }
  }, []);

  console.log(placeItem);

  return (
    <div className={classes.places}>
      <div className={classes.postcard}>
        <Card
          className={classes.cardimg}
          style={{
            width: "110%",
            marginLeft: "10%",
            marginTop: "5%",
            color: "fffff",
          }}
        >
          <Grid container spacing={5}>
            <Grid item xs={30} sm container>
              <Grid
                item
                xs
                container
                direction="column"
                spacing={2}
                sm={20}
                // md={20}
                // lg={15}
              >
                <Grid item>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    component="div"
                    sx={{ cursor: "pointer" }}
                    style={{
                      // fontFamily: "Special Elite",
                      fontSize: "110%",
                      color: "black",
                      marginLeft: "10%",
                      marginTop: "20%",
                      // textAlign: "center",
                    }}
                  >
                    {placeItem.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    gutterBottom
                    component="div"
                    style={{
                      //fontFamily: "Special Elite",
                      fontSize: "100%",
                      color: "black",
                      marginLeft: "10%",
                      //textAlign: "center",
                    }}
                  >
                    {placeItem.description}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                    component="div"
                    style={{
                      //fontFamily: "Special Elite",
                      fontSize: "100%",
                      color: "black",
                      marginLeft: "10%",
                      // textAlign: "center",
                    }}
                  >
                    Rating: {placeItem.rating}/5.0
                    <br /> (total votes: {placeItem.rating_count})
                  </Typography>
                </Grid>
                <Grid item>
                  <DirectionsCarIcon
                    style={{
                      //fontFamily: "Special Elite",
                      fontSize: "200%",
                      color: "black",
                      marginLeft: "10%",
                      // textAlign: "center",
                    }}
                  />
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                    component="div"
                    style={{
                      //fontFamily: "Special Elite",
                      fontSize: "100%",
                      color: "black",
                      marginLeft: "10%",
                      // textAlign: "center",
                    }}
                  >
                    {cardsData.journey.distance} km
                    {/* from{" "}
                    {(cardCount == 1 ? "main city" : "previous point")} */}
                  </Typography>
                </Grid>
              </Grid>
              {/* <Grid item>
                <Typography variant="subtitle1" component="div">
                  $19.00
                </Typography>
              </Grid> */}
            </Grid>
            <Grid item>
              <Link to={`/PlaceDetails/${cardsData.event.place_id}`}>
                <ButtonBase sx={{ width: "70%", height: "70%" }}>
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      //marginLeft: "14%",
                      marginTop: "15%",
                      //textAlign: "right",
                    }}
                    alt="place_image"
                    src={placeItem.images}
                  />
                </ButtonBase>
              </Link>
            </Grid>
          </Grid>
        </Card>
      </div>
    </div>
  );
};

export default EventCards;
