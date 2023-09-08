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

import TagWise from "./showtagwise";
import TagBar from "./tagBar";

import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import axios from "axios";

import { makeStyles } from "@mui/styles";
import SideBar from "../App drawer/sideBar";
import { ScheduleOutlined } from "@mui/icons-material";

const baseURL = process.env.REACT_APP_BASE_URL;
const timeformat = require("../formatTime");
const useStyles = makeStyles({
  places: {
    height: "90%",
    width: "112%",
    backgroundColor: "rgba(250, 233, 171, 0.78)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
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

const ThingsToDo = () => {
  const classes = useStyles();
  const { plan_id } = useParams();
  const [placeItem, setPlaceItem] = useState([]);

  const [addList, setAddList] = useState([])
  const [removeList, setRemoveList] = useState([])
  const [filter, setFilter] = useState([])
  const [navigateBool, setNavigateBool] = useState(false)

  const postUpdateHandler = (event) => {
    console.log(addList)
    console.log(removeList)
    axios
      .post(
        `${baseURL}plan/update?plan_id=${plan_id}`,
        {
          add: addList,
          remove: removeList,
          regions: []
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        setNavigateBool(true)
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
        let temp = []
        temp = resp.data.map((item) => {
          return { tag_id: item.tag_id, tag_title: item.tag_name, isShow: false }
        })
        setFilter(temp)
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  }, [plan_id]);

  //console.log(placeItem);

  return (
    <div className={classes.places}>
      <div className={classes.postcard}>
        <Grid item container spacing={10}>
          <Grid item>
            <TagBar tags={filter} setTags={setFilter} />
          </Grid>
          {placeItem.map((pl) => (
            <div>
              <Grid item container spacing={10}>
                {/* Use Grid items to contain each card */}

                <Grid item>
                  {getTagBool(filter, pl.tag_id) && <TagWise item={pl} addedList={setAddList} removedList={setRemoveList} />}
                </Grid>
              </Grid>
            </div>
          ))}
          <Grid item>
            <Button onClick={postUpdateHandler} size="small" className={classes.btn}>
              Update Plan
            </Button>
            {navigateBool && <Link to={`/FullTour/${plan_id}`}><Button  size="small" className={classes.btn}>
              View Updated Plan
            </Button>
            </Link>}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
const getTagBool = (filter, tag_id) => {
  let temp = filter.filter((item) => item.tag_id === tag_id)
  return temp[0].isShow
}

export default ThingsToDo;