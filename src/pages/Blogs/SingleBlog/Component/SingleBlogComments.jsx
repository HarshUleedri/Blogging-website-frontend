import { useQuery } from "@tanstack/react-query";
import { getComments } from "../../../../api/CommentApi/CommentApi";
import { useSelector } from "react-redux";

const SingleBlogComments = ({ slug, openModal }) => {
  //hook
  const { data = [] } = useQuery({
    queryKey: ["comments", slug],
    queryFn: () => getComments(slug),
    enabled: !!slug,
  });

  const { isAuthenticated } = useSelector((state) => state.auth);

  //value
  const topLevelComments = data?.topLevelComments;

  // navigating to the comment section

  const navigateToSection = () => {
    if (!isAuthenticated) {
      return openModal();
    }
    window.location.hash = "comments";
  };

  return (
    <div
      onClick={() => navigateToSection()}
      className="flex flex-col items-center gap-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-8 text-light"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
        />
      </svg>

      <p className="text-base text-light">{topLevelComments?.length}</p>
    </div>
  );
};

export default SingleBlogComments;
