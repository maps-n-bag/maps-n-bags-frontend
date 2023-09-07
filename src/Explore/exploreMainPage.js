import React from "react";
import Img from "../photos/tt.jpg";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Typography } from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import ConnectWithoutContactOutlinedIcon from "@mui/icons-material/ConnectWithoutContactOutlined";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SideBar from "../App drawer/sideBar";
import TimeLine from "../Profile/timeline";
import cp from "../photos/c.png";
import pp from "../photos/para.png";
import cr from "../photos/cr.png";
import { useParams } from "react-router-dom";
const baseURL = process.env.REACT_APP_BASE_URL;
const useStyles = makeStyles((theme) => ({
  bx: {
    alignContent: "center",
    marginTop: "-20rem",
    //marginBottom: "50rem",
  },

  root: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundImage: `url(${Img})`,
    backgroundPosition: "center center",
    backgroundAttachment: "fixed",
    alignContent: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    //marginBottom: "10%",
    marginLeft: "-1rem",
    marginRight: "-2rem",
    height: "100vh",
    fontFamily: "Special Elite",
  },

  boxrow: {
    marginBottom: "10%",
  },
}));
export default function ExploreMain() {
  const classes = useStyles();
  const { plan_id } = useParams();
  const navigate = useNavigate();
  const RowOfBoxes = () => {
    return (  
      <Box display="flex" justifyContent="center">
        <Link to={`/`}>
          <Box width="100%" bgcolor="rgba(245, 230, 83, 0.8)" m={5} p={6}>
            <div>
              <img
                src={cp}
                style={{
                  fontFamily: "Special Elite",
                  //fontSize: "20px",
                  width: "200px",
                  marginLeft: "2%",
                  marginRight: "2%",
                  //color: "white",
                }}
              />
              <Typography
                color="black"
                style={{
                  fontFamily: "Special Elite",
                  fontSize: "150%",
                  textAlign: "center",
                }}
              >
                View Side Tours
              </Typography>
            </div>
          </Box>
        </Link>
        <Link to={`/ThingsToDo/${plan_id}`}>
          <Box width="100%" bgcolor="rgba(300, 77, 0, 0.8)" m={5} p={6}>
            <div>
              <img
                src={pp}
                style={{
                  fontFamily: "Special Elite",
                  //fontSize: "20px",
                  width: "130px",
                  marginLeft: "10%",
                  //color: "white",
                }}
              />
              <Typography
                color="black"
                style={{
                  fontFamily: "Special Elite",
                  fontSize: "150%",
                  // textAlign: "center",
                }}
              >
                Things to Do Here
              </Typography>
            </div>
          </Box>
        </Link>
        <Link to={`/`}>
          <Box width="100%" bgcolor="rgba(0, 230, 83, 0.8)" m={5} p={6}>
            <div>
              <img
                src={cr}
                style={{
                  fontFamily: "Special Elite",
                  //fontSize: "20px",
                  width: "175px",

                  marginLeft: "20%",
                  //color: "white",
                }}
              />
              <Typography
                color="black"
                style={{
                  fontFamily: "Special Elite",
                  fontSize: "150%",
                  textAlign: "center",
                }}
              >
                View Others' Plans
              </Typography>
            </div>
          </Box>
        </Link>
      </Box>
    );
  };

  return (
    <div className={classes.root}>
      <SideBar />
      <div className={classes.boxrow}>
        <RowOfBoxes />
      </div>
    </div>
  );
}
