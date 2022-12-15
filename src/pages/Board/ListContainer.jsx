import List from "pages/Board/List";
import styles from "./ListContainer.module.css";
import { Droppable, Draggable } from "@hello-pangea/dnd";

const ListContainer = ({ lists, setLists, cards, setCards }) => {
  const cardsInList = (idList) => {
    return cards.filter((card) => card.idList === idList);
  };

  return (
    <Droppable droppableId="lists" direction="horizontal" type="LIST">
      {(provided) => (
        <ul
          className={styles.container}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {lists.map((list, i) => (
            <Draggable key={list.id} draggableId={list.id} index={i}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <List
                    list={list}
                    setLists={setLists}
                    cards={cardsInList(list.id)}
                    setCards={setCards}
                  />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </ul>
      )}
    </Droppable>
  );
};

export default ListContainer;
