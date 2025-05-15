import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CommentsAnalyticChart = ({ data, dataOf, trendLineOf }) => {
  return (
    <div className="p-6 border rounded-md">
      <h2 className="mb-8 text-2xl font-bold">{dataOf} Summary</h2>
      <ResponsiveContainer height={300} width="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey={trendLineOf}
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ r: 4 }}
            isAnimationActive={true}
            animationDuration={800}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CommentsAnalyticChart;
