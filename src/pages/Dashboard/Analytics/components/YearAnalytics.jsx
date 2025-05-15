import { useAnalyticsData } from "../../../../hook/useAnalyticsData";
import AnalyticsHeader from "./AnalyticsHeader";
import CommentsAnalyticChart from "./CommentsAnalyticChart";

const YearAnalytics = () => {
  const { commentAnalyticsData } = useAnalyticsData({
    timeframe: "year",
    comment: true,
  });
  const { readersAnalyticsData } = useAnalyticsData({
    timeframe: "year",
    readers: true,
  });
  const { reactionsAnalyticsData } = useAnalyticsData({
    timeframe: "year",
    reactions: true,
  });

  //helper function
  //years comments
  const year = [...Array(12)].map((_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const formatted = date.toISOString().slice(0, 7);
    return formatted; // YYYY-MM
  });

  const formattedDataOfComments = year.reverse().map((date) => {
    return {
      date: date,
      totalComments:
        commentAnalyticsData?.lastYearComments.find(
          (data) => data.date === date
        )?.totalComments || 0,
    };
  });

  // year readers
  const formattedDataOfReaders = year.map((date) => {
    return {
      date: date,
      totalReaders:
        readersAnalyticsData?.lastYearReaders.find((data) => data.date === date)
          ?.totalReaders || 0,
    };
  });

  // year reaction
  const formattedDataOfReactions = year.map((date) => {
    return {
      date: date,
      totalReactions:
        reactionsAnalyticsData?.lastYearReactions.find(
          (data) => data.date === date
        )?.totalReactions || 0,
    };
  });

  return (
    <div>
      <div className="mb-8">
        <AnalyticsHeader
          readersData={readersAnalyticsData?.lastYearReaders}
          reactionData={reactionsAnalyticsData?.lastYearReactions}
          commentsData={commentAnalyticsData?.lastYearComments}
          timeframe={"year"}
        />
      </div>
      <div>
        <CommentsAnalyticChart
          data={formattedDataOfReaders}
          dataOf={"Readers"}
          trendLineOf={"totalReaders"}
        />
      </div>
      <div className="flex gap-8">
        <div className="w-1/2">
          {" "}
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

export default YearAnalytics;
