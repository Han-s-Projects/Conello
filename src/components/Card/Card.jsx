import axios from "axios";
import Button from "components/Button/Button";
import Menu from "components/Menu/Menu";
import { useState, useEffect } from "react";
import styles from "./Card.module.css";

const Card = ({ card, onDelete, setCards }) => {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(card.name);
  const [isMenuActive, setIsMenuActive] = useState(false);

  useEffect(() => {
    const closeMenu = (e) => {
      if (e.target.innerText !== "" && isMenuActive) setIsMenuActive(false);
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

  const renameCard = (id) => {
    if (!text.trim()) return;

    setText(text.trim());

    setEditing(false);
    axios.put(
      `https://api.trello.com/1/cards/${id}?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}&name=${text}`
    );

    setCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, name: text } : c))
    );
  };

  const handleEnter = (e, id) => {
    if (e.key === "Enter") renameCard(id);
  };

  const handleChange = (e) => setText(e.target.value);

  const toggleMenu = () => setIsMenuActive((prev) => !prev);

  return (
    <li className={styles.container}>
      {editing ? (
        <input
          onBlur={() => renameCard(card.id)}
          value={text}
          onKeyUp={(e) => handleEnter(e, card.id)}
          onChange={handleChange}
        />
      ) : (
        <span className={styles.name}>{card.name}</span>
      )}
      <button
        className={styles.menuBtn}
        onClick={toggleMenu}
        id={card.id}
      ></button>
      {isMenuActive ? (
        <Menu>
          <Button func={enterEditMode} />
          <Button name="delete card" func={onDelete} />
          <Button name="edit description" />
        </Menu>
      ) : null}
    </li>
  );
};

export default Card;
