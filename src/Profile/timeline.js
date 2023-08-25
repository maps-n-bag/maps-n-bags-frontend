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
    //marginTop: "25rem",
    //marginLeft: "-80rem",
    // marginRight: "-800px",
    alignItems: "center",
  },
  root: {
    backgroundColor: "rgba(246, 193, 70 ,0.7)",
    height: "100%",
    width: "100%",
    // marginLeft: "-2rem",
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
    // marginTop: "-7rem",
    //  marginLeft: "-1rem",
    // marginRight: "-5rem",
    // height: "100%",
    width: "100%",
    fontFamily: "Special Elite",
  },
  btn: {
    marginTop: "300%",
    marginLeft: "30%",
    marginBottom: "20%",
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
          width="30%"
          alt="Profile"
          style={
            {
              //marginTop: "5%",
              //   marginLeft: "60%",
            }
          }
        />
        <div className={classes.boxdp}>
          <Grid>
            <img
              src={itemBasic.profile_pic}
              width="30%"
              alt="Profile"
              style={{
                marginTop: "20%",
                marginLeft: "20%",
              }}
            />
            <br />
            <Typography
              color="black"
              style={{
                fontFamily: "Special Elite",
                fontSize: "150%",
                textAlign: "center",
                // marginTop: "80%",
                marginLeft: "28%",
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
        </div>
        <div>
          <Grid>
            <div className={classes.btn}>
              {isEditingBasic === true ? (
                <div>
                  <Button
                    //className={classes.btns}
                    onClick={(e) => {
                      setIsEditingBasic(false);
                      console.log(itemBasic);
                      axios
                        .put(`${baseURL}user?id=${itemBasic.id}`, itemBasic)
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
                    // className={classes.btnc}
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
                      cancel
                    </Typography>
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
                  <Typography
                    color="black"
                    style={{
                      fontFamily: "Special Elite",
                      fontSize: "20px",
                      textAlign: "center",
                    }}
                  >
                    Edit Your Profile
                  </Typography>
                </Button>
              )}
            </div>
          </Grid>
        </div>
      </div>
    </div>
  );
};
export default Profile;
