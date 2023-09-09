import React from "react";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import DayCards from "./daycards2";
import CardActions from "@mui/material/CardActions";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { makeStyles } from "@mui/styles";
import SideBar from "../App drawer/sideBar";

const baseURL = process.env.REACT_APP_BASE_URL;
const dateformat = require("../formatDate");
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


const OthersPLanCard = (props) => {
    const classes = useStyles();
    const cardsData = props.item;
    const startDate = dateformat.formatDate(cardsData.start_date);
    const endDate = dateformat.formatDate(cardsData.end_date);
    const navigate = useNavigate();

    const copyHandler = () => {
        axios
            .post(`${baseURL}plan/copy`, {
                plan_id: cardsData.plan_id,
                user_id: localStorage.getItem("userId"),
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            })
            .then((resp) => {
                console.log(resp.data);
                if(resp.data.coppied) {
                    navigateHandler(cardsData.plan_id);
                }
            })
            .catch((rejected) => {
                console.log(rejected);
            });
    };
    const navigateHandler = (plan_id) => {
        navigate(`/FullTour/${plan_id}`);
        };

    return (
        <div className={classes.places}>
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
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography
                                    variant="head"
                                    style={{
                                        fontFamily: "Special Elite",
                                        fontSize: "200%",
                                        color: "black",
                                        marginLeft: "15%",
                                        textAlign: "right",
                                    }}
                                >
                                    {cardsData.title}
                                </Typography>

                                <Typography
                                    variant="body2"
                                    style={{
                                        fontSize: "100%",
                                        marginLeft: "15%",
                                    }}
                                >
                                    {cardsData.description}
                                </Typography>
                                <img
                                    src={cardsData.image}
                                    alt={cardsData.tittle}
                                    style={{
                                        width: "90%",
                                        height: "70%",
                                        marginLeft: "14%",
                                        marginTop: "7%",
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6} marginTop={"5%"}>
                                <Typography
                                    variant="h6"
                                    style={{
                                        fontSize: "100%",
                                        color: "black",

                                        marginLeft: "35%",
                                        marginTop: "5%",
                                    }}
                                >
                                    <b>
                                        {startDate} to {endDate}
                                    </b>
                                </Typography>
                            </Grid>
                        </Grid>
                        {/* <a href="\DaybyDay"> */}

                        <Button
                            size="small"
                            onClick={copyHandler}
                            className={classes.btn}
                            style={{
                                fontSize: "100%",
                                marginLeft: "70%",
                            }}
                        >
                            Save in my plans
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default OthersPLanCard;
