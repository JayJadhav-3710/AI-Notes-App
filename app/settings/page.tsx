"use client";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Settings, User, KeyRound, Moon, Sun, Bell, Globe, MessageCircle } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("en");
  const { data: session, status } = useSession();

  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-300 flex flex-col">
      <Navbar search="" setSearch={() => {}} />
      <main className="flex-1 pt-20 transition-all duration-300 max-w-3xl mx-auto px-8 py-12 w-full">
        <div className="max-w-3xl mx-auto px-8 py-12">
          {/* Hero Section */}
          <div className="flex items-center gap-4 mb-10">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow">
              <Settings className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Settings</h1>
              <p className="text-gray-500 dark:text-gray-400">Manage your account, preferences, and integrations.</p>
            </div>
          </div>

          {/* Profile Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Profile</h2>
            <div className="bg-white dark:bg-[#18181b] rounded-2xl shadow border border-gray-200 dark:border-gray-800 p-6 flex items-center gap-4">
              {session?.user?.image ? (
                <img src={session.user.image} alt="Profile" className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xl font-bold">
                  {session?.user?.name ? session.user.name.split(' ').map(n => n[0]).join('').toUpperCase() : <User size={28} />}
                </div>
              )}
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">{session?.user?.name || "Not signed in"}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">{session?.user?.email || ""}</p>
                {!session?.user && (
                  <span className="inline-block mt-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs text-gray-600 dark:text-gray-300">Not signed in</span>
                )}
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Preferences</h2>
            <div className="space-y-4">
              {/* Theme */}
              <div className="bg-white dark:bg-[#18181b] rounded-2xl shadow border border-gray-200 dark:border-gray-800 p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Moon className="text-blue-500 dark:text-yellow-300" size={24} />
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">Theme</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Switch between light and dark mode.</p>
                  </div>
                </div>
                {mounted && (
                  <button
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  >
                    {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </button>
                )}
              </div>

              {/* Notifications */}
              <div className="bg-white dark:bg-[#18181b] rounded-2xl shadow border border-gray-200 dark:border-gray-800 p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Bell className="text-purple-500" size={24} />
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">Notifications</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Get notified about important updates.</p>
                  </div>
                </div>
                <button
                  onClick={() => setNotifications((n) => !n)}
                  className={`w-12 h-7 rounded-full flex items-center transition-colors duration-200 ${
                    notifications ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-700"
                  }`}
                  aria-pressed={notifications}
                >
                  <span
                    className={`block w-6 h-6 bg-white dark:bg-[#18181b] rounded-full shadow transform transition-transform duration-200 ${
                      notifications ? "translate-x-5" : ""
                    }`}
                  />
                </button>
              </div>

              {/* Language */}
              <div className="bg-white dark:bg-[#18181b] rounded-2xl shadow border border-gray-200 dark:border-gray-800 p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Globe className="text-green-500" size={24} />
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 dark:text-white">Language</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Choose your preferred language.</p>
                  </div>
                </div>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-3 py-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="hi">हिन्दी</option>
                </select>
              </div>
            </div>
          </div>

          {/* Integrations Section */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Integrations</h2>
            <div className="bg-white dark:bg-[#18181b] rounded-2xl shadow border border-gray-200 dark:border-gray-800 p-6 flex items-center gap-4">
              <KeyRound className="text-green-500" size={24} />
              <div>
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">AI API Key</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Connect your HuggingFace or OpenAI API key for advanced features.</p>
                <div className="mt-2">
                  <input
                    type="password"
                    placeholder="Enter your API key"
                    className="px-3 py-2 rounded bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition"
                    disabled
                  />
                  <span className="ml-2 text-xs text-gray-400">(Coming soon)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">Support</h2>
            <div className="bg-white dark:bg-[#18181b] rounded-2xl shadow border border-gray-200 dark:border-gray-800 p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <MessageCircle className="text-blue-500" size={24} />
                <div>
                  <h3 className="text-base font-semibold text-gray-900 dark:text-white">Need help?</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Contact our support team or send feedback.</p>
                </div>
              </div>
              <a
                href="mailto:support@example.com"
                className="px-4 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}