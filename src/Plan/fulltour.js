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
import map from "../photos/map.jpg";
import { makeStyles } from "@mui/styles";
import SideBar from "../App drawer/sideBar";
import { Link } from "react-router-dom";
import noteIcon from "../photos/icon/note.png";
import { useParams } from "react-router-dom";
import { useThemeContext } from '../ThemeContext';
const dateformat = require("../formatDate");

const baseURL = process.env.REACT_APP_BASE_URL;
const useStyles = makeStyles({
  places: {

    backgroundColor: "rgba(0, 0, 0 ,0.05)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "100vh",

  },

  postcard: {

    marginLeft: "20%",
    marginTop: "7%",
  },

});

const FullTour = () => {
  const { theme, toggleThemeMode } = useThemeContext();
  const day = 1;
  const [itemBasic, setItemBasic] = useState([]);
  const { plan_id } = useParams();
  useEffect(() => {
    axios.get(`${baseURL}plan?id=${plan_id}`, {
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

  const name_arr = itemBasic.title;
  const date_st = dateformat.formatDate(itemBasic.start_date);
  const date_end = dateformat.formatDate(itemBasic.end_date);
  const des_arr = itemBasic.description;
  const img_arr = itemBasic.image;
  const classes = useStyles();

  const timeDifference = Math.abs(new Date(date_end) - new Date(date_st));
  const daysdifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
  const daysTotal = parseInt(daysdifference) + 1;
  console.log(daysTotal);

  return (
    <div className={classes.places}>
      <SideBar theme={theme} toggleTheme={toggleThemeMode} />

      <div className={classes.postcard}>

        <Card

          style={{
            width: "70%",
            maxWidth: "1000px",
            color: "ffffff",

          }}
        >
          <CardContent>
            <Grid container spacing={2}>


              <Grid item xs>

                <Typography
                  variant="head"
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "150%",
                    padding: "5px",
                  }}
                >
                  {name_arr}
                </Typography>

                <Typography
                  variant="body2"
                  style={{
                    fontSize: "100%",
                    padding: "5px",
                  }}
                >
                  {des_arr}
                </Typography>

                <img
                  src={img_arr}
                  alt={name_arr}
                  style={{
                    width: "90%",
                    height: "70%",
                    // marginLeft: "14%",
                    marginTop: "7%",
                  }}
                />
              </Grid>
              <Grid item xs={5} marginTop={"5%"}>

                <Typography
                  variant="h6"
                  style={{

                    fontSize: "150%",


                    // marginLeft: "20%",
                    marginTop: "5%",
                  }}
                >
                  <b>Overview of Tour Plan</b>
                </Typography>
                <Typography
                  variant="h6"
                  style={{
                    fontSize: "100%",


                    // marginLeft: "40%",
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
                    // marginLeft: "30%",
                    marginTop: "0%",
                  }}
                />

                <SouthIcon
                  style={{
                    width: "20%",
                    height: "15%",

                  }}
                />
                <Typography
                  variant="h6"
                  style={{
                    fontSize: "100%",


                    // marginLeft: "35%",
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
                    // marginLeft: "30%",
                    marginTop: "5%",
                  }}

                />{" "}

                <SouthIcon
                  style={{
                    width: "20%",
                    height: "15%",

                  }}
                />
                <Typography
                  variant="h6"
                  style={{
                    fontSize: "100%",
                    // marginLeft: "40%",
                    marginTop: "5%",
                  }}
                >
                  <b>{date_end}</b>
                  <br />
                  Back To Dhaka
                </Typography>

                <Link to={`/DaywisePlan/${plan_id}/${itemBasic.start_date}/${daysTotal}/${day}`}>
                  <Button
                    size="small"
                    variant="contained"
                    style={{
                      fontSize: "100%",
                    // marginLeft: "40%",
                    marginTop: "5%",
                    }}
                  >
                    View Day By Day Plan
                  </Button>

                </Link>

              </Grid>
            </Grid>



          </CardContent>
          <CardActions>

          </CardActions>
        </Card>
      </div>
    </div>
  );
};

export default FullTour;
