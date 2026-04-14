import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import Link from "next/link";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "KeenKeeper",
  description: "Keep Your Friendships Alive",
};

function Footer() {
  return (
    <footer className="bg-[#1a3a32] text-white pt-8 pb-4 w-full mt-auto">
      <div className="max-w-[1100px] mx-auto px-6 text-center">
        {/* Logo */}
        <h2 className="text-[40px] md:text-[56px] font-bold mb-2 tracking-tighter leading-none">
          KeenKeeper
        </h2>

        {/* Description */}
        <p className="text-white/60 text-[13px] md:text-[15px] mb-4 md:whitespace-nowrap overflow-hidden text-ellipsis">
          Your personal shelf of meaningful connections. Browse, tend, and
          nurture the relationships that matter most.
        </p>

        <div className="mb-6">
          <h4 className="font-medium text-[14px] mb-2 text-white/80">
            Social Links
          </h4>
          <div className="flex justify-center gap-3">
            {[
              "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z",
              "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z",
              "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
            ].map((path, i) => (
              <button
                key={i}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#1a3a32] hover:opacity-90 transition shadow-sm"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d={path} />
                </svg>
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center text-[12px] text-white/40 pt-4 border-t border-white/5">
          <p>© 2026 KeenKeeper. All rights reserved.</p>
          <div className="flex gap-6 mt-3 md:mt-0">
            <Link href="#" className="hover:text-white transition">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-white transition">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-white transition">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-[#fcfcfc] flex flex-col min-h-screen font-sans text-gray-900 antialiased overflow-x-hidden">
        <AppProvider>
          <Navbar />
          <main className="w-full flex-grow px-4 sm:px-6 md:px-0">
            {children}
          </main>
          <Footer />
          <Toaster position="bottom-right" />
        </AppProvider>
      </body>
    </html>
  );
}
