import React from "react";
import {
  Grid,
  Card,
  Typography,
  CardMedia,
  CardContent,
} from "@mui/material";
import ActivityCard from "./activityCard";


const ContentForActivity = (item) => {
  const id = item.item.id;
  const title = item.item.title;
  const rating = item.item.rating;
  const rating_count = item.item.rating_count;
  const images = item.item.images;
  const activities = item.item.activities;

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Card style={{ maxWidth: 345 }}>
      <CardMedia
          component="img"
          height="150"
          image={images[0]}
        />
        <CardContent>
          <Typography variant="subtitle1">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Rating: {rating} ( count: {rating_count})
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="body1">
            Activity:
          </Typography>
          {activities.map((ac) => (
            <ActivityCard
              item={ac}
              place_id={id}
              setAddList={item.addList}
              setRemoveList={item.removeList}
            />
          ))}
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ContentForActivity;
