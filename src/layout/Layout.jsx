import Navbar from "../components/desktop/Navbar";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const { pathname, state } = useLocation();

  const hiddenRoutes = ["/login", "/register", "/new", "/edit", "/user"];
  return (
    <>
      {!hiddenRoutes.includes(pathname) &&
        !hiddenRoutes.includes(state?.value) && <Navbar />}
      <div className="px-4 mx-auto max-w-7xl lg:px-0">{children}</div>
      {/* {!hiddenRoutes.includes(pathname) && <Footer />} */}
    </>
  );
};

export default Layout;
