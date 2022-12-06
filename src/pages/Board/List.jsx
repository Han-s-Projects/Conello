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

      console.log("fetched cards: ", data);

      setCards(data.filter(({ idList }) => idList === list.id));
    };

    fetchCards();
  }, []);

  return (
    <>
      <div>{list.name}</div>
      {cards.map((card) => (
        <Card key={card.id} card={card} />
      ))}
      <Form placeholder="Add a card" />
    </>
  );
};

export default List;
