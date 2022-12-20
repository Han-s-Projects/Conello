import React from "react";
import BoardContainer from "pages/Home/BoardContainer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Board from "pages/Board/Board";

const router = createBrowserRouter([
  { path: "/", element: <BoardContainer />, errorElement: <p>Not Found🥲</p> },
  { path: "/board/:id", element: <Board />, errorElement: <p>Not Found🥲</p> },
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
