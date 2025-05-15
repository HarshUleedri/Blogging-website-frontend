import { useNavigate } from "react-router-dom";

const UserProfileHeader = ({
  ProfileHeaderProp: { name, profileImage, bio, createdAt, brandColor },
}) => {
  //state
  const isoDate = createdAt;
  const formattedDate = new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

  //hook
  const navigate = useNavigate();

  return (
    <div>
      <div className="relative p-8 bg-white border rounded-lg">
        <div className="absolute -translate-x-1/2 rounded left-1/2 -top-16">
          <img
            style={{ borderColor: brandColor }}
            className="object-cover border-8 rounded-full size-32"
            src={profileImage}
            alt="profile-image"
          />
        </div>
        <div className="flex flex-col items-center justify-center pt-16 text-center">
          <p className="mb-2 text-3xl font-bold ">{name}</p>
          <p className="w-1/2 mb-6 text-lg break-words text-light">{bio}</p>
          <p className="flex items-center gap-4 text-light/80">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="size-6"
            >
              <path d="m15 1.784-.796.795a1.125 1.125 0 1 0 1.591 0L15 1.784ZM12 1.784l-.796.795a1.125 1.125 0 1 0 1.591 0L12 1.784ZM9 1.784l-.796.795a1.125 1.125 0 1 0 1.591 0L9 1.784ZM9.75 7.547c.498-.021.998-.035 1.5-.042V6.75a.75.75 0 0 1 1.5 0v.755c.502.007 1.002.021 1.5.042V6.75a.75.75 0 0 1 1.5 0v.88l.307.022c1.55.117 2.693 1.427 2.693 2.946v1.018a62.182 62.182 0 0 0-13.5 0v-1.018c0-1.519 1.143-2.829 2.693-2.946l.307-.022v-.88a.75.75 0 0 1 1.5 0v.797ZM12 12.75c-2.472 0-4.9.184-7.274.54-1.454.217-2.476 1.482-2.476 2.916v.384a4.104 4.104 0 0 1 2.585.364 2.605 2.605 0 0 0 2.33 0 4.104 4.104 0 0 1 3.67 0 2.605 2.605 0 0 0 2.33 0 4.104 4.104 0 0 1 3.67 0 2.605 2.605 0 0 0 2.33 0 4.104 4.104 0 0 1 2.585-.364v-.384c0-1.434-1.022-2.7-2.476-2.917A49.138 49.138 0 0 0 12 12.75ZM21.75 18.131a2.604 2.604 0 0 0-1.915.165 4.104 4.104 0 0 1-3.67 0 2.605 2.605 0 0 0-2.33 0 4.104 4.104 0 0 1-3.67 0 2.605 2.605 0 0 0-2.33 0 4.104 4.104 0 0 1-3.67 0 2.604 2.604 0 0 0-1.915-.165v2.494c0 1.035.84 1.875 1.875 1.875h15.75c1.035 0 1.875-.84 1.875-1.875v-2.494Z" />
            </svg>
            Joined on {formattedDate}
          </p>
        </div>
        <button
          onClick={() => navigate("/setting")}
          className="absolute right-6 btn-primary top-6 "
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfileHeader;
