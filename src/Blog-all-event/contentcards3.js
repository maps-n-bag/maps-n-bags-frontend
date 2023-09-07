import React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { v4 } from "uuid";

// components
import SideBar from "../App drawer/sideBar";

// material ui
import CardActions from "@mui/material/CardActions";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import PlaceCard from "./placecard4";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import Box from "@mui/material/Box";
import { makeStyles } from "@mui/styles";
import { ScheduleOutlined } from "@mui/icons-material";

// firebase
import { storage } from "../firebase";
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

const timeformat = require("../formatTime");
const baseURL = process.env.REACT_APP_BASE_URL;
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
    width: "70vw",
  },
});

const ContentCards = (props) => {
  // console.log("content card props", props);

  const eventID = props.item.event.id;
  const classes = useStyles();
  const cardsData = [props.item];
  const [inputError, setInputError] = useState(false);
  const [isEditingBasic, setIsEditingBasic] = useState(false);
  const [itemBasic, setItemBasic] = useState([]);

  const blogImages = {};
  const [blogImageUrls, setBlogImageUrls] = useState([]);

  const planId = props.item.event.plan_id;
  const userId = 27; // localStorage.getItem("id");
  const directory = `blog-images/plan-${planId}/event-${eventID}/`;

  useEffect(() => {
    axios
      .get(`${baseURL}event/detail?event_id=${eventID}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((resp) => {
        setItemBasic(resp.data);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response?.data);
      });
  }, []);

  useEffect(() => {
    listAll(ref(storage, directory)).then((images) => {
      images.items.forEach((image) => {
        getDownloadURL(image).then((url) => {
          // console.log(url);
          if (!blogImageUrls.includes(url)) {
            const newImages = [...blogImageUrls];
            newImages.push(url);
            setBlogImageUrls(newImages);
          }
        });
      });
    });
  }, [isEditingBasic]);

  const handleImageChange = (event) => {
    event.preventDefault();
    // let images = [...blogImageUrls];
    // images[event.target.dataset.id] = event.target.files[0];
    // setBlogImageUrls(images);

    blogImages[event.target.dataset.id] = event.target.files[0];
  };

  const addNewImages = (event) => {
    event.preventDefault();
    setBlogImageUrls((prevImages) => [...prevImages, null]);
  };

  const { handleSubmit, register, getValues, setValue } = useForm();

  const onSubmit = (data, e) => {
    setValue("note", itemBasic.note);
    setValue("generated_details", itemBasic.generated_details);
    setValue("expenditure", itemBasic.expenditure);
    setValue("checked", true);

    e.preventDefault();

    setIsEditingBasic(false);
    axios
      .put(
        `${baseURL}event/detail?event_id=${props.item.event.id}`,
        getValues(),
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        setIsEditingBasic(false);
        setItemBasic(getValues());
      })
      .catch((error) => {
        console.log(error);
      });

    // upload image to firebase
    Object.values(blogImages).forEach((image) => {
      // check if it's a valid image file
      if (!image.type.startsWith("image/")) {
        return;
      }

      const newMetadata = { contentType: image.type };
      const storageRef = ref(storage, `${directory}${v4()}`);
      uploadBytes(storageRef, image, newMetadata).then((snapshot) => {
        console.log("Uploaded a blob or file!");
        const url = snapshot.metadata.fullPath;

        if (!blogImageUrls.includes(url)) {
          setBlogImageUrls((data) => [...data, url]);
        }
      });
    });
  };

  const onError = (errors, e) => console.log(errors, e);

  if (props.item.event == null) {
    return <div></div>;
  }

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
                          {timeformat.formatTime(card.event.start_time)} to{" "}
                          {timeformat.formatTime(card.event.end_time)}
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

                                  {/* <input
                                      type="currency"
                                      defaultValue={itemBasic.expenditure}
                                      name="expenditure"
                                      placeholder={itemBasic.expenditure}
                                      onChange={(e) =>
                                        (itemBasic.expenditure = e.target.value)
                                      }
                                    /> */}

                                  <input
                                    type="text" // Use "text" type for input
                                    defaultValue={itemBasic.expenditure}
                                    name="expenditure"
                                    placeholder={itemBasic.expenditure}
                                    onChange={(e) => {
                                      const inputValue = e.target.value;
                                      const parsedValue =
                                        parseFloat(inputValue);

                                      if (!isNaN(parsedValue)) {
                                        // Only assign if parsedValue is a valid number
                                        itemBasic.expenditure = parsedValue;
                                        setInputError(false); // Reset error state
                                      } else {
                                        setInputError(true); // Show error
                                      }
                                    }}
                                  />

                                  {inputError && (
                                    <p style={{ color: "red" }}>
                                      Please enter a valid number
                                    </p>
                                  )}
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
                                  {blogImageUrls.map((image, index) => (
                                    <div className="table" key={index}>
                                      <div className="table-row">
                                        <div className="table-data">
                                          {image ? (
                                            <div>
                                              <img
                                                src={image}
                                                alt="image"
                                                width="100px"
                                              />
                                              <Button
                                                onClick={() => {
                                                  const newImages = [
                                                    ...blogImageUrls,
                                                  ];
                                                  newImages.splice(index, 1);
                                                  setBlogImageUrls(newImages);

                                                  // delete from blogImages too
                                                  delete blogImages[index];

                                                  // delete from firebase
                                                  const storageRef = ref(
                                                    storage,
                                                    image
                                                  );
                                                  deleteObject(storageRef)
                                                    .then(() => {
                                                      console.log(
                                                        "File deleted successfully"
                                                      );
                                                    })
                                                    .catch((error) => {
                                                      console.log(
                                                        "Uh-oh, an error occurred!"
                                                      );
                                                      console.log(error);
                                                    });
                                                }}
                                              >
                                                Remove
                                              </Button>
                                            </div>
                                          ) : (
                                            <input
                                              type="file"
                                              name="image"
                                              data-id={index}
                                              onChange={handleImageChange}
                                              style={{
                                                marginTop: "5%",
                                              }}
                                            />
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                  <div className="table-row">
                                    <div className="table-data">
                                      <button onClick={addNewImages}>+</button>
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
                                          itemBasic.checked = true;
                                        }
                                      }}
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
                                  </div>
                                ) : (
                                  <div> Didn't visit The Place </div>
                                )}

                                <div className={classes.content1}>
                                  {blogImageUrls.map((image, index) => (
                                    <div className="table" key={index}>
                                      <div className="table-row">
                                        <div className="table-data">
                                          {image && (
                                            <div>
                                              <img
                                                src={image}
                                                alt="image"
                                                width="100px"
                                              />
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>

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
                                    onClick={() => {
                                      setIsEditingBasic(true);
                                    }}
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
