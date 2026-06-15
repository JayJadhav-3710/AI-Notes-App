"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, FileText, Sparkles, Star, Settings, Plus, Search } from "lucide-react";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  const navItems = [
    { icon: FileText, label: "All Notes", href: "/" },
    { icon: Sparkles, label: "AI Summaries", href: "/summaries" },
    { icon: Star, label: "Favorites", href: "/favorites" },
  ];

  const bottomItems = [
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`${
          open ? "w-64" : "w-16"
        } h-screen fixed left-0 top-0 bg-white/90 dark:bg-[#0f0f0f]/90 backdrop-blur-sm border-r border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 z-20`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className={`flex items-center gap-3 ${!open && "justify-center"}`}>
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🧠</span>
            </div>
            {open && (
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">AI Notes</h2>
                <p className="text-xs text-gray-500 dark:text-gray-400">Smart notes</p>
              </div>
            )}
          </div>
          <button 
            onClick={() => setOpen(!open)} 
            className={`p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200 ${!open && "absolute right-2"}`}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="px-3 py-4 space-y-1">
          {/* Add Note Button */}
          <Link href="/" className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] rounded-lg transition-colors duration-200">
            <Plus size={16} />
            {open && <span>Add Note</span>}
          </Link>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder={open ? "Search notes..." : ""}
              className={`w-full pl-10 pr-3 py-2 bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 ${!open && "hidden"}`}
            />
          </div>

          {/* Main Navigation Items */}
          <div className="space-y-1 mt-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                  ${pathname === item.href
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1a1a1a]"}
                `}
              >
                <item.icon size={16} />
                {open && <span>{item.label}</span>}
          </Link>
            ))}
          </div>
        </nav>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-200/50 dark:border-gray-700/50">
          <div className="space-y-1">
            {bottomItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200
                  ${pathname === item.href
                    ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#1a1a1a]"}
                `}
              >
                <item.icon size={16} />
                {open && <span>{item.label}</span>}
              </Link>
            ))}
          </div>
        </div>
      </aside>
      {/* Spacer so content doesn't hide under sidebar */}
      <div className={`${open ? "ml-64" : "ml-16"} w-full transition-all duration-300`}>
        {/* this will wrap page content */}
      </div>
    </div>
  );
}