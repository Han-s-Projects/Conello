import axios from "axios";
import Card from "components/Card/Card";
import Form from "components/Form/Form";
import { useState, useEffect } from "react";

const List = ({ list }) => {
  const [cards, setCards] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchCards = async () => {
      const { data } = await axios.get("http://localhost:3001/cards");

      setCards(data.filter(({ idList }) => idList === list.id));
    };

    fetchCards();
  }, []);

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data } = await axios.post("http://localhost:3001/cards", {
      id: crypto.randomUUID(),
      name: text,
      desc: "",
      closed: false,
      pos: 65535,
      idBoard: "638afc978397000123346ccf",
      idList: list.id,
      dateLastActivity: new Date().toISOString(),
      url: "https://trello.com/c/WhSROzo1/4-%EA%B5%AD%EC%96%B4",
    });

    setCards([...cards, data]);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/cards/${id}`);

    setCards((prev) => prev.filter((card) => card.id !== id));
  };

  return (
    <>
      <div>{list.name}</div>
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onDelete={() => handleDelete(card.id)}
          setCards={setCards}
        />
      ))}
      <Form
        placeholder="Add a card"
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default List;
