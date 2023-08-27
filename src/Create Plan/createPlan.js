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
import planbg from "../photos/toad.jpg";
import { useForm } from "react-hook-form";
import Checkbox from "@mui/material/Checkbox";
import "react-datepicker/dist/react-datepicker.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
const baseURL = "https://maps-n-bags.onrender.com/api/";
const formattedDate = require("./dateformat");

const useStyles = makeStyles({
  places: {
    //height: "90%",
    width: "100%",
    //backgroundColor: "rgba(250, 233, 171, 0.78)",
    backgroundImage: `url(${planbg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
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
  tgtxt: {
    marginTop: "10%",
  },

  form: {
    width: "20%",

    marginLeft: "15%",
    marginTop: "10%",
    //backgroundColor: "rgba(255, 255, 255, 0.5)",
    // textAlign: "center",
  },

  postcard: {
    //height: "100%",
    width: "95%",
    Height: "50%",
    marginLeft: "15%",
    // marginRight: "20%",
  },
  // cardimg: {
  //   backgroundColor: "#ff5722",
  //   overflow: "hidden",
  // },

  img: {
    height: "100%",
    position: "centre",
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
  // const id = localStorage.getItem("id");
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
    const values = getValues();
    console.log(startDate);
    // console.log(checkedItemsRgn);
    setValue("start_date", formattedDate.dateformat(startDate));
    setValue("end_date", formattedDate.dateformat(endDate));
    setValue("tags", checkedItemsTag);
    setValue("regions", checkedItemsRgn);
    console.log(values);
    axios
      .post(`${baseURL}plan`, values)
      .then((response) => {
        console.log(response);
        console.log("create plan successful");
        if (response.status == "201") navigate("/TourOverview");
        // if (response.status == "200") navigate(`/Profile/${response.data.user_id}`);
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
  // const handleCheckboxChangeTag = (event) => {
  //   const { id } = event.target;
  //   setCheckedItemsTag((prevCheckedItems) => ({
  //     ...prevCheckedItems,
  //     [name]: !prevCheckedItems[name],
  //     // [name] :
  //   }));
  // };

  // const handleCheckboxChangeRgn = (event) => {
  //   const { name } = event.target;
  //   setCheckedItemsRgn((prevCheckedItems) => ({
  //     ...prevCheckedItems,
  //     [name]: !prevCheckedItems[name],
  //   }));
  // };

  useEffect(() => {
    fetch(`${baseURL}public/regions`)
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        setRegions(resp);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  }, []);

  useEffect(() => {
    fetch(`${baseURL}public/tags`)
      .then((resp) => resp.json())
      .then((resp) => {
        setTags(resp);
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  }, []);

  console.log(tags);
  console.log(regions);

  return (
    <div className={classes.places}>
      <SideBar />

      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <div>
          <div className={classes.blk}>
            <Box
              width="20%"
              marginTop="40%"
              marginLeft="40%"
              // height={100}
              bgcolor="rgba(245, 0, 83, 0.5)"
              m={4}
              p={5}
            >
              <Typography className={classes.tgtxt}> Choose Tag:</Typography>

              {tags.map((tag) => (
                <div>
                  <FormControlLabel
                    control={
                      <Checkbox
                        marginLeft="10%"
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
          </div>
          <div className={classes.blk}>
            <Box
              width="20%"
              marginTop="40%"
              marginLeft="80%"
              // height={100}
              bgcolor="rgba(245, 0, 83, 0.5)"
              m={4}
              p={5}
            >
              <Typography className={classes.tgtxt}> Choose Region:</Typography>

              {regions.map((rgn) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      marginLeft="10%"
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
          </div>
          <div className={classes.blk}>
            <Box
              width="60%"
              marginTop="40%"
              marginLeft="40%"
              // height={100}
              bgcolor="rgba(245, 230, 83, 0.15)"
              m={4}
              p={5}
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
          </div>

          <div className={classes.btn}>
            <Button
              className="btn"
              type="submit"
              style={{
                backgroundColor: "transparent",
                borderWidth: "5px",
                // borderColor: "white",
                marginLeft: "80%",
                marginTop: "5%",
                marginBottom: "20%",
              }}
              variant="outlined"
              halfWidth
            >
              <Typography
                //color="white"
                style={{
                  //fontFamily: "Special Elite",
                  fontSize: "20px",
                  textAlign: "center",
                }}
              >
                Search
              </Typography>
            </Button>
          </div>
        </div>
      </form>

      <Grid item xs></Grid>
      {/* </Box> */}
    </div>
  );
};

export default CreateAPlan;
