import  { lazy, Suspense } from "react";
import CommentsAnalyticChart from "./CommentsAnalyticChart";
import { useAnalyticsData } from "../../../../hook/useAnalyticsData";
import AnalyticsHeaderSkeleton from "../../../../components/Fallbacks/AnalyticsSkeleton/AnalyticsHeaderSkeleton";
// import AnalyticsHeader from "./AnalyticsHeader";

const AnalyticsHeader = lazy(() => import("./AnalyticsHeader"));

const WeekCommentsAnalytics = () => {
  //hook

  //last7Days

  //comments
  const { commentAnalyticsData } = useAnalyticsData({
    timeframe: "week",
    comment: true,
  });
  //readers
  const { readersAnalyticsData } = useAnalyticsData({
    timeframe: "week",
    readers: true,
  });
  //reaction
  const { reactionsAnalyticsData } = useAnalyticsData({
    timeframe: "week",
    reactions: true,
  });

  //helper function
  //last7Days comments
  const last7days = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const formatted = date.toISOString().split("T")[0];
    return formatted;
  });

  const formattedDataOfComments = last7days.reverse().map((date) => {
    return {
      date: date,
      totalComments:
        commentAnalyticsData?.lastWeeksComments.find(
          (data) => data.date === date
        )?.totalComments || 0,
    };
  });

  // last7Days Readers
  const formattedDataOfReaders = last7days.map((date) => {
    return {
      date: date,
      totalReaders:
        readersAnalyticsData?.lastWeekReaders.find((data) => data.date === date)
          ?.totalReaders || 0,
    };
  });

  //last7Days Reactions
  const formattedDataOfReactions = last7days.map((date) => {
    return {
      date: date,
      totalReactions:
        reactionsAnalyticsData?.lastWeekReactions.find(
          (data) => data.date === date
        )?.totalReactions || 0,
    };
  });

  return (
    <div>
      <div className="mb-8">
        <Suspense fallback={<AnalyticsHeaderSkeleton />}>
          <AnalyticsHeader
            readersData={readersAnalyticsData?.lastWeekReaders}
            reactionData={reactionsAnalyticsData?.lastWeekReactions}
            commentsData={commentAnalyticsData?.lastWeeksComments}
            timeframe={"week"}
          />
        </Suspense>
      </div>
      <div className="mb-8">
        <CommentsAnalyticChart
          data={formattedDataOfReaders}
          dataOf={"Readers"}
          trendLineOf={"totalReaders"}
        />
      </div>

      <div className="flex gap-8">
        <div className="w-1/2">
          <CommentsAnalyticChart
            data={formattedDataOfComments}
            dataOf={"Comments"}
            trendLineOf={"totalComments"}
          />
        </div>
        <div className="w-1/2">
          <CommentsAnalyticChart
            data={formattedDataOfReactions}
            dataOf={"Reactions"}
            trendLineOf={"totalReactions"}
          />
        </div>
      </div>
    </div>
  );
};

export default WeekCommentsAnalytics;
