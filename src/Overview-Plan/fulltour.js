import React from "react";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Grid, Divider } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import SouthIcon from "@mui/icons-material/South";
import plane from "../photos/icon/plane.png";
import beach from "../photos/icon/um.png";
import placepic from "./placepic.json";
import { makeStyles } from "@mui/styles";
import SideBar from "../App drawer/sideBar";

import noteIcon from "../photos/icon/note.png";

const dateformat = require("../formateDate");
const useStyles = makeStyles({
  places: {
    height: "100%",
    width: "118%",
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
  //   divider: {
  //     // width: "100%",
  //     //  borderTop: "3px solid #ccc",
  //     marginLeft: "30%",

  //     borderLeft: `1px solid #fffff`,
  //     height: "100%", // Adjust the height as needed
  //     // margin: theme.spacing(0, 2), // Add margin for spacing
  //   },

  img: {
    height: "100%",
    position: "centre",
  },
  cardimg: {
    height: "100%",
  },
});

const FullTour = () => {
  // const id = localStorage.getItem("id");

  const [itemBasic, setItemBasic] = useState([]);
  useEffect(() => {
    fetch(`http://localhost:8080/plan?id=1`)
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp.plan);
        const plan_arr = [resp.plan];
        setItemBasic(plan_arr);
        console.log(String(itemBasic[0].start_date));
        itemBasic.start_date = dateformat.formateDate(
          String(itemBasic[0].start_date)
        );
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  }, []);
  const name_arr = itemBasic.map((place, index) => place.name);
  const date_st = itemBasic.map((place, index) =>
    dateformat.formateDate(String(place.start_date))
  );
  const date_end = itemBasic.map((place, index) =>
    dateformat.formateDate(String(place.end_date))
  );
  const des_arr = itemBasic.map((place, index) => place.description);
  // //const img_arr = itemBasic.map((place, index) => place.image);

  //const items = Object.values(this.props.items);
  const map_arr = "../Images/map cox.PNG";
  const classes = useStyles();
  // useEffect(() => {
  //   fetch(`http://localhost:8080/api/staff/${id}`)
  //     .then((resp) => resp.json())
  //     .then((resp) => {
  //       setItemBasic(resp.data[0]);
  //       console.log(resp.data[0]);
  //     });
  // }, []);

  return (
    <div className={classes.places}>
      <SideBar />

      <div className={classes.postcard}>
        {/* <img src={img_arr} alt="Image" className={classes.img} /> */}
        <Card
          className={classes.cardimg}
          style={{
            width: "50%",
            marginLeft: "7%",
            color: "ffffff",
            marginTop: "5%",
          }}
        >
          <CardContent>
            <Grid container spacing={2}>
              {/* <div className={classes.divider} /> */}

              <Grid item xs={6}>
                {/* Content for the left column */}
                {/* <Typography variant="h6">Map of {name_arr}</Typography> */}
                <Typography
                  variant="head"
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "200%",
                    color: "black",
                    marginLeft: "15%",
                    textAlign: "right",
                  }}
                >
                  {" "}
                  {name_arr}
                </Typography>

                <Typography
                  variant="body2"
                  style={{
                    fontSize: "100%",
                    marginLeft: "15%",
                    // textAlign: "center",
                  }}
                >
                  {" "}
                  {des_arr}
                </Typography>
                <img
                  src={map_arr}
                  alt={name_arr}
                  style={{
                    width: "80%",
                    height: "80%",
                    marginLeft: "15%",
                    marginTop: "5%",
                  }}
                />
              </Grid>
              <Grid item xs={6} marginTop={"5%"}>
                {/* Content for the right column */}
                <Typography
                  variant="h6"
                  style={{
                    // fontFamily: "Special Elite",
                    fontSize: "150%",
                    color: "black",

                    marginLeft: "20%",
                    marginTop: "5%",
                  }}
                >
                  <b>Overview of Tour Plan</b>
                </Typography>
                <Typography
                  variant="h6"
                  style={{
                    fontSize: "100%",
                    color: "black",

                    marginLeft: "40%",
                    marginTop: "5%",
                  }}
                >
                  <b>{date_st}</b>
                  <br /> Starting From Dhaka
                </Typography>
                <img
                  src={plane}
                  alt={name_arr}
                  style={{
                    width: "10%",
                    height: "7%",
                    marginLeft: "20%",
                    marginTop: "0%",
                  }}
                />
                1 h 15 mins
                <SouthIcon
                  style={{
                    width: "20%",
                    height: "15%",
                    // marginLeft: "50%",
                    // marginTop: "15%",
                  }}
                />
                <Typography
                  variant="h6"
                  style={{
                    fontSize: "100%",
                    color: "black",

                    marginLeft: "35%",
                    marginTop: "5%",
                  }}
                >
                  <b>
                    {date_st} to {date_end}{" "}
                  </b>
                  <br /> Staying At {name_arr}
                </Typography>
                <img
                  src={plane}
                  alt={name_arr}
                  style={{
                    width: "10%",
                    height: "7%",
                    marginLeft: "20%",
                    marginTop: "5%",
                  }}
                  // Adjust the percentage value as needed
                />{" "}
                1 h 15 mins
                <SouthIcon
                  style={{
                    width: "20%",
                    height: "15%",
                    // marginLeft: "50%",
                    // marginTop: "15%",
                  }}
                />
                <Typography
                  variant="h6"
                  style={{
                    fontSize: "100%",
                    color: "black",

                    marginLeft: "40%",
                    marginTop: "5%",
                  }}
                >
                  <b>{date_end}</b>
                  <br />
                  Back To Dhaka
                </Typography>
              </Grid>
            </Grid>
            <a href="\DaybyDay">
              <Button
                size="small"
                className={classes.btn}
                style={{
                  fontSize: "100%",
                  marginLeft: "70%",
                }}
              >
                View Day By Day Plan
              </Button>
            </a>
          </CardContent>
          <CardActions>
            {/* <Button size="small">Learn More</Button> */}
          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default FullTour;
