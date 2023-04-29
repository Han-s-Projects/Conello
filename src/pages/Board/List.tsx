/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState,
  useEffect,
  useRef,
  SetStateAction,
  Dispatch,
  KeyboardEvent,
  ChangeEvent,
} from "react";
import axios from "axios";
import {
  Droppable,
  Draggable,
  DroppableStateSnapshot,
  DraggableStateSnapshot,
  DraggableStyle,
} from "@hello-pangea/dnd";
import Form from "@components/Form/Form";
import Menu from "@components/Menu/Menu";
import Button from "@components/Button/Button";
import Card from "@components/Card/Card";
import styles from "./List.module.css";
import { useRecoilValue } from "recoil";
import { tokenState } from "@recoil/atom";
import TrelloList from "interfaces/TrelloList";
import TrelloCard from "interfaces/TrelloCard";

interface Props {
  list: TrelloList;
  setLists: Dispatch<SetStateAction<TrelloList[]>>;
  cards: TrelloCard[];
  setCards: Dispatch<SetStateAction<TrelloCard[]>>;
}

const List = ({ list, setLists, cards, setCards }: Props) => {
  const [cardText, setCardText] = useState<string>("");
  const [listText, setListText] = useState<string>(list.name);
  const [editing, setEditing] = useState<boolean>(false);
  const [isMenuActive, setIsMenuActive] = useState<boolean>(false);
  const token = useRecoilValue<string | null>(tokenState);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && titleInputRef.current) titleInputRef.current.focus();

    const closeMenu = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.innerText !== "" && isMenuActive) setIsMenuActive(false);
    };

    window.addEventListener("click", closeMenu);

    return () => {
      window.removeEventListener("click", closeMenu);
    };
  }, [isMenuActive]);

  const handleCardNameChange = (e: KeyboardEvent<HTMLInputElement>) =>
    setCardText((e.target as HTMLInputElement).value);

  const createCard = async (e: Event) => {
    e.preventDefault();

    if (!cardText.trim()) return;

    const { data } = await axios.post(
      `https://api.trello.com/1/cards?idList=${list.id}&key=${process.env.REACT_APP_KEY}&token=${token}&name=${cardText}`
    );

    setCardText("");
    setCards((prev) => [...prev, data]);
  };

  const deleteCard = (id: string) => {
    axios.delete(
      `https://api.trello.com/1/cards/${id}?key=${process.env.REACT_APP_KEY}&token=${token}`
    );

    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  const deleteList = (id: string) => {
    axios.put(
      `https://api.trello.com/1/lists/${id}/closed?key=${process.env.REACT_APP_KEY}&token=${token}&value=true`
    );

    setLists((prev) => prev.filter((list) => list.id !== id));
  };

  const enterEditMode = () => {
    setEditing(true);
    setIsMenuActive(false);
  };

  const handleListNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setListText((e.target as HTMLInputElement).value);

  const renameList = (id: string) => {
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

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>, id: string) => {
    if (e.key === "Enter") renameList(id);
  };

  const toggleMenu = () => setIsMenuActive((prev) => !prev);

  const getCardStyle = (
    style: DraggableStyle | undefined,
    snapshot: DraggableStateSnapshot
  ) => {
    if (!snapshot.isDropAnimating) return style;
    if (!snapshot.dropAnimation) return;
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

  const getListStyle = (snapshot: DroppableStateSnapshot) => ({
    borderRadius: snapshot.isDraggingOver ? "4px" : undefined,
    background: snapshot.isDraggingOver ? "#e3eeff" : undefined,
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
      <button className={styles.menuBtn} onClick={toggleMenu} />
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
                      data-isdragging={
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
