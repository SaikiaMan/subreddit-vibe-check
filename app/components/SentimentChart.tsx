"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const months = ["Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "June", "July"];

function generateData() {
  return months.map((name) => {
    const positive = 500 + Math.random() * 2000;
    const negative = Math.max(positive + (Math.random() - 0.5) * 2000, 0);
    return {
      name,
      positive,
      negative,
      neutral: Math.floor(Math.random() * 500),
    };
  });
}

export function SentimentChart() {
  const data = generateData();

  return (
    <div className="flex h-full flex-col p-4">
      <div>
        <div className="flex items-center">
          <div className="font-bold text-white">Sentiment Over Time</div>
          <div className="flex-grow" />
          <div className="ml-2 text-sm text-gray-400">Last 9 Months</div>
        </div>
        <div className="ml-5 text-sm font-bold text-gray-500">
          Nov - July
        </div>
      </div>

      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <defs>
              <linearGradient id="positiveGradient" x1="0" y1="0" x2="1" y2="0">
                <stop stopColor="#22c55e" />
                <stop offset="1" stopColor="#15803d" />
              </linearGradient>
            </defs>
            <CartesianGrid
              horizontal={false}
              strokeWidth={6}
              stroke="#252525"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              tick={{ fill: "#676767", fontSize: 12 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickMargin={10}
              tick={{ fill: "#676767", fontSize: 12 }}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={false}
            />
            <Line
              activeDot={false}
              type="monotone"
              dataKey="negative"
              stroke="#242424"
              strokeWidth={3}
              dot={false}
              strokeDasharray="8 8"
            />
            <Line
              type="monotone"
              dataKey="positive"
              stroke="url(#positiveGradient)"
              strokeWidth={4}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function CustomTooltip() {
  return (
    <div className="tooltip-head overflow-hidden rounded-xl">
      <div className="flex items-center justify-between p-2 text-sm text-gray-400">
        <div>Sentiment</div>
      </div>
      <div className="tooltip-body p-3 text-center">
        <div className="font-bold text-white">$1300.50</div>
        <div className="text-sm text-gray-400">Revenue from 230 sales</div>
      </div>
    </div>
  );
}
