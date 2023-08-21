import React from "react";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

import CardActions from "@mui/material/CardActions";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import PlaceCard from "./placecard4";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import axios from "axios";

import { makeStyles } from "@mui/styles";
import SideBar from "../App drawer/sideBar";
import { ScheduleOutlined } from "@mui/icons-material";
const dateformat = require("../formateDate");
const timeformat = require("../formateTime");
const baseURL = "https://maps-n-bags.onrender.com/api/";
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
    width: "100%",
    //Height: "50%",
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
    height: "100%",
  },
  cardSetup: {
    width: "100%",
  },
});

const ContentCards = (props) => {
  const classes = useStyles();
  const cardsData = [props.item];

  let eventID = null;
  if (props.item.event != null) {
    eventID = props.item.event.id;
    console.log(eventID);
  }
  const [checked, setChecked] = useState(false);
  const handleChange = (e) => {
    setChecked(e.target.checked);
  };
  //const [isEditingBasic, setIsEditingBasic] = useState(false);
  const defaultImages = [
    {
      url: " ",
    },
  ];
  const [Images, setImages] = useState(defaultImages);

  const handleImageChange = (event) => {
    event.preventDefault();
    const tempImages = [...Images];
    tempImages[event.target.dataset.id][event.target.name] = event.target.value;

    setImages(tempImages);
  };

  const addNewImages = (event) => {
    event.preventDefault();
    setImages((prevImages) => [...prevImages, { url: "" }]);
  };

  const { handleSubmit, register, getValues, setValue } = useForm();

  const handleAddValue = () => {
    // Manually add a value to the form
    if (props.item.event != null) {
      setValue("checked", checked);
      setValue("images" , Images)
      //setValue("id", 1);
      //setValue("event_id", eventID);
    }
  };

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data, e);
    const values = getValues();
    console.log(values);
    if (cardsData.event != null) {
      axios
        .put(`${baseURL}event/detail?event_id=${cardsData.event.id}`, values)
        .then((response) => {
          // if (response.data.accessToken) {
          //   localStorage.setItem("accessToken", response.data.accessToken);
          //   if (response.data.id) localStorage.setItem("id", response.data.id);
          //   console.log(localStorage.getItem("accessToken"));
          //   window.location.reload(false);
          // }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const onError = (errors, e) => console.log(errors, e);
  //console.log(cardsData);
  //cardsData.map((card, index) => console.log(card.event.start_time));

  return (
    <div className={classes.places}>
      <div className={classes.postcard}>
        {/* <img src={img_arr} alt="Image" className={classes.img} /> */}
        <Grid
          container
          spacing={2}
          style={{
            width: "100%",
            // marginLeft: "7%",
            color: "ffffff",
            marginTop: "1%",
          }}
        >
          {cardsData.map((card, index) => (
            <Grid item key={index} xs={12} sm={6} md={5} lg={5}>
              {card.event != null ? (
                <div>
                  <Card className={classes.cardSetup}>
                    <CardContent>
                      <Grid
                        container
                        spacing={1}
                        style={{
                          width: "100%",
                          marginLeft: "7%",
                          color: "ffffff",
                          marginTop: "1%",
                        }}
                      >
                        <Grid item xs>
                          <ScheduleOutlined
                            style={{
                              color: "black",
                              marginTop: "6%",
                              // textAlign: "center",
                            }}
                          />

                          <Typography
                            variant="head"
                            style={{
                              //fontFamily: "Special Elite",
                              fontSize: "100%",
                              color: "black",
                              marginTop: "6%",
                              marginRight: "10%",
                              // textAlign: "center",
                            }}
                          >
                            {" "}
                            {timeformat.formateTime(
                              card.event.start_time
                            )} to {timeformat.formateTime(card.event.end_time)}
                          </Typography>

                          <PlaceCard item={card.event.place_id} />
                        </Grid>
                        <Grid item xs>
                          <Box
                            className={classes.bx}
                            width="100%"
                            bgcolor="rgba(255, 255, 255, 0.2)" // 60% transparent black
                          >
                            <form onSubmit={handleSubmit(onSubmit, onError)}>
                              <div className={classes.input}>
                                <br />
                                <Checkbox
                                  checked={checked}
                                  onChange={handleChange}
                                  inputProps={{ "aria-label": "controlled" }}
                                  style={{
                                    //fontFamily: "Special Elite",
                                    fontSize: "100%",
                                    color: "black",
                                    marginBottom: "2%",
                                    marginTop: "3%",

                                    // textAlign: "center",
                                  }}
                                />{" "}
                                Visited the place
                                <div className={classes.wrap}>
                                  <Typography
                                    variant="head"
                                    style={{
                                      //fontFamily: "Special Elite",
                                      fontSize: "100%",
                                      color: "black",
                                      // marginLeft: "3%",
                                      marginTop: "3%",

                                      // textAlign: "center",
                                    }}
                                  >
                                    How was your day?
                                  </Typography>
                                  <div className={classes.content1}>
                                    <TextField
                                      {...register("note")}
                                      className="note"
                                      label="note"
                                      color="secondary"
                                      placeholder="Enter 60/100 words"
                                      halfWidth
                                      style={{
                                        //fontFamily: "Special Elite",
                                        fontSize: "80%",
                                        color: "black",
                                        // marginLeft: "3%",
                                        marginRight: "4%",
                                        marginTop: "3%",

                                        // textAlign: "center",
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className={classes.wrap}>
                                  <Typography
                                    variant="head"
                                    style={{
                                      //fontFamily: "Special Elite",
                                      fontSize: "100%",
                                      color: "black",
                                      marginTop: "3%",
                                      // marginLeft: "3%",

                                      // textAlign: "center",
                                    }}
                                  >
                                    Write your Whole experience
                                  </Typography>
                                  <div className={classes.content1}>
                                    <TextField
                                      {...register("generated_details")}
                                      className="details"
                                      label="details"
                                      color="secondary"
                                      placeholder="Write details"
                                      halfWidth
                                      style={{
                                        //fontFamily: "Special Elite",
                                        fontSize: "100%",
                                        color: "black",
                                        marginTop: "3%",
                                        // marginLeft: "3%",
                                        //marginBottom: "6%",
                                        marginRight: "10%",

                                        // textAlign: "center",
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className={classes.wrap}>
                                  <Typography
                                    variant="head"
                                    style={{
                                      //fontFamily: "Special Elite",
                                      fontSize: "100%",
                                      color: "black",
                                      // marginLeft: "3%",

                                      // textAlign: "center",
                                    }}
                                  >
                                    How much was the whole cost?
                                  </Typography>
                                  <div className={classes.content1}>
                                    <TextField
                                      {...register("expenditure")}
                                      className="expenditure"
                                      label="expenditure"
                                      color="secondary"
                                      placeholder="Write expenditure"
                                      halfWidth
                                      style={{
                                        //fontFamily: "Special Elite",
                                        fontSize: "100%",
                                        color: "black",
                                        //marginLeft: "3%",
                                        marginBottom: "6%",
                                        marginTop: "3%",

                                        // textAlign: "center",
                                      }}
                                    />
                                  </div>
                                </div>
                                <div className={classes.wrap}>
                                  <Typography
                                    variant="head"
                                    style={{
                                      //fontFamily: "Special Elite",
                                      fontSize: "100%",
                                      color: "black",
                                      // marginLeft: "3%",

                                      // textAlign: "center",
                                    }}
                                  >
                                    Upload an Image
                                  </Typography>
                                  <div className={classes.content1}>
                                    {/* <TextField
                                      {...register("images")}
                                      className="image"
                                      label="image"
                                      color="secondary"
                                      placeholder="Give a link of your image"
                                      halfWidth
                                      style={{
                                        //fontFamily: "Special Elite",
                                        fontSize: "100%",
                                        color: "black",
                                        //marginLeft: "3%",
                                        marginBottom: "6%",
                                        marginTop: "3%",

                                        // textAlign: "center",
                                      }}
                                    /> */}

                                    {Images.map((item, index) => (
                                      <div className="table-row" key={index}>
                                        <div className="table-data">
                                          <input
                                            name="name"
                                            data-id={index}
                                            type="text"
                                            value={item.name}
                                            onChange={handleImageChange}
                                          />
                                        </div>
                                      </div>
                                    ))}
                                    <div className="table-row">
                                      <div className="table-data">
                                        <button onClick={addNewImages}>
                                          +
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                  <div className={classes.wrap}>
                                    <div className={classes.btn}>
                                      <Button
                                        className="btn"
                                        type="submit"
                                        style={{
                                          backgroundColor: "transparent",
                                          borderWidth: "2px",
                                          borderColor: "black",
                                        }}
                                        variant="outlined"
                                        halfWidth
                                        onClick={handleAddValue}
                                      >
                                        <Typography
                                          color="black"
                                          style={{
                                            fontFamily: "Special Elite",
                                            fontSize: "20px",
                                            textAlign: "center",
                                          }}
                                        >
                                          Save
                                        </Typography>
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </Box>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <Typography
                  variant="head"
                  style={{
                    // fontFamily: "Special Elite",
                    fontSize: "100%",
                    color: "black",
                    //marginLeft: "6%",
                    // textAlign: "center",
                  }}
                >
                  {" "}
                </Typography>
              )}
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default ContentCards;
