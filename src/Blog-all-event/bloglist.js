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
import { makeStyles } from "@mui/styles";
import SideBar from "../App drawer/sideBar";
import { Link } from "react-router-dom";
import noteIcon from "../photos/icon/note.png";
import { useParams } from "react-router-dom";
import BloglistCard from "../Blog-all-event/blogListCard";

const dateformat = require("../formatDate");
const baseURL = process.env.REACT_APP_BASE_URL;
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

  img: {
    height: "100%",
    position: "centre",
  },
  cardimg: {
    height: "100%",
  },
});

const Bloglist = () => {
  const user_id = localStorage.getItem("userId");
  const [itemBasic, setItemBasic] = useState([]);
  useEffect(() => {
    axios
      .get(`${baseURL}plan/all?user_id=${user_id}`, {
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
  }, [user_id]);

  const classes = useStyles();

  return (
    <div className={classes.places}>
      <SideBar />

      <div className={classes.postcard}>
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
            {itemBasic.map((item, index) => (
              <Grid
                container
                direction="row"
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
                <Grid item>
                  <BloglistCard item={item} className={classes.cardday} />
                </Grid>
              </Grid>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Bloglist;
