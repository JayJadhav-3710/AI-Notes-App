"use client";

import { useTheme } from "next-themes";
import { Moon, Sun, Search, Bell, ArrowLeft, UserCircle, LogOut } from "lucide-react";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { motion } from "framer-motion";

export default function Navbar({ search, setSearch, rightActions }: { search: string; setSearch: (s: string) => void; rightActions?: React.ReactNode }) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Use resolvedTheme for more accurate theme detection
  const currentTheme = mounted ? resolvedTheme : theme;
  const isDark = currentTheme === "dark";

  const handleThemeToggle = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <header className="fixed top-0 left-0 w-full h-16 z-40 bg-white/80 dark:bg-[#0f0f0f]/80 shadow-sm border-b border-gray-200/60 dark:border-gray-800/60 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">
        {/* Left: Back Button, Logo and App Name */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Back Button (hidden on home, but placeholder for spacing) */}
          {pathname !== "/" ? (
            <button
              onClick={() => router.back()}
              aria-label="Go back"
              className="mr-2 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400/30"
              style={{ fontSize: 0, lineHeight: 0 }}
            >
              <ArrowLeft size={20} />
            </button>
          ) : (
            <span className="mr-2" style={{ display: "inline-block", width: 32, height: 32 }} aria-hidden="true"></span>
          )}
          {/* Logo and App Name (clickable) */}
        <button
            onClick={() => router.push("/")}
            className="flex items-center gap-2 focus:outline-none group bg-transparent border-none p-0"
            style={{ background: "none" }}
            aria-label="Go to home page"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🧠</span>
            </div>
            <div className="text-left">
              <h1 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:underline">AI Notes</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Smart, clean, minimal</p>
            </div>
          </button>
        </div>

        {/* Center: Search Bar */}
        <div className="hidden md:flex items-center flex-1 justify-center max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search notes..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200">
            <Bell size={18} />
          </button>
          <motion.button
            onClick={handleThemeToggle}
            className="group flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-all duration-200 hover:shadow-sm"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={!mounted}
          >
            <div className="transition-all duration-300 ease-in-out">
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:block">
              {isDark ? "Light" : "Dark"}
            </span>
          </motion.button>
          {status === "loading" ? (
            <div className="w-32 h-8 bg-gray-100 dark:bg-gray-800 rounded animate-pulse" />
          ) : session?.user ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => router.push("/settings")}
                className="flex items-center gap-2 focus:outline-none group bg-transparent border-none p-0"
                style={{ background: "none" }}
                aria-label="Go to profile settings"
              >
                {session.user.image ? (
                  <img src={session.user.image} alt="Profile" className="w-8 h-8 rounded-full border border-gray-200 dark:border-gray-700 hover:ring-2 hover:ring-blue-400 transition" />
                ) : (
                  <UserCircle className="text-blue-500" size={28} />
                )}
                <span className="font-medium text-gray-900 dark:text-white text-sm group-hover:underline">
                  {session.user.name}
                </span>
              </button>
              <button
                onClick={() => signOut()}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-1 ml-1 rounded focus:outline-none"
                title="Logout"
                aria-label="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold shadow hover:bg-blue-700 transition-all duration-200"
            >
              Sign in with Google
            </button>
          )}
          {rightActions}
        </div>
      </div>
    </header>
  );
}