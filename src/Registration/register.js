import React from "react";
import RegImg from "../photos/regimg.jpg";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import axios from "axios";
import LoginPage from "../login/loginPage";
import { useState } from "react";
import { Typography } from "@mui/material";
// import {useNavigate}  from "react-router-dom";

const baseURL = "https://maps-n-bags.onrender.com/api/";
const useStyles = makeStyles((theme) => ({
  bx: {
    alignContent: "center",
    marginTop: "2%",
    marginBottom: "5%",
  },

  root: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundImage: `url(${RegImg})`,
    backgroundPosition: "center center",
    backgroundAttachment: "fixed",
    alignContent: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    height: "200%",
    fontFamily: "Special Elite",
  },

  input: {
    height: "100%",
    maxWidth: "100%",
    alignContent: "center",

    marginLeft: "30%",
    // marginBottom: "50px",
  },
  Title1: {
    marginTop: "2%",
    //marginLeft: "15rem",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "1%",
    fontSize: "200%",
  },

  wrap: {
    justifyContent: "center",
    alignItems: "center",
    // marginBottom: "2%",
    marginLeft: "8%",
  },

  btn: {
    marginTop: "2%",
    marginBottom: "8%",
  },
}));

export default function Register() {
  const classes = useStyles();
  // const navigate = useNavigate();
  const { handleSubmit, register, getValues } = useForm();
  const [nextRoute, setNextRoute] = useState(false);

  const routeToLogin = () => {
    // if (nextRoute == true) <LoginPage />;
    // else <Register />;
  };
  const onSubmit = async(data, e) => {
    e.preventDefault();
    console.log(data, e);
    const values = getValues();
    console.log(values);
    axios
      .post(`${baseURL}user`, values)
      .then((response) => {
        console.log(response);
        <LoginPage />
        // if (response.status == "201") <LoginPage />;
        // else <Register />;
        //window.location.reload(false);

        // if (response.data.accessToken) {
        //   localStorage.setItem("accessToken", response.data.accessToken);
        //   if (response.data.id) localStorage.setItem("id", response.data.id);
        //   console.log(localStorage.getItem("accessToken"));

        //   window.location.reload(false);
        // }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const onError = (errors, e) => console.log(errors, e);

  return (
    <div className={classes.root}>
      <Box
        className={classes.bx}
        width="50%"
        // height={500}
        bgcolor="rgba(7, 73, 155, 0.4)"
      >
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <div className={classes.input}>
            <div className={classes.wrap}>
              <h1 className={classes.Title1}>Username</h1>
              <div className={classes.content1}>
                <TextField
                  {...register("username")}
                  className="username"
                  label="Username"
                  color="secondary"
                  placeholder="Enter username"
                  halfWidth
                  required
                />
              </div>
            </div>

            <div className={classes.wrap}>
              <h1 className={classes.Title1}>First Name</h1>
              <div className={classes.content1}>
                <TextField
                  {...register("first_name")}
                  className="firstname"
                  label="Firstname"
                  color="secondary"
                  //borderWidth="10px"
                  placeholder="Enter firstname"
                  halfWidth
                  required
                />
              </div>
            </div>

            <div className={classes.wrap}>
              <h1 className={classes.Title1}>Last Name</h1>
              <div className={classes.content1}>
                <TextField
                  {...register("last_name")}
                  className="lastname"
                  label="Lastname"
                  color="secondary"
                  placeholder="Enter lastname"
                  halfWidth
                  required
                />
              </div>
            </div>

            <div className={classes.wrap}>
              <h1 className={classes.Title1}>Email</h1>
              <div className={classes.content1}>
                <TextField
                  {...register("email")}
                  className="email"
                  label="Email"
                  color="secondary"
                  placeholder="Enter your email"
                  halfWidth
                  required
                />
              </div>
            </div>

            <div className={classes.wrap}>
              <h1 className={classes.Title1}>Password</h1>
              <div className={classes.content2}>
                <TextField
                  {...register("password")}
                  className="password"
                  label="Password"
                  color="secondary"
                  placeholder="Enter password"
                  type="password"
                  halfWidth
                  required
                />
              </div>
            </div>
            <div className={classes.wrap}>
              <div className={classes.btn}>
                <Button
                  className="btn"
                  type="submit"
                  // onClick={routeToLogin}
                  style={{
                    backgroundColor: "rgba(0,0,0,0.2)",
                    borderWidth: "5px",
                    borderColor: "black",
                  }}
                  variant="outlined"
                  halfWidth
                >
                  <Typography
                    color="black"
                    style={{
                      fontFamily: "Special Elite",
                      fontSize: "20px",
                      textAlign: "center",
                    }}
                  >
                    <b> Create Account </b>
                  </Typography>
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Box>

      {/* <div className={classes.boxrow}>
        <RowOfBoxes />
      </div> */}
    </div>
  );
}