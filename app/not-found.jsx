import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <h2 className="text-6xl font-bold text-[#205041] mb-4">404</h2>
      <p className="text-xl text-gray-600 mb-8">
        {"Oops! This page doesn't exist."}
      </p>
      <Link
        href="/"
        className="bg-[#205041] text-white px-6 py-3 rounded-md hover:bg-emerald-800 transition"
      >
        Return Home
      </Link>
    </div>
  );
}
