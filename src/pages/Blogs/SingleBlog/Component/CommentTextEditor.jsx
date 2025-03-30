import React, { useState } from "react";
import useTextEditor from "../../../../hook/useTextEditor";
import TextEditor from "../../../../components/Common/TextEditor/TextEditor";
import { renderMarkdown } from "../../../../utils/markdownParser";
import { useMutation } from "@tanstack/react-query";
import useBlogComment from "../../../../hook/useBlogComments";

const CommentTextEditor = ({
  blogSlug,
  parentId = null,
  dismiss = false,
  setDismiss,
  isFocus = false,
}) => {
  //state
  const [isPreview, setIsPreview] = useState(false);
  const [isVisibleEditor, setIsVisibleEditor] = useState(() =>
    isFocus ? true : false
  );

  //hook
  const { textareaRef, text, setText, handleKeyDown, data } = useTextEditor();
  const { mutate, isPending, isError } = useBlogComment(blogSlug);

  const handleSubmit = () => {
    const data = {
      text,
      parentId,
    };
    if (!data.text) return;
    mutate(data);
    setText("");
    setIsPreview(false);
  };

  return (
    <div>
      {isPreview ? (
        <>
          <div className="w-full p-4 mb-4 bg-white min-h-48">
            <div
              className="prose prose-lg prose-img:max-w-[300px] prose-img:mx-auto prose-img:w-full sm:prose-img:w-3/4 lg:prose-img:w-1/2"
              dangerouslySetInnerHTML={{
                __html: renderMarkdown(text),
              }}
            />
          </div>
        </>
      ) : (
        <>
          <textarea
            ref={textareaRef}
            className="w-full p-4 text-lg rounded-md outline-none resize-none h-36 text-light focus:border-2 focus:border-accent"
            value={text}
            onFocus={() => setIsVisibleEditor(true)}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            name=""
            id=""
            placeholder="Add to the discussion"
          />
          {isVisibleEditor && <TextEditor data={data} />}

          {isError && (
            <p className="mb-2 text-sm text-red-500">Something went wrong!!</p>
          )}
        </>
      )}

      {isVisibleEditor && (
        <div className="flex gap-4">
          <button
            onClick={handleSubmit}
            disabled={!text || isPending}
            className="disabled:cursor-not-allowed btn-primary disabled:opacity-40"
          >
            {isPending ? "...Sending" : "Submit"}
          </button>
          <button
            disabled={!text}
            onClick={() => setIsPreview((prev) => !prev)}
            className="btn-accent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-none"
          >
            {isPreview ? "Continue Editing" : "Preview"}
          </button>
          {dismiss && (
            <button
              onClick={() => setDismiss(false)}
              className="px-4 py-1 font-semibold rounded text-dark hover:bg-secondary"
            >
              Dismiss
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CommentTextEditor;
