import React from "react";
import { makeStyles } from "@mui/styles";
import coverimg from "../photos/coverimg.jpg";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useEffect, useState } from "react";
import dpimg from "../photos/dp.png";
import { Typography } from "@mui/material";
import SideBar from "../App drawer/sideBar";
import Box from "@mui/material/Box";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Card, CardActions, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ButtonBase } from "@mui/material";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";
// firebase
import { storage } from "../firebase";
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { BackspaceOutlined, EditNote, SaveOutlined } from "@mui/icons-material";

const { formatDate } = require("../formatDate");
const baseURL = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles((theme) => ({
  boxdp: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    alignContent: "center",
    backgroundPosition: "center center",
    //backgroundImage: `url(${dpimg})`,
    borderRadius: "100px",
    display: "flex",
    //justifyContent: "center",
    display: "flex",
    marginTop: "-10%",
    marginLeft: "45%",
    // marginRight: "-800px",
    alignItems: "center",
  },
  edit: {
    // marginTop: "3%",
    marginLeft: "60%",
  },
  root: {
    //backgroundColor: "rgba(246, 193, 70 ,0.7)",
    // height: "100%",
    width: "100%",
    // marginLeft: "-2rem",
  },
  name: {
    //marginLeft: "40%",
    display: "flex",
    flexDirection: "row",
    marginLeft: "4%",
  },
  header: {
    // marginLeft: "-57rem",
    //  marginTop: "-22rem",
    backgroundAttachment: "fixed",
  },
  coverpic: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    //backgroundImage: `url(${coverimg})`,
    backgroundPosition: "center center",
    backgroundAttachment: "fixed",
    alignContent: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    //marginTop: "-5%",
    // marginLeft: "-20%",
    // marginRight: "-5rem",
    //height: "200%",
    // width: "100%",
    fontFamily: "Special Elite",
  },
  plans: {
    width: "100%",
    marginLeft: "20%",
  },
  // btn: {
  //   marginTop: "300%",
  //   marginLeft: "30%",
  //   marginBottom: "20%",
  // },
}));

