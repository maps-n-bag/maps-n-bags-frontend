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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { TextField } from "@mui/material";

// firebase
import { storage } from "../Firebase/firebase";
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
    borderRadius: "100px",
    display: "flex",
    display: "flex",
    marginTop: "-10%",
    marginLeft: "45%",
    alignItems: "center",
  },
  edit: {
    marginLeft: "60%",
  },
  root: {
    backgroundColor: "rgba(0, 0, 0 ,0.05)",
    width: "100%",
    minHeight: "100vh",
  },
  name: {
    display: "flex",
    flexDirection: "row",
    marginLeft: "4%",
  },
  header: {
    backgroundAttachment: "fixed",
  },
  coverpic: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    backgroundAttachment: "fixed",
    alignContent: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  postcard: {
    marginTop: "2%",
    marginLeft: "5%",
  },
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

  const handleImageUpload = (type, event) => {
    const image = event.target.files[0];
    const storageRef = ref(storage, `${type}/${user_id}/${type}`);
    uploadBytes(storageRef, image).then((snapshot) => {
      console.log("Uploaded a blob or file!");

      getDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log("File available at", downloadURL);
        if (type === "cover") {
          setItemBasic({ ...itemBasic, cover_pic: downloadURL });
        } else if (type === "profile") {
          setItemBasic({ ...itemBasic, profile_pic: downloadURL });
        }
      });
    }).catch((error) => {
      console.log(error);
    });
  }

  const handleSave = () => {
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
        console.log("sent");
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  }


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

  return (
    <div className={classes.root}>
      <SideBar />

      <div className={classes.postcard}>

        <div className={classes.coverpic}>
          <img src={itemBasic.cover_pic} width="50%" alt="Cover" style={{ opacity: isEditingBasic ? "0.3" : "1" }} />
          {isEditingBasic && (
            <Button
              style={{ position: "absolute", top: "32%", left: "50%", transform: "translate(-50%, -50%)" }}
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              size="small"
            >
              Change Cover Photo
              <VisuallyHiddenInput type="file" accept="image/*" onChange={(event) => { handleImageUpload("cover", event) }} />
            </Button>
          )}
        </div>

        <div className={classes.boxdp}>
          <img src={itemBasic.profile_pic} width="20%" alt="Profile" style={{ opacity: isEditingBasic ? "0.3" : "1" }} />
          {isEditingBasic && (
            <Button
              style={{ position: "relative" }}
              component="label"
              variant="contained"
              startIcon={<CloudUploadIcon />}
              size="small"
            >
              Change Profile Picture
              <VisuallyHiddenInput type="file" accept="image/*" onChange={(event) => { handleImageUpload("profile", event) }} />
            </Button>
          )}
          <br />
        </div>

        <div style={{ margin: "auto", width: "80%", textAlign: "center", marginTop: "10px", marginBottom: "10px" }}>
          {isEditingBasic ? (
            <div>
              <TextField variant="outlined" value={itemBasic.first_name} label="First Name" style={{ marginRight: "10px" }}
                onChange={(e) => { setItemBasic({ ...itemBasic, first_name: e.target.value }) }} />
              <TextField variant="outlined" value={itemBasic.last_name} label="Last Name"
                onChange={(e) => { setItemBasic({ ...itemBasic, last_name: e.target.value }) }} />
            </div>
          ) : (
            <Typography
              color="black"
              style={{
                fontFamily: "Special Elite",
                fontSize: "150%",
                textAlign: "center",
                display: "inline-block",
              }}
            >
              {itemBasic.first_name} {itemBasic.last_name}
            </Typography>
          )}
        </div>


        <div className={classes.edit}>
          {isEditingBasic ? (
            <div>
              <Button onClick={handleSave} startIcon={<SaveOutlined style={{ fontSize: "250%" }} />}>
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
              </Button>
              <Button onClick={(e) => setIsEditingBasic(false)} startIcon={<BackspaceOutlined style={{ fontSize: "250%" }} />}>
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
              </Button>
            </div>
          ) : (
            <Button onClick={(e) => setIsEditingBasic(true)} startIcon={<EditNote style={{ fontSize: "250%" }} />}>
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
          <SlideshowOutlinedIcon />
          <Typography
            variant="h4"
            style={{
              fontSize: "150%",
              textAlign: "center",
              fontFamily: "Special Elite",
            }}
          >
            View Your Plans
          </Typography>
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
        <Grid container spacing={2} sx={{ margin: "auto", width: "80%" }} justifyContent="left">
          {plans.map((plan) => (
            <PlanCard plan={plan} togglePublic={handleTogglePublic} deletePlan={handlePlanDelete} editPlan={handlePlanEdit} />
          ))}
        </Grid>
      </div>
    </div>
  );
};
export default Profile;
