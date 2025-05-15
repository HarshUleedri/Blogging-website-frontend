import { useNavigate } from "react-router-dom";

const LoginAd = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 border rounded-md ">
      <div className="mb-2 text-xl font-bold title">
        This Community is a community of 3,099,574 amazing People
      </div>
      <div className="mb-2 discription text-light">
        We&lsquo;re a place where people share, stay up-to-date and grow their
        careers.
      </div>
      <div className="flex flex-col gap-2 actions-btn">
        <button className="btn-accent" onClick={() => navigate("/login")}>
          Login
        </button>
        <button className="btn-secondary" onClick={() => navigate("/register")}>
          Create account
        </button>
      </div>
    </div>
  );
};

export default LoginAd;
