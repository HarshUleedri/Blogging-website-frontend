import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Layout from "../../layout/Layout";

export const ProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
  