import React from "react";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import { Grid, Card, CardContent, Typography } from "@mui/material";
import ShowReview from "./showreview";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { v4 } from "uuid";
import { useForm } from "react-hook-form";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import axios from "axios";
import { storage } from "../Firebase/firebase";
import { makeStyles } from "@mui/styles";
import SideBar from "../App drawer/sideBar";
import { useThemeContext } from '../ThemeContext'; 
const baseURL = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles({
  places: {
    backgroundColor: "rgba(0, 0, 0 ,0.05)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "100vh",
  },

  postcard: {
    marginLeft: "20%",
    marginTop: "5%",
  },
});

const PlaceDetails = () => {
  const classes = useStyles();
  const { place_id } = useParams();
  const [inputError, setInputError] = useState(false);
  const [addReview, setAddReview] = useState(false);
  const [itemBasic, setItemBasic] = useState([]);
  const { handleSubmit } = useForm();
  const directory = `review-images/place-${place_id}/`;
  const [newItemBasic, setNewItemBasic] = useState([]);
  const { theme, toggleThemeMode } = useThemeContext();
  const [showReview, setShowReview] = useState(false);
  useEffect(() => {
    axios
      .get(`${baseURL}public/place?id=${place_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((resp) => {
        setItemBasic(resp.data);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  }, []);
  console.log(itemBasic);
  const onError = (errors, e) => console.log(errors, e);
  useEffect(() => {
    axios
      .get(`${baseURL}public/place/review?place_id=${place_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((resp) => {
        setShowReview(resp.data);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  }, []);

  const onSubmit = (data, e) => {
    e.preventDefault();
    // const newItemBasic = { ...newItemBasic };
    // newItemBasic.checked = true;
    // newItemBasic.note = data.note;
    // newItemBasic.generated_details = data.generated_details;
    // newItemBasic.expenditure = data.expenditure;
    newItemBasic.user_id = localStorage.getItem("user_id");
    //newItemBasic.place_id = id;
    //newItemBasic.title = data.title;

    newItemBasic.images = [];
    newItemBasic.images.forEach((image) => {
      if (image != null) {
        newItemBasic.images.push(image);
      }
    });
    newItemBasic.comment = data.comment;
    setNewItemBasic(newItemBasic);
   
    console.log(newItemBasic);
    axios
      .put(`${baseURL}public/place/review?place_id=${place_id}`, newItemBasic, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        setAddReview(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddImage = (event) => {
    event.preventDefault();

    setNewItemBasic((prev) => {
      return {
        ...prev,
        images: [...prev.images, null],
      };
    });
  };

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

  const handleRemoveImage = (event) => {
    event.preventDefault();

    const image = event.target.previousSibling.src;

    const newBlogImages = [...newItemBasic.images];
    const index = newBlogImages.indexOf(image);
    if (index > -1) {
      newBlogImages.splice(index, 1);
    }

    const storageRef = ref(storage, image);
    deleteObject(storageRef)
      .then(() => {
        console.log("File deleted successfully");
        setNewItemBasic((prev) => {
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

  // console.log(review);
 
  return (
    <div className={classes.places}>
      <SideBar theme={theme} toggleTheme={toggleThemeMode} />
      <div className={classes.postcard}>
        <Card
          style={{
            width: "70%",
            marginLeft: "7%",
            color: "ffffff",
            marginTop: "4.5%",
          }}
        >
          <CardContent>
            <Grid container spacing={5}>
              <Grid item xs={10} sm container>
                <img
                  src={itemBasic.images}
                  style={{ width: "90%", height: "80%", marginLeft: "2%" }}
                />

                <Typography
                  variant="head"
                  style={{
                    fontSize: "150%",
                  

                    textAlign: "center",
                  }}
                >
                  {" "}
                  {itemBasic.title}
                </Typography>
              </Grid>{" "}
              <Grid item xs={5}>
                {itemBasic.description && (
                  <Typography
                    variant="head"
                    style={{
                      fontSize: "120%",
                     
                      marginLeft: "6%",
                      marginTop: "10%",
                    }}
                  >
                    {" "}
                    <b>Description: </b>
                    {itemBasic.description}
                  </Typography>
                )}
                <br />
                {itemBasic.address && (
                  <Typography
                    variant="head"
                    style={{
                      fontSize: "120%",
                     
                      marginLeft: "6%",
                      marginTop: "20%",
                    }}
                  >
                    {" "}
                    <b>Address: </b>
                    {itemBasic.address}
                  </Typography>
                )}
                <br />

                {itemBasic.region_name && (
                  <Typography
                    variant="head"
                    style={{
                      fontSize: "120%",
                     
                      marginLeft: "6%",
                      marginTop: "20%",
                    }}
                  >
                    {" "}
                    <b>Region Name: </b>
                    {itemBasic.region_name}
                  </Typography>
                )}
                <br />

                {itemBasic.contact && (
                  <Typography
                    variant="head"
                    style={{
                      fontSize: "120%",
                   
                      marginLeft: "6%",
                      marginTop: "20%",
                    }}
                  >
                    {" "}
                    <b>Contact: </b>
                    {itemBasic.contact}
                  </Typography>
                )}
                <br />

                {itemBasic.website && (
                  <Typography
                    variant="head"
                    style={{
                      fontSize: "120%",
                   
                      marginLeft: "6%",
                      marginTop: "20%",
                      // textAlign: "center",
                    }}
                  >
                    {" "}
                    <b>Website: </b>
                    {itemBasic.website}
                  </Typography>
                )}

                <Button
                  variant="outlined"
                  size="small"
                  style={{ marginLeft: "5%", marginTop: "5%" }}
                  onClick={() => setShowReview(!showReview)}
                >
                  <Typography
                 
                    style={{
                      fontFamily: "Special Elite",
                      fontSize: "20px",
                      textAlign: "center",
                    }}
                  >
                    {showReview ? "Hide" : "Show"} Review
                  </Typography>
                </Button>

                <Button
                  variant="outlined"
                  size="small"
                  style={{ marginLeft: "5%", marginTop: "5%" }}
                  onClick={() => setAddReview(!addReview)}
                >
                  <Typography
                   
                    style={{
                      fontFamily: "Special Elite",
                      fontSize: "20px",
                      textAlign: "center",
                    }}
                  >
                    {addReview ? "Cancel" : "Add A Review"}
                  </Typography>
                </Button>

                {addReview && (
                  <form onSubmit={handleSubmit(onSubmit, onError)}>
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
                        Add A Review
                      </Typography>
                      <div>
                        <input
                          type="text"
                          defaultValue=""
                          name="comment"
                          //placeholder={newItemBasic.review}
                          onChange={(e) =>
                            (newItemBasic.comment = e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Typography
                          variant="head"
                          style={{
                            //fontFamily: "Special Elite",
                            fontSize: "100%",
                          
                        
                          }}
                        >
                          Upload an Image
                        </Typography>
                        <input
                          type="file"
                          name="image"
                          // data-id={index}
                          onChange={handleImageChange}
                          style={{
                            marginTop: "5%",
                          }}
                        />
                      </div>

                      <div>
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
                      </div>
                    </div>
                  </form>
                )}
              </Grid>
            </Grid>
          </CardContent>
          <CardActions></CardActions>
        </Card>

        {showReview && <ShowReview place_id={place_id} />}
      </div>
    </div>
  );
};

export default PlaceDetails;
