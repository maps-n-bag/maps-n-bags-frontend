import React from "react";
import { Grid, Card, CardContent, Typography, CardActionArea, Switch, TextField, Paper } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import FormControlLabel from '@mui/material/FormControlLabel';
import EditIcon from '@mui/icons-material/Edit';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { v4 } from "uuid";

// firebase
import { storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const dateformat = require("../formatDate");

const PlanCard = ({ plan, togglePublic, deletePlan, editPlan }) => {

  const [buttonDisplay, setButtonDisplay] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [planDetails, setPlanDetails] = React.useState(plan);

  const handlePlanImageUpload = (e) => {
    const image = e.target.files[0];
    const storageRef = ref(storage, `plan-images/${v4()}`);

    uploadBytes(storageRef, image).then((snapshot) => {
      console.log('Uploaded a blob or file!');

      getDownloadURL(snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
        setPlanDetails({ ...planDetails, image: downloadURL });
      });

    }).catch((error) => {
      console.log(error);
    });
  }

  const handlePlanSave = () => {
    setIsEditing(false);

    editPlan(planDetails);
  };

  const VisuallyHiddenInput = styled('input')`
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    bottom: 0;
    left: 0;
    white-space: nowrap;
    width: 1px;
  `;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card sx={{ maxWidth: 345, marginBottom: "20px" }}>

        {/** for some reason card area chara hocche na */}
        <CardActionArea>

          <div
            onMouseEnter={() => setButtonDisplay(true)}
            onMouseLeave={() => setButtonDisplay(false)}
          >
            <CardMedia
              component="img"
              height="200"
              image={planDetails.image}
              alt={planDetails.title}
              sx={{ opacity: buttonDisplay ? "0.5" : "1" }}
            />
            {isEditing ? (
              <div style={{ display: buttonDisplay ? "block" : "none" }}>
                <Button
                  style={{ position: "absolute", top: "25%", left: "50%", transform: "translate(-50%, -50%)" }}
                  component="label"
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                >
                  Upload
                  <VisuallyHiddenInput type="file" accept="image/*" onChange={handlePlanImageUpload} />
                </Button>
                <Button style={{ position: "absolute", top: "40%", left: "35%", transform: "translate(-50%, -50%)" }} variant="contained"
                  onClick={handlePlanSave}>
                  Save
                </Button>
                <Button style={{ position: "absolute", top: "40%", left: "65%", transform: "translate(-50%, -50%)" }} variant="contained"
                  onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
              </div>
            ) : (
              <div style={{ display: buttonDisplay ? "block" : "none" }}>
                <Button
                  style={{
                    position: "absolute",
                    top: "32%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                  onClick={() => setIsEditing(true)}
                  variant="contained"
                  startIcon={<EditIcon />}
                >
                  Edit
                </Button>
              </div>
            )}
          </div>

          <CardContent>
            {isEditing ? (
              <div>
                <TextField variant="outlined" value={planDetails.title} label="Title" fullWidth={true} style={{ marginBottom: "12px" }}
                  onChange={(e) => { setPlanDetails({ ...planDetails, title: e.target.value }) }}
                  onBlur={handlePlanSave} />
                <TextField variant="outlined" value={planDetails.description} label="Description" minRows={2} multiline={true} fullWidth={true}
                  onChange={(e) => { setPlanDetails({ ...planDetails, description: e.target.value }) }}
                  onBlur={handlePlanSave} />
              </div>
            ) : (
              <div>
                <Link to={`/FullTour/${planDetails.id}`} style={{ textDecoration: "none", color: "black" }}>
                  <Typography gutterBottom variant="h6" component="div">
                    {planDetails.title}
                  </Typography>
                </Link>
                <Typography variant="body2" color="text.secondary">
                  {planDetails.description}
                </Typography>
              </div>
            )}

          </CardContent>

        </CardActionArea>

        <Grid container xs={12}>
          <Grid item xs={6}>
            <CardContent>
              {/** here should be a switch case for the type of the plan */}
              <FormControlLabel
                control={<Switch checked={planDetails.public}
                  onChange={() => {
                    togglePublic(planDetails.id);
                    setPlanDetails({ ...planDetails, public: !planDetails.public })
                  }}
                />}
                label={planDetails.public ? "Public" : "Private"}
              />
            </CardContent>
          </Grid>
          <Grid item xs={6}>
            <CardContent style={{ textAlign: "right" }}>
              <Typography variant="body2" color="text.secondary">
                {dateformat.formatDate(planDetails.start_date)}
                <br />to<br />
                {dateformat.formatDate(planDetails.end_date)}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>

        <Grid container xs={12} sx={{ marginBottom: "10px" }}>
          <Grid item xs={6} sx={{ textAlign: "center" }}>
            <Button size="small" color="primary" href={`/Blog/${planDetails.id}`} sx={{ width: "90%" }} variant="contained">
              View Blog
            </Button>
          </Grid>
          <Grid item xs={6} sx={{ textAlign: "center" }}>
            <Button size="small" color="primary" sx={{ width: "90%" }} variant="contained" 
            onClick={() => {
              deletePlan(planDetails.id);
            }}>
              Delete
            </Button>
          </Grid>
        </Grid>

      </Card>
    </Grid >

  );
}

export default PlanCard;