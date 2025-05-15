import { useSelector } from "react-redux";
import Blogs from "../Blogs/Blogs";

import LoginAd from "./component/LoginAd";
import Advert from "./component/Advert";
import LatestTopic from "./component/latestTopic";
import SideBar from "./component/SideBar";
const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <>
      <div className="flex gap-4 py-8">
        <div
          className={`sticky w-1/5 ${
            isAuthenticated ? "-top-8 " : "-top-96"
          } h-fit`}
        >
          {!isAuthenticated && (
            <div className="mb-8">
              <LoginAd />
            </div>
          )}
          <SideBar />
        </div>

        <div className="w-7/12 ">
          <Blogs />
        </div>
        <div className="w-1/4  h-[40rem] sticky top-16">
          <div className="mb-8">
            <Advert />
          </div>

          <div>
            <p className="mb-4 text-lg font-semibold"># Latest Topics</p>
            <LatestTopic />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
