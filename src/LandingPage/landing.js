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
import "./style.css";
const useStyles = makeStyles(() => ({}));

const navigateToLogin = () => {
  <LoginPage />;
};
const Landingpage = () => {
  const classes = useStyles();
  const ref = useRef();
  return (
    <div className={classes.bg}>
      <Parallax pages={3} ref={ref}>
        {/* <ParallaxLayer speed={1}>
              <h2>Welcome to my website</h2>
          </ParallaxLayer>
  
          <ParallaxLayer offset={1} speed={0.5}>
              <h2>Web development is fun!</h2>
          </ParallaxLayer> */}

        <ParallaxLayer
          offset={0}
          speed={1}
          factor={2}
          style={{
            backgroundImage: `url(${road})`,
            backgroundSize: "cover",

            height: "100vh",
          }}
        >
          <img
            src={car}
            alt="Car"
            style={{
              position: "absolute",
              top: "25rem",
              left: "50px",
            }}
          />
          <img
            src={logo}
            alt="logo"
            style={{
              position: "absolute",
              top: "5rem",
              left: "60rem",
              height: "50vh",
            }}
          />
        </ParallaxLayer>

        <ParallaxLayer
          offset={2}
          speed={1}
          factor={4}
          style={{
            backgroundImage: `url(${tr})`,
            backgroundSize: "cover",
            height: "100vh",
          }}
        >
          <div className="place">
            <Box className="box">
              <Box className="boxdp">
                <img
                  src={logo}
                  alt="logo"
                  style={{
                    position: "absolute",
                    top: "3rem",
                    left: "65rem",
                    height: "50vh",
                  }}
                />
              </Box>
            </Box>
            <Grid container>
              <Grid item xs>
                <Box
                  className="btn1"
                  m={3}
                  p={3}
                 
                >
                  <Button onClick={navigateToLogin}>
                    <AccountCircleOutlinedIcon
                      style={{
                        fontFamily: "Special Elite",
                        fontSize: "200%",
                        marginTop: "-3rem",
                        color: "black",
                      }}
                    />
                    <div className="text">Log In</div>
                  </Button>
                </Box>
              </Grid>

              <Grid item xs spacing={2} className={classes.gg}>
                <Box
                  className="btn1"
                  m={3}
                  p={3}
                  style={{
                    height: "40%",
                    fontFamily: "Special Elite",
                    fontSize: "150%",
                    //marginLeft: "30%",

                    color: "black",
                  }}
                >
                  <AccountCircleOutlinedIcon
                    style={{
                      fontFamily: "Special Elite",
                      fontSize: "200%",
                      marginTop: "-3rem",
                      color: "black",
                    }}
                  />
                  Sign Up
                </Box>
              </Grid>
            </Grid>
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={1}
          //factor={4}
          style={{
            backgroundImage: `url(${cave})`,
            backgroundSize: "cover",
            height: "100vh",
          }}
        ></ParallaxLayer>

        <ParallaxLayer
          sticky={{ start: 1.0, end: 4.5 }}
          style={{
            textAlign: "center",
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

        <ParallaxLayer
          offset={0}
          speed={0.005}
          onClick={() => ref.current.scrollTo(2)}
        >
          <h2></h2>
        </ParallaxLayer>

        <ParallaxLayer
          offset={4}
          speed={0.005}
          onClick={() => ref.current.scrollTo(0)}
        >
          <h2></h2>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
};

export default Landingpage;
