import axios from "axios";
import { useState } from "react";
import styles from "./Description.module.css";

const Description = ({
  close,
  listTitle,
  cardTitle,
  card,
  description,
  setDescription,
}) => {
  const [isTextareaOpen, setIsTextareaOpen] = useState(false);

  const openTextarea = () => setIsTextareaOpen(true);

  const closeTextArea = () => setIsTextareaOpen(false);

  const handleChange = (e) => setDescription(e.target.value);

  const token = localStorage.getItem("trello_token");

  const updateDescription = () => {
    axios.put(
      `https://api.trello.com/1/cards/${card.id}?key=${
        process.env.REACT_APP_KEY
      }&token=${token}&desc=${description.replace(/(?:\r\n|\r|\n)/g, "<br/>")}`
    );

    setIsTextareaOpen(false);
  };

  return (
    <div className={styles.modalBackground}>
      <article className={styles.container}>
        <h3 className={styles.cardTitle}>{cardTitle}</h3>
        <p className={styles.p}>
          in list <span className={styles.listTitle}>{listTitle}</span>
        </p>
        <h4 className={styles.descriptionTitle}>Description</h4>
        <div>
          {isTextareaOpen ? (
            <div>
              <textarea
                className={styles.descriptionInput}
                placeholder="Add a more detailed description..."
                onChange={handleChange}
                value={description}
                cols="40"
                wrap="hard"
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
              {description && !isTextareaOpen
                ? description
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
