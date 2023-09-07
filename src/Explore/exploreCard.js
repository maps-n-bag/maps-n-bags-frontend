import React from "react";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import {
    Grid,
    Card,
    ButtonBase,
    Paper,
    CardContent,
    Typography,
} from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

import axios from "axios";

import { makeStyles } from "@mui/styles";
import SideBar from "../App drawer/sideBar";
import { ScheduleOutlined } from "@mui/icons-material";
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

const exploreCard = (props) => {
    const classes = useStyles();
    const cardsData = props.item;
    console.log(cardsData);
    const [placeItem, setPlaceItem] = useState([]);
    const [activityItem, setActivityItem] = useState(props.item.activities);

    return (
        <div className={classes.places}>
            <div className={classes.postcard}>
                <Card
                    className={classes.cardimg}
                    style={{
                        width: "80%",
                        //marginLeft: "2%",
                        marginTop: "5%",
                        color: "fffff",
                    }}
                >
                    <Grid container spacing={5}>
                        <Grid item>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                gutterBottom
                                component="div"
                                style={{
                                    //fontFamily: "Special Elite",
                                    fontSize: "100%",
                                    color: "black",
                                    marginLeft: "10%",
                                    marginTop: "10%",
                                    // textAlign: "center",
                                }}
                            >
                                {cardsData.title}
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                gutterBottom
                                component="div"
                                style={{
                                    //fontFamily: "Special Elite",
                                    fontSize: "100%",
                                    color: "black",
                                    marginLeft: "10%",
                                    // textAlign: "center",
                                }}
                            >
                                rating: {cardsData.rating}/5.0
                            </Typography>

                            <Typography
                                variant="body2"
                                color="text.secondary"
                                gutterBottom
                                component="div"
                                style={{
                                    //fontFamily: "Special Elite",
                                    fontSize: "100%",
                                    color: "black",
                                    marginLeft: "10%",
                                    // textAlign: "center",
                                }}
                            >
                                rating count: {cardsData.rating_count}
                            </Typography>

                        </Grid>
                        <Grid item>
                            <Link to={`/PlaceDetails/${cardsData.id}`}>
                                <ButtonBase sx={{ width: "70%", height: "70%" }}>
                                    <img
                                        style={{
                                            width: "110%",
                                            //height: "100%",
                                            marginLeft: "40%",
                                            marginTop: "5%",
                                            //textAlign: "right",
                                        }}
                                        alt="place_image"
                                        src={placeItem.images}
                                    />
                                </ButtonBase>
                            </Link>
                        </Grid>
                        { cardsData.activities.map((activity) => {
                            <Grid item>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    gutterBottom
                                    component="div"
                                    style={{
                                        //fontFamily: "Special Elite",
                                        fontSize: "100%",
                                        color: "black",
                                        marginLeft: "10%",
                                        // textAlign: "center",
                                    }}
                                >
                                    {activity.title}
                                </Typography>
                            </Grid>
                            // button to add activity to day

                        })}

                        <Grid item xs={30} sm container>
                            <Grid
                                item
                                xs
                                container
                                direction="column"
                                spacing={2}
                                sm={20}
                            // md={20}
                            // lg={15}
                            >

                                {placeItem && (
                                    <Grid item>
                                        <Typography
                                            gutterBottom
                                            variant="subtitle1"
                                            component="div"
                                            sx={{ cursor: "pointer" }}
                                            style={{
                                                // fontFamily: "Special Elite",
                                                fontSize: "110%",
                                                color: "black",
                                                marginLeft: "10%",
                                                //marginTop: "10%",
                                                // textAlign: "center",
                                            }}
                                        >
                                            <b> {placeItem.title}</b>
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            gutterBottom
                                            component="div"
                                            style={{
                                                //fontFamily: "Special Elite",
                                                fontSize: "100%",
                                                color: "black",
                                                marginLeft: "10%",
                                                //textAlign: "center",
                                            }}
                                        >
                                            {placeItem.description}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            gutterBottom
                                            component="div"
                                            style={{
                                                //fontFamily: "Special Elite",
                                                fontSize: "100%",
                                                color: "black",
                                                marginLeft: "10%",
                                                // textAlign: "center",
                                            }}
                                        >
                                            Rating: {placeItem.rating}/5.0
                                            <br /> (total votes: {placeItem.rating_count})
                                        </Typography>
                                    </Grid>
                                )}


                                {cardsData.event && (
                                    <Grid item>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                            gutterBottom
                                            component="div"
                                            style={{
                                                //fontFamily: "Special Elite",
                                                fontSize: "100%",
                                                color: "black",
                                                marginLeft: "10%",
                                                // marginTop: "10%",
                                                // textAlign: "center",
                                            }}
                                        >
                                            {" "}
                                            <ScheduleOutlined
                                                style={{
                                                    color: "black",
                                                    marginTop: "2%",
                                                    fontSize: "100%",
                                                    textAlign: "center",
                                                }}
                                            />
                                            {timeformat.formatTime(cardsData.event.start_time)} to{" "}
                                            {timeformat.formatTime(cardsData.event.end_time)}
                                        </Typography>
                                    </Grid>
                                )}

                                {cardsData.event && placeItem && (
                                    <Grid item>
                                        <Link to={`/PlaceDetails/${cardsData.event.place_id}`}>
                                            <ButtonBase sx={{ width: "70%", height: "70%" }}>
                                                <img
                                                    style={{
                                                        width: "110%",
                                                        //height: "100%",
                                                        marginLeft: "40%",
                                                        marginTop: "5%",
                                                        //textAlign: "right",
                                                    }}
                                                    alt="place_image"
                                                    src={placeItem.images}
                                                />
                                            </ButtonBase>
                                        </Link>
                                    </Grid>
                                )}


                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
            </div>
        </div>
    );
};

export default EventCards;
