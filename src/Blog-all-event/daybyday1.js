import React from "react";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import DayCards from "./daycards2";
import CardActions from "@mui/material/CardActions";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";

import axios from "axios";

import { makeStyles } from "@mui/styles";
import SideBar from "../App drawer/sideBar";

const baseURL = process.env.REACT_APP_BASE_URL;
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
  const { plan_id } = useParams();
  const [itemBasic, setItemBasic] = useState([]);
  useEffect(() => {
    axios.get(`${baseURL}event?plan_id=${plan_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((resp) => {
        // console.log(resp);
        setItemBasic(resp.data);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  }, [plan_id]);

  // {
  //   itemBasic.map((sub, index) => sub.map((sub2, index) => console.log(sub2.journey)));
  // }
  return (
    <div className={classes.places}>
      <SideBar />

      <div className={classes.postcard}>
        {itemBasic.map((subArray, index) => (
          <div key={index} className={classes.cardHeader}>
            <div className={classes.day}>
              {/* day will be divided here */}
              Day {index +1 } 
              <DayCards key={index} item={subArray} />
              {/* <Button className={classes.btn}>Next day</Button> */}
            </div>
          </div>
        ))}
        <Link to={`/FullTour/${plan_id}`}>
              <Button
                size="small"
                className={classes.btn}
              >
                Go to Plan
              </Button>
            </Link>
      </div>
    </div>
  );
};

export default DaybyDay;
