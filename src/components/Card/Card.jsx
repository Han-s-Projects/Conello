import React from "react";

const Card = ({ card, onDelete }) => {
  return (
    <>
      <input type="checkbox" />
      <span>{card.name}</span>
      <button onClick={onDelete}>delete</button>
    </>
  );
};

export default Card;
