import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Card,
  ButtonBase,
  Typography,
} from "@mui/material";


import { makeStyles } from "@mui/styles";
import { ca } from "date-fns/locale";

const baseURL = process.env.REACT_APP_BASE_URL;
const timeformat = require("../formateTime");
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

const RestaurantCard = (props) => {
  const classes = useStyles();
  const cardsData = props.item;
  const [placeItem, setPlaceItem] = useState({});
  useEffect(() => {
      fetch(`${baseURL}public/nearby/restaurant?place_id=${cardsData.event.place_id}`)
        .then((resp) => resp.json())
        .then((resp) => {
          setPlaceItem(resp);
        })
        .catch((rejected) => {
          console.log(rejected);
        });
  }, [cardsData.event.place_id]);

  //console.log(placeItem);

  return (
    <div className={classes.places}>
      <div className={classes.postcard}>
        <Card
          className={classes.cardimg}
          style={{
            width: "40%",
           // marginLeft: "10%",
            marginTop: "2%",
            color: "fffff",
          }}
        >
          <Grid container spacing={5}>
            <Grid item xs={30} sm container>
              <Grid
                item
                xs
                container
                direction="column"
                spacing={2}
                sm={20}
                // md={20}
                // lg={15}
              >
                <Grid item>
                   {/* suggested restaurant header */}
                   <Typography
                    gutterBottom
                    variant="subtitle1"
                    component="div"
                    sx={{ cursor: "pointer" }}
                    style={{
                      // fontFamily: "Special Elite",
                      fontSize: "150%",
                      color: "black",
                      marginLeft: "10%",
                      marginTop: "10%",
                      // textAlign: "center",
                    }}
                  >
                    Suggested Restaurant
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    component="div"
                    sx={{ cursor: "pointer" }}
                    style={{
                      // fontFamily: "Special Elite",
                      fontSize: "110%",
                      color: "black",
                      marginLeft: "10%",
                      marginTop: "10%",
                      // textAlign: "center",
                    }}
                  >
                    {placeItem.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                    component="div"
                    style={{
                      //fontFamily: "Special Elite",
                      fontSize: "100%",
                      color: "black",
                      marginLeft: "10%",
                      // textAlign: "center",
                    }}
                  >
                    Rating: {placeItem.rating}/5.0
                    <br /> (total votes: {placeItem.rating_count})
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Link to={`/PlaceDetails/${cardsData.event.place_id}`}>
                <ButtonBase sx={{ width: "70%", height: "70%" }}>
                  <img
                    style={{
                      width: "100%",
                     // height: "100%",
                      marginLeft: "35%",
                      //marginTop: "45%",
                      //textAlign: "right",
                    }}
                    alt="place_image"
                    src={placeItem.images}
                  />
                </ButtonBase>
              </Link>
            </Grid>
          </Grid>
        </Card>
      </div>
    </div>
  );
};

export default RestaurantCard;
