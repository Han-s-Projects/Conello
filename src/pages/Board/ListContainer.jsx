import List from "pages/Board/List";

const ListContainer = ({ lists, setLists }) => {
  return (
    <>
      {lists.map((list) => (
        <List key={list.id} list={list} setLists={setLists} />
      ))}
    </>
  );
};

export default ListContainer;
