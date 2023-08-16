import React from "react";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import { Grid, Card, CardContent, Typography } from "@mui/material";

import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

import axios from "axios";
import ContentCards from "./contentCards";
import { makeStyles } from "@mui/styles";
import SideBar from "../App drawer/sideBar";

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
    marginLeft: "10%",
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

const PlaceDetails = () => {
  const classes = useStyles();
  const { id } = useParams();
  // const cardsData = props.item;

  //const id = cardsData;
  console.log(id);
  const [itemBasic, setItemBasic] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8080/place/?id=${id}`)
      .then((resp) => resp.json())
      .then((resp) => {
        //console.log(resp.place);
        const plan_arr = [resp.place.data];
        setItemBasic(plan_arr);
        console.log(plan_arr);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  }, []);

  //   const name_arr = itemBasic.name;

  //   const des_arr = itemBasic.description;
  //const im = [itemBasic.images];
  // console.log(im);
  const img_arr = itemBasic.map((place, index) => place.images);
  const name_arr = itemBasic.map((place, index) => place.name);
  const des_arr = itemBasic.map((place, index) => place.description);
  //console.log(img_arr);

  return (
    <div className={classes.places}>
      <SideBar />
      <div className={classes.postcard}>
        {/* <img src={img_arr} alt="Image" className={classes.img} /> */}
        <Card
          className={classes.cardimg}
          style={{
            fontFamily: "Special Elite",
            width: "46%",
            marginLeft: "7%",
            color: "ffffff",
            marginTop: "4.5%",
          }}
        >
          <CardContent>
            <Grid container spacing={2}>
              {/* <div className={classes.divider} /> */}
              <Grid item xs={6}>
                {img_arr.map((img, index) => (
                  <li key={index}>
                    <img
                      src={img}
                      style={{ width: "90%", height: "70%", marginLeft: "2%" }}
                      // Adjust the percentage value as needed
                    />
                  </li>
                ))}

                <Typography
                  variant="head"
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "150%",
                    color: "black",
                    marginLeft: "8%",
                    // textAlign: "center",
                  }}
                >
                  {" "}
                  {name_arr}
                </Typography>
              </Grid>{" "}
              <Typography
                variant="head"
                style={{
                  fontSize: "120%",
                  color: "black",
                  marginLeft: "6%",
                  marginTop: "6%",
                  // textAlign: "center",
                }}
              >
                {" "}
                <b>Description: </b>
                {des_arr}
              </Typography>
            </Grid>
          </CardContent>
          <CardActions>
            {/* <Button size="small">Learn More</Button> */}
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default PlaceDetails;
