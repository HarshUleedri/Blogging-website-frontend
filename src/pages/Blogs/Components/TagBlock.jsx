import PropTypes from "prop-types";

const TagBlock = ({ tags, handleRemoveTag }) => {
  return (
    <div className="flex items-center gap-2">
      {tags.map(({ tag, color }, index) => (
        <div
          style={{ backgroundColor: `${color}20` }}
          className={`flex items-center gap-2 px-2 py-1 rounded shadow w-fit `}
          key={index}
        >
          <div className="flex items-center gap-2 ">
            <p style={{ color: color }} className="font-medium text-md">
              #
            </p>
            <p className="text-light">{tag}</p>
          </div>
          <div onClick={() => handleRemoveTag(tag)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="font-semibold size-6 hover:text-red-600"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
};

TagBlock.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleRemoveTag: PropTypes.func.isRequired,
};

export default TagBlock;
