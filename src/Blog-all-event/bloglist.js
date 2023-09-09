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
import { CardActionArea } from "@mui/material";

const dateformat = require("../formatDate");
const baseURL = process.env.REACT_APP_BASE_URL;
const useStyles = makeStyles({
  places: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(250, 233, 171, 0.78)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "100vh",
  },
  postcard: {
    marginTop: "2%",
    marginLeft: "15%",
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

      <Typography variant="h4"
        style={{
          fontFamily: "Special Elite",
          fontSize: "200%",
          color: "black",
          textAlign: "center",
          marginTop: "80px",
        }}
      >
        Your Blogs
      </Typography>

      <div className={classes.postcard}>

        <Grid container spacing={2} justifyContent="center" style={{ width: "90%" }}>
          {itemBasic.map((item, index) => (
            <BloglistCard item={item} />
          ))}
        </Grid>

      </div>
    </div>
  );
};

export default Bloglist;
