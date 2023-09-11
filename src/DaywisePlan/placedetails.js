import React from "react";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import { Grid, Card, CardContent, Typography, TextField } from "@mui/material";
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
import { styled } from "@mui/material/styles";
import SideBar from "../App drawer/sideBar";
import { useThemeContext } from '../ThemeContext'; 
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
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

  const VisuallyHiddenInput = styled('input')`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
  `;

  const classes = useStyles();
  const { place_id } = useParams();
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
  }, [ place_id ]);

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
    console.log("data", data)

    const toBeSubmitted = { ...newItemBasic };
    toBeSubmitted.user_id = localStorage.getItem("userId");
    toBeSubmitted.images = [];
    if (newItemBasic.images != null) {
      newItemBasic.images.forEach((image) => {
        if (image != null) {
          toBeSubmitted.images.push(image);
        }
      });
    }
    toBeSubmitted.comment = newItemBasic.comment;
    setNewItemBasic(toBeSubmitted);
    console.log(toBeSubmitted);

    axios
      .post(`${baseURL}public/place/review?place_id=${place_id}`, toBeSubmitted, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        setAddReview(false);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleImageChange = (event) => {
    event.preventDefault();

    // upload to firebase
    const image = event.target.files[0];
    const newMetadata = { contentType: image.type };
    const storageRef = ref(storage, `${directory}${v4()}`);
    uploadBytes(storageRef, image, newMetadata)
      .then((snapshot) => {
        console.log("Uploaded a blob or file!");

        getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then((url) => {
          console.log("url after download", url);

          setNewItemBasic((prev) => {
            return {
              ...prev,
              images: [url],
            };
          });
        });
      })
      .catch((error) => {
        console.log("Uh-oh, an error occurred!", error);
      });
  };

  return (
    <div className={classes.places}>
      <SideBar theme={theme} toggleTheme={toggleThemeMode} />
      <div className={classes.postcard}>
        <Card
          style={{
            width: "80%",
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
                  {itemBasic.title}
                </Typography>
              </Grid>
              <Grid item xs={5}>
                {itemBasic.description && (
                  <Typography variant="subtitle1">
                    Description: {itemBasic.description}
                  </Typography>
                )}
                <br />
                {itemBasic.address && (
                  <Typography variant="body1" >
                    Address: {itemBasic.address}
                  </Typography>
                )}
                <br />

                {itemBasic.region_name && (
                  <Typography variant="body1" >
                    Region Name: {itemBasic.region_name}
                  </Typography>
                )}
                <br />

                {itemBasic.contact && (
                  <Typography variant="body1" >
                    Contact: {itemBasic.contact}
                  </Typography>
                )}
                <br />

                {itemBasic.website && (
                  <Typography variant="body1">
                    Website: {itemBasic.website}
                  </Typography>
                )}

                <Button
                  variant="outlined"
                  size="small"
                  style={{ marginLeft: "5%", marginTop: "5%" }}
                  onClick={() => setShowReview(!showReview)}
                  color="info"
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
                  color="info"
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
                    <>
                      <TextField variant="outlined" value={newItemBasic.comment}
                        label="Write Review" minRows={2} multiline={true} fullWidth={true}
                        id="comment"
                        name="comment"
                        onChange={(e) => {
                          setNewItemBasic((prev) => {
                            return {
                              ...prev,
                              comment: e.target.value,
                            };
                          });
                        }}
                      />
                      <div>
                        <Button
                          // style={{ position: "relative", top: "25%", left: "50%", transform: "translate(-50%, -50%)" }}
                          component="label"
                          variant="contained"
                          startIcon={<CloudUploadIcon />}
                        >
                          Upload Image
                          <VisuallyHiddenInput type="file" accept="image/*" onChange={handleImageChange} />
                        </Button>
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
                          color="success"
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
                    </>
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
