"use client";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { ChevronDown, Home, Clock3, BarChart3 } from "lucide-react";

export default function Timeline() {
  const { timeline } = useAppContext();
  const [filter, setFilter] = useState("All");

  const filteredTimeline =
    filter === "All"
      ? timeline
      : timeline.filter((item) => item.type === filter);

  const getIcon = (type) => {
    switch (type) {
      case "Call":
        return <span className="text-2xl">📞</span>;
      case "Text":
        return <span className="text-2xl">💬</span>;
      case "Video":
        return <span className="text-2xl">🎥</span>;
      case "Meetup":
        return <span className="text-2xl">🤝</span>;
      default:
        return <span className="text-2xl">🤝</span>;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content Area */}
      <main className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-extrabold text-[#1e293b] mb-10 tracking-tight">
          Timeline
        </h1>

        {/* Filter Dropdown */}
        <div className="relative mb-10 w-64">
          <select
            className="w-full appearance-none border border-slate-200 rounded-lg px-4 py-2.5 text-sm text-slate-500 bg-white outline-none focus:border-emerald-600 transition-colors"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">Filter timeline</option>
            <option value="Meetup">Meetup</option>
            <option value="Call">Call</option>
            <option value="Text">Text</option>
            <option value="Video">Video</option>
          </select>
          <ChevronDown
            className="absolute right-3 top-3 text-slate-400 pointer-events-none"
            size={16}
          />
        </div>

        {/* Timeline List */}
        <div className="space-y-4">
          {filteredTimeline.map((entry) => (
            <div
              key={entry.id}
              className="bg-white p-5 rounded-xl border border-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07)] flex items-center gap-6 hover:border-slate-200 transition-all cursor-default"
            >
              <div className="flex-shrink-0">{getIcon(entry.type)}</div>
              <div className="flex flex-col">
                <p className="font-bold text-slate-700 text-base">
                  {entry.type}{" "}
                  <span className="font-medium text-slate-400 ml-1">
                    with {entry.friend}
                  </span>
                </p>
                <p className="text-[13px] font-semibold text-slate-400 mt-0.5">
                  {entry.date}
                </p>
              </div>
            </div>
          ))}

          {filteredTimeline.length === 0 && (
            <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-medium italic">
                No interactions logged for this category.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
