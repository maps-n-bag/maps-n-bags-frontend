import React from "react";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import ShowReview from "./showreview";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

import axios from "axios";

import { makeStyles } from "@mui/styles";
import SideBar from "../App drawer/sideBar";
const baseURL = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles({
  places: {
    backgroundColor: "rgba(250, 233, 171, 0.78)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "100vh",
  },

  postcard: {
    marginLeft: "20%",
    marginTop: "7%",
  },
});

const PlaceDetails = () => {
  const classes = useStyles();
  const { id } = useParams();
  //console.log(id);
  const [itemBasic, setItemBasic] = useState([]);

  const [review, setReview] = useState(false);
  useEffect(() => {
    axios
      .get(`${baseURL}public/place?id=${id}`, {
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
  }, []);

  useEffect(() => {
    axios
      .get(`${baseURL}public/place/review?place_id=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((resp) => {
        setReview(resp.data);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  }, []);

  console.log(review);

  return (
    <div className={classes.places}>
      <SideBar />
      <div className={classes.postcard}>
        {/* <img src={img_arr} alt="Image" className={classes.img} /> */}
        <Card
          style={{
            // fontFamily: "Special Elite",
            width: "70%",
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
              <Grid item xs={5}>
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
                <Button
                  variant="outlined"
                  size="small"
                  style={{marginLeft:"5%"}}
                  onClick={() => setReview(!review)}
                >
                  {review ? "Hide" : "Show"} Review
                </Button>
              </Grid>
            </Grid>
          </CardContent>
          <CardActions>
            {/* <Button size="small">Learn More</Button> */}
          </CardActions>
        </Card>

        {review && (
        <ShowReview place_id={id} />
      )}
      </div>
    </div>
  );
};

export default PlaceDetails;
