import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  ButtonBase,
  Typography,
  Paper,
} from "@mui/material";
import { styled } from '@mui/material/styles';
import axios from "axios";

import { makeStyles } from "@mui/styles";

const baseURL = process.env.REACT_APP_BASE_URL;
const timeformat = require("../formatTime");
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

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const NearbyRestaurant = ({ place_id }) => {
  const classes = useStyles();
  const [placeItem, setPlaceItem] = useState({});

  useEffect(() => {
      axios.get(`${baseURL}public/nearby/restaurant?place_id=${place_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((resp) => {
          setPlaceItem(resp.data);
        })
        .catch((rejected) => {
          console.log(rejected);
        });
  }, [place_id]);

  return (


    <Paper
          sx={{
            p: 2,
            margin: 'auto',
            maxWidth: 800,
            flexGrow: 1,
            marginBottom: '30px',
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          }}
        >
          <Grid container spacing={2} alignSelf={"right"}>

            <Grid item xs={2.2}>
              <Link to={`/PlaceDetails/${place_id}`}>
                <ButtonBase sx={{ width: 128, height: 128 }}>
                  <Img alt="Restaurant" src={placeItem.images} />
                </ButtonBase>
              </Link>
            </Grid>

            <Grid item xs>
              <Typography gutterBottom variant="h6" component="div">
                {placeItem.title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Rating: {placeItem.rating}/5.0
                <br />
                Votes: {placeItem.rating_count}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {placeItem.description}
              </Typography>
            </Grid>

          </Grid>
        </Paper>
  );
};

export default NearbyRestaurant;
