import Header from "components/Header/Header";
import Form from "components/Form/Form";
import ListContainer from "./ListContainer";

const Board = () => {
  return (
    <>
      <Header />
      <h1>My first bsard</h1>
      <Form placeholder={"Add a list"} />
      <ListContainer />
    </>
  );
};

export default Board;
