import React from 'react';

const JsonDisplay = ({ receivedData }) => {
  return (
    <div>
      {receivedData ? (
        <pre>{receivedData.weight}</pre>
      ) : (
        <p>No data received yet.</p>
      )}
    </div>
  );
};

export default JsonDisplay;
