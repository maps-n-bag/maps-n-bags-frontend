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
import { storage } from "../Firebase/firebase";
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";

const timeformat = require("../formatTime");
const baseURL = process.env.REACT_APP_BASE_URL;

const ContentCards = (props) => {
  const eventID = props.item.event.id;
  const cardsData = [props.item];
  const [inputError, setInputError] = useState(false);
  const [isEditingBasic, setIsEditingBasic] = useState(false);
  const [itemBasic, setItemBasic] = useState({});

  const planId = props.item.event.plan_id;
  const directory = `blog-images/plan-${planId}/event-${eventID}/`;

  // get event details & images from backend
  useEffect(() => {
    axios
      .get(`${baseURL}event/detail?event_id=${eventID}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((resp) => {
        setItemBasic(resp.data);
        console.log(itemBasic);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response?.data);
      });
  }, [isEditingBasic]);

  const handleImageChange = (event) => {
    event.preventDefault();

    // upload to firebase
    const image = event.target.files[0];
    if (!image || !image.type.startsWith("image/")) {
      console.log("No valid image file selected");
      return;
    }
    const newMetadata = { contentType: image.type };
    const storageRef = ref(storage, `${directory}${v4()}`);
    uploadBytes(storageRef, image, newMetadata)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!");

        getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then((url) => {
          console.log("url after download", url);

          const newImages = [...itemBasic.images];
          newImages[event.target.dataset.id] = url;
          setItemBasic((prev) => {
            return {
              ...prev,
              images: newImages,
            };
          });
        });
      })
      .catch((error) => {
        console.log("Uh-oh, an error occurred!", error);
      });
  };

  const handleAddImage = (event) => {
    event.preventDefault();

    setItemBasic((prev) => {
      return {
        ...prev,
        images: [...prev.images, null],
      };
    });
  };

  const { handleSubmit } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();

    const newItemBasic = { ...itemBasic };
    newItemBasic.checked = true;
    newItemBasic.note = data.note;
    newItemBasic.generated_details = data.generated_details;
    newItemBasic.expenditure = data.expenditure;
    newItemBasic.images = [];
    newItemBasic.images.forEach((image) => {
      if (image != null) {
        newItemBasic.images.push(image);
      }
    });
    setItemBasic(newItemBasic);

    console.log("before axios put", itemBasic);

    axios
      .put(
        `${baseURL}event/detail?event_id=${props.item.event.id}`,
        itemBasic,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((response) => {
        setIsEditingBasic(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRemoveImage = (event) => {
    event.preventDefault();

    const image = event.target.previousSibling.src;

    const newBlogImages = [...itemBasic.images];
    const index = newBlogImages.indexOf(image);
    if (index > -1) {
      newBlogImages.splice(index, 1);
    }

    const storageRef = ref(storage, image);
    deleteObject(storageRef)
      .then(() => {
        console.log("File deleted successfully");
        setItemBasic((prev) => {
          return {
            ...prev,
            images: newBlogImages,
          };
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onError = (errors, e) => console.log(errors, e);

  if (itemBasic.images === undefined) {
    return <div></div>;
  }

  return (
    <div>
      <div>
        <Grid
          container
          spacing={2}
          style={{
            width: "100%",
            marginLeft: "30%",
            color: "ffffff",
            marginTop: "1%",
          }}
        >
          {cardsData.map((card, index) => (
            <Grid item key={index} xs={12} sm={6} md={5} lg={5}>
              <div>
                <Card>
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

                            marginTop: "6%",
                            marginRight: "10%",
                            // textAlign: "center",
                          }}
                        >
                          {" "}
                          {timeformat.formatTime(card.event.start_time)} to{" "}
                          {timeformat.formatTime(card.event.end_time)}
                        </Typography>

                        <PlaceCard
                          item={card.event.place_id}
                          activity={card.event.activity}
                        />
                      </Grid>
                      <Grid item xs>
                        <Box
                          width="100%"
                          // bgcolor="rgba(255, 255, 255, 0.2)" // 60% transparent black
                        >
                          {isEditingBasic === true ? (
                            <form onSubmit={handleSubmit(onSubmit, onError)}>
                              <div>
                                <div>
                                  <Typography
                                    variant="head"
                                    style={{
                                      //fontFamily: "Special Elite",
                                      fontSize: "100%",

                                      // marginLeft: "3%",
                                      marginTop: "3%",

                                      // textAlign: "center",
                                    }}
                                  >
                                    How was your day?
                                  </Typography>
                                  <div>
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

                              <div>
                                <Typography
                                  variant="head"
                                  style={{
                                    //fontFamily: "Special Elite",
                                    fontSize: "100%",

                                    // marginLeft: "3%",

                                    // textAlign: "center",
                                  }}
                                >
                                  How much was the whole cost?
                                </Typography>
                                <div>
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
                              <div>
                                <Typography
                                  variant="head"
                                  style={{
                                    //fontFamily: "Special Elite",
                                    fontSize: "100%",

                                    // marginLeft: "3%",

                                    // textAlign: "center",
                                  }}
                                >
                                  Upload an Image
                                </Typography>
                                <div>
                                  {itemBasic.images.map((image, index) => (
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
                                                onClick={handleRemoveImage}
                                                color="error"
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
                                  {/* <div className="table-row">
                                    <div className="table-data"> */}
                                  <Button
                                    onClick={handleAddImage}
                                    color="success"
                                    variant="outlined"
                                    size="small"
                                    style={{ margin: "5px" }}
                                  >
                                    +
                                  </Button>
                                  {/* </div>
                                  </div> */}
                                </div>
                                <div>
                                  <div>
                                    <Button
                                      className="btn"
                                      type="submit"
                                      style={{
                                        backgroundColor: "transparent",
                                        borderWidth: "2px",
                                        // borderColor: "black",
                                      }}
                                      variant="outlined"
                                      halfWidth
                                      onClick={(e) => {
                                        {
                                          itemBasic.checked = true;
                                        }
                                      }}
                                    >
                                      <Typography
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
                                        // borderColor: "black",
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
                              {itemBasic.checked == true ? (
                                <div>
                                  <CheckCircleOutlineRoundedIcon /> Visited The
                                  Place{" "}
                                  <div>
                                    <Typography
                                      variant="h6"
                                      style={{
                                        fontSize: "100%",

                                        marginTop: "3%",
                                      }}
                                    >
                                      Note:<b> {itemBasic.note}</b>
                                    </Typography>
                                  </div>
                                  <div>
                                    <Typography
                                      variant="h6"
                                      style={{
                                        fontSize: "100%",

                                        marginTop: "5%",
                                      }}
                                    >
                                      {itemBasic.generated_details}
                                    </Typography>
                                  </div>
                                  <div>
                                    <Typography
                                      variant="h6"
                                      style={{
                                        //fontFamily: "Special Elite",
                                        fontSize: "100%",

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

                              <div>
                                {itemBasic.images.map((image, index) => (
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

                              <div>
                                <Button
                                  className="btn"
                                  type="submit"
                                  style={{
                                    backgroundColor: "transparent",
                                    borderWidth: "2px",
                                    // borderColor: "black",
                                  }}
                                  variant="outlined"
                                  halfWidth
                                  onClick={() => {
                                    setIsEditingBasic(true);
                                  }}
                                >
                                  <Typography
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
