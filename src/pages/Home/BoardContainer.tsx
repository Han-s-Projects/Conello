/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import { useLoaderData } from "react-router-dom";
import { useRecoilValue } from "recoil";
import themeMode, { tokenState } from "@recoil/atom";
import updateTheme from "@utils/updateTheme";
import Header from "@components/Header/Header";
import Form from "@components/Form/Form";
import BoardLink from "./BoardLink/BoardLink";
import ToggleTheme from "@components/ThemeToggleButton/ThemeToggleButton";
import styles from "./BoardContainer.module.css";
import TrelloBoard from "interfaces/TrelloBoard";

interface DataProps {
  id: string;
  name: string;
}

const BoardContainer = () => {
  const [boards, setBoards] = useState<TrelloBoard[]>([]);
  const [boardTitle, setBoardTitle] = useState("");
  const theme = useRecoilValue(themeMode);
  const token = useRecoilValue(tokenState);

  const idOrganizations = useLoaderData();

  useEffect(() => {
    updateTheme(theme);

    const fetchData = async () => {
      const { data } = await axios.get(
        `https://api.trello.com/1/organizations/${idOrganizations}/boards?key=${process.env.REACT_APP_KEY}&token=${token}&filter=open`
      );

      setBoards(
        data.map(({ id, name }: DataProps, i: number) => ({
          id,
          name,
          i,
        }))
      );
    };

    fetchData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBoardTitle(e.target.value);
  };

  const createBoard = async (e: Event) => {
    e.preventDefault();

    const { data } = await axios.post(
      `https://api.trello.com/1/boards/?name=${boardTitle}&key=${process.env.REACT_APP_KEY}&token=${token}&idOrganization=${idOrganizations}`
    );

    setBoards((prev) => [data, ...prev]);

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
