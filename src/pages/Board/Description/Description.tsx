import React, {
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
  KeyboardEvent,
  ChangeEvent,
} from "react";
import axios from "axios";
import styles from "./Description.module.css";
import TrelloCard from "interfaces/TrelloCard";
import { useRecoilValue } from "recoil";
import { tokenState } from "@recoil/atom";

interface Props {
  close: () => void;
  listTitle: string;
  cardTitle: string;
  setCardTitle: Dispatch<SetStateAction<string>>;
  setCards: Dispatch<SetStateAction<TrelloCard[]>>;
  card: TrelloCard;
  description: string;
  setDescription: Dispatch<SetStateAction<string>>;
}

const Description = ({
  close,
  listTitle,
  cardTitle,
  setCardTitle,
  setCards,
  card,
  description,
  setDescription,
}: Props) => {
  const [textareaEditing, setTextareaEditing] = useState(false);
  const [titleEditing, setTitleEditing] = useState(false);
  const token = useRecoilValue(tokenState);
  const cardTitleInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const enterTitleEdit = () => {
    setTitleEditing(true);
  };

  const renameCard = (id: string) => {
    if (!cardTitle.trim()) return;

    setCardTitle(cardTitle.trim());

    setTitleEditing(false);
    axios.put(
      `https://api.trello.com/1/cards/${id}?key=${process.env.REACT_APP_KEY}&token=${token}&name=${cardTitle}`
    );

    setCards((prev: TrelloCard[]) =>
      prev.map((c) => (c.id === card.id ? { ...c, name: cardTitle } : c))
    );
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>, id: string) => {
    if (e.key === "Enter") renameCard(id);
  };

  const handleCardTitleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setCardTitle(e.target.value);

  const openTextarea = () => setTextareaEditing(true);

  const closeTextArea = () => setTextareaEditing(false);

  const handleDescChange = (e: ChangeEvent<HTMLTextAreaElement>) =>
    setDescription(e.target.value);

  const updateDescription = () => {
    axios.put(
      `https://api.trello.com/1/cards/${card.id}?key=${
        process.env.REACT_APP_KEY
      }&token=${token}&desc=${description.replace(/(?:\r|\n|\r|\n)/g, "<br>")}`
    );

    setTextareaEditing(false);
  };

  useEffect(() => {
    if (titleEditing && cardTitleInputRef.current)
      cardTitleInputRef.current.focus();
    if (textareaEditing && textareaRef.current) textareaRef.current.focus();
  }, [titleEditing, textareaEditing]);

  return (
    <div className={styles.modalBackground}>
      <article className={styles.container}>
        {titleEditing ? (
          <input
            className={styles.input}
            onBlur={() => renameCard(card.id)}
            value={cardTitle}
            onKeyUp={(e) => handleEnter(e, card.id)}
            onChange={handleCardTitleChange}
            ref={cardTitleInputRef}
          />
        ) : (
          <h3 className={styles.cardTitle} onClick={enterTitleEdit}>
            {cardTitle}
          </h3>
        )}
        <p className={styles.p}>
          in list <span className={styles.listTitle}>{listTitle}</span>
        </p>
        <h4 className={styles.descriptionTitle}>Description</h4>
        <div>
          {textareaEditing ? (
            <div>
              <textarea
                className={styles.descriptionInput}
                placeholder="Add a more detailed description..."
                onChange={handleDescChange}
                value={description.replace(/<br\s*\/?>/gm, "\n")}
                cols={40}
                wrap="hard"
                ref={textareaRef}
              ></textarea>
              <div className={styles.btnContainer}>
                <button className={styles.btn} onClick={updateDescription}>
                  save
                </button>
                <button
                  className={styles.btn + " " + styles.cancel}
                  onClick={closeTextArea}
                >
                  cancel
                </button>
              </div>
            </div>
          ) : (
            <button className={styles.descriptionArea} onClick={openTextarea}>
              {description && !textareaEditing
                ? description.replace(/<br\s*\/?>/gm, "\n")
                : "Add a more detailed description..."}
            </button>
          )}
        </div>
        <button className={styles.closeBtn} onClick={close}></button>
      </article>
    </div>
  );
};

export default Description;
