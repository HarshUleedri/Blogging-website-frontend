import { Outlet } from "react-router-dom";
import Layout from "../../layout/Layout";

export const ProtectedRoute = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};
