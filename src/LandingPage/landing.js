import { useRef } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import tr from "../photos/r.jpg";
import road from "../photos/toad.jpg";
import car from "../photos/red.gif";
import cave from "../photos/caveEn.png";
import logo from "../photos/logo2baka.png";
import { makeStyles } from "@mui/styles";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { Typography } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import LoginPage from "../login/loginPage";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";
import { useEffect } from "react";
import "./style.css";
import { BorderBottomOutlined } from "@mui/icons-material";
const useStyles = makeStyles(() => ({}));

const Landingpage = () => {
  const classes = useStyles();
  const ref = useRef();
  const buttonRef = useRef();
  const navigate = useNavigate();

  const handleNavigate = () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      navigate(`/Profile/${userId}`);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className={classes.bg}>
      <Parallax pages={3} ref={ref} style={{ backgroundColor: "black", top: "0", left: "0" }}>

        <ParallaxLayer offset={0} speed={0}
          style={{
            backgroundImage: `url(${road})`,
            backgroundSize: "cover",
            height: "100vh",
          }}
          onClick={() => ref.current.scrollTo(2)}
        >
          <div className="place">
            <img
              src={logo}
              alt="logo"
              style={{
                position: "absolute",
                top: "5rem",
                right: "10rem",
                width: "50vh",
              }}
            />
            {/** click anywhere */}
            {/* <div className="click-anywhere">
              <Typography variant="body2" style={{ position: "absolute", top: "80vh", left: "80vw", transform: "translate(-50%, -50%)" }}>
                Click anywhere to start
              </Typography>
            </div> */}
          </div>
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0}
          style={{
            backgroundImage: `url(${cave})`,
            backgroundSize: "cover",
            height: "100vh",
          }}
        >
        </ParallaxLayer>

        <ParallaxLayer offset={2} speed={0}
          style={{
            backgroundImage: `url(${tr})`,
            backgroundSize: "cover",
            height: "100vh",
          }}
          onClick={() => handleNavigate()}
        >
          <div className="place">
            <img
              src={logo}
              alt="logo"
              style={{
                position: "absolute",
                top: "3rem",
                right: "10rem",
                width: "50vh",
              }}
            />
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          sticky={{ start: 0.2, end: 4.5 }}
          style={{
            textAlign: "center",
          }}
          onClick={() => {
            if (ref.current.offset === 0) {
              ref.current.scrollTo(2);
            } else {
              handleNavigate();
            }
          }}
        >
          <img
            src={car}
            style={{
              position: "absolute",
              top: "15rem",
              left: "0rem",
              height: "50vh",
            }}
          />
        </ParallaxLayer>

      </Parallax>
    </div>
  );
};

export default Landingpage;
