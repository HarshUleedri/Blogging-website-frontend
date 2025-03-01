import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Layout from "../../layout/Layout";

export const ProtectedRoute = () => {
  const { isAuthenticate } = useSelector((state) => state.auth);

  if (!isAuthenticate) {
    return <Navigate to="/login" />;
  }
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
