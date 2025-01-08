import React from "react";

const ErrorComponent = ({ message, onRetry }) => {
  return (
    <div className="error-message">
      <p>{message}</p>
      <button onClick={onRetry} className="retry-button">
        Retry
      </button>
    </div>
  );
};

export default ErrorComponent;
