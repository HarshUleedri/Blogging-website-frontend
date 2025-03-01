import Blogs from "../Blogs/Blogs";
const Home = () => {
  return (
    <>
      <div className="flex bg-gray-400 ">
        <div className="w-1/5 bg-black h-[40rem] sticky top-16">
        </div>
        <div className="grow ">
          <Blogs />
        </div>
        <div className="w-1/4 bg-black h-[40rem] sticky top-16"></div>
      </div>
    </>
  );
};

export default Home;
