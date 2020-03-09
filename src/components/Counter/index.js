import React from "react";
import "./style.scss";

const Counter = props => {
  const { count } = props;
  return (
    <p className="counter">
      <span>{count}</span>
      <br />
      Global Passports
    </p>
  );
};

export default Counter;
