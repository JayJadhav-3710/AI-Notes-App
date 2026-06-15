"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Sparkles } from "lucide-react";

type Note = {
  _id?: string;
  title: string;
  summary?: string;
};

export default function SummariesPage() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetch("/api/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data.filter((n: Note) => n.summary)));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-300">
      <Navbar />
      <Sidebar />
      <main className="ml-64 pt-16 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-8 py-8">
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-2 gradient-text">AI Summaries</h1>
            <p className="text-gray-500 dark:text-gray-400">All your AI-generated summaries in one place.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.length === 0 && (
              <div className="col-span-full text-center py-12">
                <div className="w-16 h-16 bg-gray-100 dark:bg-[#2a2a2a] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="text-blue-400" size={32} />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No summaries yet</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">Summarize a note to see it here.</p>
              </div>
            )}
            {notes.map((note) => (
              <div key={note._id} className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{note.title}</h3>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 break-words whitespace-pre-line">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={14} className="text-blue-500" />
                    <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">AI Summary</span>
                  </div>
                  <p className="text-blue-700 dark:text-blue-200 break-words whitespace-pre-line">{note.summary}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}