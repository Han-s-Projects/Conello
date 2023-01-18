import axios from "axios";
import Header from "components/Header/Header";
import Form from "components/Form/Form";
import ListContainer from "./ListContainer";
import { useState, useEffect, useCallback } from "react";
import styles from "./Board.module.css";
import { DragDropContext } from "@hello-pangea/dnd";
import { useParams, useLocation } from "react-router-dom";
import ToggleTheme from "components/ThemeToggleButton/ThemeToggleButton";
import { useRecoilValue } from "recoil";
import themeMode from "recoil/atom";
import updateTheme from "utils/updateTheme";

const Board = () => {
  const [lists, setLists] = useState([]);
  const [cards, setCards] = useState([]);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const theme = useRecoilValue(themeMode);
  const { boardTitle } = useLocation().state;
  const token = localStorage.getItem("trello_token");

  useEffect(() => {
    updateTheme(theme);
    const fetchData = async () => {
      await Promise.allSettled([
        axios.get(
          `https://api.trello.com/1/boards/${id}/lists?key=${process.env.REACT_APP_KEY}&token=${token}`
        ),

        axios.get(
          `https://api.trello.com/1/boards/${id}/cards?key=${process.env.REACT_APP_KEY}&token=${token}`
        ),
      ]).then(([lists, cards]) => {
        setIsLoading(false);
        setLists(lists.value.data);
        setCards(cards.value.data);
      });
    };

    try {
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleChange = (e) => setText(e.target.value);

  const createList = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    const { data } = await axios.post(
      `https://api.trello.com/1/boards/${id}/lists?name=${text}&key=${process.env.REACT_APP_KEY}&token=${token}&pos=bottom`
    );

    setText("");
    setLists([...lists, data]);
  };

  const onDragEnd = useCallback(
    ({ source, destination, type }) => {
      if (
        !destination ||
        (source.index === destination.index &&
          source.droppableId === destination.droppableId)
      )
        return;

      if (type === "LIST") {
        let _lists = structuredClone(lists);
        const [list] = _lists.splice(source.index, 1);

        _lists.splice(destination.index, 0, list);

        _lists = _lists.map((_list, pos) => ({ ..._list, pos }));

        Promise.allSettled(
          _lists.map(({ id, pos }) =>
            axios.put(
              `https://api.trello.com/1/lists/${id}?key=${process.env.REACT_APP_KEY}&token=${token}&pos=${pos}`
            )
          )
        )
          .then((res) => {
            const _lists = res.map(({ value }) => value.data);

            if (_lists.some(({ pos }) => pos > _lists.at(-1).pos)) {
              _lists.forEach(({ id, pos }, i) => {
                if (pos > _lists[i + 1].pos) {
                  axios.put(
                    `https://api.trello.com/1/lists/${id}?key=${process.env.REACT_APP_KEY}&token=${token}&pos=${i}`
                  );
                }
              });
            }

            if (
              new Set(_lists.map((_list) => _list.pos)).size !== _lists.length
            ) {
              const { id, pos } = _lists.find(
                ({ pos }, i) => pos === _lists[i + 1].pos
              );

              axios.put(
                `https://api.trello.com/1/lists/${id}?key=${
                  process.env.REACT_APP_KEY
                }&token=${token}&pos=${pos - 1}`
              );
            }
          })
          .catch((error) => console.error(error));

        setLists(_lists);
      }

      if (type === "CARD") {
        const deepCopiedCards = structuredClone(cards);

        if (source.droppableId === destination.droppableId) {
          let _cards = deepCopiedCards.filter(
            (card) => card.idList === source.droppableId
          );
          const [card] = _cards.splice(source.index, 1);

          _cards.splice(destination.index, 0, card);

          _cards = _cards.map((_card, pos) => ({ ..._card, pos }));

          _cards.forEach(({ id, pos }) => {
            axios.put(
              `https://api.trello.com/1/cards/${id}?key=${process.env.REACT_APP_KEY}&token=${token}&pos=${pos}`
            );
          });

          setCards((prev) => [
            ...prev.filter((card) => card.idList !== source.droppableId),
            ..._cards,
          ]);

          console.log(cards.map((card) => card.pos));
        } else {
          let _cardsFrom = deepCopiedCards.filter(
            (card) => card.idList === source.droppableId
          );
          let _cardsTo = deepCopiedCards.filter(
            (card) => card.idList === destination.droppableId
          );
          const [from] = _cardsFrom.splice(source.index, 1);

          _cardsFrom = _cardsFrom.map((_card, pos) => ({ ..._card, pos }));

          _cardsTo.splice(destination.index, 0, from);

          _cardsTo = _cardsTo.map((_card, pos) =>
            pos === destination.index
              ? { ..._card, pos, idList: destination.droppableId }
              : { ..._card, pos }
          );

          _cardsTo.forEach(({ id, pos }) => {
            pos === destination.index
              ? axios.put(
                  `https://api.trello.com/1/cards/${id}?key=${process.env.REACT_APP_KEY}&token=${token}&pos=${pos}&idList=${destination.droppableId}`
                )
              : axios.put(
                  `https://api.trello.com/1/cards/${id}?key=${process.env.REACT_APP_KEY}&token=${token}&pos=${pos}`
                );
          });

          setCards((prev) => [
            ...prev.filter(
              (card) =>
                card.idList !== source.droppableId &&
                card.idList !== destination.droppableId
            ),
            ..._cardsFrom,
            ..._cardsTo,
          ]);
        }
      }
    },
    [lists, cards]
  );

  return (
    <div className={styles.container}>
      <Header />
      <h2 className={styles.title}>{boardTitle}</h2>
      <Form
        placeholder={"Add a list"}
        value={text}
        onChange={handleChange}
        onSubmit={createList}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        {isLoading ? null : (
          <ListContainer
            lists={lists}
            setLists={setLists}
            cards={cards}
            setCards={setCards}
          />
        )}
      </DragDropContext>
      <ToggleTheme />
      <div id="modal"></div>
    </div>
  );
};

export default Board;
