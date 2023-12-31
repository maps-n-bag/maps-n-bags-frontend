import React from "react";
import RegImg from "../photos/regimg.jpg";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import LoginPage from "../login/loginPage";
import { useState } from "react";
import { Typography } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { Snackbar, Alert } from "@mui/material";

const baseURL = process.env.REACT_APP_BASE_URL;
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

    height: "98vh",
    fontFamily: "Special Elite",
  },

  content3: {
    fontColor: "red",
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

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("NO ALERT MSG SET");

  const classes = useStyles();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    getValues,
    control,
    formState: { errors },
  } = useForm();
  // const [nextRoute, setNextRoute] = useState(false);

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data, e);
    const values = getValues();
    console.log(values);
    axios
      .post(`${baseURL}user`, values)
      .then((response) => {
        console.log("res", response);

        if (response.status == "201") navigate("/Login");

      })
      .catch((error) => {
        console.log("axios error", error);

        if (error.response && error.response.status === 409) {
          setAlertOpen(true);
          setAlertMessage(error.response.data);
        }

      });
  };

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setAlertOpen(false);
  };

  const onError = (errors, e) => {
    if (errors.password) {
      setAlertOpen(true);
      setAlertMessage(errors.password.message);
    }

    console.log(errors, e);
  }

  return (
    <div className={classes.root}>
      <Box
        className={classes.bx}
        width="50%"
        // height={500}
        bgcolor="rgba(7, 73, 155, 0.4)"
      >

        {alertOpen && (
          <div className={classes.alert}>
            <Alert variant="filled" severity="error" onClose={handleAlertClose}>
              {alertMessage}
            </Alert>
          </div>
        )}
        
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
              <div className={classes.content3}>
                <TextField
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+/,
                      message:
                        "Password must have at least one uppercase letter, lowercase letter & number",
                    },
                    // Add more validation rules as needed
                  })}
                  className="password"
                  label="Password"
                  color="secondary"
                  placeholder="Enter your password"
                  halfWidth
                  required
                />

                {/* <Controller
                  name="password"
                  control={control}
                  rules={{
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                    },
                  }}
                  render={({ password, fieldState }) => (
                    <div className={classes.content2}>
                      <TextField
                        {...password}
                        label="Password"
                        color="secondary"
                        placeholder="Enter password"
                        type="password"
                        halfWidth
                        required
                        error={!!fieldState.error?.message}
                        helperText={fieldState.error?.message || " "}
                      />
                    </div>
                  )}
                /> */}
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
          <Link to="/login">
            <Button
              className="btn"
              type="button"
              // onClick={routeToLogin}
              style={{
                backgroundColor: "rgba(0,0,33,0.6)",
                borderWidth: "5px",
                borderColor: "black",
                marginLeft: "100px",
              }}
              // variant="outlined"
              halfWidth
            >
              <div>
                <Typography
                  color="white"
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "25px",
                    textAlign: "center",
                    marginTop: "10px",
                  }}
                >
                  {" "}
                  Already Have An Account? Login here{" "}
                </Typography>
              </div>
            </Button>
          </Link>
        </form>
      </Box>

      {/* <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="warning" sx={{ width: '100%' }}>
          {alertMessage}
        </Alert>
      </Snackbar> */}
    </div>
  );
}
