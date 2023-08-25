import React, { useState } from "react";
import { Button, Input, Typography } from "@mui/material";

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = () => {
    //ekhane code korbo
    console.log(`url${selectedImage}`);
  };

  return (
    <div>
      <div>
        <Typography variant="h6">Upload an Image</Typography>
        <Input type="file" onChange={handleImageChange} />
        <Button variant="contained" color="primary" onClick={handleUpload}>
          Upload
        </Button>
      </div>
      <div>
        {selectedImage && (
          <img src={selectedImage} alt="Uploaded" width={"30%"} />
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
