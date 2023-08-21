import React from "react";
import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import axios from "axios";
import gallery from "./gallery.json";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles({
  frame: {
    height: "100%",
    width: "100%",
    border: 0,
    backgroundPosition: "fixed",
    margin: "0",
  },
  places: {
    height: "100%",
    width: "100%",
    backgroundColor: "black",
  },
  img: {
    maxWidth: "100%" /* Ensure image scales down to fit container */,
    height: "auto" /* Maintain aspect ratio */,
    width: "30%" /* Set desired width */,
  },
});

const View_Gallery = () => {
  // const id = localStorage.getItem("id");

  //const { name, date, description, image } = props;

  const img_arr = gallery.map((place, index) => place.image);

  //const items = Object.values(this.props.items);

  // console.log(props);
  const classes = useStyles();
  // useEffect(() => {
  //   fetch(`https://maps-n-bags.onrender.com/api/staff/${id}`)
  //     .then((resp) => resp.json())
  //     .then((resp) => {
  //       setItemBasic(resp.data[0]);
  //       console.log(resp.data[0]);
  //     });
  // }, []);

  return (
    <div className={classes.frame}>
      <div className={classes.places}>
        {img_arr.map((img, index) => (
          <img src={img} alt="Image" className={classes.img} />
        ))}
      </div>
    </div>
  );
};

export default View_Gallery;
