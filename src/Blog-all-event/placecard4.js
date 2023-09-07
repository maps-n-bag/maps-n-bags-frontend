import React from "react";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import { Grid, Card, CardContent, Typography } from "@mui/material";

import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

import axios from "axios";

import { makeStyles } from "@mui/styles";
import SideBar from "../App drawer/sideBar";
const baseURL = process.env.REACT_APP_BASE_URL;
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
    //marginLeft: "5%",
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

const PlaceCard = (props) => {
  const classes = useStyles();
  const cardsData = props.item;

  //const id = cardsData;
  //console.log(cardsData);
  const [itemBasic, setItemBasic] = useState([]);
  useEffect(() => {
    axios.get(`${baseURL}public/place?id=${cardsData}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((resp) => {
        setItemBasic(resp.data);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  }, []);

  return (
    <div className={classes.places}>
      <div className={classes.postcard}>
        {/* <a href="/PlaceDetails?id=${cardsData}"> */}
        <Link to={`/PlaceDetails/${cardsData}`}>
          <img
            src={itemBasic.images}
            // alt={name_arr}
            style={{ width: "95%", marginTop: "5%" }}
            // Adjust the percentage value as needed
          />{" "}
          <br/>
          {/* </a> */}
        </Link>
        <Typography
          variant="head"
          style={{
           // fontFamily: "Special Elite",
            fontSize: "100%",
            color: "black",
            marginTop: "8%",
            // textAlign: "center",
          }}
        >
          {" "}
          <b> {itemBasic.title} </b>
          <br />
        </Typography>
        <Typography
          variant="head"
          style={{
            //fontFamily: "Special Elite",
            fontSize: "100%",
            color: "black",
            marginTop: "8%",
            // textAlign: "center",
          }}
        >
          {" "}
          Rating: {itemBasic.rating}/5.0
        </Typography>
      </div>
    </div>
  );
};

export default PlaceCard;
