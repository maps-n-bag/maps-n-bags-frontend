import React from 'react';
import PlanMarkdown from './PlanMarkdown';
import MarkdownDisplay from './MarkdownDisplay';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

const GenerateBlog = () => {
    const [planData, setPlanData] = useState({});
    const { plan_id} = useParams();
    const [data_available, setDataAvailable] = useState(false);

    useEffect(() => {
        axios.get(`${baseURL}event/generateBlog?plan_id=${plan_id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((resp) => {
                console.log(resp.data);
                setDataAvailable(true);
                console.log('resp.data')
                setPlanData(resp.data);
            })
            .catch((rejected) => {
                console.log(rejected);
            });
    }, [plan_id]);
    console.log('showgenerate');
    console.log(planData);
    if (!data_available) {
        return (null);
    }
    const generatedMarkdown = PlanMarkdown({ planData });

    return (
        <div>
            <h1>Your Plan</h1>
            {/* <PlanMarkdown planData={planData} /> */}
            <h2>Markdown Content</h2>
            <MarkdownDisplay markdownContent={generatedMarkdown} />
        </div>
    );
};

export default GenerateBlog;
