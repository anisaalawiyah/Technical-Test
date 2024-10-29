import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Members from "./pages/Members.jsx";
import DetailMember from "./pages/DetailMember.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Home from "./components/Home.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/register",
        element: <Register />, // Tampilkan Members di rute utama
      },
      {
        path: "/detail-member",
        element: <DetailMember />, // Tampilkan DetailMember di rute terpisah
      },

      {
        path: "/member",
        element: <Members />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/",
        element: <Home />,
      },
     
      // {
      //   path: "/order",
      //   element: <Orders/>,
      // },
   

    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
