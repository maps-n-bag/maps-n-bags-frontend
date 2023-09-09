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

import ThingsToDo from "./thingstodocard";
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
    backgroundColor: "rgba(250, 233, 171, 0.78)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "100vh",
  },

  postcard: {
    marginLeft: "10%",
    marginTop: "10vh",
  },
});

const ExploreOtherRegion = () => {
  const classes = useStyles();
  const { plan_id } = useParams();
  const [placeItem, setPlaceItem] = useState([]);

  const [addList, setAddList] = useState([]);
  const [removeList, setRemoveList] = useState([]);
  const [regions, setRegions] = useState([]);
  const [filter, setFilter] = useState([]);
  const [navigateBool, setNavigateBool] = useState(false);

  const postUpdateHandler = (event) => {
    console.log(addList);
    console.log(removeList);
    axios
      .post(
        `${baseURL}plan/update?plan_id=${plan_id}`,
        {
          add: addList,
          remove: removeList,
          regions: regions,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        setNavigateBool(true);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  };

  useEffect(() => {
    axios
      .get(`${baseURL}plan/explore/other?plan_id=${plan_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((resp) => {
        console.log(resp.data);
        setPlaceItem(resp.data);
        let temp = [];
        temp = resp.data[0].tags_places_activities.map((item) => {
          return {
            tag_id: item.tag_id,
            tag_title: item.tag_name,
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
      <SideBar />
      
      <div className={classes.postcard}>
        <Typography
          color="black"
          style={{
            fontFamily: "Special Elite",
            fontSize: "200%",
            textAlign: "center",
            //marginTop: "5%",
          }}
        >
          Explore Other Regions
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={4}>
            <TagBar tags={filter} setTags={setFilter} />
          </Grid>
          <Grid item xs={8} container direction="column" spacing={4} style={{marginTop: "3%"}}>
            {placeItem.map((pl) => (
              // <div>
                <ThingsToDo
                  item={pl}
                  filter={filter}
                  addedList={setAddList}
                  setRegions={setRegions}
                />
              // </div>
            ))}
          </Grid>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            // marginTop= "5%"
            //  marginLeft= "30%"
            marginBottom="40%"
          >
            <Button
              onClick={postUpdateHandler}
              className="btn"
              //type="submit"
              style={{
                backgroundColor: "rgba(178, 222, 39,0.5)",
                borderWidth: "5px",
                borderColor: "white",
                borderRadius: "200%",
                //marginLeft: "500%",
              }}
              variant="outlined"
              // fullWidth
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
            {navigateBool && (
              <Link to={`/FullTour/${plan_id}`}>
                <Button
                  className="btn"
                  style={{
                    backgroundColor: "rgba(13, 180, 185,0.5)",
                    borderWidth: "5px",
                    borderColor: "white",
                    borderRadius: "200%",
                    //marginLeft: "500%",
                  }}
                  variant="outlined"
                  // fullWidth
                >
                  <Typography
                    color="black"
                    style={{
                      fontFamily: "Special Elite",
                      fontSize: "200%",
                      textAlign: "center",
                    }}
                  >
                    {" "}
                    View Updated Plan
                  </Typography>
                </Button>
              </Link>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default ExploreOtherRegion;
