import React from "react";
import { RecoilRoot } from "recoil";
import BoardContainer from "pages/Home/BoardContainer";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Board from "pages/Board/Board";
import Landing from "pages/Landing/Landing";
import axios from "axios";

const router = createBrowserRouter([
  { path: "/", element: <Landing />, errorElement: <p>Not Found🥲</p> },
  {
    path: "/boards",
    element: <BoardContainer />,
    loader: async () => {
      const token = localStorage.getItem("trello_token");

      const {
        data: { idOrganizations },
      } = await axios.get(
        `https://api.trello.com/1/members/me/?key=${process.env.REACT_APP_KEY}&token=${token}`
      );

      return idOrganizations;
    },
    errorElement: <p>Not Found🥲</p>,
  },
  { path: "/board/:id", element: <Board />, errorElement: <p>Not Found🥲</p> },
]);

function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;
