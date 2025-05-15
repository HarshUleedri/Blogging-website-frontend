import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../app/feature/auth/authSlice";

const Login = () => {
  // first step state for storing data
  // store the input data dynamiclly in the state on change
  // create a state for error to store the error and display if any error
  // create form submit function in which it will have sending user id and password to the backend and checking the password and confirm password is matching

  const dispatch = useDispatch();
  const { isAuthenticated, isError } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isvisible, setIsvisible] = useState({
    showPassword: false,
    showConfirmPassword: false,
  });

  // password toggle
  const toggleShowPassword = (e) => {
    e.preventDefault();
    const { name } = e.target;
    if (name === "showPassword") {
      setIsvisible((prev) => ({
        ...prev,
        [name]: !prev[name],
      }));
    }
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.username && formData.password) {
      dispatch(login(formData));
    }
    if (isError) {
      setError(isError);
    }
    if (isAuthenticated) {
      navigate("/");
    }

    // try {
    //   const response = await authAxios.post(
    //     "http://localhost:3000/api/login",
    //     formData
    //   );
    //   if (!response) {
    //     return setError("Invalid login credentials");
    //   }
    //   const { token } = response.data;
    //   console.log(token);
    //   localStorage.setItem("token", token);
    //   setError({});
    //   navigate("/");
    // } catch (err) {
    //   console.log(err.response.data);
    //   setError(err.response.data.message);
    // }
  };

  // const logout = () => localStorage.removeItem("token");

  return (
    <>
      <div className="flex items-center justify-center w-full h-screen">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 px-8 py-8 bg-gray-300 rounded-lg w-96">
            <label htmlFor="username">username </label>
            <input
              required
              value={formData.username}
              name="username"
              type="text"
              onChange={onChange}
            />
            <label htmlFor="password">password</label>
            <input
              required
              value={formData.password}
              name="password"
              type={isvisible.showPassword ? "text" : "password"}
              onChange={onChange}
            />
            <button name="showPassword" onClick={toggleShowPassword}>
              {isvisible.showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  <path
                    fillRule="evenodd"
                    d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                  <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                  <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                </svg>
              )}
            </button>
            {error && <p className="text-red-600 ">{error}</p>}
            <button className="px-12 py-2 text-white bg-gray-800 rounded-md">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
