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
import { Icon } from "./Icon";

const graphData = [
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
].map((name) => {
  const revenue = 500 + Math.random() * 2000;
  const expectedRevenue = Math.max(revenue + (Math.random() - 0.5) * 2000, 0);
  return {
    name,
    revenue,
    expectedRevenue,
    sales: Math.floor(Math.random() * 500),
  };
});

function CustomTooltip() {
  return (
    <div className="tooltip-head overflow-hidden rounded-xl">
      <div className="flex items-center justify-between p-2">
        <div>Revenue</div>
        <Icon path="res-react-dash-options" className="h-2 w-2" />
      </div>
      <div className="tooltip-body p-3 text-center">
        <div className="font-bold text-white">$1300.50</div>
        <div>Revenue from 230 sales</div>
      </div>
    </div>
  );
}

export function Graph() {
  return (
    <div className="flex h-full flex-col p-4">
      <div>
        <div className="flex items-center">
          <div className="font-bold text-white">Your Work Summary</div>
          <div className="flex-grow" />

          <Icon path="res-react-dash-graph-range" className="h-4 w-4" />
          <div className="ml-2">Last 9 Months</div>
          <div className="ml-6 flex h-5 w-5 items-center justify-center rounded-full icon-background">
            ?
          </div>
        </div>
        <div className="ml-5 font-bold">Nov - July</div>
      </div>

      <div className="flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart width={500} height={300} data={graphData}>
            <defs>
              <linearGradient id="paint0_linear" x1="0" y1="0" x2="1" y2="0">
                <stop stopColor="#6B8DE3" />
                <stop offset="1" stopColor="#7D1C8D" />
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
            />
            <YAxis axisLine={false} tickLine={false} tickMargin={10} />
            <Tooltip content={<CustomTooltip />} cursor={false} />
            <Line
              activeDot={false}
              type="monotone"
              dataKey="expectedRevenue"
              stroke="#242424"
              strokeWidth={3}
              dot={false}
              strokeDasharray="8 8"
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="url(#paint0_linear)"
              strokeWidth={4}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
