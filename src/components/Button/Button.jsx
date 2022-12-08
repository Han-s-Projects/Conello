import React from "react";

const Button = ({ name = "edit title", func }) => {
  return <button onClick={func}>{name}</button>;
};

export default Button;
