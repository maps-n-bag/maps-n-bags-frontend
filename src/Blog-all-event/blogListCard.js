import React from "react";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import DayCards from "./daycards2";
import CardActions from "@mui/material/CardActions";
import { Grid, Card, CardContent, Typography, CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";

import axios from "axios";

import { makeStyles } from "@mui/styles";
import SideBar from "../App drawer/sideBar";

const baseURL = process.env.REACT_APP_BASE_URL;
const dateformat = require("../formatDate");
const timeformat = require("../formatTime");

const BloglistCard = (props) => {
  const cardsData = props.item;
  const startDate = dateformat.formatDate(cardsData.start_date);
  const endDate = dateformat.formatDate(cardsData.end_date);
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea component={Link} to={`/Blog/${cardsData.id}`}>
          <CardMedia
            component="img"
            height="200"
            image={cardsData.image}
            alt={cardsData.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {cardsData.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {cardsData.description}
            </Typography>
          </CardContent>
          <CardContent style={{ textAlign: "right" }}>
            <Typography variant="body2" color="text.secondary">
              {startDate}
              <br />to<br /> 
              {endDate}
            </Typography>
          </CardContent>
        </CardActionArea>

        <Grid container xs={12} sx={{ marginBottom: "10px" }}>
          <Grid item xs={6} sx={{ textAlign: "center" }}>
            <Button size="small" color="primary" href={`/FullTour/${cardsData.id}`} sx={{ width: "90%" }} variant="contained">
              View Plan
            </Button>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "center" }}>
            <Button size="small" color="primary" href={`/Blog/${cardsData.id}`} sx={{ width: "90%" }} variant="contained">
              Share
            </Button>
          </Grid>
        </Grid>

      </Card>
    </Grid>
  );
};

export default BloglistCard;
