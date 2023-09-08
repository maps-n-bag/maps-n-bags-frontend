import React from "react";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material";
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
import { useParams } from "react-router-dom";
import axios from "axios";

import { makeStyles } from "@mui/styles";
import SideBar from "../App drawer/sideBar";
import { ScheduleOutlined } from "@mui/icons-material";
import { set } from "date-fns";

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
        fontFamily: "sans-serif",
        marginLeft: "50%",
        // marginRight: "20%",
    },
    cardimg: {
        backgroundColor: "#ff5722",
        overflow: "hidden",
        marginLeft: "15%",
    },

    img: {
        height: "100%",
        position: "centre",
    },
    cardimg: {
        // height: "100%",
    },
});

const ActivityCard = (item) => {
    const classes = useStyles();
    const place_id = item.place_id;
    const setAddList = item.setAddList;
    const activity = item.item;
    const setRegions=item.setRegions;

    const [in_plan, setInPlan] = useState(activity.in_plan);
    const Handler = (event) => {
        if (event.target.id === "add") {
            setAddList((previous) => {
                return [...previous, { place_id: place_id, activity_id: parseInt(event.target.value) }];
            });
            setRegions((previous)=>{
                if(previous.includes(activity.region_id))
                {
                    return previous
                }
                else{
                    return [...previous,activity.region_id]
                }
            })
        }
        else if (event.target.id === "remove") {
            setAddList((previous) => {
                let temp = previous.filter((item) => {
                    return item.activity_id !== parseInt(event.target.value);
                });
                return temp;
            });
        }
        setInPlan(!in_plan);
    };

    return (
        <div className={classes.places}>
            <div className={classes.postcard}>
                <div>
                    <Typography
                        variant="h6"
                        style={{ marginLeft: "5%", marginTop: "5%" }}
                    >
                        {" "}
                        {activity.title}

                        {in_plan ? <Button onClick={Handler} id="remove" value={activity.id}>
                            Remove
                        </Button>
                            :
                            <Button onClick={Handler} id="add" value={activity.id}>
                                Add
                            </Button>}
                    </Typography>
                </div>
            </div>
        </div>
    );
};

export default ActivityCard;
