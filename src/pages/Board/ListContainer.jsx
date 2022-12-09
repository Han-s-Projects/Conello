import List from "pages/Board/List";
import styles from "./ListContainer.module.css";

const ListContainer = ({ lists, setLists }) => {
  return (
    <ul className={styles.container}>
      {lists.map((list) => (
        <List key={list.id} list={list} setLists={setLists} />
      ))}
    </ul>
  );
};

export default ListContainer;
