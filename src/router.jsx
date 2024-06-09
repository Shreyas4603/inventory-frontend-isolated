import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { Dashboard, Login, Register } from "./Components";
import { PrivateRoutes } from "./Components/Utils/PrivateRoutes";
import App from "./App";

const router = new createBrowserRouter([{
  path: "/",
  element: <App />,
  children:[  
    { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/dashboard", element: <PrivateRoutes><Dashboard /></PrivateRoutes> },]
}

]);

export default router;
