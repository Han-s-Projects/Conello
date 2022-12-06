import axios from "axios";
import { useState } from "react";

const Card = ({ card, onDelete, setCards }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(card.name);

  const enterEditMode = () => setEditing(true);

  const editText = (id) => {
    if (!text.trim()) return;

    setText(text.trim());

    setCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, name: text } : c))
    );

    setEditing(false);
    axios.patch(`http://localhost:3001/cards/${id}`, { name: text });
  };

  const handleEnter = (e, id) => {
    if (e.key === "Enter") editText(id);
  };

  const handleChange = (e) => setText(e.target.value);

  return (
    <>
      {editing ? (
        <input
          onBlur={() => editText(card.id)}
          value={text}
          onKeyUp={(e) => handleEnter(e, card.id)}
          onChange={handleChange}
        />
      ) : (
        <span>{card.name}</span>
      )}
      <button onClick={onDelete}>delete</button>
      <button onClick={enterEditMode}>edit</button>
    </>
  );
};

export default Card;
