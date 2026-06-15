// ai-notes-app/components/NavbarNoSearch.tsx
"use client";
import { useTheme } from "next-themes";
import { Moon, Sun, Bell } from "lucide-react";
import React from "react";

export default function NavbarNoSearch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="h-16 w-full" />;

  return (
    <header className="fixed top-0 left-0 w-full h-16 z-40 bg-white/80 dark:bg-[#0f0f0f]/80 shadow-sm border-b border-gray-200/60 dark:border-gray-800/60 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">
        {/* Left: Logo and App Name */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">🧠</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">AI Notes</h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Smart, clean, minimal</p>
          </div>
        </div>
        {/* Right: Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200">
            <Bell size={18} />
          </button>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="group flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-all duration-200 hover:shadow-sm"
          >
            <div className="transition-all duration-300 ease-in-out">
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300 hidden sm:block">
              {theme === "dark" ? "Light" : "Dark"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
