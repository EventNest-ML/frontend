"use client";

import { PieChart, Pie, Cell } from "recharts";

type ProgressCircleProps = {
  value: number; // percentage (0 - 100)
  size?: number; // optional, default size
};

const ProgressCircle = ({ value, size = 150 }: ProgressCircleProps) => {
  const data = [
    { name: "completed", value },
    { name: "remaining", value: 100 - value },
  ];

  const COLORS = ["#B457FA", "#B457FA4D"]; // primary + faded background

  return (
    <div className="flex flex-col items-center justify-center relative ">
      <PieChart
        width={size}
        height={size}
      >
        <Pie
          data={data}
          innerRadius={size / 3}
          outerRadius={size / 2}
          paddingAngle={2}
          startAngle={90}
          endAngle={-270}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              stroke="none"
            />
          ))}
        </Pie>
      </PieChart>
      <div
        className="absolute top-1/2 left-1/2 -translate-1/2  text-xl font-semibold"
      >
        {value}%
      </div>
    </div>
  );
};

export default ProgressCircle;
