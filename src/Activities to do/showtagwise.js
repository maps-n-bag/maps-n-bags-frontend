import React from "react";
import { Grid, Typography } from "@mui/material";

import ContentForActivity from "./contentforactivitycard";

const TagWise = (props) => {

  const placesOfATag = props.item.places;

  return (
    <Grid item container direction="column">
      <Grid item xs>
        <Typography
          variant="h4"
          style={{
            fontFamily: "Special Elite",
            fontSize: "130%",
            color: "black",
            paddingBottom: "10px",
          }}
        >
          {props.item.tag_name}:
        </Typography>
      </Grid>
      <Grid
        item
        container
        spacing={1}
      >
        {placesOfATag.map((pl) => (
          <ContentForActivity
            item={pl}
            addList={props.addedList}
            removeList={props.removedList}
          />
        ))}
      </Grid>
    </Grid>
  );
};
export default TagWise;
