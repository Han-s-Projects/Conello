import axios from "axios";
import Button from "components/Button/Button";
import Card from "components/Card/Card";
import Form from "components/Form/Form";
import Menu from "components/Menu/Menu";
import { useState, useEffect } from "react";
import styles from "./List.module.css";

const List = ({ list, setLists }) => {
  const [cards, setCards] = useState([]);
  const [cardText, setCardText] = useState("");
  const [listText, setListText] = useState(list.name);
  const [editing, setEditing] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      const { data } = await axios.get("http://localhost:3001/cards");

      setCards(data.filter(({ idList }) => idList === list.id));
    };

    fetchCards();
  }, []);

  useEffect(() => {
    const closeMenu = (e) => {
      if (e.target.innerText !== "" && isMenuActive) setIsMenuActive(false);
    };

    window.addEventListener("click", closeMenu);

    return () => {
      window.removeEventListener("click", closeMenu);
    };
  }, [isMenuActive]);

  const handleCardNameChange = (e) => setCardText(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!cardText.trim()) return;

    const { data } = await axios.post("http://localhost:3001/cards", {
      id: crypto.randomUUID(),
      name: cardText,
      desc: "",
      closed: false,
      pos: 65535,
      idBoard: "638afc978397000123346ccf",
      idList: list.id,
      dateLastActivity: new Date().toISOString(),
      url: "https://trello.com/c/WhSROzo1/4-%EA%B5%AD%EC%96%B4",
    });

    setCardText("");
    setCards([...cards, data]);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/cards/${id}`);

    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  const deleteList = (id) => {
    axios.delete(`http://localhost:3001/lists/${id}`);

    cards.forEach((card) => {
      if (card.idList === id)
        axios.delete(`http://localhost:3001/cards/${card.id}`);
    });

    setLists((prev) => prev.filter((l) => l.id !== id));
  };

  const enterEditMode = () => {
    setEditing(true);
    setIsMenuActive(false);
  };

  const handleListNameChange = (e) => setListText(e.target.value);

  const editText = (id) => {
    if (!listText.trim()) return;

    setListText(listText.trim());

    setLists((prev) =>
      prev.map((l) => (l.id === list.id ? { ...l, name: listText } : l))
    );

    setEditing(false);
    axios.patch(`http://localhost:3001/lists/${id}`, { name: listText });
  };

  const handleEnter = (e, id) => {
    if (e.key === "Enter") editText(id);
  };

  const toggleMenu = () => setIsMenuActive((prev) => !prev);

  return (
    <li className={styles.container}>
      {editing ? (
        <input
          onBlur={() => editText(list.id)}
          value={listText}
          onKeyUp={(e) => handleEnter(e, list.id)}
          onChange={handleListNameChange}
        />
      ) : (
        <div className={styles.titleContainer}>
          <h3 className={styles.title}>{list.name}</h3>
        </div>
      )}
      <button className={styles.menuBtn} onClick={toggleMenu}></button>
      {isMenuActive ? (
        <Menu>
          <Button func={enterEditMode} />
          <Button name="delete list" func={() => deleteList(list.id)} />
        </Menu>
      ) : null}
      <ul className={styles.cards}>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onDelete={() => handleDelete(card.id)}
            setCards={setCards}
          />
        ))}
      </ul>
      <Form
        placeholder="Add a card"
        value={cardText}
        onChange={handleCardNameChange}
        onSubmit={handleSubmit}
      />
    </li>
  );
};

export default List;
