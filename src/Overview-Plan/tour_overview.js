import React from "react";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import SideBar from "../App drawer/sideBar";

const baseURL = "https://maps-n-bags.onrender.com/api/";
const dateformat = require("../formateDate");

const useStyles = makeStyles({
  places: {
    height: "90%",
    width: "112%",
    backgroundColor: "rgba(250, 233, 171, 0.78)",

    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  btn: {
    minWidth: "100%",
  },

  postcard: {
    //height: "100%",
    width: "95%",
    Height: "50%",
    marginLeft: "15%",
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

const Tour_overview = () => {
  // const id = localStorage.getItem("id");
  const [itemBasic, setItemBasic] = useState([]);

  const classes = useStyles();

  useEffect(() => {
    fetch(`${baseURL}plan?id=1`)
      .then((resp) => resp.json())
      .then((resp) => {
        setItemBasic(resp);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  }, []);

  console.log(dateformat.formateDate(String(itemBasic.start_date)));



  const name_arr = itemBasic.title;
  const date_st = dateformat.formateDate(itemBasic.start_date);
  const date_end = dateformat.formateDate(itemBasic.end_date);
  const des_arr = itemBasic.description;
  const img_arr = itemBasic.image;

  return (
    <div className={classes.places}>
      <SideBar />
      <div className={classes.postcard}>
        {/* <img src={img_arr} alt="Image" className={classes.img} /> */}
        <Card
          className={classes.cardimg}
          style={{
            width: "46%",
            marginLeft: "7%",
            color: "ffffff",
            marginTop: "4.5%",
          }}
        >
          <CardContent>
            {/* <Typography variant="h5">View Overview Plan</Typography> */}
            <img
              src={img_arr}
              // alt={name_arr}
              style={{ width: "90%", height: "80%", marginLeft: "5%" }}
              // Adjust the percentage value as needed
            />

            <Typography
              variant="head"
              style={{
                fontFamily: "Special Elite",
                fontSize: "200%",
                color: "black",
                marginLeft: "6%",
                // textAlign: "center",
              }}
            >
              {" "}
              {name_arr}
            </Typography>
            <Typography
              variant="body1"
              style={{
                fontSize: "100%",
                marginLeft: "6%",
                //textAlign: "center",
              }}
            >
              {" "}
              {date_st} to {date_end}
            </Typography>
            <Typography
              variant="body2"
              style={{
                fontSize: "100%",
                marginLeft: "6%",
                // textAlign: "center",
              }}
            >
              {" "}
              {des_arr}
            </Typography>
            <a href="/FullTour">
              <Button
                size="small"
                className={classes.btn}
                style={{
                  fontSize: "1em",
                  marginLeft: "70%",
                }}
              >
                View Full Tour Plan
              </Button>
            </a>
          </CardContent>
          <CardActions>

          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default Tour_overview;
