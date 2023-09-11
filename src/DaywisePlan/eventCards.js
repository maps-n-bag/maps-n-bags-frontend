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
import SuggestionPlace from "./SuggetionPlace";

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

const timeIcon = "🕒"

const EventCards = (props) => {

  const cardsData = props.item;
  const plan_id = props.plan_id;
  const [placeItem, setPlaceItem] = useState([]);
  const [restaurantSuggestion, setRestaurantSuggestion] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [activityList, setActivityList] = useState([]);
  const [placeSuggestion, setPlaceSuggestion] = useState(false);

  const setNeedToUpdate = props.setNeedToUpdate;
  const setAddList = props.setAddList;
  const setRemoveList = props.setRemoveList;


  const handleActivityClick = (event) => {
    const place_id = parseInt(event.target.id);
    const activity_name = event.target.name;
    console.log(place_id, activity_name);
    let inAddList = false;
    setActivityList((prev) => {
      let temp = prev.map((activity) => {
        if (activity.place_id === place_id && activity.name === activity_name) {
          activity.is_selected = !activity.is_selected;
          inAddList = activity.is_selected;
        }
        return activity;
      });
      return temp;
    });
    setNeedToUpdate(true);
    if (inAddList) {
      setRemoveList((previous) => {
        let temp = previous.filter((activity) => {
          return activity.place_id != place_id || activity.activity_id != parseInt(event.target.value);
        });
        return temp;
      });

      setAddList((previous) => {
        return [...previous, { place_id: place_id, activity_id: parseInt(event.target.value) }];
      });
    }
    else {
      setAddList((previous) => {
        let temp = previous.filter((activity) => {
          return activity.place_id != place_id || activity.activity_id != parseInt(event.target.value);
        });
        return temp;
      });

      setRemoveList((previous) => {
        return [...previous, { place_id: place_id, activity_id: parseInt(event.target.value) }];
      });
    }
  }

  useEffect(() => {
    if (cardsData.event?.place_id) {
      axios.get(`${baseURL}public/place?id=${cardsData.event.place_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((resp) => {
          setPlaceItem(resp.data);
          setActivityList(
            [{
              name: (cardsData.event != null ? cardsData.event.activity : ""),
              place_id: (cardsData.event != null ? cardsData.event.place_id : 0),
              is_selected: true,
            }]);

          // console.log(cardsData)
          // console.log(resp.data);
          
          setPlaceSuggestion(false);

        })
        .catch((rejected) => {
          console.log(rejected);
        });
    }
  }, [cardsData.event?.place_id]);

  useEffect(() => {
    if (cardsData.event?.place_id) {
      axios.get(`${baseURL}event/suggestion?plan_id=${plan_id}&event_id=${cardsData.event.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
        .then((resp) => {
          console.log(resp.data);
          setSuggestions(resp.data);

          let activityList1 = [];
          resp.data.activities.forEach((activity) => {
            activityList1.push({
              name: activity.title,
              place_id: cardsData.event.place_id,
              is_selected: false,
            })
          });


          resp.data.place?.activities.forEach((activity) => {
            activityList1.push({
              name: activity.title,
              place_id: resp.data.place.id,
              is_selected: false,
            })
          });
          setActivityList((prev) => {
            let temp = activityList1.map((activity1) => {
              let activity = prev.find((activity) => {
                return activity.place_id === activity1.place_id && activity.name === activity1.name;
              });
              if (activity) {
                return;
              }
              return activity1;
            });
            temp = temp.filter((activity) => activity != null);
            return [...prev, ...temp];
          });
        })
        .catch((rejected) => {
          console.log(rejected);
        });
    }
  }, [cardsData.event?.place_id]);

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
                <Link to={`/PlaceDetails/${cardsData.event.place_id}`} style={{ textDecoration: 'none', color: props.theme.palette.primary.main }}>
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

            <Grid item xs={4}>
              <Typography variant="body1" gutterBottom>
                {activityIcons[cardsData.event.activity]} {cardsData.event.activity}
                <Button variant="text" size="small" onClick={handleActivityClick} id={cardsData.event.place_id} name={cardsData.event.activity} value={cardsData.event.activity_id} 
                  color={getPlaceActivityBool(cardsData.event.place_id, cardsData.event.activity, activityList) ? "error" : "success"}>
                  {getPlaceActivityBool(cardsData.event.place_id, cardsData.event.activity, activityList) ? "Remove" : "Add"}
                </Button>
              </Typography>
              <Typography variant="body2">
                Other Activities:
              </Typography>
              {suggestions.activities?.map((activity) => (
                <Typography variant="body2" gutterBottom>
                  {activityIcons[activity.title]} {activity.title}
                  <Button variant="text" size="small" onClick={handleActivityClick} id={cardsData.event.place_id} name={activity.title} value={activity.id}>
                    {getPlaceActivityBool(cardsData.event.place_id, activity.title, activityList) ? "Remove" : "Add"}
                  </Button>
                </Typography>
              ))}
              <Button variant="outlined" size="small" onClick={() => setPlaceSuggestion(!placeSuggestion)} color="info">
                {placeSuggestion ? "Hide" : "Show"} Nearby Place
              </Button>
            </Grid>

            <Grid item xs={3} direction={"column"} container>

              <Grid item xs>
                <Typography variant="body2">
                  {timeIcon} {timeformat.formatTime(cardsData.event.start_time)} to {timeformat.formatTime(cardsData.event.end_time)}
                </Typography>
              </Grid>

              <Grid item xs={2}>
                <Button variant="outlined" size="small" onClick={() => setRestaurantSuggestion(!restaurantSuggestion)} color="info">
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
      {placeSuggestion && cardsData.event && (
        <SuggestionPlace item={suggestions.place} setActivityList={setActivityList} activityList={activityList} setNeedToUpdate={setNeedToUpdate} setAddList={setAddList} setRemoveList={setRemoveList}/>
      )}

    </div>
  );
};

const getPlaceActivityBool = (place_id, activity_name, activityList) => {
  console.log(place_id, activity_name, activityList);
  if (activityList.length === 0) {
    return false;
  }
  let activity = activityList.find((activity) => {
    return activity.place_id === place_id && activity.name === activity_name;
  });
  return activity?.is_selected;
}
export default EventCards;
