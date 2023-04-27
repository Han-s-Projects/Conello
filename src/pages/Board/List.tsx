import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import Form from "@components/Form/Form";
import Menu from "@components/Menu/Menu";
import Button from "@components/Button/Button";
import Card from "@components/Card/Card";
import styles from "./List.module.css";

const List = ({ list, setLists, cards, setCards }) => {
  const [cardText, setCardText] = useState("");
  const [listText, setListText] = useState(list.name);
  const [editing, setEditing] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const token = localStorage.getItem("trello_token");
  const titleInputRef = useRef(null);

  useEffect(() => {
    if (editing) titleInputRef.current.focus();

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
      `https://api.trello.com/1/cards?idList=${list.id}&key=${process.env.REACT_APP_KEY}&token=${token}&name=${cardText}`
    );

    setCardText("");
    setCards((prev) => [...prev, data]);
  };

  const deleteCard = (id) => {
    axios.delete(
      `https://api.trello.com/1/cards/${id}?key=${process.env.REACT_APP_KEY}&token=${token}`
    );

    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  const deleteList = (id) => {
    axios.put(
      `https://api.trello.com/1/lists/${id}/closed?key=${process.env.REACT_APP_KEY}&token=${token}&value=true`
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
      `https://api.trello.com/1/lists/${id}?key=${process.env.REACT_APP_KEY}&token=${token}&name=${listText}`
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

  const getCardStyle = (style, snapshot) => {
    if (!snapshot.isDropAnimating) {
      return style;
    }
    const { moveTo, curve, duration } = snapshot.dropAnimation;
    const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`;
    const rotate = "rotate(5deg)";
    const scale = "scale(1.2)";

    return {
      ...style,
      transform: `${translate} ${rotate} ${scale}`,
      transition: `all ${curve} ${duration + 0.05}s`,
    };
  };

  const getListStyle = (snapshot) => ({
    borderRadius: snapshot.isDraggingOver ? "4px" : null,
    background: snapshot.isDraggingOver ? "#e3eeff" : null,
  });

  return (
    <li className={styles.container}>
      <div className={styles.titleContainer}>
        {editing ? (
          <input
            className={styles.input}
            onBlur={() => renameList(list.id)}
            value={listText}
            onKeyUp={(e) => handleEnter(e, list.id)}
            onChange={handleListNameChange}
            ref={titleInputRef}
          />
        ) : (
          <h3 className={styles.title}>{list.name}</h3>
        )}
      </div>
      <button className={styles.menuBtn} onClick={toggleMenu}></button>
      {isMenuActive ? (
        <Menu>
          <Button func={enterEditMode} />
          <Button name="delete list" func={() => deleteList(list.id)} />
        </Menu>
      ) : null}
      <Droppable droppableId={list.id} type="CARD">
        {(provided, snapshot) => (
          <ul
            className={styles.cards}
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={getListStyle(snapshot)}
          >
            {cards
              .filter((card) => card.idList === list.id)
              .map((card, i) => (
                <Draggable key={card.id} draggableId={card.id} index={i}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      data-isDragging={
                        snapshot.isDragging && !snapshot.isDropAnimating
                      }
                      style={getCardStyle(
                        provided.draggableProps.style,
                        snapshot
                      )}
                    >
                      <Card
                        card={card}
                        onDelete={() => deleteCard(card.id)}
                        setCards={setCards}
                        listTitle={listText}
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
