import axios from "axios";
import List from "pages/Board/List";
import { useState, useEffect } from "react";

const ListContainer = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      const { data } = await axios.get("http://localhost:3001/lists");
      console.log("fetched lists: ", data);
      setLists(data);
    };

    fetchLists();
    console.log("lists: ", lists);
  }, []);

  return (
    <>
      {lists.map((list) => (
        <List key={list.id} list={list} />
      ))}
    </>
  );
};

export default ListContainer;
