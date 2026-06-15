"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Star, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

type Note = {
  _id?: string;
  title: string;
  content: string;
  createdAt?: string;
  summary?: string;
  favorite?: boolean;
};

export default function FavoritesPage() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    fetch("/api/notes")
      .then((res) => res.json())
      .then((data) => setNotes(data.filter((n: Note) => n.favorite && !n.summary)));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-300">
      <Navbar />
      <Sidebar />
      <main className="ml-64 pt-16 transition-all duration-300">
        <div className="max-w-6xl mx-auto px-8 py-8">
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-2 gradient-text">Favorites</h1>
            <p className="text-gray-500 dark:text-gray-400">Your favorite notes will appear here.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.length === 0 && (
              <div className="col-span-full text-center py-12">
                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Star className="text-yellow-400" size={32} />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No favorites yet</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">Mark notes as favorites to see them here.</p>
              </div>
            )}
            {notes.map((note) => (
              <div key={note._id} className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{note.title}</h3>
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-2">
                  <Clock size={12} />
                  <span>{note.createdAt ? formatDistanceToNow(new Date(note.createdAt), { addSuffix: true }) : "just now"}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 break-words whitespace-pre-line">{note.content}</p>
                <div className="flex items-center gap-2 mt-4">
                  <Star size={16} className="text-yellow-400" fill="#facc15" />
                  <span className="text-xs text-yellow-600 dark:text-yellow-300">Favorite</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}