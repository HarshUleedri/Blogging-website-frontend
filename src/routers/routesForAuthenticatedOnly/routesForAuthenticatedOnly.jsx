import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import CreateBlog from "../../pages/Blogs/CreateBlog/CreateBlog";
import EditBlog from "../../pages/Blogs/EditBlog/EditBlog";
import UserProfile from "../../pages/user/UserProfile/UserProfile";
import EditUserProfile from "../../pages/user/EditUserProfile/EditUserProfile";
import Dashboard from "../../pages/Dashboard/Dashboard";
import UserAnalytics from "../../pages/Dashboard/Analytics/UserAnalytics";

export const routesForAuthenticatedOnly = [
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/new",
        element: <CreateBlog />,
      },
      {
        path: "/edit/:slug",
        element: <EditBlog />,
      },

      {
        path: "/:username",
        element: <UserProfile />,
      },
      {
        path: "/setting",
        element: <EditUserProfile />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "analytics",
            element: <UserAnalytics />,
          },
        ],
      },
    ],
  },
];
