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
import PlanCard from "../Plan/planCard";

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
    backgroundColor: "rgba(0, 0, 0 ,0.05)",
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

  const handleTogglePublic = (plan_id) => {
    setPlans(plans.map((p) => {
      if (p.id === plan_id) {
        p.public = !p.public;
      }
      return p;
    }));

    axios.put(`${baseURL}plan/edit/public?plan_id=${plan_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((res) => {
      console.log("sent");
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
  }

  const handlePlanDelete = (plan_id) => {
    axios
      .delete(`${baseURL}plan?id=${plan_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        window.location.reload(false);
        setPlans(plans.filter((p) => p.id !== plan_id));
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }

  const handlePlanEdit = (plan) => {
    axios.put(`${baseURL}plan/edit?plan_id=${plan.id}`, plan, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
    .then((res) => {
      console.log("sent");
      setPlans(plans.map((p) => {
        if (p.id === plan.id) {
          p = plan;
        }
        return p;
      }));
    }).catch((error) => {
      console.error("An error occurred:", error);
    });
  }

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
        style={{
          marginTop: "-4%",
          marginLeft: "25%",
        }}
        onClick={(e) => {
          window.location.href = "#plans";
        }}
      >
        {/** here we want to show a list of plans this user has created */}
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
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
        id="plans"
        variant="h4"
        style={{
          fontSize: "150%",
          textAlign: "center",
          marginTop: "13%",
          fontFamily: "Special Elite",
        }}
      >
        Your Plans
      </Typography>
      <Grid container spacing={2} sx={{ marginLeft: "15%", width: "80%" }} justifyContent="center">
        {plans.map((plan) => (
          <PlanCard plan={plan} togglePublic={handleTogglePublic} deletePlan={handlePlanDelete} editPlan={handlePlanEdit} />
        ))}
      </Grid>
    </div>
  );
};
export default Profile;
