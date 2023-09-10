import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Grid, Typography } from "@mui/material";
import TagPlaceActivity from "./tagPlaceActivity";
import TagBar from "./tagBar";
import Button from "@mui/material/Button";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import SideBar from "../App drawer/sideBar";
import { useThemeContext } from '../ThemeContext'; 
const baseURL = process.env.REACT_APP_BASE_URL;

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
  const navigate = useNavigate();

  const { plan_id } = useParams();
  const [placeItem, setPlaceItem] = useState([]);
  const { theme, toggleThemeMode } = useThemeContext();
  const [addList, setAddList] = useState([]);
  const [removeList, setRemoveList] = useState([]);
  const [currentRegions, setCurrentRegions] = useState([]);
  const [tagFilter, setTagFilter] = useState([]);
  const [regionsFilter, setRegionsFilter] = useState([]);

  const postUpdateHandler = (event) => {
    axios
      .post(
        `${baseURL}plan/update?plan_id=${plan_id}`,
        {
          add: addList,
          remove: removeList,
          regions: currentRegions,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((resp) => {
        navigate(`/FullTour/${plan_id}`);
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
            id: item.tag_id,
            name: item.tag_name,
            isShow: false,
          };
        });
        setTagFilter(temp);
        const t = resp.data.map((reg) => {
          return { id: reg.region_id, name: reg.region_name, isShow: false };
        });
        setRegionsFilter(t);
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
          color="black"
          style={{
            fontFamily: "Special Elite",
            fontSize: "200%",
            textAlign: "center",
            marginBottom: "5%",
          }}
        >
          Explore Nearby Regions
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={3} style={{ maxWidth: "300px" }}>
            <TagBar tags={tagFilter} setTags={setTagFilter} regions={regionsFilter} setRegions={setRegionsFilter} />
          </Grid>
          <Grid item xs={9} container direction="column" spacing={1}>
            {placeItem.map((pl) => (
              <>
                {getRegBool(regionsFilter, pl.region_id) && (
                  <TagPlaceActivity
                    item={pl}
                    filter={tagFilter}
                    addedList={setAddList}
                    setRegions={setCurrentRegions}
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

const getRegBool = (regionsFilter, region_id) => {
  let temp = regionsFilter.filter((item) => item.id === region_id);
  return temp[0].isShow;
};

export default ExploreOtherRegion;
