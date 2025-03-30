import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../app/feature/auth/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-2 shadow bg-primary lg:px-20">
        <div className="flex items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 lg:hidden"
          >
            <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
          </svg>
          <h1 className="p-2 text-xl font-medium leading-6 rounded text-primary bg-dark lg:leading-5 ">
            Harsh
          </h1>
        </div>

        <div className="flex gap-4">
          <ul className="flex gap-4 text-lg font-semibold text-black"></ul>
          {isAuthenticated ? (
            <div className="flex gap-2">
              <button className="btn-secondary" onClick={handleLogout}>
                Logout
              </button>
              <button
                className="btn-secondary"
                onClick={() => navigate("/new")}
              >
                Create Post
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button className="btn-accent" onClick={() => navigate("/login")}>
                Login
              </button>
              <button
                className="btn-secondary"
                onClick={() => navigate("/register")}
              >
                Create account
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Navbar;
