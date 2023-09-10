import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Card, ButtonBase, Typography, Paper } from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import CommentIcon from "@mui/icons-material/Comment";
import { makeStyles } from "@mui/styles";

const baseURL = process.env.REACT_APP_BASE_URL;
const timeformat = require("../formatTime");
const useStyles = makeStyles({

  btn: {
    minWidth: "100%",
  },

  postcard: {
    //height: "100%",
    width: "95%",
    Height: "50%",
    //marginLeft: "15%",
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
    // height: "100%",
  },
});

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const ShowReview = ({ place_id }) => {
  const classes = useStyles();
  const [reviewItem, setReviewItem] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseURL}public/place/review?place_id=${place_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((resp) => {
        setReviewItem(resp.data);
        //console.log(resp.data);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  }, []);

  console.log(reviewItem);
  return (
    <div>
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          maxWidth: 860,
          flexGrow: 1,
          marginBottom: "30px",
          marginTop: "30px",
          marginLeft: "7%",
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Grid container direction="column" >
          {reviewItem.map((placeItem) => (
            <div>
              <Grid item xs container direction="row" >
                {placeItem.images.map((img) => (
                  <Grid item xs={2} style={{ maxHeight: "200px" ,  marginLeft: "2%"}}>
                    <img src={img} style={{ maxHeight: "100%" }} />
                  </Grid>
                ))}
              </Grid>

              <Grid item xs={4}>
                <Typography
                  variant="body2"
                  gutterBottom
                  style={{ marginLeft: "5%" , marginTop: "5%"}}
                >
                  <b> <CommentIcon/> {placeItem.username}</b>: {placeItem.comment}
                </Typography>
              </Grid>
            </div>
          ))}
        </Grid>
      </Paper>
    </div>
  );
};

export default ShowReview;
