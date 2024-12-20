import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

const Home = lazy(() => import("../pages/Home/home"));
const CreateBlog = lazy(() => import("../pages/Blogs/CreateBlog/CreateBlog"));
const EditBlog = lazy(() => import("../pages/Blogs/EditBlog/EditBlog"));
const SingleBlog = lazy(() => import("../pages/Blogs/SingleBlog/SingleBlog"));
const Login = lazy(() => import("../pages/Login/Login"));
const Register = lazy(() => import("../pages/Register/Register"));
const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<div>loading..</div>}>
        <Home />
      </Suspense>
    ),
  },
  {
    path: "/blog/:slug",
    element: (
      <Suspense fallback={<div>loading..</div>}>
        <SingleBlog />
      </Suspense>
    ),
  },
  {
    path: "/create",
    element: (
      <Suspense fallback={<div>loading..</div>}>
        <CreateBlog />
      </Suspense>
    ),
  },
  {
    path: "/edit/:slug",
    element: (
      <Suspense fallback={<div>loading..</div>}>
        <EditBlog />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<div>loading..</div>}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<div>loading..</div>}>
        <Register />
      </Suspense>
    ),
  },
]);

export default routes;
