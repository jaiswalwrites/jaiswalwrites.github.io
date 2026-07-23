import React, { useState } from 'react';

export const FeedbackWidget = ({ pageId }) => {
  const [submitted, setSubmitted] = useState(false);

  const handleFeedback = async (isHelpful) => {
    await fetch('https://api.analytics.com/track', {
      method: 'POST',
      body: JSON.stringify({ pageId, isHelpful, timestamp: new Date() })
    });
    setSubmitted(true);
  };

  if (submitted) return <div className="text-green-500">Thank you for your feedback!</div>;

  return (
    <div className="flex items-center gap-4 p-4 border rounded-lg">
      <span className="text-sm font-medium">Was this page helpful?</span>
      <button onClick={() => handleFeedback(true)} className="px-4 py-1 border rounded hover:bg-gray-100">👍 Yes</button>
      <button onClick={() => handleFeedback(false)} className="px-4 py-1 border rounded hover:bg-gray-100">👎 No</button>
    </div>
  );
};
