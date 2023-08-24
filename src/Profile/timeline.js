import React from "react";
import { makeStyles } from "@mui/styles";
import coverimg from "../photos/coverimg.jpg";
import List from "@mui/material/List";
//import axios from "axios";
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
const baseURL = "https://maps-n-bags.onrender.com/api/";

const useStyles = makeStyles((theme) => ({
  boxdp: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    alignContent: "center",
    backgroundPosition: "center center",
    //backgroundImage: `url(${dpimg})`,
    borderRadius: "100%",
    display: "flex",
    //justifyContent: "center",
    display: "flex",
    marginTop: "25rem",
    marginLeft: "-80rem",
    // marginRight: "-800px",
    alignItems: "center",
  },
  root: {
    backgroundColor: "rgba(246, 193, 70 ,0.7)",
    height: "300vh",
    width: "215.5vh",
    marginLeft: "-2rem",
  },
  header: {
    marginLeft: "-57rem",
    marginTop: "-22rem",
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
    marginTop: "-7rem",
    marginLeft: "-1rem",
    marginRight: "-5rem",
    height: "90vh",
    width: "218vh",
    fontFamily: "Special Elite",
  },
  btns: {
    marginTop: "70%",
  },
}));

const Profile = () => {
  // const id = localStorage.getItem("id");
  const { user_id } = useParams();
  const [itemBasic, setItemBasic] = useState([]);

  const [isEditingBasic, setIsEditingBasic] = useState(false);

  const classes = useStyles();
  useEffect(() => {
    fetch(`${baseURL}user?id=${user_id}`)
      .then((resp) => resp.json())
      .then((resp) => {
        setItemBasic(resp);
        console.log(resp);
      });
  }, []);

  return (
    <div className={classes.root}>
      <SideBar />
      <div className={classes.coverpic}>
        <img
          src={itemBasic.cover_pic}
          width="40%"
          alt="Profile"
          style={{
            marginTop: "5%",
            //   marginLeft: "60%",
          }}
        />
        <div className={classes.boxdp}>
          <Grid>
            <img
              src={itemBasic.profile_pic}
              width="30%"
              alt="Profile"
              style={{
                marginTop: "20%",
                marginLeft: "80%",
              }}
            />

            <Typography
              color="black"
              style={{
                fontFamily: "Special Elite",
                fontSize: "150%",
                textAlign: "center",
                // marginTop: "80%",
                marginLeft: "85%",
                display: "inline-block",
              }}
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
                <Typography>
                  {itemBasic.first_name} {itemBasic.last_name}
                </Typography>
              )}
              {/* {itemBasic.first_name} {itemBasic.last_name} */}
            </Typography>
          </Grid>

          {isEditingBasic === true ? (
            <div>
              <button
                className={classes.btns}
                onClick={(e) => {
                  setIsEditingBasic(false);
                  console.log(itemBasic.id);
                  axios
                    .patch(
                      `${baseURL}user?id=${itemBasic.id}`,

                      itemBasic
                    )
                    .then((res) => {
                     // window.location.reload(false);
                      console.log(itemBasic);
                    })
                    .catch((error) => {
                      console.error("An error occurred:", error);
                    });
                }}
              >
                Save
              </button>
              <button
                className={classes.btnc}
                onClick={(e) => {
                  {
                    setIsEditingBasic(false);
                  }
                }}
              >
                cancel
              </button>
            </div>
          ) : (
            <button
              className={classes.btn}
              onClick={(e) => {
                {
                  setIsEditingBasic(true);
                }
              }}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Profile;
