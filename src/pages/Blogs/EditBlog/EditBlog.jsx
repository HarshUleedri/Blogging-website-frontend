import { useEffect, useState } from "react";

// import sanitizeHtml from "sanitize-html";
import "highlight.js/styles/github-dark.css";
// import { md } from "../../../utils/markdownParser";
import { renderMarkdown } from "../../../utils/markdownParser";

import useTextEditor from "../../../hook/useTextEditor";
import TextEditor from "../../../components/Common/TextEditor/TextEditor";
import AddTags from "../Components/AddTags";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getSingleBlog, UpdateBlog } from "../../../api/BlogApi/BlogApi";
import Modal from "../../../components/Common/Modal/Modal";
import { useModal } from "../../../hook/useModal";
import { useNavigate, useParams } from "react-router-dom";
import { uploadCoverImageInApi } from "../../../api/uploadImageApi/uploadCoverImage";

// Component

const EditBlog = () => {
  //hooks
  const navigate = useNavigate();
  const { isOpen, modalRef, openModal, closeModal } = useModal();
  const { isPending, mutateAsync, isError } = useMutation({
    mutationFn: (data) => UpdateBlog(data),
  });
  useEffect(() => {
    setText(exsitingBlog?.content || "");
  }, []);

  const { isPending: isUploadingImage, mutateAsync: uploadImageMutation } =
    useMutation({
      mutationFn: (data) => uploadCoverImageInApi(data),
    });

  const { slug } = useParams();

  const { data: exsitingBlog } = useQuery({
    queryKey: ["blog", slug],
    queryFn: () => getSingleBlog(slug),
  });

  // state
  const [title, settitle] = useState(exsitingBlog?.title || "");
  const [tags, setTags] = useState(exsitingBlog?.tags || []);
  const { text, setText, handleKeyDown, textareaRef, data } = useTextEditor();
  const [isPreview, setIsPreview] = useState(false);
  const [coverImage, setCoverImage] = useState(exsitingBlog?.coverImage || "");

  /// markdown

  //state

  //Api Request
  const handleUpdateBlog = async (isPublish) => {
    if (!title || !text || !tags) {
      return;
    }
    // const formData = new FormData();
    // formData.append("title", title);
    // formData.append("content", text);
    // formData.append("tags", JSON.stringify(tags));
    // formData.append("publish", isPublish);
    // formData.append("coverImage", image);

    const formData = {
      title,
      content: text,
      tags,
      publish: isPublish,
      coverImage: coverImage,
    };

    let resData;
    try {
 
      resData = await mutateAsync({ slug, formData });
    } catch (err) {
      console.log(err.message);
    }

    if (resData?.blog.slug) {
      navigate(`/blog/${resData.blog.slug}`, { replace: true });
    }
    setCoverImage("");
    settitle("");
    setTags([]);
    setText("");
  };

  // Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("coverImage", file);
      const data = await uploadImageMutation(formData);
      setCoverImage(data.url);
    }
  };

  // close blog creating page
  const closeEditingPage = () => {
    if (!text) {
      return navigate("/");
    }
    openModal();
  };

  // confirmation model

  return (
    <>
      <div className="py-6">
        <div className="flex items-center justify-between ">
          <div className="flex items-center justify-between w-2/3">
            <div className="flex items-center gap-4">
              <h1 className="p-2 text-xl font-medium leading-6 rounded text-primary bg-dark lg:leading-5 ">
                Harsh
              </h1>
              <h2 className="font-semibold text-dark">Edit Post</h2>
            </div>
            <div className="space-x-4">
              <button
                onClick={() => setIsPreview(false)}
                className={`btn-accent font-semibold  hover:!text-accent   ${
                  isPreview ? " !text-light" : "!text-dark "
                }  `}
              >
                Edit
              </button>
              <button
                onClick={() => setIsPreview(true)}
                className={`btn-accent font-semibold  hover:!text-accent    ${
                  isPreview ? " !text-dark" : " !text-light"
                }  `}
              >
                Preview
              </button>
            </div>
          </div>
          <button
            onClick={closeEditingPage}
            className="font-semibold text-dark btn-accent "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {isPreview ? (
        <>
          <p className="mb-4 text-2xl font-semibold text-mix-blend-darken">
            Preview
          </p>

          <div className="  h-[65vh] overflow-y-scroll overflow-x-hidden w-3/4  border-t border-light/30 py-8 px-6 ">
            <div
              className="prose prose-lg prose-img:max-w-[300px] prose-img:mx-auto prose-img:w-full sm:prose-img:w-3/4 lg:prose-img:w-1/2"
              dangerouslySetInnerHTML={{ __html: renderMarkdown(text) }}
            />
          </div>
        </>
      ) : (
        <>
          <div className="  h-[70vh] overflow-y-scroll overflow-x-hidden w-3/4 ">
            <div className="flex flex-col gap-2 mb-4">
              {/* add Image */}

              <div className="mb-4">
                {coverImage ? (
                  <>
                    <div className="flex items-center gap-4">
                      <div>
                        {isUploadingImage ? (
                          <>
                            <div className="flex items-center gap-2">
                              <div className="border-4 border-gray-200 rounded-full border-t-accent size-6 animate-spin"></div>
                              Uploading
                            </div>
                          </>
                        ) : (
                          <>
                            <img
                              className="size-44 object-cover aspect-[16/9] w-full"
                              src={coverImage}
                              alt={`${title}-cover-image`}
                            />
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-4">
                        <button className="px-4 py-1 border rounded text-dark w-fit">
                          <label htmlFor="change-cover-image">Change</label>
                          <input
                            type="file"
                            onChange={handleImageUpload}
                            hidden
                            id="change-cover-image"
                            accept="image/*"
                          />
                        </button>
                        <button
                          onClick={() => setCoverImage("")}
                          className="px-4 py-1 text-red-600 border border-red-600 rounded w-fit"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {isUploadingImage ? (
                      <>
                        <div className="flex items-center gap-2">
                          <div className="border-4 border-gray-200 rounded-full border-t-accent size-6 animate-spin"></div>
                          Uploading
                        </div>
                      </>
                    ) : (
                      <>
                        <button className="px-4 py-1 border rounded text-dark w-fit">
                          <label htmlFor="cover-image">Add Cover Image</label>
                          <input
                            onChange={handleImageUpload}
                            id="cover-image"
                            type="file"
                            hidden
                          />
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>

              <input
                value={title}
                onChange={(e) => settitle(() => e.target.value)}
                type="text"
                placeholder="Add Title"
                className="p-4 text-5xl font-bold outline-none placeholder-neutral-600 text-dark"
              />
              <AddTags tags={tags} setTags={setTags} />
            </div>
            <div>
              <div className="sticky top-0">
                <TextEditor data={data} />
              </div>

              <textarea
                ref={textareaRef}
                className="w-full min-h-[800px] px-12 py-4 text-xl rounded-md focus:outline-none resize-none overflow-hidden"
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
          </div>
        </>
      )}

      <div className="flex gap-4 px-4 py-8 ">
        <button
          onClick={() => handleUpdateBlog(true)}
          className="btn-primary disabled:bg-accent/40"
          disabled={isPending}
        >
          {isPending ? "...Saving" : "Update"}
        </button>
        <button
          onClick={() => handleUpdateBlog(false)}
          className="btn-accent disabled:opacity-40"
          disabled={isPending}
        >
          {isPending ? "...Saving" : "Draft"}
        </button>
        {isError && (
          <>
            {" "}
            <p className="text-red-600">Something Went Wrong</p>
          </>
        )}
      </div>

      <Modal isOpen={isOpen} modalRef={modalRef}>
        <div className="bg-white rounded shadow-md ">
          <div className="flex items-center justify-between px-8 py-4 mb-4 text-xl font-semibold border-b border-light/40">
            <p>You have Unsaved Changess</p>
            <button onClick={closeModal} className="btn-accent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="px-8 py-6">
            <p className="mb-4">
              You&apos;ve made changes to your post. Do you want to navigate to
              leave this page?
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="px-4 py-2 font-semibold text-white bg-red-600 rounded hover:bg-red-700"
              >
                Yes, leave the page
              </button>
              <button
                onClick={closeModal}
                className="px-4 py-2 font-semibold rounded text-dark bg-secondary hover:bg-light/60"
              >
                No keep editing
              </button>
            </div>
          </div>
        </div>
      </Modal>

      {/* {isClose && (
        <>
          <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded shadow-md ">
              <div className="flex items-center justify-between px-8 py-4 mb-4 text-xl font-semibold border-b border-light/40">
                <p>You have Unsaved Changess</p>
                <button className="btn-accent">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="px-8 py-6">
                <p className="mb-4">
                  You&apos;ve made changes to your post. Do you want to navigate
                  to leave this page?
                </p>
                <div className="flex items-center gap-4">
                  <button className="px-4 py-2 font-semibold text-white bg-red-600 rounded hover:bg-red-700">
                    Yes, leave the page
                  </button>
                  <button className="px-4 py-2 font-semibold rounded text-dark bg-secondary hover:bg-light/60">
                    No keep editing
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )} */}
    </>
  );
};

export default EditBlog;
