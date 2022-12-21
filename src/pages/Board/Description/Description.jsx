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

  const updateDescription = async () => {
    const { data } = await axios.put(
      `https://api.trello.com/1/cards/${card.id}?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}&desc=${description}`
    );

    setDescription(data.desc);
    setIsTextareaOpen(false);
  };

  return (
    <div className={styles.modalBackground}>
      <article className={styles.container}>
        <h3 className={styles.cardTitle}>{cardTitle}</h3>
        <p>in list {listTitle}</p>
        <h4 className={styles.descriptionTitle}>Description</h4>
        <div>
          {isTextareaOpen ? (
            <div>
              <textarea
                className={styles.descriptionInput}
                placeholder="Add a more detailed description..."
                onChange={handleChange}
                value={description}
              ></textarea>
              <button onClick={updateDescription}>save</button>
              <button onClick={closeTextArea}>cancel</button>
            </div>
          ) : (
            <button onClick={openTextarea}>
              {description && !isTextareaOpen
                ? description
                : "Add a more detailed description..."}
            </button>
          )}
        </div>
        <button onClick={close}>X</button>
      </article>
    </div>
  );
};

export default Description;
