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
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(250, 233, 171, 0.78)",

    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  postcard: {
    marginTop: "7%",
    marginLeft: "7%",
  },
  day: {
    marginBottom: "20px",
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
      setItemBasic(resp.data);
    })
      .catch((rejected) => {
        console.log(rejected);
      });
  }, [plan_id]);

  return (
    <div className={classes.places}>

      <SideBar />

      <div className={classes.postcard}>

        {itemBasic.map((subArray, index) => (
          <div key={index} className={classes.day}>
            <Typography variant="h4"
              style={{
                fontFamily: "Special Elite",
                color: "black",
                textAlign: "center",
                marginBottom: "20px",
              }}
            >
              Day {index + 1}
            </Typography>

            <DayCards key={index} item={subArray} />

          </div>
        ))}

        <div style={{ height: "100px", maxWidth: 900, margin: "auto" }}>
          <Link to={`/FullTour/${plan_id}`}>
            <Button variant="outlined" size="small">
              Go to Plan
            </Button>
          </Link>
          <Link to={`/GenerateBlog/${plan_id}/false`}>
            <Button variant="outlined" size="small">
              View Blog
            </Button>
          </Link>
          <Link to={`/GenerateBlog/${plan_id}/true`}>
            <Button variant="outlined" size="small">
              Publish Changes
            </Button>
          </Link>
        </div>

      </div>

    </div>
  );
};

export default DaybyDay;
