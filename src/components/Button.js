import React from "react";

const Button = ({ children, onClick, type, addClassNames }) => {
  let color = "rose";

  if (type === "error") {
    color = "green";
  }
  return (
    <button
      onClick={onClick}
      className={`bg-${color}-500 hover:bg-${color}-700 focus:outline-none py-3 px-6 text-white shadow rounded ${addClassNames}`}
    >
      {children}
    </button>
  );
};

export default Button;
