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
    // Get Cards in a List
    const fetchCards = async () => {
      const { data } = await axios.get(
        `https://api.trello.com/1/lists/${list.id}/cards?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}`
      );

      setCards(data);
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

  const createCard = async (e) => {
    e.preventDefault();

    if (!cardText.trim()) return;

    const { data } = await axios.post(
      `https://api.trello.com/1/cards?idList=${list.id}&key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}&name=${cardText}`
    );

    setCardText("");
    setCards([...cards, data]);
  };

  const deleteCard = (id) => {
    axios.delete(
      `https://api.trello.com/1/cards/${id}?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}`
    );

    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  const deleteList = (id) => {
    axios.put(
      `https://api.trello.com/1/lists/${id}/closed?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}&value=true`
    );

    setLists((prev) => prev.filter((list) => list.id !== id));
  };

  const enterEditMode = () => {
    setEditing(true);
    setIsMenuActive(false);
  };

  const handleListNameChange = (e) => setListText(e.target.value);

  const renameList = (id) => {
    if (!listText.trim()) return;

    setListText(listText.trim());

    // TODO: CORS 에러 발생 해결 해야 함. http-proxy-middleware 라이브러리 소용 없었다. 라이브러리 삭제하고 src/settingProxy.js도 삭제해도 됨
    // axios.put(
    //   `https://api.trello.com/1/lists/${id}/${listText}?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}`
    // );

    axios.put(
      `https://api.trello.com/1/lists/${id}?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}&name=${listText}`
    );

    setLists((prev) =>
      prev.map((l) => (l.id === list.id ? { ...l, name: listText } : l))
    );

    setEditing(false);
  };

  const handleEnter = (e, id) => {
    if (e.key === "Enter") renameList(id);
  };

  const toggleMenu = () => setIsMenuActive((prev) => !prev);

  return (
    <li className={styles.container}>
      {editing ? (
        <input
          onBlur={() => renameList(list.id)}
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
            onDelete={() => deleteCard(card.id)}
            setCards={setCards}
          />
        ))}
      </ul>
      <Form
        placeholder="Add a card"
        value={cardText}
        onChange={handleCardNameChange}
        onSubmit={createCard}
      />
    </li>
  );
};

export default List;
