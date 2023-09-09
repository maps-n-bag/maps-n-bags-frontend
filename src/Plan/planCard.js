import React from "react";
import { Grid, Card, CardContent, Typography, CardActionArea, Switch } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import FormControlLabel from '@mui/material/FormControlLabel';

const dateformat = require("../formatDate");

const PlanCard = ({ plan, togglePublic, deletePlan }) => {

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea component={Link} to={`/FullTour/${plan.id}`}>
          <CardMedia
            component="img"
            height="200"
            image={plan.image}
            alt={plan.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div">
              {plan.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {plan.description}
            </Typography>
          </CardContent>
        </CardActionArea>

        <Grid container xs={12}>
          <Grid item xs={6}>
            <CardContent>
              {/** here should be a switch case for the type of the plan */}
              <FormControlLabel
                control={<Switch checked={plan.public} onChange={() => togglePublic(plan.id)} />}
                label={plan.public ? "Public" : "Private"}
              />
            </CardContent>
          </Grid>
          <Grid item xs={6}>
            <CardContent style={{ textAlign: "right" }}>
              <Typography variant="body2" color="text.secondary">
                {dateformat.formatDate(plan.start_date)}
                <br />to<br />
                {dateformat.formatDate(plan.end_date)}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>

        <Grid container xs={12} sx={{ marginBottom: "10px" }}>
          <Grid item xs={6} sx={{ textAlign: "center" }}>
            <Button size="small" color="primary" href={`/Blog/${plan.id}`} sx={{ width: "90%" }} variant="contained">
              View Blog
            </Button>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "center" }}>
            <Button size="small" color="primary" sx={{ width: "90%" }} variant="contained" onClick={() => deletePlan(plan.id)}>
              Delete
            </Button>
          </Grid>
        </Grid>

      </Card>
    </Grid>

  );
}

export default PlanCard;