const Profile = () => {
  const { user_id } = useParams();
  const [itemBasic, setItemBasic] = useState([]);
  const [isEditingBasic, setIsEditingBasic] = useState(false);
  const [plans, setPlans] = useState([]);

  const classes = useStyles();
  // Get a reference to the button and the target element
  // const scrollButton = document.getElementById("scrollButton");
  // const targetElement = document.getElementById("targetElement");

  // // Add a click event listener to the button
  // scrollButton.addEventListener("click", function () {
  //   // Scroll to the target element with a smooth animation
  //   targetElement.scrollIntoView({ behavior: "smooth" });
  // });

  // Get a reference to the button and the target div
  // const scrollButton = document.getElementById("scrollButton");
  // const targetDiv = document.getElementById("targetDiv");

  // // Add a click event listener to the button
  // scrollButton.addEventListener("click", function () {
  //   // Calculate the position of the target div relative to the viewport
  //   const rect = targetDiv.getBoundingClientRect();

  //   // Scroll to the top of the target div with a smooth animation
  //   window.scrollTo({
  //     top: rect.top + window.scrollY,
  //     behavior: "smooth",
  //   });
  // });
  useEffect(() => {
    axios
      .get(`${baseURL}user?id=${user_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        localStorage.setItem("userImage", res.data.profile_pic);
        setItemBasic(res.data);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        if (error.response) {
          console.log(error.response.data);
        }
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${baseURL}plan/all?user_id=${user_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        setPlans(res.data);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        if (error.response) {
          console.log(error.response.data);
        }
      });
  }, []);

  return (
    <div className={classes.root}>
      <SideBar />
      <div className={classes.coverpic}>
        <img src={itemBasic.cover_pic} width="50%" alt="Profile" />

        {isEditingBasic && (
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              const storageRef = ref(
                storage,
                `cover_pics/${user_id}-${file.name}`
              );
              uploadBytes(storageRef, file).then((snapshot) => {
                console.log("Uploaded a blob or file!");
                getDownloadURL(
                  ref(storage, `cover_pics/${user_id}-${file.name}`)
                ).then((url) => {
                  console.log(url);
                  const newBasic = { ...itemBasic };
                  newBasic.cover_pic = url;
                  setItemBasic(newBasic);
                });
              });
            }}
          />
        )}
      </div>
      <div className={classes.boxdp}>
        <img
          src={itemBasic.profile_pic}
          width="20%"
          alt="Profile"
          // style={{
          //   marginTop: "20%",
          //   marginLeft: "0%",
          // }}
        />
        {isEditingBasic && (
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files[0];
              const storageRef = ref(
                storage,
                `profile_pics/${user_id}-${file.name}`
              );
              uploadBytes(storageRef, file).then((snapshot) => {
                console.log("Uploaded a blob or file!");
                getDownloadURL(
                  ref(storage, `profile_pics/${user_id}-${file.name}`)
                ).then((url) => {
                  console.log(url);
                  const newBasic = { ...itemBasic };
                  newBasic.profile_pic = url;
                  setItemBasic(newBasic);
                  console.log(itemBasic);
                });
              });
            }}
          />
        )}
        <br />
      </div>
      <div>
        <Typography
          color="black"
          style={{
            fontFamily: "Special Elite",
            fontSize: "150%",
            textAlign: "center",
            // marginTop: "80%",
            marginLeft: "45%",
            display: "inline-block",
          }}
        >
          {" "}
          <Grid
            className={classes.name}
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            {isEditingBasic === true ? (
              <div>
                <input
                  type="text"
                  defaultValue={itemBasic.first_name}
                  name="first_name"
                  placeholder="Enter first name"
                  onChange={(e) => (itemBasic.first_name = e.target.value)}
                />
                <input
                  type="text"
                  defaultValue={itemBasic.last_name}
                  name="last_name"
                  placeholder="Enter last name"
                  onChange={(e) => (itemBasic.last_name = e.target.value)}
                />
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "row" }}>
                {itemBasic.first_name} {itemBasic.last_name}
              </div>
            )}

            {/* {itemBasic.first_name} {itemBasic.last_name} */}
          </Grid>
        </Typography>
      </div>

      <div className={classes.edit}>
        {isEditingBasic === true ? (
          <div>
            <Button
              //className={classes.btns}
              onClick={(e) => {
                setIsEditingBasic(false);
                console.log(itemBasic);
                axios
                  .put(`${baseURL}user?id=${itemBasic.id}`, itemBasic, {
                    headers: {
                      Authorization: `Bearer ${localStorage.getItem(
                        "accessToken"
                      )}`,
                    },
                  })
                  .then((res) => {
                    // window.location.reload(false);
                    console.log(itemBasic);
                    console.log("sent");
                  })
                  .catch((error) => {
                    console.error("An error occurred:", error);
                  });
              }}
            >
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{
                  marginTop: "20%",
                }}
              >
                <SaveOutlined
                  style={{
                    fontSize: "250%",
                  }}
                />{" "}
                <Typography
                  color="black"
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "150%",
                    textAlign: "center",
                  }}
                >
                  Save
                </Typography>
              </Grid>
            </Button>
            <Button
              // className={classes.btnc}
              onClick={(e) => {
                {
                  setIsEditingBasic(false);
                }
              }}
            >
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{
                  marginTop: "20%",
                }}
              >
                <BackspaceOutlined
                  style={{
                    fontSize: "250%",
                  }}
                />{" "}
                <Typography
                  color="black"
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "150%",
                    textAlign: "center",
                  }}
                >
                  Cancel
                </Typography>
              </Grid>
            </Button>
          </div>
        ) : (
          <Button
            //className={classes.btn}
            onClick={(e) => {
              {
                setIsEditingBasic(true);
              }
            }}
          >
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              style={{
                marginTop: "-20%",
              }}
            >
              <EditNote
                style={{
                  fontSize: "250%",
                }}
              />{" "}
              <Typography
                color="black"
                style={{
                  fontFamily: "Special Elite",
                  fontSize: "150%",
                  textAlign: "center",
                }}
              >
                Edit
              </Typography>
            </Grid>
          </Button>
        )}
      </div>
      <Button
        id="scrollButton"
        style={{
          marginTop: "-4%",
          marginLeft: "25%",
        }}

        //className={classes.btn}
      >
        {/** here we want to show a list of plans this user has created */}
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          // style={{
          //   marginTop: "-2%",
          //   marginLeft: "35%",
          // }}
        >
          <SlideshowOutlinedIcon />
          <Typography
            variant="h4"
            style={{
              fontSize: "150%",
              textAlign: "center",
              //marginTop: "-2%",
              // marginLeft: "-30%",
              fontFamily: "Special Elite",
            }}
          >
            View Your Plans
          </Typography>
        </Grid>
      </Button>
      <Typography
        variant="h4"
        style={{
          fontSize: "150%",
          textAlign: "center",
          marginTop: "13%",
          // marginLeft: "-30%",
          fontFamily: "Special Elite",
        }}
      >
        Your Plans
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="left"
        alignItems="left"
        className={classes.plans}
      >
        {plans.map((plan) => (
          <div className={classes.postcard}>
            {/* <img src={img_arr} alt="Image" className={classes.img} /> */}
            <Card
              className={classes.cardimg}
              style={{
                width: "70%",
                marginLeft: "5%",
                color: "ffffff",
                marginTop: "4.5%",
              }}
            >
              <CardContent>
                {/* <Typography variant="h5">View Overview Plan</Typography> */}
                <img
                  src={plan.image}
                  // alt={name_arr}
                  style={{ width: "90%", height: "80%", marginLeft: "5%" }}
                  // Adjust the percentage value as needed
                />

                <Typography
                  variant="head"
                  style={{
                    // fontFamily: "Special Elite",
                    fontSize: "100%",
                    color: "black",
                    marginLeft: "6%",
                    // textAlign: "center",
                  }}
                >
                  {" "}
                  {plan.title}
                </Typography>
                <Typography
                  variant="body1"
                  style={{
                    fontSize: "100%",
                    marginLeft: "6%",
                    //textAlign: "center",
                  }}
                >
                  {" "}
                  {formatDate(plan.start_date)} to {formatDate(plan.end_date)}
                </Typography>
                <Typography
                  variant="body2"
                  style={{
                    fontSize: "100%",
                    marginLeft: "6%",
                    // textAlign: "center",
                  }}
                >
                  {" "}
                  {plan.description}
                </Typography>
                <a href={`/FullTour/${plan.id}`}>
                  <Button
                    size="small"
                    className={classes.btn}
                    style={{
                      fontSize: "1em",
                      marginLeft: "5%",
                      marginTop: "5%",
                    }}
                  >
                    View
                  </Button>
                </a>
                <Button
                  size="small"
                  className={classes.btn}
                  onClick={(e) => {
                    axios
                      .delete(`${baseURL}plan?id=${plan.id}`, {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                          )}`,
                        },
                      })
                      .then((res) => {
                        window.location.reload(false);
                        setPlans(plans.filter((p) => p.id !== plan.id));
                      })
                      .catch((error) => {
                        console.error("An error occurred:", error);
                      });
                  }}
                  style={{
                    fontSize: "1em",
                    marginLeft: "5%",
                    marginTop: "5%",
                  }}
                >
                  Delete
                </Button>
              </CardContent>
              <CardActions></CardActions>
            </Card>
          </div>
        ))}
      </Grid>
    </div>
  );
};
export default Profile;
