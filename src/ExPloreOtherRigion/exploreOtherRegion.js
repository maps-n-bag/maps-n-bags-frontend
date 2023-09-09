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
    height: "90%",
    width: "112%",
    backgroundColor: "rgba(250, 233, 171, 0.6)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  btn: {
    minWidth: "100%",
    marginLeft: "15%",
  },

  postcard: {
    //height: "100%",
    // width: "95%",
    // Height: "50%",
    //marginLeft: "15%",
    // marginRight: "20%",
  },
  cardimg: {
    backgroundColor: "#ff5722",
    overflow: "hidden",
  },

  // img: {
  //   height: "100%",
  //   position: "centre",
  // },
  cardimg: {
    // height: "100%",
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

  //console.log(placeItem);

  return (
    <div className={classes.places}>
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
          {" "}
          Explore Other Regions{" "}
        </Typography>
        <Grid item container spacing={10}>
          <Grid item>
            <TagBar tags={filter} setTags={setFilter} />
          </Grid>
          {placeItem.map((pl) => (
            <div>
              <Grid item container spacing={10}>
                {/* Use Grid items to contain each card */}

                

            <Grid item xs={10}>
                  <ThingsToDo
                    item={pl}
                    filter={filter}
                    addedList={setAddList}
                    setRegions={setRegions}
                  />
                </Grid>
              </Grid>
            </div>
          ))}

          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            // marginTop= "5%"
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
