import  {  useState } from "react";
import { useNavigate } from "react-router-dom";
import WeekCommentsAnalytics from "./components/WeekAnalytics";
import MonthAnalytics from "./components/MonthAnalytics";
import YearAnalytics from "./components/YearAnalytics";

const UserAnalytics = () => {
  //state
  const [timeframe, setTimeframe] = useState("week");
  //hooks
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <button
          onClick={() => navigate("/dashboard")}
          className="w-full mt-10 mb-8 btn-accent text-accent text-start"
        >
          Back to Main Dashboard
        </button>
        <h1 className="mb-8 text-4xl font-bold text-dark">Analytics for {}</h1>
        <div className="flex items-center gap-4 mb-8">
          <button
            className={`btn-accent ${timeframe === "week" && "font-bold"}`}
            onClick={() => setTimeframe("week")}
          >
            {" "}
            Week{" "}
          </button>
          <button
            className={`btn-accent ${timeframe === "month" && "font-bold"}`}
            onClick={() => setTimeframe("month")}
          >
            {" "}
            Month{" "}
          </button>
          <button
            className={`btn-accent ${timeframe === "year" && "font-bold"}`}
            onClick={() => setTimeframe("year")}
          >
            {" "}
            Year{" "}
          </button>
        </div>

        {timeframe === "week" && (
          <>
            <WeekCommentsAnalytics />
          </>
        )}
        {timeframe === "month" && (
          <>
            <MonthAnalytics />
          </>
        )}
        {timeframe === "year" && (
          <>
            <YearAnalytics />
          </>
        )}
      </div>
    </div>
  );
};

export default UserAnalytics;
