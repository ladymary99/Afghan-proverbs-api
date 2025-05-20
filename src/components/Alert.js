import React from "react";

const Alert = ({ type, message, onClose }) => {
  return (
    <div className={`alert alert-${type}`}>
      {message}
      {onClose && (
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            float: "right",
            fontWeight: "bold",
          }}
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert;
