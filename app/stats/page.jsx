"use client";
import { useAppContext } from "@/context/AppContext";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";
import { Home, Clock3, BarChart3 } from "lucide-react";

export default function Stats() {
  const { timeline } = useAppContext();

  // Calculate stats dynamically from context
  const stats = timeline.reduce(
    (acc, curr) => {
      if (["Call", "Text", "Video"].includes(curr.type)) {
        acc[curr.type] = (acc[curr.type] || 0) + 1;
      }
      return acc;
    },
    { Call: 0, Text: 0, Video: 0 },
  );

  const data = [
    { name: "Text", value: stats.Text || 1 },
    { name: "Call", value: stats.Call || 1 },
    { name: "Video", value: stats.Video || 1 },
  ];

  const COLORS = ["#8b5cf6", "#1e3932", "#22c55e"];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Main Content */}
      <main className="flex-grow max-w-6xl mx-auto w-full px-10 py-20">
        <h1 className="text-[40px] font-bold text-[#1e293b] mb-10 tracking-tight">
          Friendship Analytics
        </h1>

        <div className="bg-white p-12 rounded-xl shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] border border-slate-100 min-h-[500px]">
          <h3 className="font-bold text-[#205041] mb-2 text-[13px] tracking-wide">
            By Interaction Type
          </h3>

          <div className="h-[400px] w-full flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  innerRadius={95}
                  outerRadius={125}
                  paddingAngle={6}
                  dataKey="value"
                  stroke="none"
                  startAngle={90}
                  endAngle={450}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>

                <Legend
                  verticalAlign="bottom"
                  align="center"
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{
                    paddingTop: "60px",
                    fontSize: "13px",
                    fontWeight: "700",
                    color: "#475569",
                    letterSpacing: "0.01em",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
}
