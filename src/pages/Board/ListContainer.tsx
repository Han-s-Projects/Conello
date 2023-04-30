import React, { Dispatch, SetStateAction } from "react";
import {
  Droppable,
  Draggable,
  DraggableStyle,
  DraggableStateSnapshot,
} from "@hello-pangea/dnd";
import useHorizontalScroll from "@hooks/useHorizontalScroll";
import List from "@pages/Board/List";
import styles from "./ListContainer.module.css";
import TrelloList from "interfaces/TrelloList";
import TrelloCard from "interfaces/TrelloCard";

interface Props {
  lists: TrelloList[];
  setLists: Dispatch<SetStateAction<TrelloList[]>>;
  cards: TrelloCard[];
  setCards: Dispatch<SetStateAction<TrelloCard[]>>;
}

const getListStyle = (
  style: DraggableStyle | undefined,
  snapshot: DraggableStateSnapshot
) => {
  if (!snapshot.isDropAnimating) return style;
  if (!snapshot.dropAnimation) return;
  const { moveTo, curve, duration } = snapshot.dropAnimation;
  const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`;
  const rotate = "rotate(5deg)";
  const scale = "scale(1.1)";

  return {
    ...style,
    transform: `${translate} ${rotate} ${scale}`,
    transition: `all ${curve} ${duration + 0.1}s`,
  };
};

const ListContainer = ({ lists, setLists, cards, setCards }: Props) => {
  const scrollRef = useHorizontalScroll();

  return (
    <Droppable droppableId="lists" direction="horizontal" type="LIST">
      {(provided) => (
        <div
          className={styles.container}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <ul className={styles.ul} ref={scrollRef}>
            {lists.map((list, i) => (
              <Draggable key={list.id} draggableId={list.id} index={i}>
                {(provided, snapshot) => (
                  <div
                    className={styles.list}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    data-isdragging={
                      snapshot.isDragging && !snapshot.isDropAnimating
                    }
                    style={getListStyle(
                      provided.draggableProps.style,
                      snapshot
                    )}
                  >
                    <List
                      list={list}
                      setLists={setLists}
                      cards={cards}
                      setCards={setCards}
                    />
                  </div>
                )}
              </Draggable>
            ))}
          </ul>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default ListContainer;
