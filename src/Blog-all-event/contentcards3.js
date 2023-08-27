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
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
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
  const [isEditingBasic, setIsEditingBasic] = useState(false);
  const [itemBasic, setItemBasic] = useState([]);
  // console.log("isedit check" + isEditingBasic);
  let eventID = null;
  if (props.item.event != null) {
    eventID = props.item.event.id;
  }
  console.log("check" + itemBasic.checked);
  console.log(cardsData);
  useEffect(() => {
    fetch(`${baseURL}event/detail?event_id=${eventID}`)
      .then((resp) => resp.json())
      .then((resp) => {
        setItemBasic(resp);
        console.log(resp);
      });
  }, []);

  // const handleChange = (e) => {
  //   //itemBasic.checked = e.target.checked;

  //   setChecked(e.target.checked);
  //   //console.log(e.target.checked);
  //   //itemBasic.checked = checked;
  // };

  const handleEdit = (e) => {
    setIsEditingBasic(true);
  };

  // const handleSave = (e) => {
  //   setIsEditingBasic(false);
  //   //itemBasic.checked= true;
  // };

  const defaultImages = [
    {
      url: "",
    },
  ];
  const [Images, setImages] = useState(defaultImages);
  // const [checked, setChecked] = useState(itemBasic.checked);
  console.log(itemBasic.checked);
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

  // const handleAddValue = () => {
  //   // Manually add a value to the form
  //   if (props.item.event != null) {
  //     setValue("checked", checked);
  //     setValue("images" , Images.map((item) => item.name));
  //     //setValue("id", 1);
  //     //setValue("event_id", eventID);
  //   }
  // };

  const onSubmit = (data, e) => {
    if (props.item.event != null) {
      setValue("note", itemBasic.note);
      setValue("generated_details", itemBasic.generated_details);
      setValue("expenditure", itemBasic.expenditure);
      setValue("checked", true);

      setValue(
        "images",
        Images.map((item) => item.name)
      );
      //setValue("id", 1);
      //setValue("event_id", eventID);
    }

    e.preventDefault();
    console.log(data, e);
    const values = getValues();
    console.log(values);
    console.log(values.images);
    // if (cardsData.event != null) {
    console.log("axios will run");
    setIsEditingBasic(false);
    axios
      .put(`${baseURL}event/detail?event_id=${props.item.event.id}`, values)
      .then((response) => {
        setIsEditingBasic(false);

        setItemBasic(values);
        // if (response.data.accessToken) {
        //   localStorage.setItem("accessToken", response.data.accessToken);
        //   if (response.data.id) localStorage.setItem("id", response.data.id);
        //   console.log(localStorage.getItem("accessToken"));
        //window.location.reload(false);
        // }
      })
      .catch((error) => {
        console.log(error);
      })
      .then(() => {
        console.log("sent");
      });
    // } else {
    //   console.log("no axios");
    // }
  };
  const onError = (errors, e) => console.log(errors, e);
  //console.log(cardsData);
  //cardsData.map((card, index) => console.log(card.event.start_time));

  return (
    <div className={classes.places}>
      <div className={classes.postcard}>
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
                          {isEditingBasic === true ? (
                            <form onSubmit={handleSubmit(onSubmit, onError)}>
                              <div className={classes.input}>
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
                                    {/* <TextField
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
                                    /> */}

                                    <input
                                      type="text"
                                      defaultValue={itemBasic.note}
                                      name="note"
                                      placeholder={itemBasic.note}
                                      onChange={(e) =>
                                        (itemBasic.note = e.target.value)
                                      }
                                    />
                                  </div>
                                </div>
                                {/* <div className={classes.wrap}>
                                  <Typography
                                    variant="head"
                                    style={{
                                      //fontFamily: "Special Elite",
                                      fontSize: "100%",
                                      color: "black",
                                      marginTop: "3%",
                                    }}
                                  >
                                    Write your Whole experience
                                  </Typography>
                                  <div className={classes.content1}>
                                    {/* <TextField
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

                                        marginRight: "10%",

                                        // textAlign: "center",
                                      }}
                                    /> */}
                                    <input
                                      type="text"
                                      defaultValue={itemBasic.generated_details}
                                      name="note"
                                      placeholder={itemBasic.generated_details}
                                      onChange={(e) =>
                                        (itemBasic.generated_details =
                                          e.target.value)
                                      }
                                    />
                                  </div>
                                </div> */}
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
                                    {/* <TextField
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
                                    /> */}

                                    <input
                                      type="currency"
                                      defaultValue={itemBasic.expenditure}
                                      name="expenditure"
                                      placeholder={itemBasic.expenditure}
                                      onChange={(e) =>
                                        (itemBasic.expenditure = e.target.value)
                                      }
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
                                        onClick={(e) => {
                                          {
                                            itemBasic.checked= true;
                                          }
                                        }
                                        }
                                        //onClick={handleSave}
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
                                        onClick={(e) => {
                                          {
                                            setIsEditingBasic(false);
                                          }
                                        }}
                                      >
                                        {" "}
                                        <Typography
                                          color="black"
                                          style={{
                                            fontFamily: "Special Elite",
                                            fontSize: "20px",
                                            textAlign: "center",
                                          }}
                                        >
                                          Cancel
                                        </Typography>
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </form>
                          ) : (
                            <div>
                              <div className={classes.input}>
                                {itemBasic.checked == true ? (
                                  <div>
                                    <CheckCircleOutlineRoundedIcon /> Visited
                                    The Place{" "}
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
                                        Note:<b> {itemBasic.note}</b>
                                      </Typography>
                                    </div>
                                    <div className={classes.wrap}>
                                      <Typography
                                        variant="head"
                                        style={{
                                          //fontFamily: "Special Elite",
                                          fontSize: "100%",
                                          color: "black",
                                          // marginLeft: "3%",
                                          marginTop: "5%",

                                          // textAlign: "center",
                                        }}
                                      >
                                        {itemBasic.generated_details}
                                      </Typography>
                                    </div>
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
                                        Total Cost: {itemBasic.expenditure}
                                      </Typography>
                                    </div>
                                    {/* <div className={classes.wrap}>
                                    (
                                    {(itemBasic.images).map((img,index) => (
                                      <img
                                        src={`url${img}`}
                                        // alt={name_arr}
                                        style={{
                                          width: "95%",
                                          marginTop: "5%",
                                        }}
                                        // Adjust the percentage value as needed
                                      />
                                    ))}
                                    )
                                  </div> */}
                                  </div>
                                ) : (
                                  <div> Didn't visit The Place </div>
                                )}
                                <div className={classes.wrap}>
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
                                    onClick={handleEdit}
                                  >
                                    <Typography
                                      color="black"
                                      style={{
                                        fontFamily: "Special Elite",
                                        fontSize: "20px",
                                        textAlign: "center",
                                      }}
                                    >
                                      Edit
                                    </Typography>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default ContentCards;
