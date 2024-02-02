import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import Post from "./components/Post/Post";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/post",
      element: <Post />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
