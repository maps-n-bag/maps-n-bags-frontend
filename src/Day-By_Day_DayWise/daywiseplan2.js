import React from "react";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import CardActions from "@mui/material/CardActions";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import EventCards from "./eventCards";
import axios from "axios";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import SideBar from "../App drawer/sideBar";
const dateformat = require("../formateDate");
const timeformat = require("../formateTime");
// require("dotenv").config();

// const baseURL = process.env.BASE_URL;

const baseURL = "https://maps-n-bags.onrender.com/api/";

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
  cardday: {
    maxWidth: "100%",
  },
});

const PlanDayOne = () => {
  const classes = useStyles();
  const { dayStart, totalDays, id } = useParams();
  // const day_start = dateformat.formateDate(dayStart);
  // const today = new Date(day_start)+ parseInt(id) -1;
  // console.log(today)

  const day_start = dateformat.formateDate(dayStart);
  const today = new Date(day_start);
  today.setDate(today.getDate() + (parseInt(id) - 1));
  console.log(today);

  const next_id = parseInt(id) + 1;

  const [itemBasic, setItemBasic] = useState([]);
  useEffect(() => {
    fetch(`${baseURL}event?plan_id=1&day=${id}`)
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        setItemBasic(resp);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  }, []);
  console.log(day_start);
  //const nextDay = new Date(dayStart) + id

  return (
    <div className={classes.places}>
      <SideBar />

      <div className={classes.postcard}>
        <div className={classes.day}>
          <Typography
            variant="head"
            style={{
              fontFamily: "Special Elite",
              fontSize: "200%",
              color: "black",
              //marginLeft: "6%",
              // textAlign: "center",
            }}
          >
            Day {id} : {today.toLocaleDateString()}
          </Typography>

          {itemBasic.map((item, index) => (
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
              spacing={10}
              style={{
                // width: "50%",
                // marginLeft: "7%",
                color: "ffffff",
                marginTop: "1%",
              }}
            >
              {item.event != null ? (
                <EventCards item={item} className={classes.cardday} />
              ) : (
                <Typography
                  variant="head"
                  style={{
                    fontSize: "200%",
                    color: "black",
                    marginLeft: "6%",
                    // textAlign: "center",
                  }}
                >
                  {/* Going Back */}
                </Typography>
              )}
            </Grid>
          ))}

          {parseInt(id) < parseInt(totalDays) ? (
            <Link to={`/DaywisePlan/${dayStart}/${totalDays}/${next_id}`}>
              <Button className={classes.btn}>Next day</Button>
            </Link>
          ) : (
            <Link to={`/Blog`}>
              <Button className={classes.btn}>Write your Blog</Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlanDayOne;
