import { useRef } from "react";
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import tr from "../Images/r.jpg";
import road from "../Images/toad.jpg";
import car from "../Images/red.gif";
import cave from "../Images/caveEn.png";
import logo from "../Images/logo2baka.png";
import { makeStyles } from "@mui/styles";
import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { Typography } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  bg: {
    backgroundColor: "rgba(246, 193, 70 ,0.7)",
  },
  btn1: {
    width: "50px",
    height: "15px",
    marginTop: "-2 rem",
    padding: "0",
    //  marginLeft: "15 rem",
    backgroundColor: "rgba(196, 238, 74 ,0.8)",
  },
  boxdp: {
    backgroundColor: "rgba(246, 193, 70 ,0.7)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    alignContent: "center",
    backgroundPosition: "center center",
    //backgroundImage: `url(${dpimg})`,
    borderRadius: "100%",
    display: "flex",
    //justifyContent: "center",

    marginTop: "15rem",
    marginLeft: "15rem",
    // marginRight: "-800px",
    alignItems: "center",
  },
  place: {
    //backgroundColor: "rgba(255, 255, 255 ,0.7)",
    fontFamily: "Special Elite",
    fontSize: "10px",
    marginLeft: "58rem",
    marginTop: "27rem",
    textAlign: "center",
  },
  box: {
    backgroundColor: "rgba(255, 255, 255 ,0.7)",
  },
}));

const Landingpage = () => {
  const { register, handleSubmit, getValues } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data, e);
    const values = getValues();
    console.log(values);
  };
  const onError = (errors, e) => console.log(errors, e);
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
          <div className={classes.place}>
            <Box className={classes.box}>
              <Box className={classes.boxdp}>
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
              {/* <h1 className={classes.search}>Search for a place</h1> */}
              <form onSubmit={handleSubmit(onSubmit, onError)}>
                <TextField
                  {...register("place")}
                  className="place"
                  label="Enter a place of any location"
                  //color="secondary"
                  placeholder="Search for a place of any location"
                  type="place"
                  style={{ backgroundColor: "rgba(255, 255, 255, 0.3)" }}
                  fullWidth
                />
              </form>
            </Box>
            <Box className={classes.btn1} m={3} p={3}>
              <AccountCircleOutlinedIcon
                style={{
                  fontFamily: "Special Elite",
                  fontSize: "40px",
                  //marginTop: "-50 px",
                  color: "black",
                }}
              />
              Log In
            </Box>
            <Box className={classes.btn2} m={3} p={3}>
              <AccountCircleOutlinedIcon
                style={{
                  fontFamily: "Special Elite",
                  fontSize: "40px",
                  //marginTop: "-50 px",
                  color: "black",
                }}
              />
              Sign Up
            </Box>
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
          sticky={{ start: 0.5, end: 4.5 }}
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
