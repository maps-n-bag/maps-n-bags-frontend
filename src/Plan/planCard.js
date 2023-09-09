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

/* <div className={classes.postcard}>
            <Card
              className={classes.cardimg}
              style={{
                width: "70%",
                marginLeft: "5%",
                color: "ffffff",
                marginTop: "4.5%",
              }}
            >
              <CardContent>
                <img
                  src={plan.image}
                  // alt={name_arr}
                  style={{ width: "90%", height: "80%", marginLeft: "5%" }}
                  // Adjust the percentage value as needed
                />

                <Typography
                  variant="head"
                  style={{
                    // fontFamily: "Special Elite",
                    fontSize: "100%",
                    color: "black",
                    marginLeft: "6%",
                    // textAlign: "center",
                  }}
                >
                  {" "}
                  {plan.title}
                </Typography>
                <Typography
                  variant="body1"
                  style={{
                    fontSize: "100%",
                    marginLeft: "6%",
                    //textAlign: "center",
                  }}
                >
                  {" "}
                  {formatDate(plan.start_date)} to {formatDate(plan.end_date)}
                </Typography>
                <Typography
                  variant="body2"
                  style={{
                    fontSize: "100%",
                    marginLeft: "6%",
                    // textAlign: "center",
                  }}
                >
                  {" "}
                  {plan.description}
                </Typography>
                <a href={`/FullTour/${plan.id}`}>
                  <Button
                    size="small"
                    className={classes.btn}
                    style={{
                      fontSize: "1em",
                      marginLeft: "5%",
                      marginTop: "5%",
                    }}
                  >
                    View
                  </Button>
                </a>
                <Button
                  size="small"
                  className={classes.btn}
                  onClick={(e) => {
                    axios
                      .delete(`${baseURL}plan?id=${plan.id}`, {
                        headers: {
                          Authorization: `Bearer ${localStorage.getItem(
                            "accessToken"
                          )}`,
                        },
                      })
                      .then((res) => {
                        window.location.reload(false);
                        setPlans(plans.filter((p) => p.id !== plan.id));
                      })
                      .catch((error) => {
                        console.error("An error occurred:", error);
                      });
                  }}
                  style={{
                    fontSize: "1em",
                    marginLeft: "5%",
                    marginTop: "5%",
                  }}
                >
                  Delete
                </Button>
              </CardContent>
              <CardActions></CardActions>
            </Card>
          </div>
 */