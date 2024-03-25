import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useState } from "react";
import Register from "./components/Register/Register";
import Dashboard from "./components/Profile/Dashboard";
import CreatePost from "./components/Post/CreatePost";
import EditPost from "./components/Post/EditPost";
import Show from "./components/Post/ShowPost";
import Inbox from "./components/Message/Inbox";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import "./App.css";
import Sell from "./components/Profile/Sell";
import Display from "./components/Message/Display";
import ForgotPassword from "./components/Login/ForgotPassword";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
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
      element: <CreatePost />,
    },
    {
      path: "/articles/:id",
      element: <Show />,
    },
    {
      path: "/profile",
      element: <Dashboard />,
    },
    {
      path: "/articles/:id/edit",
      element: <EditPost />,
    },
    {
      path: "/inbox",
      element: <Inbox />,
    },
    {
      path: "/inbox/:id",
      element: <Display />,
    },
    {
      path: "/sell",
      element: <Sell />,
    },
    {
      path: "/resetpassword",
      element: <ForgotPassword />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
