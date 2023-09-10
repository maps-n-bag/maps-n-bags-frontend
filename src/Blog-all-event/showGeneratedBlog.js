import React from 'react';
import PlanMarkdown from './PlanMarkdown';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SideBar from "../App drawer/sideBar";
import { makeStyles } from '@mui/styles';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';
import axios from "axios";

// firebase
import { storage } from "../Firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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

const MarkdownDisplay = ({ markdownContent }) => {
  return (
    <div>
      <ReactMarkdown
        children={markdownContent}
        rehypePlugins={[rehypeHighlight]}
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ node, ...props }) => <img style={{ maxHeight: '100px' }} {...props} />,
        }}
      />
    </div>
  );
};

const handleMarkdownUpload = (md, plan_id) => {
  const newFile = new File([md], `${plan_id}.md`, { type: 'text/markdown' });

  const storageRef = ref(storage, `blogs/${plan_id}.md`);
  const metaData = { contentType: 'text/markdown' };
  uploadBytes(storageRef, newFile, metaData)
    .then((snapshot) => {
      console.log('Uploaded a blob or file!');
    })
    .catch((error) => {
      console.log(error);
    });
}

const GenerateBlog = () => {
  const classes = useStyles();

  const { plan_id, publish } = useParams();
  const [planData, setPlanData] = useState(null);
  const [markdownBlog, setMarkdownBlog] = useState(null);

  useEffect(() => {


    axios.get(`${baseURL}plan/generateBlog?plan_id=${plan_id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((resp) => {
        const md = PlanMarkdown({ planData: resp.data });

        if (publish === "true") {

          setMarkdownBlog(md);
          handleMarkdownUpload(md, plan_id);

        } else {

          const storageRef = ref(storage, `blogs/${plan_id}.md`);
          getDownloadURL(storageRef)
            .then((url) => {
              console.log("file exists");
              axios.get(url)
                .then((resp) => {
                  setMarkdownBlog(resp.data);
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              console.log("file does not exist");

              setMarkdownBlog(md);
              handleMarkdownUpload(md, plan_id);
            });

        }

      })
      .catch((error) => {
        console.log(error);
      });

  }, []);

  if (!markdownBlog) {
    return (null);
  }

  return (
    <div className={classes.root}>
      <SideBar />
      <div className={classes.container}>
        <div className="markdown-body">
          <MarkdownDisplay markdownContent={markdownBlog} />
        </div>
      </div>
    </div>
  );
};

export default GenerateBlog;
