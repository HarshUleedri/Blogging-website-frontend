import { useRef, useState } from "react";

import ListOfTags from "./ListOfTags";
import TagBlock from "./TagBlock";

const AddTags = ({ tags, setTags }) => {
  const [isopen, setIsOpen] = useState(false);
  // const [tags, setTags] = useState([]);
  const inputRef = useRef(null);

  const [inputValue, setInputValue] = useState("");

  const handleRemoveTag = (elementToRemove) => {
    const filteredTags = tags.filter((item) => item.tag !== elementToRemove);
    setTags(filteredTags);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleInput = () => {
    if (inputValue) {
      setTags((prev) => [...prev, inputValue]);
      setInputValue("");
    }

    setIsOpen(false);
  };

  const handleSpacebar = (e) => {
    if (e.key === " ") {
      e.preventDefault();
      if (inputValue.trim() === "") {
        return;
      }
      const color = "#B1B1B1";
      setTags(() => [...tags, { tag: inputValue, color }]);
      setInputValue("");
    }
    if (e.key === "Backspace") {
      if (inputValue === "") {
        e.preventDefault();
        setInputValue(() => tags[tags.length - 1]);
        setTags(tags.filter((_, index) => index !== tags.length - 1));
      }
    }
  };

  const addTagFromDropdown = (tag) => {
    setTags(() => [...tags, tag]);
    setIsOpen(false);
    setInputValue("");
  };

  return (
    <div className="relative">
      <div className="flex gap-2">
        <TagBlock tags={tags} handleRemoveTag={handleRemoveTag} />
        <input
          ref={inputRef}
          className="relative px-4 py-2 outline-none"
          placeholder="Add up to 4 tags"
          type="text"
          onFocus={() => setIsOpen(true)}
          onBlur={handleInput}
          onChange={(e) => {
            setIsOpen(true);
            setInputValue(e.target.value);
          }}
          value={inputValue}
          onKeyDown={handleSpacebar}
        />
      </div>

      {isopen && (
        <>
          <ListOfTags
            searchQuery={inputValue}
            addTagFromDropdown={addTagFromDropdown}
          />
        </>
      )}
    </div>
  );
};

export default AddTags;
