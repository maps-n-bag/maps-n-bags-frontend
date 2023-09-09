import React from "react";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Grid, Divider, FormControlLabel } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import SouthIcon from "@mui/icons-material/South";
import plane from "../photos/icon/plane.png";
import beach from "../photos/icon/um.png";
import { makeStyles } from "@mui/styles";
import SideBar from "../App drawer/sideBar";
import { Link } from "react-router-dom";
import noteIcon from "../photos/icon/note.png";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";
import OthersPLanCard from "./othersPlanCard";
import Checkbox from "@mui/material/Checkbox";

const dateformat = require("../formatDate");
const baseURL = process.env.REACT_APP_BASE_URL;
const useStyles = makeStyles({
  places: {
    height: "100%",
    width: "118%",
    backgroundColor: "rgba(250, 233, 171, 0.78)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  btn: {
    minWidth: "100%",
  },

  postcard: {
    //height: "100%",
    width: "95%",
    Height: "50%",
    marginLeft: "15%",
    // marginRight: "20%",
  },
  cardimg: {
    backgroundColor: "#ff5722",
    overflow: "hidden",
  },

  img: {
    height: "100%",
    position: "centre",
  },
  cardimg: {
    height: "100%",
  },
});

const OthersPlan = () => {
  const user_id = localStorage.getItem("userId");
  const [regions, setRegions] = useState([]);
  const [itemBasic, setItemBasic] = useState([]);

  const [checkedItemsRgn, setCheckedItemsRgn] = useState([]);

  const handleCheckboxChangeRgn = (event, regionId) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setCheckedItemsRgn((prev) => [...prev, regionId]);
    } else {
      setCheckedItemsRgn((prev) => prev.filter((item) => item !== regionId));
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
  }, []);

  useEffect(() => {
    const values={
      user_id: user_id,
      regions: [...checkedItemsRgn],
    }
    axios
      .post(`${baseURL}plan/others`, values, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((resp) => {
        if (resp.status == "200") { 
          console.log(resp.data);
          console.log("hello");
          setItemBasic(resp.data); }
        else { setItemBasic([]); }
      })
      .catch((rejected) => {
        console.log(rejected);
      });
  }, [checkedItemsRgn.length]);
  const classes = useStyles();
  console.log(user_id);
  return (
    <div className={classes.places}>
      <SideBar />

      <div className={classes.postcard}>
        <Grid container spacing={2}>
          <Grid item >
            <Box
              width="65%"
              marginTop="25%"
              marginLeft="80%"
              textAlign="left"
              borderRadius={16}
              borderWidth={5}
              bgcolor="rgba(255, 255, 255, 0.7)"
            >
              <Typography style={{ marginTop: "10%", marginLeft: "20%" }}>
                {" "}
                Choose Region:
              </Typography>
              {regions.map((rgn) => (
                <FormControlLabel
                key={rgn.id}
                  control={
                    <Checkbox
                      marginLeft="20%"
                      textAlign="left"
                      checked={checkedItemsRgn.includes(rgn.id)}
                      onChange={(event) => handleCheckboxChangeRgn(event, rgn.id)}
                      name={rgn.title}
                      title={rgn.title}
                      value={rgn.id}
                    />
                  }
                  label={rgn.title}
                />
              ))}
            </Box>
          </Grid>
        </Grid>
        {itemBasic.map((item, index) => (
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
            spacing={10}
            style={{
              width: "50%",
              // marginLeft: "7%",
              color: "ffffff",
              marginTop: "1%",
            }}
          >
            <Grid item>
              <OthersPLanCard item={item} className={classes.cardday} />
            </Grid>
          </Grid>
        ))}
      </div>
    </div>
  );
};

export default OthersPlan;
