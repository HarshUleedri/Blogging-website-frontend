import { useNavigate } from "react-router-dom";

const UnauthorizedCard = ({ closeModal }) => {
  //hook
  const navigate = useNavigate();

  //helper function
  const handleClose = (event) => {
    event.stopPropagation();
    closeModal();
  };
  return (
    <div>
      <div className="w-full bg-white border rounded-md">
        <div className="flex items-center justify-between px-8 py-4 border-b ">
          <p className="text-xl font-semibold ">Login to continue</p>
          <button onClick={handleClose} className="btn-accent">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6 "
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        <div className="px-8 py-6">
          <h1 className="p-2 mb-6 text-xl font-medium leading-6 rounded text-primary bg-dark lg:leading-5 w-fit">
            Harsh
          </h1>
          <p className="mb-6 break-words text-light">
            A community where everyone shares, learns, and grows—together.
          </p>
          <div className="space-y-2">
            <button
              onClick={() => navigate("/login")}
              className="w-full btn-primary"
            >
              Log in
            </button>
            <button
              onClick={() => navigate("/register")}
              className="w-full py-1 text-accent hover:bg-secondary"
            >
              Create account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedCard;
