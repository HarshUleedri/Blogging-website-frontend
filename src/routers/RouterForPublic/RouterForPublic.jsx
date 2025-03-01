import Blogs from "../../pages/Blogs/Blogs";
import CreateBlog from "../../pages/Blogs/CreateBlog/CreateBlog";
import Home from "../../pages/Home/Home";
import { ProtectedRoute } from "../PublicRoute/PublicRoute";

export const routerForPublic = [
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "blog/:slug",
        element: <Blogs />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
    ],
  },
];
