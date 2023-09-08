import React from "react";
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import EventCards from "./eventCards";
import axios from "axios";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import SideBar from "../App drawer/sideBar";
import Paper from '@mui/material/Paper';
import { ButtonGroup } from "@mui/material";

const dateformat = require("../formatDate");
const baseURL = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles({
  places: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(250, 233, 171, 0.78)",

    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  day: {
    marginTop: "7%",
    marginLeft: "7%",
  },
});

const DaywisePlan = () => {
  const { plan_id, dayStart, totalDays, day } = useParams();
  const classes = useStyles();
  const [day_int, setDay] = useState(parseInt(day));

  const day_start = dateformat.formatDate(dayStart);
  const dayStartObj = new Date(day_start)
  const today = new Date();
  today.setDate(dayStartObj.getDate() + (day_int - 1));
  const dateString = today.toLocaleDateString();

  const [itemBasic, setItemBasic] = useState([]);
  const dayChangeHandler = (event) => {
    if (event.target.id === "nextday") {
      setDay((prevDay) => prevDay + 1);
      window.history.replaceState(
        null,
        null,
        `/DaywisePlan/${plan_id}/${dayStart}/${totalDays}/${day_int + 1}`
      );
    } else if (event.target.id === "prevday") {
      setDay((prevDay) => prevDay - 1);
      window.history.replaceState(
        null,
        null,
        `/DaywisePlan/${plan_id}/${dayStart}/${totalDays}/${day_int - 1}`
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

  return (
    <div className={classes.places}>

      <SideBar />

      <div className={classes.day}>

        <Typography variant="h4"
          style={{
            fontFamily: "Special Elite",
            fontSize: "200%",
            color: "black",
            textAlign: "center",
            marginBottom: "15px",
          }}
        >
          Day {day_int} : {dateString}
        </Typography>

        <div>
          {itemBasic.map((item, index) => (
            <EventCards key={index} item={item} />
          ))}
        </div>

        <div style={{ height: "100px", maxWidth: 900, margin: "auto" }}>
          <ButtonGroup variant="contained">
            {day_int > 1 && (
              <Button id="prevday" onClick={dayChangeHandler}> Previous Day </Button>
            )}
            {day_int < totalDays && (
              <Button id="nextday" onClick={dayChangeHandler}> Next Day </Button>
            )}
          </ButtonGroup>

          <Link to={`/Blog/${plan_id}`}>
            <Button> Blog </Button>
          </Link>
          <Link to={`/Explore/${plan_id}`}>
            <Button> Explore </Button>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default DaywisePlan;
