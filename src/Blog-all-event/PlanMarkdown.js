const PlanMarkdown = ({ planData }) => {

  const emojiMap = {
    car: '🚗',
    train: '🚆',
    plane: '✈️',
    bus: '🚌',
  };

  let markdownContent = '';
  if (!planData) {
    console.log("planData is null");
    return (null);
  }
  // Add plan title and description
  markdownContent += `# ${planData.plan_title}\n\n`;
  if (planData.plan_description) { markdownContent += `${planData.plan_description}\n\n`; }

  // Iterate through day-wise events
  planData.dayWiseEvents.forEach((day) => {
    markdownContent += `## Day ${day.day}\n\n`;

    // Iterate through events within the day
    day.events.forEach((event) => {
      // Add journey details
      if (event.journey) {
        const journeyEmoji = getJourneyEmoji(event.journey.journey_type);
        markdownContent += `**Journey Details**:\n\n`;
        markdownContent += `| Journey Type | Distance (km) | Estimated Time (mins) | From | To |\n`;
        markdownContent += `|--------------:|----------------|-------------------------|-----|----|\n`;
        markdownContent += `| ${journeyEmoji} | ${event.journey.distance} km | ${event.journey.est_time} mins | ${event.journey.from} | ${event.journey.to} |\n\n`;
      }
      if (event.event) {
        if (event.event.eventDetail.note) {
          markdownContent += `**Note**: ${event.event.eventDetail.note}\n\n`;
        }
        markdownContent += `**Event Details**:\n\n`;
        markdownContent += `| Activity | Place | Start Time | End Time | Expenditure | Visited |\n`;
        markdownContent += `|----------|-------|------------|----------|-------------|---------|\n`;
        markdownContent += `| ${event.event.activity} | ${event.event.place_name} | ${new Date(event.event.start_time).toLocaleString()} | ${new Date(event.event.end_time).toLocaleString()} | $${event.event.eventDetail.expenditure} | ${getVisitedEmoji(event.event.eventDetail.checked)} |\n`;
        if (event.event.eventDetail.generated_details) {
          markdownContent += `**Details**: ${event.event.eventDetail.generated_details}\n\n`;
        }
        if (event.event.eventImages && event.event.eventImages.length > 0) {
          markdownContent += `**Images**: \n\n`;
          event.event.eventImages.forEach((image) => {
            markdownContent += `![Event Images](${image})\n\n`;
          });
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
function getJourneyEmoji(journeyType) {
  const emojiMap = {
    car: '🚗',
    train: '🚆',
    plane: '✈️',
    bus: '🚌',
  };
  return emojiMap[journeyType] || '';
}
function getVisitedEmoji(visited) {
  return visited ? '✅' : '❌';
}

export default PlanMarkdown;
