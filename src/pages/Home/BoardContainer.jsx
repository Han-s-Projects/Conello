import { useState, useEffect } from "react";
import Form from "components/Form/Form";
import Header from "components/Header/Header";
import BoardLink from "./BoardLink/BoardLink";
import styles from "./BoardContainer.module.css";
import ToggleTheme from "components/ThemeToggleButton/ThemeToggleButton";
import updateTheme from "utils/updateTheme";
import { useRecoilValue } from "recoil";
import themeMode from "recoil/atom";
import { useLoaderData } from "react-router-dom";
import axios from "axios";

const BoardContainer = () => {
  const [boards, setBoards] = useState([]);
  const [boardTitle, setBoardTitle] = useState("");
  const theme = useRecoilValue(themeMode);
  const token = localStorage.getItem("trello_token");
  const idOrganizations = useLoaderData();

  useEffect(() => {
    updateTheme(theme);

    const fetchData = async () => {
      const { data } = await axios.get(
        `https://api.trello.com/1/organizations/${idOrganizations}/boards?key=${process.env.REACT_APP_KEY}&token=${token}&filter=open`
      );

      setBoards(data.map(({ id, name }, i) => ({ id, name, i })));
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setBoardTitle(e.target.value);
  };

  const createBoard = async (e) => {
    e.preventDefault();

    const { data } = await axios.post(
      `https://api.trello.com/1/boards/?name=${boardTitle}&key=${process.env.REACT_APP_KEY}&token=${token}&idOrganization=${idOrganizations}`
    );

    setBoards((prev, i) => [{ ...data, i }, ...prev]);

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
