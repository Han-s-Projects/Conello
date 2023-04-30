import React, {
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import axios from "axios";
import TrelloBoard from "interfaces/TrelloBoard";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import Menu from "@components/Menu/Menu";
import Button from "@components/Button/Button";
import { tokenState } from "@recoil/atom";
import styles from "./BoardLink.module.css";

interface Props {
  id: string;
  name: string;
  setBoards: Dispatch<SetStateAction<TrelloBoard[]>>;
}

const BoardItem = ({ id, name, setBoards }: Props) => {
  const [boardTitle, setBoardTitle] = useState(name);
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [editing, setEditing] = useState(false);
  const token = useRecoilValue(tokenState);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && titleInputRef.current) titleInputRef.current.focus();
  }, [editing]);

  const enterEditMode = () => {
    setEditing(true);
    setIsMenuActive(false);
  };

  const deleteBoard = () => {
    axios.delete(
      `https://api.trello.com/1/boards/${id}?key=${process.env.REACT_APP_KEY}&token=${token}`
    );

    setBoards((prev) => prev.filter((board) => board.id !== id));
  };

  const toggleMenu = () => setIsMenuActive((prev) => !prev);

  const handleBoardNameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setBoardTitle(e.target.value.trim());

  const renameBoard = (id: string) => {
    if (!boardTitle) return;
    const newName = boardTitle.trim();
    setBoardTitle(newName);

    axios.put(
      `https://api.trello.com/1/boards/${id}?key=${process.env.REACT_APP_KEY}&token=${token}&name=${boardTitle}`
    );

    setBoards((prev) =>
      prev.map((board) =>
        board.id === id ? { ...board, name: newName } : board
      )
    );

    setEditing(false);
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>, id: string) => {
    if (e.key === "Enter") renameBoard(id);
  };

  return (
    <li className={styles.container}>
      <button className={styles.menuBtn} onClick={toggleMenu}></button>
      {editing ? (
        <input
          className={styles.input}
          onBlur={() => renameBoard(id)}
          value={boardTitle}
          onKeyUp={(e) => handleEnter(e, id)}
          onChange={handleBoardNameChange}
          ref={titleInputRef}
        />
      ) : (
        <Link
          className={styles.linkContainer}
          to={`/board/${id}`}
          state={{ boardTitle }}
        >
          <span className={styles.listTitle}>{name}</span>
        </Link>
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
