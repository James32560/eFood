import React from 'react';

const JsonDisplay = ({ receivedData }) => {
  return (
    <div>
      {receivedData ? (
        <pre>{JSON.stringify(receivedData, null, 2)}</pre>
      ) : (
        <p>No data received yet.</p>
      )}
    </div>
  );
};

export default JsonDisplay;
