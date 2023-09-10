import React from "react";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import SideBar from "../App drawer/sideBar";
import { Box, Grid } from "@mui/material";
import plan from "../photos/plan.jpg";
import { useForm } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import "react-datepicker/dist/react-datepicker.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { useThemeContext } from '../ThemeContext'; 
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import train from "../photos/train.jpg";
const baseURL = process.env.REACT_APP_BASE_URL;

const dateFormat = require("../formatDate");

const useStyles = makeStyles({
  
  places: {
    height: "100%",
    fontFamily: "Special Elite",
    //width: "90%",
    //backgroundColor: "rgba(250, 233, 171, 0.78)",
    // backgroundImage: theme.mode === 'dark' ? `url(${train})` : `url(${plan})`,
    backgroundColor: "rgba(0, 0, 0 ,0.05)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "100vh",
  },

  blk: {
    justifyContent: "center",
  },

  block: {
    justifyContent: "center",
  },
  btn: {
    minWidth: "100%",
  },

  tagBox: {
    marginLeft: "20%",
    marginTop: "10%",
  },

  form: {
    width: "20%",

    marginLeft: "15%",
    marginTop: "10%",
    //backgroundColor: "rgba(255, 255, 255, 0.5)",
    // textAlign: "center",
  },

  tagd: {
    marginLeft: "40%",
    fontFamily: "special elite",
  },

  tg: {
    height: "10%",
    marginTop: "10%",
  },
  cardimg: {
    height: "100%",
  },
});

const CreateAPlan = () => {
  const { theme, toggleThemeMode } = useThemeContext();
  const [regions, setRegions] = useState([]);
  const [tags, setTags] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const classes = useStyles();
  const { handleSubmit, register, getValues, setValue } = useForm();
  const navigate = useNavigate();
  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data, e);
    console.log(startDate);
    // console.log(checkedItemsRgn);
    setValue("start_date", dateFormat.formatDate(startDate));
    setValue("end_date", dateFormat.formatDate(endDate));
    setValue("tags", checkedItemsTag);
    setValue("regions", checkedItemsRgn);
    setValue("user_id", localStorage.getItem("userId"));

    const values = getValues();

    axios
      .post(`${baseURL}plan`, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((response) => {
        const planId = response.data.id;
        if (response.status == "201") navigate("/FullTour/" + planId);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onError = (errors, e) => console.log(errors, e);

  const [checkedItemsTag, setCheckedItemsTag] = useState([]);
  console.log(checkedItemsTag);

  const [checkedItemsRgn, setCheckedItemsRgn] = useState([]);
  console.log(checkedItemsRgn);

  const handleCheckboxChangeTag = (event) => {
    const value = event.target.value;
    if (checkedItemsTag.includes(value)) {
      setCheckedItemsTag(checkedItemsTag.filter((item) => item !== value));
    } else {
      setCheckedItemsTag([...checkedItemsTag, value]);
    }
  };

  const handleCheckboxChangeRgn = (event) => {
    const value = event.target.value;
    if (checkedItemsRgn.includes(value)) {
      setCheckedItemsRgn(checkedItemsRgn.filter((item) => item !== value));
    } else {
      setCheckedItemsRgn([...checkedItemsRgn, value]);
    }
  };

  useEffect(() => {
    axios
      .get(`${baseURL}public/regions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((resp) => {
        setRegions(resp.data);
      })
      .catch((rejected) => {
        console.log(rejected);
      });

    axios
      .get(`${baseURL}public/tags`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((resp) => {
        setTags(resp.data);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  }, []);

  return (
    <div className={classes.places}>
      <SideBar theme={theme} toggleTheme={toggleThemeMode} />

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Box
                width="80%"
                marginTop="20%"
                marginLeft="70%"
                textAlign="left"
                borderRadius={16}
                borderWidth={5}
                // bgcolor="rgba(255, 255, 255, 0.7)"

              >
                <Typography marginTop="10%" marginLeft="40%">
                  {" "}
                  <b> Choose Tag: </b>
                </Typography>

                {tags.map((tag) => (
                  <div className={classes.tagd}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          marginLeft="50%"
                          textAlign="left"
                          checked={checkedItemsTag[tag.id]}
                          onChange={handleCheckboxChangeTag}
                          name={tag.title}
                          value={tag.id}
                        />
                      }
                      label={tag.title}
                    />

                    <br />
                  </div>
                ))}
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                width="65%"
                marginTop="25%"
                marginLeft="80%"
                textAlign="left"
                borderRadius={16}
                borderWidth={5}
                // bgcolor="rgba(255, 255, 255, 0.7)"
              >
                <Typography style={{ marginTop: "10%", marginLeft: "20%" }}>
                  {" "}
                  Choose Region:
                </Typography>

                {regions.map((rgn) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        marginLeft="20%"
                        textAlign="left"
                        checked={checkedItemsRgn[rgn.id]}
                        onChange={handleCheckboxChangeRgn}
                        name={rgn.title}
                        value={rgn.id}
                      />
                    }
                    label={rgn.title}
                  />
                ))}
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Box
                width="70%"
                marginTop="50%"
                marginLeft="-24%"
                textAlign="left"
                borderRadius={16}
                borderWidth={5}
                // bgcolor="rgba(255, 255, 255, 0.7)"
              >
                <FormGroup className={classes.form}>
                  <Typography fontSize="100%">Start Date:</Typography>
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                  />
                </FormGroup>
                <FormGroup className={classes.form}>
                  <Typography fontSize="100%">End Date:</Typography>
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                  />
                </FormGroup>
              </Box>
            </Grid>
            <Grid item xs={4}>
              <Button
                className="btn"
                type="submit"
                style={{
                  // backgroundColor: "rgba(255,255,255,0.8)",
                  borderWidth: "5px",
                 
                  marginLeft: "170%",
                  marginTop: "-15%",
                  marginBottom: "40%",
                }}
                variant="outlined"
                fullWidth
              >
                <Typography
                 
                  style={{
                    fontFamily: "Special Elite",
                    fontSize: "200%",
                    textAlign: "center",
                  }}
                >
                  Create Your Plan
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </div>
      </form>

      <Grid item xs></Grid>
      {/* </Box> */}
    </div>
  );
};

export default CreateAPlan;
