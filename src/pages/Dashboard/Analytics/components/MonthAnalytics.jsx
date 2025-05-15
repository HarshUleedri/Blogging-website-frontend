import AnalyticsHeader from "./AnalyticsHeader";
import CommentsAnalyticChart from "./CommentsAnalyticChart";
import { useAnalyticsData } from "../../../../hook/useAnalyticsData";

const MonthAnalytics = () => {
  const { commentAnalyticsData } = useAnalyticsData({
    timeframe: "month",
    comment: true,
  });
  const { readersAnalyticsData } = useAnalyticsData({
    timeframe: "month",
    readers: true,
  });
  const { reactionsAnalyticsData } = useAnalyticsData({
    timeframe: "month",
    reactions: true,
  });

  //helper function
  //month comments
  const month = [...Array(31)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const formatted = date.toISOString().split("T")[0];
    return formatted;
  });

  const formattedDataOfComments = month.reverse().map((date) => {
    return {
      date: date,
      totalComments:
        commentAnalyticsData?.lastMonthComments.find(
          (data) => data.date === date
        )?.totalComments || 0,
    };
  });

  // month readers

  const formattedDataOfReaders = month.map((date) => {
    return {
      date: date,
      totalReaders:
        readersAnalyticsData?.lastMonthReaders.find(
          (data) => data.date === date
        )?.totalReaders || 0,
    };
  });

  //month reaction
  const formattedDataOfReactions = month.map((date) => {
    return {
      date: date,
      totalReactions:
        reactionsAnalyticsData?.lastMonthReactions.find(
          (data) => data.date === date
        )?.totalReactions || 0,
    };
  });

  return (
    <div>
      <div className="mb-8">
        <AnalyticsHeader
          readersData={readersAnalyticsData?.lastMonthReaders}
          reactionData={reactionsAnalyticsData?.lastMonthReactions}
          commentsData={commentAnalyticsData?.lastMonthComments}
          timeframe={"month"}
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

export default MonthAnalytics;
