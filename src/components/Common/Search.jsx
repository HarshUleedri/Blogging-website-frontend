import { useEffect, useRef, useState } from "react";
import { useSearch } from "../../context/searchContext/searchHook";

const Search = () => {
  // state
  const dropDownRef = useRef(null);
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState(() => {
    const history = localStorage.getItem("history");
    return history ? JSON.parse(history) : [];
  });

  ///hook
  const { setQuery } = useSearch();

  // helper function

  const deleteFromHistory = (e, id) => {
    e.stopPropagation();
    const updatedHistory = [...history].filter((history) => history.id !== id);
    setHistory(updatedHistory);
    localStorage.setItem("history", JSON.stringify(updatedHistory));
  };

  const handleDropdownClick = (value) => {
    setSearch(value);
    setIsOpen(false);
  };

  const onSearch = () => {
    if (!search) {
      return;
    }

    const updatedHistory = [
      { id: new Date(), text: search.trim() },
      ...history,
    ];

    setHistory(updatedHistory);
    localStorage.setItem("history", JSON.stringify(updatedHistory));
    setQuery(search.trim());
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen]);

  return (
    <div>
      <div ref={dropDownRef} className="relative flex gap-2">
        <input
          placeholder="Search..."
          value={search}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-1 border border-gray-300 rounded outline-none w-96"
          type="text"
        />
        <button
          onClick={onSearch}
          className="px-4 bg-white border border-gray-300 rounded hover:bg-light/10"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-5 "
          >
            <path
              fillRule="evenodd"
              d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isOpen && history.length > 0 && (
          <div className="absolute left-0 z-30 w-full p-2 mt-2 bg-white divide-y rounded shadow-md top-full">
            {history.slice(0, 5).map(({ id, text }) => (
              <>
                <div
                  onClick={() => handleDropdownClick(text)}
                  key={id}
                  className="flex items-center gap-6 px-4 py-2 rounded hover:bg-light/10"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="size-5 text-light shrink-0"
                  >
                    <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12H4C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.25022 4 6.82447 5.38734 5.38451 7.50024L8 7.5V9.5H2V3.5H4L3.99989 5.99918C5.82434 3.57075 8.72873 2 12 2ZM13 7L12.9998 11.585L16.2426 14.8284L14.8284 16.2426L10.9998 12.413L11 7H13Z"></path>
                  </svg>
                  <div className="flex items-center justify-between w-full">
                    <p className="line-clamp-1">{text}</p>
                    <button
                      onClick={(e) => deleteFromHistory(e, id)}
                      className="text-xs text-light hover:text-accent hover:font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
