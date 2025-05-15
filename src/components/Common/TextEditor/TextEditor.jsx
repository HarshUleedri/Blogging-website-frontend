const TextEditor = ({
  data: { isHeadingOpen, setIsHeadingOpen, applyFormat, isPending, addImage },
}) => {
  return (
    <div>
      <div className="flex gap-2 px-2 py-2 mb-2 rounded bg-secondary">
        <button
          className="relative px-2 py-1 rounded hover:bg-accent/20 hover:underline hover:text-accent"
          onClick={() => setIsHeadingOpen(!isHeadingOpen)}
        >
          <svg
            height="20"
            viewBox="0 0 24 24"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17 11V4h2v17h-2v-8H7v8H5V4h2v7z"></path>
          </svg>
          {isHeadingOpen && (
            <>
              <div className="absolute left-0 mt-4 space-y-2 text-black top-full ">
                {[
                  { label: "Heading 1", format: "# ", isBlock: true },
                  { label: "Heading 2", format: "## ", isBlock: true },
                  { label: "Heading 3", format: "### ", isBlock: true },
                  { label: "Heading 4", format: "#### ", isBlock: true },
                  { label: "Heading 5", format: "##### ", isBlock: true },
                  { label: "Heading 6", format: "###### ", isBlock: true },
                ].map(({ label, format }, index) => (
                  <button
                    key={index}
                    onClick={() => applyFormat(format)}
                    className="px-4 py-1 rounded-md bg-secondary whitespace-nowrap"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </>
          )}
        </button>
        {[
          {
            label: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-4"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a1 1 0 0 1 1-1h6a4.5 4.5 0 0 1 3.274 7.587A4.75 4.75 0 0 1 11.25 18H5a1 1 0 0 1-1-1V3Zm2.5 5.5v-4H11a2 2 0 1 1 0 4H6.5Zm0 2.5v4.5h4.75a2.25 2.25 0 0 0 0-4.5H6.5Z"
                  clipRule="evenodd"
                />
              </svg>
            ),
            format: "**",
            endFormat: "**",
          },
          {
            label: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-4"
              >
                <path
                  fillRule="evenodd"
                  d="M8 2.75A.75.75 0 0 1 8.75 2h7.5a.75.75 0 0 1 0 1.5h-3.215l-4.483 13h2.698a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3.215l4.483-13H8.75A.75.75 0 0 1 8 2.75Z"
                  clipRule="evenodd"
                />
              </svg>
            ),
            format: "*",
            endFormat: "*",
          },
          {
            label: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M11.617 3.963c-1.186-.318-2.418-.323-3.416.015-.992.336-1.49.91-1.642 1.476-.152.566-.007 1.313.684 2.1.528.6 1.273 1.1 2.128 1.446h7.879a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1 0-1.5h3.813a5.976 5.976 0 0 1-.447-.456C5.18 7.479 4.798 6.231 5.11 5.066c.312-1.164 1.268-2.055 2.61-2.509 1.336-.451 2.877-.42 4.286-.043.856.23 1.684.592 2.409 1.074a.75.75 0 1 1-.83 1.25 6.723 6.723 0 0 0-1.968-.875Zm1.909 8.123a.75.75 0 0 1 1.015.309c.53.99.607 2.062.18 3.01-.421.94-1.289 1.648-2.441 2.038-1.336.452-2.877.42-4.286.043-1.409-.377-2.759-1.121-3.69-2.18a.75.75 0 1 1 1.127-.99c.696.791 1.765 1.403 2.952 1.721 1.186.318 2.418.323 3.416-.015.853-.288 1.34-.756 1.555-1.232.21-.467.205-1.049-.136-1.69a.75.75 0 0 1 .308-1.014Z"
                  clipRule="evenodd"
                />
              </svg>
            ),
            format: "~~",
            endFormat: "~~",
          },
          {
            label: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M6.28 5.22a.75.75 0 0 1 0 1.06L2.56 10l3.72 3.72a.75.75 0 0 1-1.06 1.06L.97 10.53a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Zm7.44 0a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L17.44 10l-3.72-3.72a.75.75 0 0 1 0-1.06ZM11.377 2.011a.75.75 0 0 1 .612.867l-2.5 14.5a.75.75 0 0 1-1.478-.255l2.5-14.5a.75.75 0 0 1 .866-.612Z"
                  clipRule="evenodd"
                />
              </svg>
            ),
            format: "`",
            endFormat: "`",
          },
          {
            label: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
              >
                <path d="M11.983 1.907a.75.75 0 0 0-1.292-.657l-8.5 9.5A.75.75 0 0 0 2.75 12h6.572l-1.305 6.093a.75.75 0 0 0 1.292.657l8.5-9.5A.75.75 0 0 0 17.25 8h-6.572l1.305-6.093Z" />
              </svg>
            ),
            format: "{% embed ",
            endFormat: " %}",
          },
          {
            label: (
              <svg
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h16V5zm15 7-3.536 3.536-1.414-1.415L16.172 12 14.05 9.879l1.414-1.415zM7.828 12l2.122 2.121-1.414 1.415L5 12l3.536-3.536L9.95 9.88z"></path>
              </svg>
            ),
            format: "```\n",
            endFormat: "\n```",
            isBlock: true,
          },
          {
            label: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M4.75 2a.75.75 0 0 1 .75.75V9a4.5 4.5 0 1 0 9 0V2.75a.75.75 0 0 1 1.5 0V9A6 6 0 0 1 4 9V2.75A.75.75 0 0 1 4.75 2ZM2 17.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
                  clipRule="evenodd"
                />
              </svg>
            ),
            format: "<ul>",
            endFormat: "</ul>",
          },
          {
            label: (
              <svg
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5 3.871 3.871 0 0 1-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 0 1-3.5 3.5 3.871 3.871 0 0 1-2.748-1.179z"></path>
              </svg>
            ),
            format: "> ",
            isBlock: true,
          },
          {
            label: (
              <svg
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M2 11h6v2H2z"></path>
                <path d="M2 11h6v2H2zm7 0h6v2H9zm7 0h6v2h-6z"></path>
                <path
                  d="M12 6.586 9.707 4.293 8.293 5.707 12 9.414l3.707-3.707-1.414-1.414zm0 10.828-2.293 2.293-1.414-1.414L12 14.586l3.707 3.707-1.414 1.414z"
                  clipRule="evenodd"
                  fillRule="evenodd"
                ></path>
              </svg>
            ),
            format: "\n---\n",
            isBlock: true,
          },
          {
            label: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
              >
                <path
                  fillRule="evenodd"
                  d="M6 4.75A.75.75 0 0 1 6.75 4h10.5a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 4.75ZM6 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 10Zm0 5.25a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H6.75a.75.75 0 0 1-.75-.75ZM1.99 4.75a1 1 0 0 1 1-1H3a1 1 0 0 1 1 1v.01a1 1 0 0 1-1 1h-.01a1 1 0 0 1-1-1v-.01ZM1.99 15.25a1 1 0 0 1 1-1H3a1 1 0 0 1 1 1v.01a1 1 0 0 1-1 1h-.01a1 1 0 0 1-1-1v-.01ZM1.99 10a1 1 0 0 1 1-1H3a1 1 0 0 1 1 1v.01a1 1 0 0 1-1 1h-.01a1 1 0 0 1-1-1V10Z"
                  clipRule="evenodd"
                />
              </svg>
            ),
            format: "- ",
            isBlock: true,
            isList: true,
          },
          {
            label: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
              >
                <path d="M3 1.25a.75.75 0 0 0 0 1.5h.25v2.5a.75.75 0 0 0 1.5 0V2A.75.75 0 0 0 4 1.25H3ZM2.97 8.654a3.5 3.5 0 0 1 1.524-.12.034.034 0 0 1-.012.012L2.415 9.579A.75.75 0 0 0 2 10.25v1c0 .414.336.75.75.75h2.5a.75.75 0 0 0 0-1.5H3.927l1.225-.613c.52-.26.848-.79.848-1.371 0-.647-.429-1.327-1.193-1.451a5.03 5.03 0 0 0-2.277.155.75.75 0 0 0 .44 1.434ZM7.75 3a.75.75 0 0 0 0 1.5h9.5a.75.75 0 0 0 0-1.5h-9.5ZM7.75 9.25a.75.75 0 0 0 0 1.5h9.5a.75.75 0 0 0 0-1.5h-9.5ZM7.75 15.5a.75.75 0 0 0 0 1.5h9.5a.75.75 0 0 0 0-1.5h-9.5ZM2.625 13.875a.75.75 0 0 0 0 1.5h1.5a.125.125 0 0 1 0 .25H3.5a.75.75 0 0 0 0 1.5h.625a.125.125 0 0 1 0 .25h-1.5a.75.75 0 0 0 0 1.5h1.5a1.625 1.625 0 0 0 1.37-2.5 1.625 1.625 0 0 0-1.37-2.5h-1.5Z" />
              </svg>
            ),
            format: "1. ",
            isBlock: true,
            isList: true,
          },
          {
            label: (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
              >
                <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
                <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
              </svg>
            ),
            format: "[Link](https://)",
          },
        ].map(({ label, format, endFormat }, index) => (
          <button
            key={index}
            onClick={() => applyFormat(format, endFormat || "")}
            className="px-2 py-1 rounded hover:bg-accent/20 hover:underline hover:text-accent"
          >
            {label}
          </button>
        ))}
        <button className="btn-accent">
          {isPending ? (
            <>
              <div className="w-6 h-6 border-4 border-gray-300 rounded-full border-t-accent animate-spin "></div>
            </>
          ) : (
            <>
              <label htmlFor="upload-image">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="size-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </label>

              <input
                id="upload-image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={addImage}
              />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default TextEditor;
