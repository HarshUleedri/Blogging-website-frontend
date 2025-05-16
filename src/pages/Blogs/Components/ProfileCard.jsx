import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useUserFollow } from "../../../hook/useUserFollow";
import Modal from "../../../components/Common/Modal/Modal";

import { useModal } from "../../../hook/useModal";
import UnauthorizedCard from "../../../components/Common/UnauthorizedCard/UnauthorizedCard";

const ProfileCard = ({ user, blogSlug }) => {
  //hook
  const navigate = useNavigate();
  const {
    userFollowingsData,

    mutate,
    mutationPending,
  } = useUserFollow({ fetchFollowings: true });
  const { openModal, closeModal, isOpen, modalRef } = useModal();

  // value
  const { user: authenticatedUser, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const isFollowing = userFollowingsData?.followings.some(
    (following) => following?._id === user?._id
  );

  //helper function

  const handleFollowClick = (e) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      return openModal();
    }
    mutate({ userId: user?._id });
  };

  return (
    <div>
      <div
        onClick={() => navigate(`/${user?.username}`)}
        className="bg-white border rounded-md"
      >
        <div
          style={{ backgroundColor: user?.brandColor }}
          className="w-full h-[2rem] rounded-t-md"
        ></div>
        <div className="p-4">
          <div className="flex gap-4 mb-6 items-top profile-header">
            <img
              src={user?.profileImage}
              alt=""
              className="object-cover -mt-8 rounded-full shadow-md size-12"
            />
            <p className="text-xl font-bold leading-4 text-dark">
              {user?.name}
            </p>
          </div>
          {authenticatedUser?._id === user?._id ? (
            <>
              <div className="mb-4 edit-button">
                <button
                  onClick={() => navigate(`/${user?.username}`)}
                  className="w-full btn-primary"
                >
                  Edit
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="mb-4 follow-button">
                <button
                  onClick={handleFollowClick}
                  disabled={mutationPending}
                  className={`${
                    isFollowing
                      ? "w-full border text-dark font-semibold px-4 py-1 rounded  disabled:opacity-50"
                      : "w-full btn-primary disabled:opacity-50"
                  }`}
                >
                  {isFollowing ? "Following" : "Follow"}
                </button>
              </div>
            </>
          )}

          <div className="flex flex-col gap-4 profile-data">
            <p className="flex flex-col gap-1 text-light">{user?.bio}</p>
            <p className="flex flex-col gap-1 text-light">
              <span className="font-semibold leading-3 t ">Location</span>
              {user?.location}
            </p>
            {user?.createdAt && (
              <p className="flex flex-col gap-1 text-light">
                <span className="font-semibold leading-3 t ">Joined</span>

                {new Date(user?.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}
              </p>
            )}
          </div>
        </div>
      </div>

      <Modal isOpen={isOpen} modalRef={modalRef}>
        <UnauthorizedCard closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default ProfileCard;
