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
const dateformat = require("../formatDate");
// require("dotenv").config();

// const baseURL = process.env.BASE_URL;

const baseURL = process.env.REACT_APP_BASE_URL;

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
  const { plan_id, dayStart, totalDays, day } = useParams();
  const classes = useStyles(parseInt(day) - 1);
  const [day_int, setDay] = useState(parseInt(day));
  
  const day_start = dateformat.formatDate(dayStart);
  const  dayStartObj=new Date(day_start)
  const today = new Date();
  today.setDate(dayStartObj.getDate() + (day_int - 1));
  console.log("today" + today);

  const dateString = today.toLocaleDateString();

  const [itemBasic, setItemBasic] = useState([]);
  const dayChangeHandler = (event) => {
    if (event.target.id === "nextday") {
      setDay((prevDay) => prevDay + 1);
      window.history.replaceState(
        null,
        null,
        `/DaywisePlan/${plan_id}/${dayStart}/${totalDays}/${day_int +1 }`
      );
    } else if(event.target.id === "prevday") {
      setDay((prevDay) => prevDay - 1);
      window.history.replaceState(
        null,
        null,
        `/DaywisePlan/${plan_id}/${dayStart}/${totalDays}/${day_int -1 }`
      );
    }
  };

  useEffect(() => {
    axios.get(`${baseURL}event?plan_id=${plan_id}&day=${day_int}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((resp) => {
        setItemBasic(resp.data);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  }, [day_int]);
  console.log("this has been called");
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
            Day {day_int} : {dateString}
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
                    <RestaurantCard
                      item={item}
                      className={classes.cardrestaurant}
                    />
                  </Grid>
                </Grid>
              ) : (
                {
                  /* "Going back" */
                }
              )}
            </Grid>
          ))}
          {day_int > 1 && 
            <Button
              id="prevday"
              onClick={dayChangeHandler}
              className={classes.btn}
            >
              Previous day
            </Button>
}
          {day_int < parseInt(totalDays) ? (
            <Button
              id="nextday"
              onClick={dayChangeHandler}
              className={classes.btn}
            >
              Next day
            </Button>
          ) : (
            <Button className={classes.btn}>Finish</Button>
          )}
          <Link to={`/Blog/${plan_id}`}>
              <Button
                size="small"
                className={classes.btn}
              >
               Go to Blog
              </Button>
            </Link>

            <Link to={`/Explore/${plan_id}`}>
              <Button
                size="small"
                className={classes.btn}
              >
               Go to Explore
              </Button>
            </Link>
            <Link to={`/ExploreNearbyRegions/${plan_id}`}>
              <Button
                size="small"
                className={classes.btn}
              >
                Go to Explore Nearby Regions
              </Button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default DaywisePlan;
