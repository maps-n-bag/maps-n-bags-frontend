import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  ButtonBase,
  Paper,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import CommuteOutlinedIcon from '@mui/icons-material/CommuteOutlined';
import { styled } from '@mui/material/styles';
import MovingIcon from '@mui/icons-material/Moving';
import ScheduleOutlined from '@mui/icons-material/ScheduleOutlined';
import NearbyRestaurant from "./nearbyRestaurant";
import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;
const timeformat = require("../formatTime");

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const activityIcons = {
  "Sight-seeing": "🏛️",
  "Shopping": "🛍️",
  "Eating": "🍽️",
  "Drinking": "🍺",
  "Clubbing": "🎉",
  "Gambling": "🎰",
  "Relaxing": "🛀",
  "Golfing": "⛳",
  "Hiking": "🥾",
  "Swimming": "🏊",
  "Fishing": "🎣",
  "Boating": "⛵",
  "Skiing": "🎿",
  "Hunting": "🔫",
  "Biking": "🚴",
};

const EventCards = (props) => {

  const cardsData = props.item;
  const [placeItem, setPlaceItem] = useState([]);
  const [restaurantSuggestion, setRestaurantSuggestion] = useState(false);

  useEffect(() => {
    if (cardsData.event?.place_id) {
      axios.get(`${baseURL}public/place?id=${cardsData.event.place_id}`, {
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
    }
  }, [ cardsData.event?.place_id ]);

  return (
    <div>
      {cardsData.journey && (
        <Paper
          sx={{
            p: 2,
            margin: 'auto',
            maxWidth: 900,
            flexGrow: 1,
            marginBottom: '10px',
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          }}
        >
          <Grid container spacing={2}>

            <Grid item xs={2}>
              {cardsData.journey.journey_type === "car" ? (
                <CommuteOutlinedIcon sx={{ width: 128, height: 128 }} />
              ) : (
                <MovingIcon sx={{ width: 128, height: 128 }} />
              )}
            </Grid>

            <Grid item xs>
              <Typography gutterBottom variant="subtitle1" component="div">
                From {cardsData.journey.from} to {cardsData.journey.to}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Approx Distance: {cardsData.journey.distance} km
                <br />
                Approx Time: {cardsData.journey.est_time} mins
              </Typography>
            </Grid>

          </Grid>
        </Paper>
      )}

      {cardsData.event && placeItem && (

        <Paper
          sx={{
            p: 2,
            margin: 'auto',
            maxWidth: 900,
            flexGrow: 1,
            marginBottom: '10px',
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          }}
        >
          <Grid container spacing={2}>

            <Grid item xs={2}>
              <Link to={`/PlaceDetails/${cardsData.event.place_id}`}>
                <ButtonBase sx={{ width: 128, height: 128 }}>
                  <Img alt="place_image" src={placeItem.images} />
                </ButtonBase>
              </Link>
            </Grid>

            <Grid item xs>
              <Typography gutterBottom variant="h5" component="div">
                <Link to={`/PlaceDetails/${cardsData.event.place_id}`} style={{ textDecoration: 'none', color: 'black' }}>
                  {placeItem.title}
                </Link>
              </Typography>
              <Typography variant="body2" gutterBottom>
                {placeItem.description}
                <br />
                Rating: {placeItem.rating}/5.0
                <br />
                Votes: {placeItem.rating_count}
              </Typography>
            </Grid>

            <Grid item xs={3}>
              {activityIcons[cardsData.event.activity]}
              <Typography variant="body1" gutterBottom>
                {cardsData.event.activity}
              </Typography>
            </Grid>

            <Grid item xs={3} direction={"column"} container>

              <Grid item xs>
                <Typography variant="body2" gutterBottom>
                  <ScheduleOutlined sx={{ width: 20, height: 20 }} />
                  <Divider orientation="vertical" flexItem />
                  {timeformat.formatTime(cardsData.event.start_time)} to {timeformat.formatTime(cardsData.event.end_time)}
                </Typography>
              </Grid>

              <Grid item xs={2}>
                <Button variant="outlined" size="small" onClick={() => setRestaurantSuggestion(!restaurantSuggestion)}>
                  {restaurantSuggestion ? "Hide" : "Show"} Nearby Restaurant
                </Button>
              </Grid>

            </Grid>

          </Grid>
        </Paper>
      )}

      {restaurantSuggestion && cardsData.event && (
        <NearbyRestaurant place_id={cardsData.event.place_id} />
      )}

    </div>
  );
};

export default EventCards;
