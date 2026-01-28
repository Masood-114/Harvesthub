import React from "react";

const CtButton = ({ text, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-emerald-600 text-white px-4 Py-8 rounded-lg font-semibold
         hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all ${className}`}
    >
      {text}
    </button>
  );
};

export default CtButton;
