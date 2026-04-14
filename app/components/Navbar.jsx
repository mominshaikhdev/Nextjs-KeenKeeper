"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Clock, BarChart2 } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  const getLinkStyles = (path) => {
    const isActive = pathname === path;
    return isActive
      ? "flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 bg-[#205041] text-white rounded-lg transition shadow-sm font-bold text-[12px] sm:text-[14px]"
      : "flex items-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-2 text-gray-500 hover:text-gray-900 transition font-bold text-[12px] sm:text-[14px]";
  };

  return (
    <nav className="w-full bg-white flex justify-center border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-[1100px] w-full flex justify-between items-center py-3 sm:py-4 px-4 sm:px-6">
        <Link
          href="/"
          className="text-[18px] sm:text-[22px] font-black text-gray-900 tracking-tighter"
        >
          KeenKeeper
        </Link>
        <div className="flex gap-1 sm:gap-2">
          <Link href="/" className={getLinkStyles("/")}>
            <Home size={16} strokeWidth={3} className="shrink-0" />
            <span>Home</span>
          </Link>
          <Link href="/timeline" className={getLinkStyles("/timeline")}>
            <Clock size={16} strokeWidth={3} className="shrink-0" />
            <span>Timeline</span>
          </Link>
          <Link href="/stats" className={getLinkStyles("/stats")}>
            <BarChart2 size={16} strokeWidth={3} className="shrink-0" />
            <span>Stats</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
