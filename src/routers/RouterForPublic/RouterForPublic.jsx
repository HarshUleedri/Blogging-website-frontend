import Blogs from "../../pages/Blogs/Blogs";
import CreateBlog from "../../pages/Blogs/CreateBlog/CreateBlog";
import SingleBlog from "../../pages/Blogs/SingleBlog/SingleBlog";
import Home from "../../pages/Home/Home";
import Testing from "../../pages/testing/testing";
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
        element: <SingleBlog />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/test",
        element: <Testing />,
      },
    ],
  },
];
