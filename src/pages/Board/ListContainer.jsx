import List from 'pages/Board/List';
import styles from './ListContainer.module.css';
import { Droppable, Draggable } from '@hello-pangea/dnd';
import useHorizontalScroll from 'hooks/useHorizontalScroll';

const getListStyle = (style, snapshot) => {
  if (!snapshot.isDropAnimating) {
    return style;
  }
  const { moveTo, curve, duration } = snapshot.dropAnimation;
  const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`;
  const rotate = 'rotate(5deg)';
  const scale = 'scale(1.1)';

  return {
    ...style,
    transform: `${translate} ${rotate} ${scale}`,
    transition: `all ${curve} ${duration + 0.1}s`,
  };
};

const ListContainer = ({ lists, setLists, cards, setCards }) => {
  const scrollRef = useHorizontalScroll();

  return (
    <Droppable droppableId="lists" direction="horizontal" type="LIST">
      {provided => (
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
                    isDragging={
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
