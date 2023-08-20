import React from "react";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import DayCards from "./daycards2";
import CardActions from "@mui/material/CardActions";
import { Grid, Card, CardContent, Typography } from "@mui/material";

import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

import axios from "axios";

import { makeStyles } from "@mui/styles";
import SideBar from "../App drawer/sideBar";

const baseURL = "maps-n-bags.onrender.com/api/";
// require("dotenv").config();

// const baseURL = process.env.BASE_URL;
const useStyles = makeStyles({
  places: {
    height: "90%",
    width: "112%",
    backgroundColor: "rgba(250, 233, 171, 0.78)",

    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },

  postcard: {
    //height: "100%",
    width: "95%",
    Height: "50%",
    marginLeft: "15%",
    // marginRight: "20%",
    marginBottom: "15%",
  },
  day: {
    marginTop: "5%",
    //marginBottom: "10%",
    marginLeft: "5%",
  },
});

const DaybyDay = () => {
  const classes = useStyles();
  // const { id } = useParams();
  const [itemBasic, setItemBasic] = useState([]);
  useEffect(() => {
    fetch(`${baseURL}event/?plan_id=1`)
      .then((resp) => resp.json())
      .then((resp) => {
        setItemBasic(resp);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  }, []);

  return (
    <div className={classes.places}>
      <SideBar />

      <div className={classes.postcard}>
        {itemBasic.map((subArray, index) => (
          <div key={index} className={classes.cardHeader}>
            <div className={classes.day}>
              {/* <Typography
                variant="head"
                style={{
                  fontFamily: "Special Elite",
                  fontSize: "200%",
                  color: "black",
                  //marginLeft: "6%",
                  // textAlign: "center",
                }}
              >
                Day {subArray.event.id}
              </Typography> */}
              <DayCards key={subArray.event.id} item={subArray.event} />
              {/* <Button className={classes.btn}>Next day</Button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DaybyDay;
