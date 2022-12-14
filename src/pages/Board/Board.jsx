import axios from "axios";
import Header from "components/Header/Header";
import Form from "components/Form/Form";
import ListContainer from "./ListContainer";
import { useState, useEffect } from "react";
import styles from "./Board.module.css";

const Board = () => {
  const [lists, setLists] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    // Get List on a Board
    const fetchLists = async () => {
      const { data } = await axios.get(
        `https://api.trello.com/1/boards/luQhevFB/lists?key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}`
      );
      setLists(data);
    };

    fetchLists();
  }, []);

  const handleChange = (e) => setText(e.target.value);

  const createList = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    const { data } = await axios.post(
      `https://api.trello.com/1/boards/luQhevFB/lists?name=${text}&key=${process.env.REACT_APP_KEY}&token=${process.env.REACT_APP_TOKEN}`
    );

    setText("");
    setLists([...lists, data]);
  };

  return (
    <>
      <Header />
      <h2 className={styles.title}>My first board</h2>
      <Form
        placeholder={"Add a list"}
        value={text}
        onChange={handleChange}
        onSubmit={createList}
      />
      <ListContainer lists={lists} setLists={setLists} />
    </>
  );
};

export default Board;
