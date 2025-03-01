import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import CreateBlog from "../../pages/Blogs/CreateBlog/CreateBlog";
import EditBlog from "../../pages/Blogs/EditBlog/EditBlog";

export const routesForAuthenticatedOnly = [
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/create",
        element: <CreateBlog />,
      },
      {
        path: "/edit/:slug",
        element: <EditBlog />,
      },
    ],
  },
];
