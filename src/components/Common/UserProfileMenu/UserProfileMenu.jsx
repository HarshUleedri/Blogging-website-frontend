import { useEffect, useRef, useState } from "react";
import { useUserData } from "../../../hook/useUserData";
import { useDispatch } from "react-redux";
import { logout } from "../../../app/feature/auth/authSlice";
import { useNavigate } from "react-router-dom";

const UserProfileMenu = () => {
  //state
  const [isOpen, setIsOpen] = useState(false);

  //Hook
  const userMenuRef = useRef(null);
  const { isLoading, data } = useUserData();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutSideClick = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutSideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutSideClick);
  });

  //helper function
  const handleSignOut = () => {
    dispatch(logout());
    setIsOpen(false);
  };

  const handleNavigation = (params) => {
    navigate(`/${params}`);
    setIsOpen(false);
  };

  const user = data?.user;

  if (isLoading) return <>loading...</>;

  return (
    <>
      <div className="relative">
        <div onClick={() => setIsOpen(!isOpen)}>
          <img
            className="object-cover rounded-full size-8"
            src={
              user?.profileImage ||
              "https://dummyimage.com/100x100/a1a1a1/fff&text=profile+Image"
            }
            alt="profile-name"
          />
        </div>
        {isOpen && (
          <>
            <div
              ref={userMenuRef}
              className="absolute right-0 p-2 mt-2 bg-white rounded-md shadow-md top-full min-w-64"
            >
              <button
                onClick={() => handleNavigation(user.username)}
                className="w-full px-4 py-2 text-left rounded-sm cursor-pointer hover:bg-accent/20 hover:text-accent hover:underline"
              >
                {user.name && <p className="font-bold ">{user.name}</p>}
                <p className="text-sm ">@{user.username}</p>
              </button>
              <div className="py-2 my-2 border-secondary border-y">
                <button
                  onClick={() => handleNavigation("dashboard")}
                  className="w-full px-4 py-2 text-left rounded-sm cursor-pointer hover:bg-accent/20 hover:text-accent hover:underline"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => handleNavigation("new")}
                  className="w-full px-4 py-2 text-left rounded-sm cursor-pointer hover:bg-accent/20 hover:text-accent hover:underline"
                >
                  Create post
                </button>
                <button
                  onClick={() => handleNavigation("setting")}
                  className="w-full px-4 py-2 text-left rounded-sm cursor-pointer hover:bg-accent/20 hover:text-accent hover:underline"
                >
                  Setting
                </button>
              </div>

              <button
                onClick={handleSignOut}
                className="w-full px-4 py-2 text-left cursor-pointer hover:bg-accent/20 hover:text-accent hover:underline "
              >
                Sign out
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default UserProfileMenu;
