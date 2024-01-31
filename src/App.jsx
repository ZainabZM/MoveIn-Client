import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
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
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
