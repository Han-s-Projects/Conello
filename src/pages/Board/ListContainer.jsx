import List from "pages/Board/List";

const ListContainer = ({ lists }) => {
  return (
    <>
      {lists.map((list) => (
        <List key={list.id} list={list} />
      ))}
    </>
  );
};

export default ListContainer;
