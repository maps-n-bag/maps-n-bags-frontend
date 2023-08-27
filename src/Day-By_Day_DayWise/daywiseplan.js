import React from "react";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import CardActions from "@mui/material/CardActions";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import EventCards from "./eventCards";
import RestaurantCard from "./restaurant";
import axios from "axios";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import SideBar from "../App drawer/sideBar";
import { da } from "date-fns/locale";
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
  cardrestaurant: {
    maxWidth: "50%",
  },
  btn: {
    height: "70%",
    marginTop: "10%",
  },
});

const DaywisePlan = () => {
  const { dayStart, totalDays, id } = useParams();
  const classes = useStyles((parseInt(id) - 1));
  const [day_int, setDay] = useState(1);
  // const day_start = dateformat.formateDate(dayStart);
  // const today = new Date(day_start) + parseInt(id) - 1;
  const day_start = dateformat.formateDate(dayStart);
  const today = new Date(day_start+(+day_int - 1));
  const next_id = parseInt(id) + 1;

  const [itemBasic, setItemBasic] = useState([]);
  const dayChangeHandler = (event) => {
    if(event.target.id==="nextday"){
      console.log("Next day added by azgor");
      setDay((prevDay) => prevDay + 1);
    }
  }

  useEffect(() => {
    fetch(`${baseURL}event?plan_id=1&day=${day_int}`)
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        console.log("Day int is: ", day_int);
        setItemBasic(resp);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  }, [day_int]);
  console.log("this has been called")
  console.log(itemBasic);

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
                <Grid item container spacing={10}>
                {/* Use Grid items to contain each card */}
                <Grid item>
                  <EventCards item={item} className={classes.cardday} />
                </Grid>
                <Grid item>
                  <RestaurantCard item={item} className={classes.cardrestaurant} />
                </Grid>
              </Grid>
              ) : (
                {
                  /* "Going back" */
                }
              )}
            </Grid>
          ))}

          {parseInt(id) < parseInt(totalDays) ? (
            // <Link to={`/DaywisePlan2/${dayStart}/${totalDays}/${next_id}`}>
            //   <Button className={classes.btn}>Next day</Button>
            // </Link>
            <Button id="nextday" onClick={dayChangeHandler} className={classes.btn}>Next day</Button>
          ) : (
            <Button className={classes.btn}>Finish</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DaywisePlan;
