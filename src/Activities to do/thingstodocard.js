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
import { useThemeContext } from "../ThemeContext";
import TagWise from "./showtagwise";
import TagBar from "./tagBar";

import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { makeStyles } from "@mui/styles";
import SideBar from "../App drawer/sideBar";
import { ScheduleOutlined } from "@mui/icons-material";

const baseURL = process.env.REACT_APP_BASE_URL;
const timeformat = require("../formatTime");
const useStyles = makeStyles({
  places: {
    backgroundColor: "rgba(0, 0, 0 ,0.05)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "100vh",
  },

  postcard: {
    marginLeft: "10%",
    marginTop: "10vh",
  },
});

const ThingsToDo = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { plan_id } = useParams();
  const [placeItem, setPlaceItem] = useState([]);

  const [addList, setAddList] = useState([]);
  const [removeList, setRemoveList] = useState([]);
  const [filter, setFilter] = useState([]);
  const { theme, toggleThemeMode } = useThemeContext();
  const postUpdateHandler = (event) => {
    console.log(addList);
    console.log(removeList);
    axios
      .post(
        `${baseURL}plan/update?plan_id=${plan_id}`,
        {
          add: addList,
          remove: removeList,
          regions: [],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        navigate(`/FullTour/${plan_id}`);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };

  useEffect(() => {
    axios
      .get(`${baseURL}plan/explore?plan_id=${plan_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((resp) => {
        console.log(resp.data);
        setPlaceItem(resp.data);
        let temp = [];
        temp = resp.data.map((item) => {
          return {
            id: item.tag_id,
            name: item.tag_name,
            isShow: false,
          };
        });
        setFilter(temp);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  }, [plan_id]);

  return (
    <div className={classes.places}>
      <SideBar theme={theme} toggleTheme={toggleThemeMode} />
      <div className={classes.postcard}>
        <Typography
          style={{
            fontFamily: "Special Elite",
            fontSize: "200%",
            textAlign: "center",
            marginBottom: "5%",
          }}
        >
          Things To Do In Your Plan
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={3} style={{ maxWidth: "300px" }}>
            <TagBar tags={filter} setTags={setFilter} />
          </Grid>
          <Grid item xs={9} container direction="column" spacing={1}>
            {placeItem.map((pl) => (
              <>
                {getTagBool(filter, pl.tag_id) && (
                  <TagWise
                    item={pl}
                    addedList={setAddList}
                    removedList={setRemoveList}
                  />
                )}
              </>
            ))}
          </Grid>

          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            marginBottom="40%"
          >
            <Button
              onClick={postUpdateHandler}
              className="btn"
              style={{
                backgroundColor: "rgba(178, 222, 39,0.5)",
                borderWidth: "5px",
                borderColor: "white",
                borderRadius: "200%",
              }}
              variant="outlined"
            >
              <Typography
                color="black"
                style={{
                  fontFamily: "Special Elite",
                  fontSize: "200%",
                  textAlign: "center",
                }}
              >
                Update Plan
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const getTagBool = (filter, tag_id) => {
  let temp = filter.filter((item) => item.id === tag_id);
  return temp[0].isShow;
};

export default ThingsToDo;
