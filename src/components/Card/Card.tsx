import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import TrelloCard from "interfaces/TrelloCard";
import themeMode from "@recoil/atom";
import Description from "@pages/Board/Description/Description";
import DescriptionPortal from "@pages/Board/Description/DescriptionPortal";
import styles from "./Card.module.css";

interface Props {
  card: TrelloCard;
  onDelete: () => void;
  setCards: () => [];
  listTitle: string;
}

const Card = ({ card, onDelete, setCards, listTitle }: Props) => {
  const [text, setText] = useState(card.name);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const [description, setDescription] = useState(card.desc);
  const theme = useRecoilValue(themeMode);

  useEffect(() => {
    const closeMenu = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.textContent && isMenuActive) setIsMenuActive(false);
    };

    window.addEventListener("click", closeMenu);

    return () => {
      window.removeEventListener("click", closeMenu);
    };
  }, [isMenuActive]);

  const HandleOpenDescription = () => setIsModalActive(true);
  const HandleCloseDescription = () => setIsModalActive(false);

  return (
    <li className={styles.container}>
      <span className={styles.name}>{text}</span>
      <button
        className={styles.editBtn}
        onClick={HandleOpenDescription}
        id={card.id}
      ></button>
      <button
        className={styles.deleteBtn}
        onClick={onDelete}
        id={card.id}
      ></button>
      {description && (
        <span>
          <br />
          <img
            src={
              theme === "dark"
                ? require("@assets/description-dark.svg").default
                : require("@assets/description.svg").default
            }
            alt="description"
          />
        </span>
      )}

      {isModalActive && (
        <DescriptionPortal>
          <Description
            close={HandleCloseDescription}
            listTitle={listTitle}
            cardTitle={text}
            setCardTitle={setText}
            setCards={setCards}
            card={card}
            description={description}
            setDescription={setDescription}
          />
        </DescriptionPortal>
      )}
    </li>
  );
};

export default Card;
