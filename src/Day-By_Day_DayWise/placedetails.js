import React from "react";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import { Grid, Card, CardContent, Typography } from "@mui/material";

import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

import axios from "axios";

import { makeStyles } from "@mui/styles";
import SideBar from "../App drawer/sideBar";
const baseURL = "https://maps-n-bags.onrender.com/api/";

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
  //console.log(id);
  const [itemBasic, setItemBasic] = useState([]);
  useEffect(() => {
    fetch(`${baseURL}public/place?id=${id}`)
      .then((resp) => resp.json())
      .then((resp) => {
        //console.log(resp.place);

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
        {/* <img src={img_arr} alt="Image" className={classes.img} /> */}
        <Card
          className={classes.cardimg}
          style={{
            // fontFamily: "Special Elite",
            width: "46%",
            marginLeft: "7%",
            color: "ffffff",
            marginTop: "4.5%",
          }}
        >
          <CardContent>
            <Grid container spacing={5}>
              {/* <div className={classes.divider} /> */}
              <Grid item xs={10} sm container>
                <img
                  src={itemBasic.images}
                  style={{ width: "90%", height: "80%", marginLeft: "2%" }}
                  // Adjust the percentage value as needed
                />

                <Typography
                  variant="head"
                  style={{
                    //fontFamily: "Special Elite",
                    fontSize: "150%",
                    color: "black",
                    //marginLeft: "1%",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  {itemBasic.title}
                </Typography>
              </Grid>{" "}
              <Grid item xs sm container>
                <Typography
                  variant="head"
                  style={{
                    fontSize: "120%",
                    color: "black",
                    marginLeft: "6%",
                    marginTop: "10%",
                    // textAlign: "center",
                  }}
                >
                  {" "}
                  <b>Description: </b>
                  {itemBasic.description}
                </Typography>
                <br />
                <Typography
                  variant="head"
                  style={{
                    fontSize: "120%",
                    color: "black",
                    marginLeft: "6%",
                    marginTop: "20%",
                    // textAlign: "center",
                  }}
                >
                  {" "}
                  <b>Address: </b>
                  {itemBasic.address}
                </Typography>
                <br />
                <Typography
                  variant="head"
                  style={{
                    fontSize: "120%",
                    color: "black",
                    marginLeft: "6%",
                    marginTop: "20%",
                    // textAlign: "center",
                  }}
                >
                  {" "}
                  <b>Contact: </b>
                  {itemBasic.contact}
                </Typography>
                <br />
                <Typography
                  variant="head"
                  style={{
                    fontSize: "120%",
                    color: "black",
                    marginLeft: "6%",
                    marginTop: "20%",
                    // textAlign: "center",
                  }}
                >
                  {" "}
                  <b>Website: </b>
                  {itemBasic.website}
                </Typography>
              </Grid>
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
