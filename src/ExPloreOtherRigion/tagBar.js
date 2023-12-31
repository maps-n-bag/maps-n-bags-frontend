import React from "react";
import { useEffect, useState } from "react";
import { Controller, Form, useFormContext } from "react-hook-form";
import { Link } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import Box, { Divider, FormGroup } from "@mui/material";
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
import { FormControl } from "@mui/base";
import { FormControlLabel, Switch } from "@mui/material";

const baseURL = process.env.REACT_APP_BASE_URL;
const timeformat = require("../formatTime");

const TagBar = (item) => {
  const tags = item.tags;
  const setTags = item.setTags;
  const regions = item.regions;
  const setRegions = item.setRegions;

  const regHandler = (event) => {
    let id = event.currentTarget.id;
    let temp;
    temp = regions.map((region) => {
      if (region.id == id) {
        region.isShow = !region.isShow;
      }
      return region;
    });
    setRegions(temp);
    // console.log(regions);
  };

  const tagHandler = (event) => {
    let id = event.currentTarget.id;
    let temp;
    temp = tags.map((tag) => {
      if (tag.id == id) {
        tag.isShow = !tag.isShow;
      }
      return tag;
    });
    setTags(temp);
    // console.log(tags);
  };

  return (
    <>
      <Typography
        variant="h5"
        style={{ fontFamily: "Special Elite", fontSize: "130%" }}
      >
        Filter By: Regions
      </Typography>
      <FormGroup>
        {regions.map((region) => (
          <FormControlLabel
            control={
              <Switch
                checked={region.isShow}
                onChange={regHandler}
                id={region.id}
              />
            }
            label={region.name}
          />
        ))}
      </FormGroup>
      <Divider />
      <Typography
        variant="h5"
        style={{ fontFamily: "Special Elite", fontSize: "130%" }}
      >
        Filter By: Tags
      </Typography>
      <FormGroup>
        {tags.map((tag) => (
          <FormControlLabel
            control={
              <Switch checked={tag.isShow} onChange={tagHandler} id={tag.id} />
            }
            label={tag.name}
          />
        ))}
      </FormGroup>
    </>
  );
};

export default TagBar;
