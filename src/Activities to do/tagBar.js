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
import { ta } from "date-fns/locale";
import ContentCards from "../Blog-all-event/contentcards3";

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
    tag: {
        height: "100%",
        width: "112%",
        backgroundColor: "rgba(250, 233, 171, 0.78)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
    },

    img: {
        height: "100%",
        position: "centre",
    },
    cardimg: {
        // height: "100%",
    },
});

const TagBar = (item) => {
    const classes = useStyles();
    const tags= item.tags
    const setTags = item.setTags
    console.log(tags);

    const Handler = (event) => {
        let id = event.currentTarget.id;
        let temp;
        temp=tags.map((tag) => {
            if (tag.tag_id == id) {
                tag.isShow = !tag.isShow;
            }
            return tag;
        });
        setTags(temp);
    };

    return (
        <div className={classes.places}>
            <div className={classes.postcard}>
                <Grid className={classes.tag}>
                    {tags.map((tag) => (
                    <Typography
                        variant="h6"
                        style={{ marginLeft: "5%", marginTop: "5%" }}
                    >

                        {!tag.isShow ? <Button onClick={Handler} id={tag.tag_id}>
                            Add {tag.tag_title}
                        </Button>
                            :
                            <Button onClick={Handler} id={tag.tag_id}>
                                Remove {tag.tag_title}
                            </Button>}
                    </Typography>
                    ))}
                </Grid>
            </div>
        </div>
    );
};

export default TagBar;
