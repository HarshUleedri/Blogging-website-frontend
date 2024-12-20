import { RouterProvider } from "react-router-dom";
import routes from "./routers/router";
import Navbar from "./components/desktop/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <RouterProvider router={routes} />
      <div>footer</div>
    </>
  );
};

export default App;
