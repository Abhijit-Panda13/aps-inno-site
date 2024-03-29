import React from "react";

const Button = ({ children, onClick, type, addClassNames }) => {
  return (
    <button
      onClick={onClick}
      className="btn"
    >
      {children}
    </button>
  );
};

export default Button;
