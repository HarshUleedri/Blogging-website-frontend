import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [registerData, setRegisterData] = useState({});
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const handleRegisterData = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (registerData.password != registerData.confirm) {
      setError({ password: "password does not match" });
    } else {
      try {
        await axios.post("http://localhost:3000/api/register", registerData);
        setError({});
        navigate("/login");
      } catch (err) {
        setError(err.response.data);
      }
    }
  };
  return (
    <>
      <div className="max-w-5xl mx-auto text-center ">
        <div className="text-3xl font-semibold text-black ">Register here</div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4 px-8 py-8 bg-gray-300 rounded-md text-start w-96">
            <label htmlFor="username">Username</label>
            <input
              name="username"
              value={registerData.username}
              className="px-2 py-2 rounded-sm"
              type="text"
              onChange={handleRegisterData}
            />
            {error.field === "username" && (
              <p className="text-red-600 ">{error.message}</p>
            )}
            <label htmlFor="email"> Email</label>
            <input
              name="email"
              value={registerData.email}
              className="px-2 py-2 rounded-sm"
              type="email"
              onChange={handleRegisterData}
            />
            {error.field === "email" && (
              <p className="text-red-600 ">{error.message}</p>
            )}
            <label htmlFor="password">Password</label>
            <input
              value={registerData.password}
              name="password"
              className="px-2 py-2 rounded-sm"
              type="password"
              onChange={handleRegisterData}
            />
            <label htmlFor="confirm">Confirm Password</label>
            <input
              name="confirm"
              value={registerData.confirm}
              className="px-2 py-2 rounded-sm"
              type="password"
              onChange={handleRegisterData}
            />
            <button className="px-8 py-2 font-semibold text-white bg-gray-600 rounded-md">
              submit
            </button>
            {error.password && (
              <p className="text-red-600 ">{error.password}</p>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
