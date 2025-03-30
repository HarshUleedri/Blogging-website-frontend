//
import axiosInstance from "../../api/axiosInstance";
import TextEditor from "../../components/Common/TextEditor/TextEditor";
import useTextEditor from "../../hook/useTextEditor";

const reactionType = "clap";

const Testing = () => {
  // const testapi2 = async () => {
  //   const res = await axiosInstance.post(
  //     "http://localhost:3000/api/comments/6755ac6c7ea70d3bc13036f6",
  //     { text }
  //   );
  //   console.log(await res.data.message);
  // };
  // const testapi1 = async () => {
  //   const res = await axiosInstance.get(
  //     "http://localhost:3000/api/comments/6755ac6c7ea70d3bc13036f6"
  //   );
  //   const data = await res.data;
  //   console.log(data.topLevelComments);
  // };

  // const testapi2 = async () => {
  //   const res = await axiosInstance.post(
  //     "http://localhost:3000/api/comments/reaction/67d1b28b933916dcf84bdf4a",
  //     { reactionType }
  //   );
  //   const data = await res.data;
  //   console.log(data.reactions);
  // };

  const { text, setText, handleKeyDown, textareaRef, data } = useTextEditor();

  const testapi2 = async () => {
    const res = await axiosInstance.post(
      "http://localhost:3000/api/blog/sadfasdf/bookmark"
    );
    console.log(await res.data.bookmarked);
  };

  return (
    <div className="flex gap-8 p-8">
      {/* <button onClick={testapi1} className="btn-secondary">
        get
      </button> */}
      <button onClick={testapi2} className="btn-secondary">
        post
      </button>
    </div>
  );
};

export default Testing;
