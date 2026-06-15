"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Users, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex flex-col">
      <Navbar search="" setSearch={() => {}} />
      <main className="flex-1 pt-20 pb-10">
        <section className="max-w-3xl mx-auto px-4 text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full mb-4 shadow">
            <Users size={20} />
            <span>About AI Notes</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 gradient-text">Our Mission</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            AI Notes is built to help you think better, remember more, and never lose a great idea. We combine beautiful design with powerful AI to make note-taking effortless and fun.
          </p>
        </section>
        <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          <div className="bg-white dark:bg-[#18181b] rounded-2xl shadow p-6 border border-gray-100 dark:border-gray-800 flex flex-col items-center">
            <Sparkles size={32} className="text-blue-500 dark:text-purple-400 mb-2" />
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">AI-Powered</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Summarize, organize, and search your notes with the help of advanced AI models.
            </p>
          </div>
          <div className="bg-white dark:bg-[#18181b] rounded-2xl shadow p-6 border border-gray-100 dark:border-gray-800 flex flex-col items-center">
            <Users size={32} className="text-green-500 mb-2" />
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Made for You</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Designed for creators, students, and professionals who value clarity, privacy, and speed.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
