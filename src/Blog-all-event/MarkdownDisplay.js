import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownDisplay = ({ markdownContent }) => {
  return (
    <div>
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </div>
  );
};

export default MarkdownDisplay;
