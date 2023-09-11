import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    Grid,
    Card,
    ButtonBase,
    Typography,
    Paper,
    Button,
} from "@mui/material";
import { styled } from '@mui/material/styles';

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

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

const SuggestionPlace = (props) => {
    const placeItem = props.item;

    const setNeedToUpdate = props.setNeedToUpdate;
    const setAddList = props.setAddList;
    const setRemoveList = props.setRemoveList;
    const setActivityList = props.setActivityList;

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
        props.setNeedToUpdate(true);
        if (inAddList) {
            props.setAddList((previous) => {
                return [...previous, { place_id: place_id, activity_id: parseInt(event.target.value) }];
            });
        }
        else {
            props.setRemoveList((previous) => {
                return [...previous, { place_id: place_id, activity_id: parseInt(event.target.value) }];
            });
        }
    }
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
                    <Link to={`/PlaceDetails/${placeItem.id}`}>
                        <ButtonBase sx={{ width: 128, height: 128 }}>
                            <Img alt="Restaurant" src={placeItem.image} />
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

            {/* </Grid> */}
            {/* <Grid container spacing={2}> */}
                <Grid item xs={6}>
                    {placeItem.activities.map((activity) => (
                        <Typography variant="body2">
                            {activityIcons[activity.title]} {activity.title}
                            <Button variant="text" size="small" onClick={handleActivityClick} id={placeItem.id} name={activity.title} value={activity.id}
                                color={getPlaceActivityBool(placeItem.id, activity.title, props.activityList) ? "error" : "success"}>
                                {getPlaceActivityBool(placeItem.id, activity.title, props.activityList) ? "Remove" : "Add"}
                            </Button>
                        </Typography>
                    ))}
                </Grid>
            </Grid>
        </Paper>
    );
};
const getPlaceActivityBool = (place_id, activity_name, activityList) => {
    console.log(place_id, activity_name, activityList);
    let activity = activityList.find((activity) => {
        return activity.place_id === place_id && activity.name === activity_name;
    });
    return activity?.is_selected;
}
export default SuggestionPlace;
