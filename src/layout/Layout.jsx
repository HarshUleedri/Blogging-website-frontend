import Navbar from "../components/desktop/Navbar";
import Footer from "../components/desktop/Footer";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const { pathname } = useLocation();
  const hiddenRoutes = ["/login", "/register"];
  return (
    <>
      {!hiddenRoutes.includes(pathname) && <Navbar />}
      <div className="px-4 mx-auto max-w-7xl lg:px-0">{children}</div>
      {!hiddenRoutes.includes(pathname) && <Footer />}
    </>
  );
};

export default Layout;
