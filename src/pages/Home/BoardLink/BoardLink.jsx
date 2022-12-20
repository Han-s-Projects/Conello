import axios from "axios";
import { useState } from "react";
import Menu from "components/Menu/Menu";
import Button from "components/Button/Button";
import styles from "./BoardLink.module.css";
import { Link } from "react-router-dom";

const BoardItem = ({ id, name, setBoards }) => {
  const [boardTitle, setBoardTitle] = useState(name);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [editing, setEditing] = useState(false);

  const enterEditMode = () => {
    setEditing(true);
    setIsMenuActive(false);
  };

  const deleteBoard = () => {
    axios.delete(
      `https://api.trello.com/1/boards/${id}?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}`
    );

    setBoards((prev) => prev.filter((board) => board.id !== id));
  };

  const toggleMenu = () => setIsMenuActive((prev) => !prev);

  const handleBoardNameChange = (e) => setBoardTitle(e.target.value);

  const renameBoard = (id) => {
    if (!boardTitle.trim()) return;

    setBoardTitle(boardTitle.trim());

    axios.put(
      `https://api.trello.com/1/boards/${id}?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}&name=${boardTitle}`
    );

    setBoards((prev) =>
      prev.map((board) =>
        board.id === id ? { ...board, name: boardTitle } : board
      )
    );

    setEditing(false);
  };

  const handleEnter = (e, id) => {
    if (e.key === "Enter") renameBoard(id);
  };

  return (
    <li className={styles.container}>
      <button className={styles.menuBtn} onClick={toggleMenu}></button>
      {editing ? (
        <input
          onBlur={() => renameBoard(id)}
          value={boardTitle}
          onKeyUp={(e) => handleEnter(e, id)}
          onChange={handleBoardNameChange}
        />
      ) : (
        <Link to={`/board/${id}`}>{name}</Link>
      )}
      {isMenuActive ? (
        <Menu>
          <Button func={enterEditMode} />
          <Button name="delete board" func={deleteBoard} />
        </Menu>
      ) : null}
    </li>
  );
};

export default BoardItem;
