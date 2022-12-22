import axios from "axios";
import Form from "components/Form/Form";
import Header from "components/Header/Header";
import BoardLink from "./BoardLink/BoardLink";
import styles from "./BoardContainer.module.css";
import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import themeMode from "recoil/atom";
import ToggleTheme from "components/ThemeToggleButton/ThemeToggleButton";
import updateTheme from "utils/updateTheme";

const BoardContainer = () => {
  const [boards, setBoards] = useState([]);
  const [boardTitle, setBoardTitle] = useState("");
  const theme = useRecoilValue(themeMode);
  console.log(theme);

  useEffect(() => {
    updateTheme(theme);
    const fetchBoards = async () => {
      const { data } = await axios.get(
        `https://api.trello.com/1/organizations/637cd0d919ae57012698e904/boards?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}&filter=open`
      );

      setBoards(data.map(({ id, name }, i) => ({ id, name, i })));
    };

    fetchBoards();
  }, []);

  const handleChange = (e) => {
    setBoardTitle(e.target.value);
  };

  const createBoard = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(
      `https://api.trello.com/1/boards/?name=${boardTitle}&key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}&idOrganization=637cd0d919ae57012698e904`
    );

    setBoards((prev, i) => [...prev, { ...data, i }]);
    setBoardTitle("");
  };

  return (
    <>
      <Header />
      <h2 className={styles.title}>Your boards</h2>
      <Form
        placeholder={"Add board title"}
        value={boardTitle}
        onChange={handleChange}
        onSubmit={createBoard}
      />
      <ul className={styles.boardsContainer}>
        {boards.map(({ id, name }) => (
          <BoardLink key={id} id={id} name={name} setBoards={setBoards} />
        ))}
      </ul>
      <ToggleTheme />
    </>
  );
};

export default BoardContainer;
