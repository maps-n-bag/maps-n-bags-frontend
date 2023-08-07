import React from "react";
import loginImg from "../Images/login.jpg";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useForm } from "react-hook-form";
import { Typography } from "@mui/material";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import HouseOutlinedIcon from "@mui/icons-material/HouseOutlined";
import ConnectWithoutContactOutlinedIcon from "@mui/icons-material/ConnectWithoutContactOutlined";
//import { useNavigate } from "react-router-dom";
import { EditText, EditTextarea } from "react-edit-text";

const RowOfBoxes = () => {
  return (
    <Box display="flex" justifyContent="center">
      <Box
        width={200}
        height={100}
        bgcolor="rgba(245, 230, 83, 0.15)"
        m={4}
        p={5}
      >
        <HouseOutlinedIcon
          style={{
            fontFamily: "Special Elite",
            fontSize: "100px",
            marginLeft: "3rem",
            color: "white",
          }}
        />
        <Typography
          color="white"
          style={{
            fontFamily: "Special Elite",
            fontSize: "20px",
            textAlign: "center",
          }}
        >
          Back To Home
        </Typography>
      </Box>
      <Box
        width={200}
        height={100}
        bgcolor="rgba(216, 37, 37, 0.2)"
        m={4}
        p={5}
      >
        <DescriptionOutlinedIcon
          style={{
            fontFamily: "Special Elite",
            fontSize: "100px",
            marginLeft: "3rem",
            color: "white",
          }}
        />
        <Typography
          color="white"
          style={{
            fontFamily: "Special Elite",
            fontSize: "20px",
            textAlign: "center",
          }}
        >
          Register
        </Typography>
      </Box>
      <Box
        width={200}
        height={100}
        bgcolor="rgba(0, 255, 255, 0.1)"
        m={4}
        p={5}
      >
        <ConnectWithoutContactOutlinedIcon
          style={{
            fontFamily: "Special Elite",
            fontSize: "100px",
            marginLeft: "3rem",
            color: "white",
          }}
        />
        <Typography
          color="white"
          style={{
            fontFamily: "Special Elite",
            fontSize: "20px",
            textAlign: "center",
          }}
        >
          Contact Us
        </Typography>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  bx: {
    alignContent: "center",
    marginTop: "-20rem",
    //marginBottom: "50rem",
  },
  boxrow: {
    // justifyContent: "left",
    marginTop: "50rem",
    marginLeft: "-64rem",
  },

  root: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundImage: `url(${loginImg})`,
    backgroundPosition: "center center",
    backgroundAttachment: "fixed",
    alignContent: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "-1rem",
    marginLeft: "-1rem",
    marginRight: "-2rem",
    height: "150vh",
    fontFamily: "Special Elite",
  },

  input: {
    height: "100vh",
    maxWidth: "100vh",
    alignContent: "center",

    // marginLeft: "500px",
    // marginBottom: "50px",
  },
  Title1: {
    marginTop: "5rem",
    //marginLeft: "15rem",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "1rem",
    fontSize: "3rem",
  },

  Title2: {
    // marginLeft: "15rem",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "1rem",
    fontSize: "3rem",
  },
  wrap: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: "20px",
    marginLeft: "15rem",
  },

  content1: {
    marginBottom: "20px",
  },
  btn: {
    marginTop: "2rem",
  },
}));

export default function LoginPage() {
  const classes = useStyles();

  const { handleSubmit, register, getValues } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data, e);
    const values = getValues();
    console.log(values);
    // axios
    //   .post("http://localhost:8080/auth/users/login", values)
    //   .then((response) => {
    //     if (response.data.accessToken) {
    //       localStorage.setItem("accessToken", response.data.accessToken);
    //       if (response.data.id) localStorage.setItem("id", response.data.id);
    //       console.log(localStorage.getItem("accessToken"));

    //       window.location.reload(false);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
  const onError = (errors, e) => console.log(errors, e);

  return (
    <div className={classes.root}>
      <Box
        className={classes.bx}
        width={1000}
        height={500}
        bgcolor="rgba(255, 255, 255, 0.2)" // 60% transparent black
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
                  fullWidth
                  required
                />
              </div>
            </div>
            <div className={classes.wrap}>
              <h1 className={classes.Title2}>Password</h1>
              <div className={classes.content2}>
                <TextField
                  {...register("password")}
                  className="password"
                  label="Password"
                  color="secondary"
                  placeholder="Enter password"
                  type="password"
                  fullWidth
                  required
                />
              </div>
            </div>
            <div className={classes.wrap}>
              <div className={classes.btn}>
                <Button
                  className="btn"
                  type="submit"
                  style={{ backgroundColor: "transparent" , borderWidth: '5px', borderColor: "white"}}
                  variant="outlined"
                
                  fullWidth
                >
                  <Typography
                    color="white"
                    style={{
                      fontFamily: "Special Elite",
                      fontSize: "20px",
                      textAlign: "center",
                    }}
                  >
                    Sign in
                  </Typography>
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Box>

      {/* <div>
      <Box className={classes.bx2}
        width={200}
        height={200}
        bgcolor="rgba(255, 255, 255, 0.1)" // 60% transparent black
      >
      </Box>
      <Box className={classes.bx3}
        width={200}
        height={200}
        bgcolor="rgba(255, 255, 255, 0.1)" // 60% transparent black
      >
      </Box>
      <Box className={classes.bx4}
        width={200}
        height={200}
        bgcolor="rgba(255, 255, 255, 0.1)" // 60% transparent black
      >
      </Box>
      </div> */}

      <div className={classes.boxrow}>
        <RowOfBoxes />
      </div>
    </div>
  );
}
