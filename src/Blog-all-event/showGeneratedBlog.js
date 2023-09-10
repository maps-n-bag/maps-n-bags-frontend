import React from 'react';
import PlanMarkdown from './PlanMarkdown';
import MarkdownDisplay from './MarkdownDisplay';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideBar from "../App drawer/sideBar";
import { makeStyles } from '@mui/styles';
import axios from "axios";

// firebase
import { storage } from "../Firebase/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const baseURL = process.env.REACT_APP_BASE_URL;

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  container: {
    flexGrow: 1,
    padding: '5rem',
  },
}));

const GenerateBlog = () => {
  const classes = useStyles();

  const [planData, setPlanData] = useState({});
  const { plan_id } = useParams();
  const [markdownBlog, setMarkdownBlog] = useState(null);

  useEffect(() => {

    // first check for the file in firebase
    // if it exists, then return it
    // if it doesn't exist, then generate it and save it to firebase

    const storageRef = ref(storage, `blogs/${plan_id}.md`);
    getDownloadURL(storageRef)
      .then((url) => {
        console.log("file exists");
        axios.get(url)
          .then((resp) => {
            setMarkdownBlog(resp.data);
            console.log(resp.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log("file does not exist");

        axios.get(`${baseURL}event/generateBlog?plan_id=${plan_id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
          .then((resp) => {
            const md = PlanMarkdown({ planData: resp.data });
            setMarkdownBlog(md);
            // console.log(md);

            while (!md) {
              console.log("waiting for markdownBlog");
              setTimeout(() => { }, 1000);
            }

            const newFile = new File([md], `${plan_id}.md`, { type: 'text/markdown' });
            // console.log(newFile);

            const storageRef = ref(storage, `blogs/${plan_id}.md`);
            const metaData = { contentType: 'text/markdown' };
            uploadBytes(storageRef, newFile, metaData)
              .then((snapshot) => {
                console.log('Uploaded a blob or file!');
              })
              .catch((error) => {
                console.log(error);
              });

          })
          .catch((error) => {
            console.log(error);
          });

      });

  }, []);

  if (!markdownBlog) {
    return (null);
  }

  // const generatedMarkdown = PlanMarkdown({ planData });

  return (
    <div className={classes.root}>
      <SideBar />
      <div className={classes.container}>
        <MarkdownDisplay markdownContent={markdownBlog} />
      </div>
    </div>
  );
};

export default GenerateBlog;
