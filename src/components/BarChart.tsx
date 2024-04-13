"use client";

import { HOUR_IN_MILLISECONDS } from "@/lib/constants";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

export interface ChartProps {
  data: {
    time: any;
    timeWorked: any;
  }[];
}

export function Chart({ data }: ChartProps) {
  return (
    <ResponsiveContainer width="100%" height={340}>
      <BarChart data={data}>
        <XAxis
          dataKey="time"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => {
            return `${Math.floor(value / HOUR_IN_MILLISECONDS)} hrs`;
          }}
        />
        <Bar
          dataKey="timeWorked"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
