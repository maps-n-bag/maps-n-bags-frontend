import React from "react";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import CardActions from "@mui/material/CardActions";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import PlaceCard from "./placecard4";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

import axios from "axios";

import { makeStyles } from "@mui/styles";
import SideBar from "../App drawer/sideBar";
import { ScheduleOutlined } from "@mui/icons-material";

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
    height: "100%",
  },
});

const ContentCards = (props) => {
  const classes = useStyles();
  const cardsData = [props.item];

  return (
    <div className={classes.places}>
      <div className={classes.postcard}>
        {/* <img src={img_arr} alt="Image" className={classes.img} /> */}
        <Grid
          container
          spacing={2}
          style={{
            width: "50%",
            // marginLeft: "7%",
            color: "ffffff",
            marginTop: "1%",
          }}
        >
          {cardsData.map((card) => (
            <Grid item key={card.place_id} xs={12} sm={6} md={5} lg={5}>
              <Card>
                <CardContent>
                  <ScheduleOutlined
                    style={{
                      color: "black",
                      marginTop: "6%",
                      // textAlign: "center",
                    }}
                  />
                  <Typography
                    variant="head"
                    style={{
                      fontFamily: "Special Elite",
                      fontSize: "100%",
                      color: "black",
                      //marginLeft: "6%",
                      // textAlign: "center",
                    }}
                  >
                    {" "}
                    {timeformat.formateTime(String(card.start_time))} to{" "}
                    {timeformat.formateTime(String(card.end_time))}
                  </Typography>

                  <PlaceCard item={card.place_id} />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default ContentCards;
