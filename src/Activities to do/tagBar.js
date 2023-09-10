import React from "react";
import { Typography, FormGroup, FormControlLabel, Switch } from "@mui/material";

const TagBar = (item) => {
  const tags = item.tags
  const setTags = item.setTags
  console.log(tags);

  const Handler = (event) => {
    let id = event.currentTarget.id;
    let temp;
    temp = tags.map((tag) => {
      if (tag.id == id) {
        tag.isShow = !tag.isShow;
      }
      return tag;
    });
    setTags(temp);
  };

  return (
    <>
      <Typography variant="h5" style={{ fontFamily: "Special Elite", color: "black" }}>
        Filter By: Tags
      </Typography>
      <FormGroup>
        {tags.map((tag) => (
          <FormControlLabel control={<Switch checked={tag.isShow} onChange={Handler} id={tag.id} />} label={tag.name} />
        ))}
      </FormGroup>
    </>
  );
};

export default TagBar;
