import axios from "axios";
import Button from "components/Button/Button";
import Card from "components/Card/Card";
import Form from "components/Form/Form";
import Menu from "components/Menu/Menu";
import { useState, useEffect } from "react";
import styles from "./List.module.css";
import { Droppable, Draggable } from "@hello-pangea/dnd";

const List = ({ list, setLists, cards, setCards }) => {
  const [cardText, setCardText] = useState("");
  const [listText, setListText] = useState(list.name);
  const [editing, setEditing] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);

  console.log("List render");

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
    setCards((prev) => [...prev, data]);
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
      <Droppable droppableId={list.id} type="CARD">
        {(provided) => (
          <ul
            className={styles.cards}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {cards
              .filter((card) => card.idList === list.id)
              .map((card, i) => (
                <Draggable key={card.id} draggableId={card.id} index={i}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Card
                        card={card}
                        onDelete={() => deleteCard(card.id)}
                        setCards={setCards}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
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
