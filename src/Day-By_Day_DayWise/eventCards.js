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

const EventCards = (props) => {
  const classes = useStyles();
  const cardsData = props.item;
  const [placeItem, setPlaceItem] = useState(null);


  useEffect(() => {
    if (cardsData.event == null) return;

    axios.get(`${baseURL}public/place?id=${cardsData.event.place_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((resp) => {
        setPlaceItem(resp.data);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  }, []);

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
          <Grid container spacing={5}>


            {cardsData.journey && (
              <Grid item>
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
                    marginTop: "10%",
                    // textAlign: "center",
                  }}
                >
                  From {cardsData.journey.from}
                </Typography>

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
                  Approx Distance: {cardsData.journey.distance} km
                  <br />
                  Approx Time: {cardsData.journey.est_time} mins
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
                  To {cardsData.journey.to}
                </Typography>
                <br />
                <Typography
                  variant="body2"
                  color="text.secondary"
                  gutterBottom
                  component="div"
                  style={{
                    //fontFamily: "Special Elite",
                    fontSize: "100%",
                    color: "black",

                    // textAlign: "center",
                  }}
                ></Typography>
              </Grid>
            )}

            {placeItem && (
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
                    //marginTop: "10%",
                    // textAlign: "center",
                  }}
                >
                  <b> {placeItem.title}</b>
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
                  {" "}
                  <ScheduleOutlined
                    style={{
                      color: "black",
                      marginTop: "2%",
                      fontSize: "100%",
                      textAlign: "center",
                    }}
                  />
                  {timeformat.formatTime(cardsData.event.start_time)} to{" "}
                  {timeformat.formatTime(cardsData.event.end_time)}
                </Typography>
              </Grid>
            )}

            {cardsData.event && placeItem && (
              <Grid item>
                <Link to={`/PlaceDetails/${cardsData.event.place_id}`}>
                  <ButtonBase sx={{ width: "70%", height: "70%" }}>
                    <img
                      style={{
                        width: "110%",
                        //height: "100%",
                        marginLeft: "40%",
                        marginTop: "5%",
                        //textAlign: "right",
                      }}
                      alt="place_image"
                      src={placeItem.images}
                    />
                  </ButtonBase>
                </Link>
              </Grid>
            )}

          </Grid>
        </Card>
      </div >
    </div >
  );
};

export default EventCards;
