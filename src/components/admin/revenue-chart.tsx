"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

export function RevenueChart({
  data,
}: {
  data: Array<{ month: string; revenue: number }>;
}) {
  return (
    <div className="h-80 w-full rounded-2xl border border-zinc-200 bg-white p-4">
      <p className="mb-4 text-sm font-medium text-zinc-700">Monthly Revenue</p>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#b45309" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
