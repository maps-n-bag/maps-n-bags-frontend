import React from 'react';
import { useEffect, useState } from "react";

const PlanMarkdown = ( {planData} ) => {
  // Initialize an empty string to store the Markdown content
  let markdownContent = '';
  console.log(planData);
  console.log('planData')
  if(!planData) {
    console.log('planData is null')
    return (null);
  }
  // Add plan title and description
  markdownContent += `# ${planData.plan_title}\n\n`;
  markdownContent += `${planData.plan_description}\n\n`;

  // Iterate through day-wise events
  planData.dayWiseEvents.forEach((day) => {
    markdownContent += `## Day ${day.day}\n\n`;

    // Iterate through events within the day
    day.events.forEach((event) => {
      if(event.event) {
      markdownContent += `### Event ${event.event.activity}\n\n`;
      markdownContent += `**Activity**: ${event.event.activity}\n\n`;
      markdownContent += `**Place**: ${event.event.place_name}\n\n`;
      markdownContent += `**Start Time**: ${new Date(event.event.start_time).toLocaleString()}\n\n`;
      markdownContent += `**End Time**: ${new Date(event.event.end_time).toLocaleString()}\n\n`;
      markdownContent += `**Expenditure**: $${event.event.eventDetail.expenditure}\n\n`;
      // Check if there are additional details
      if (event.event.eventDetail.generated_details) {
        markdownContent += `**Details**: ${event.event.eventDetail.generated_details}\n\n`;
      }
      markdownContent += `**Visited**: ${event.event.visited ? 'Yes' : 'No'}\n\n`;
      // Check if there are notes
      if (event.event.eventDetail.note) {
        markdownContent += `**Note**: ${event.event.eventDetail.note}\n\n`;
      }
      if (event.event.eventImages && event.event.eventImages.length > 0) {
        markdownContent += '![Event Images](event_image_url_1)\n\n';
        // You can loop through event.event.eventImages and include multiple images
      }
    }
    });
  });

  // Create a Blob to trigger the download
  const blob = new Blob([markdownContent], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);

  return markdownContent;
  // return (
  //   // <div>
  //   //   <a href={url} download={`${planData.plan_id}_plan.md`}>
  //   //     Download Markdown File
  //   //   </a>
  //   // </div>

  // );
};

export default PlanMarkdown;
