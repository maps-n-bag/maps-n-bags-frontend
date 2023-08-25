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
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Container from "@mui/material/Container";
// const baseURL = process.env.BASE_URL;
const baseURL = "https://maps-n-bags.onrender.com/api/";
const dateformat = require("../formateDate");

const useStyles = makeStyles({
  places: {
    //height: "90%",
    width: "100%",
    //backgroundColor: "rgba(250, 233, 171, 0.78)",
    backgroundImage: `url(${planbg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  btn: {
    minWidth: "100%",
  },
  tgtxt: {
    marginTop: "10%",
  },

  form: {
    width: "25%",
    Height: "40%",
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
  const classes = useStyles();
  const { handleSubmit, register, getValues, setValue } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data, e);
    const values = getValues();
    setValue("tags", checkedItems);
    console.log(values);
  };
  const onError = (errors, e) => console.log(errors, e);

  const [checkedItems, setCheckedItems] = useState(
    tags.reduce((acc, checkbox) => {
      acc[checkbox] = false;
      return acc;
    }, {})
  );
  console.log(checkedItems);

  const handleCheckboxChange = (event) => {
    const { name } = event.target;
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [name]: !prevCheckedItems[name],
    }));
  };

  useEffect(() => {
    fetch(`${baseURL}public/regions`)
      .then((resp) => resp.json())
      .then((resp) => {
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
      <div className={classes.postcard}>
        <Box
          className={classes.bx}
          width="80%"
          // height={500}
          bgcolor="rgba(255, 255, 255, 0.5)"
        >
          <Grid Container>
            <Grid item xs>
              <form onSubmit={handleSubmit(onSubmit, onError)}>
                <FormGroup className={classes.form}>
                  <Typography className={classes.tgtxt}>
                    {" "}
                    Choose Tag:
                  </Typography>
                  {tags.map((tag) => (
                    <FormControlLabel
                      key={tag.id}
                      control={
                        <Checkbox
                          textAlign="center"
                          checked={checkedItems[tag.title]}
                          onChange={handleCheckboxChange}
                          name={tag.title}
                        />
                      }
                      label={`${tag.title}`}
                    />
                  ))}
                </FormGroup>

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
              </form>
            </Grid>

            <Grid item xs></Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default CreateAPlan;
