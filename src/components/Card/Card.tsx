import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import themeMode from "@recoil/atom";
import Description from "@pages/Board/Description/Description";
import DescriptionPortal from "@pages/Board/Description/DescriptionPortal";
import styles from "./Card.module.css";

const Card = ({ card, onDelete, setCards, listTitle }) => {
  const [text, setText] = useState(card.name);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const [description, setDescription] = useState(card.desc);
  const openDescription = () => setIsModalActive(true);
  const closeDescription = () => setIsModalActive(false);
  const theme = useRecoilValue(themeMode);

  useEffect(() => {
    const closeMenu = (e) => {
      if (e.target.innerText !== "" && isMenuActive) setIsMenuActive(false);
    };

    window.addEventListener("click", closeMenu);

    return () => {
      window.removeEventListener("click", closeMenu);
    };
  }, [isMenuActive]);

  return (
    <li className={styles.container}>
      <span className={styles.name}>{card.name}</span>
      <button
        className={styles.editBtn}
        onClick={openDescription}
        id={card.id}
      ></button>
      <button
        className={styles.deleteBtn}
        onClick={onDelete}
        id={card.id}
      ></button>
      {description && (
        <span>
          <br></br>
          <img
            src={
              theme === "dark"
                ? require("@assets/description-dark.svg").default
                : require("@assets/description.svg").default
            }
            alt="description"
          ></img>
        </span>
      )}

      {isModalActive && (
        <DescriptionPortal>
          <Description
            close={closeDescription}
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
