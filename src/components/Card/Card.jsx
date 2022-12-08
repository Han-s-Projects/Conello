import axios from "axios";
import Button from "components/Button/Button";
import Menu from "components/Menu/Menu";
import { useState, useEffect } from "react";

const Card = ({ card, onDelete, setCards }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(card.name);
  const [isMenuActive, setIsMenuActive] = useState(false);

  useEffect(() => {
    const closeMenu = (e) => {
      console.log(e.target.innerText);
      if (e.target.innerText === "메뉴 토글" && isMenuActive)
        setIsMenuActive(false);
    };

    window.addEventListener("click", closeMenu);

    return () => {
      window.removeEventListener("click", closeMenu);
    };
  }, [isMenuActive]);

  const enterEditMode = () => {
    setEditing(true);
    setIsMenuActive(false);
  };

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

  const toggleMenu = () => setIsMenuActive((prev) => !prev);

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
      <button onClick={toggleMenu} id={card.id}>
        메뉴 토글
      </button>
      {isMenuActive ? (
        <Menu>
          <Button func={enterEditMode} />
          <Button name="delete card" func={onDelete} />
        </Menu>
      ) : null}
    </>
  );
};

export default Card;
