import React, { useMemo } from "react";
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
import DatePicker from "react-datepicker";
import FormGroup from "@mui/material/FormGroup";
import { Paper } from "@mui/material";

const dateformat = require("../formatDate");
const baseURL = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles({
  root: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(250, 233, 171, 0.78)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    minHeight: "100vh",
  },
  content: {
    marginLeft: "10%",
    marginTop: "10vh"
  },
});

const OthersPlan = () => {
  const user_id = localStorage.getItem("userId");
  const [regions, setRegions] = useState([]);
  const [itemBasic, setItemBasic] = useState([]);
  const [startDate, setStartDate] = useState(new Date());

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

  useMemo(() => {
    const values = {
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
          setItemBasic(resp.data);
        }
        else { setItemBasic([]); }
      })
      .catch((rejected) => {
        console.log(rejected);
        setItemBasic([]);
      });
  }, [checkedItemsRgn.length]);

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <SideBar />
      <div className={classes.content}>
        <Typography variant="h4"
          style={{
            fontFamily: "Special Elite",
            fontSize: "200%",
            color: "black",
            textAlign: "center",
          }}
        >
          Others Plan
        </Typography>
        <Paper
          sx={{
            p: 2,
            margin: 'auto',
            maxWidth: 900,
            flexGrow: 1,
            marginBottom: '30px',
            backgroundColor: "transparent"
          }} elevation={0}
        >
          <Grid container spacing={2} direction="row">
            <Grid item>
              <FormGroup className={classes.form}>
                <Typography fontSize="100%">Start Date:</Typography>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </FormGroup>
              {/* </Box> */}
            </Grid>
            <Grid item >
              <Typography style={{ marginTop: "10%", marginLeft: "20%" }}>
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
              {/* </Box> */}
            </Grid>
          </Grid>
        </Paper>
        <Grid item container spacing={2} justifyContent="left" style={{ width: "80%" }}>
          {itemBasic.map((item, index) => (
            <OthersPLanCard item={item} />
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default OthersPlan;
