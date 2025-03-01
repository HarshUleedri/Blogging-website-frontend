import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Loading from "../components/Fallbacks/Loading/loading";
import { routerForPublic } from "./RouterForPublic/RouterForPublic";
import { routesForNotAuthenticatedOnly } from "./routesForNotAuthenticatedOnly/routesForNotAuthenticatedOnly";
import { useSelector } from "react-redux";
import { routesForAuthenticatedOnly } from "./routesForAuthenticatedOnly/routesForAuthenticatedOnly";
import NotFound from "../components/Common/NotFound";

// const Home = lazy(() => import("../pages/Home/Home"));
// const CreateBlog = lazy(() => import("../pages/Blogs/CreateBlog/CreateBlog"));
// const EditBlog = lazy(() => import("../pages/Blogs/EditBlog/EditBlog"));
// const SingleBlog = lazy(() => import("../pages/Blogs/SingleBlog/SingleBlog"));
// const Login = lazy(() => import("../pages/Login/Login"));
// const Register = lazy(() => import("../pages/Register/Register"));
// const routes = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <Home />
//       </Suspense>

//     ),
//   },
//   {
//     path: "/blog/:slug",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <SingleBlog />
//       </Suspense>
//     ),
//   },
//   {
//     path: "/create",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <CreateBlog />
//       </Suspense>
//     ),
//   },
//   {
//     path: "/edit/:slug",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <EditBlog />
//       </Suspense>
//     ),
//   },
//   {
//     path: "/login",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <Login />
//       </Suspense>
//     ),
//   },
//   {
//     path: "/register",
//     element: (
//       <Suspense fallback={<Loading />}>
//         <Register />
//       </Suspense>
//     ),
//   },
// ]);

const Routes = () => {
  const { isAuthenticated } = useSelector(
    (state) => state.auth.isAuthenticated
  );
  const router = createBrowserRouter([
    ...routerForPublic,
    ...(!isAuthenticated ? routesForAuthenticatedOnly : []),
    ...routesForNotAuthenticatedOnly,
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default Routes;
