import React from "react";
import { makeStyles } from "@mui/styles";
import coverimg from "../Images/coverimg.jpg";
import List from "@mui/material/List";
//import axios from "axios";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useEffect, useState } from "react";
import dpimg from "../Images/dp.png";
import { Typography } from "@mui/material";
import { EditText, EditTextarea } from "react-edit-text";
import Box from "@mui/material/Box";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import ReplyOutlinedIcon from "@mui/icons-material/ReplyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
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
    backgroundImage: `url(${coverimg})`,
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
}));
const TimeLine = () => {
  // const id = localStorage.getItem("id");
  const [itemBasic, setItemBasic] = useState([]);

  const [isEditingBasic, setIsEditingBasic] = useState(false);

  const classes = useStyles();
  // useEffect(() => {
  //   fetch(`http://localhost:8080/api/staff/${id}`)
  //     .then((resp) => resp.json())
  //     .then((resp) => {
  //       setItemBasic(resp.data[0]);
  //       console.log(resp.data[0]);
  //     });
  // }, []);

  return (
    <div className={classes.root}>
      <div className={classes.coverpic}>
        <div className={classes.header}>
          <Box width={1540} height={100} bgcolor="rgba(0, 0, 0, 0.7)">
            <Box display="flex">
              <Box>
                <ReplyOutlinedIcon
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "50px",
                    marginLeft: "40rem",
                    // marginRight: "-80 rem",
                    marginTop: "1rem",
                    color: "white",
                  }}
                />
              </Box>
              <Box>
                <HouseOutlinedIcon
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "50px",
                    marginLeft: "4rem",
                    // marginRight: "-80 rem",
                    marginTop: "1rem",
                    color: "white",
                  }}
                />
              </Box>
              <Box>
                <AccountCircleOutlinedIcon
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "50px",
                    marginLeft: "4rem",
                    // marginRight: "-80 rem",
                    marginTop: "1rem",
                    color: "white",
                  }}
                />
                {/* <Typography
                  color="white"
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "10px",
                    marginLeft: "-80px",
                    //marginTop: "-80rem",
                    //  textAlign: "center",
                  }}
                >
                  Log in
                </Typography> */}
              </Box>
              <Box>
                <NoteAltOutlinedIcon
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "50px",
                    marginLeft: "4rem",
                    marginTop: "1rem",
                    color: "white",
                  }}
                />
                {/* <Typography
                  color="white"
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "10px",
                    marginLeft: "56rem",
                    marginTop: "-0.5rem",
                    textAlign: "center",
                  }}
                >
                  Sign up
                </Typography> */}
              </Box>
              <Box>
                <Typography
                  color="white"
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "20px",
                    marginLeft: "-45rem",
                    marginTop: "4rem",
                    textAlign: "center",
                  }}
                >
                  Back
                </Typography>
              </Box>
              <Box>
                <Typography
                  color="white"
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "20px",
                    marginLeft: "-32rem",
                    marginTop: "4rem",
                    textAlign: "center",
                  }}
                >
                  Home
                </Typography>
              </Box>
              <Box>
                <Typography
                  color="white"
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "20px",
                    marginLeft: "-18rem",
                    marginTop: "4rem",
                    textAlign: "center",
                  }}
                >
                  Log In
                </Typography>
              </Box>

              <Box>
                <Typography
                  color="white"
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "20px",
                    marginLeft: "-4rem",
                    marginTop: "4rem",
                    textAlign: "center",
                  }}
                >
                  Register
                </Typography>
              </Box>
            </Box>
          </Box>
        </div>
        <div className={classes.boxdp}>
          <img src={dpimg} alt="Profile" height="300vh" />
          <ListItem>
            <ListItemText
              primary={
                <Typography
                  color="black"
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "50px",
                    textAlign: "center",
                    marginTop: "23rem",
                    marginLeft: "-18rem",
                  }}
                >
                  John Doe
                </Typography>
              }
            />

            {/* {isEditingBasic === true ? (
                <input
                  type="text"
                  defaultValue={itemBasic.NAME}
                  name="name"
                  placeholder="Enter name"
                  onChange={(e) => (itemBasic.NAME = e.target.value)}
                />
              ) : (
                <ListItemText primary={itemBasic.NAME} />
              )} */}
          </ListItem>
        </div>
      </div>
    </div>
  );
};
export default TimeLine;
