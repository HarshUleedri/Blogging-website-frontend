import CommentsAnalyticChart from "./CommentsAnalyticChart";
import { useAnalyticsData } from "../../../../hook/useAnalyticsData";
import AnalyticsHeader from "./AnalyticsHeader";

const WeekReadersAnalytics = () => {
  //hook
  const readers = true;
  //last7Days
  const { readersAnalyticsData } = useAnalyticsData("week", readers);

  //helper function
  //last7Days
  const last7days = [...Array(7)].map((_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const formatted = date.toISOString().split("T")[0];
    return formatted;
  });

  const formattedData = last7days.reverse().map((date) => {
    return {
      date: date,
      totalComments:
        readersAnalyticsData?.lastWeeksComments.find(
          (data) => data.date === date
        )?.totalComments || 0,
    };
  });

  return (
    <div>
      <div className="mb-8">
        <AnalyticsHeader
          commentsData={readersAnalyticsData?.lastWeeksComments}
          timeframe={"week"}
        />
      </div>

      <CommentsAnalyticChart data={formattedData} />
    </div>
  );
};

export default WeekReadersAnalytics;
