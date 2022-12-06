import axios from "axios";
import Header from "components/Header/Header";
import Form from "components/Form/Form";
import ListContainer from "./ListContainer";
import { useState, useEffect } from "react";

const Board = () => {
  const [lists, setLists] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchLists = async () => {
      const { data } = await axios.get("http://localhost:3001/lists");
      setLists(data);
    };

    fetchLists();
  }, []);

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post("http://localhost:3001/lists", {
      id: crypto.randomUUID(),
      name: text,
      closed: false,
      pos: 65535,
      idBoard: "638afc978397000123346ccf",
    });

    setLists([...lists, data]);
  };

  return (
    <>
      <Header />
      <h1>My first board</h1>
      <Form
        placeholder={"Add a list"}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      <ListContainer lists={lists} setLists={setLists} />
    </>
  );
};

export default Board;
