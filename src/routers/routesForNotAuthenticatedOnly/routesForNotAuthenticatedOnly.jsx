import Login from "../../pages/Login/Login";
import Register from "../../pages/Register/Register";

export const routesForNotAuthenticatedOnly = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
];
