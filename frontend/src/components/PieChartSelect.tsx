"use client";

import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#3B82F6", "#93C5FD"];

interface ComparisonData {
  name: string;
  value: number;
}

interface PieChartProps {
  className?: string;
}

export default function PieChartSelect({ className = "" }: PieChartProps) {
  const [var1, setVar1] = useState("Variable 1");
  const [var2, setVar2] = useState("Variable 2");

  const data: ComparisonData[] = [
    { name: var1, value: 55 },
    { name: var2, value: 45 },
  ];

  return (
    <div className={`bg-white shadow-sm p-6 pt-3 w-full -mt-4 border border-gray-200 rounded-xl ${className}`}>
      <h3 className="text-lg font-semibold text-black text-center mb-4">
        Comparación rápida
      </h3>

      <div className="flex flex-col gap-3 items-center mb-4">
        <select
          value={var1}
          onChange={(e) => setVar1(e.target.value)}
          className="w-48 text-sm border border-gray-300 rounded-md px-3 py-2 text-gray-700"
        >
          <option value="Variable 1">Variable 1</option>
          <option value="Variable A">Variable A</option>
        </select>

        <select
          value={var2}
          onChange={(e) => setVar2(e.target.value)}
          className="w-48 text-sm border border-gray-300 rounded-md px-3 py-2 text-gray-700"
        >
          <option value="Variable 2">Variable 2</option>
          <option value="Variable B">Variable B</option>
        </select>
      </div>

      <div className="flex flex-col items-center justify-center">
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              innerRadius={45}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        <div className="flex justify-center gap-8 mt-2 text-sm text-gray-700">
          <span>{var1}</span>
          <span>{var2}</span>
        </div>
      </div>
    </div>
  );
}
