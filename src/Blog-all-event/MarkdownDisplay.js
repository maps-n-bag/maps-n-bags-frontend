import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

const MarkdownDisplay = ({ markdownContent }) => {
  return (
    <div>
      <ReactMarkdown
        children={markdownContent}
        rehypePlugins={[rehypeHighlight]}
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ node, ...props }) => <img style={{ maxWidth: '10%' }} {...props} />,
        }}
      />
    </div>
  );
};

export default MarkdownDisplay;
