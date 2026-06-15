"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Plus, Sparkles, Trash2, Clock, Star, FileText, X, LayoutGrid, Star as StarIcon, Settings as SettingsIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

type Note = {
  _id?: string;
  title: string;
  content: string;
  createdAt?: string;
  summary?: string;
  favorite?: boolean;
};

export default function Home() {
  const { data: session, status } = useSession();
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [summarizingNote, setSummarizingNote] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"all" | "favorites">("all");
  const router = useRouter();

  // Require authentication
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/notes")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setNotes(data);
        } else {
          setNotes([]);
        }
      });
  }, [status]);

  const handleDeleteNote = async (id: string) => {
    await fetch(`/api/notes/${id}`, { method: "DELETE" });
    setNotes((prev) => prev.filter((note) => note._id !== id));
    setSelectedNote(null);
  };

  const handleAddNote = async () => {
    if (!title || !content) return;
    const res = await fetch("/api/notes", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok) {
      alert("Failed to add note. Please try again.");
      return;
    }
    const newNote = await res.json();
    setNotes((prev) => [...prev, newNote]);
    setTitle("");
    setContent("");
    setIsAddingNote(false);
    setSelectedNote(newNote);
  };

  const handleSummarize = async (noteId: string) => {
    try {
      setSummarizingNote(noteId);
      const note = notes.find(n => n._id === noteId);
      if (!note) return;
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: note.content }),
      });
      if (!res.ok) throw new Error("Failed to summarize");
      const data = await res.json();
      const persistRes = await fetch(`/api/notes/${noteId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ summary: data.summary }),
      });
      if (!persistRes.ok) throw new Error("Failed to save summary");
      const updatedNote = await persistRes.json();
      setNotes((prev) =>
        prev.map((n) => (n._id === noteId ? updatedNote : n))
      );
      setSelectedNote((prev) =>
        prev && prev._id === noteId ? updatedNote : prev
      );
    } catch (error) {
      alert("Failed to summarize note. Please try again.");
    } finally {
      setSummarizingNote(null);
    }
  };

  const handleToggleFavorite = async (noteId: string, isFavorite: boolean) => {
    try {
      const res = await fetch(`/api/notes/${noteId}/favorite`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ favorite: !isFavorite }),
      });
      if (!res.ok) throw new Error("Failed to toggle favorite");
      const updatedNote = await res.json();
      setNotes((prev) =>
        prev.map((n) => (n._id === noteId ? updatedNote : n))
      );
      setSelectedNote((prev) =>
        prev && prev._id === noteId ? updatedNote : prev
      );
    } catch (error) {
      alert("Failed to toggle favorite. Please try again.");
    }
  };

  function highlight(text: string, term: string) {
    if (!term) return text;
    const regex = new RegExp(`(${term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? <mark key={i} className="bg-yellow-200 dark:bg-yellow-600 text-black dark:text-white rounded">{part}</mark> : part
    );
  }

  // Filter notes based on tab and search
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.content.toLowerCase().includes(search.toLowerCase());
    if (tab === "favorites") {
      return note.favorite && matchesSearch;
    }
    return matchesSearch;
  });

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#0a0a0a]">
        <span className="text-lg text-gray-600 dark:text-gray-300">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] transition-colors duration-300 flex flex-col">
      {/* User Profile Info
      {session?.user && (
        <div className="flex items-center gap-4 p-6 max-w-6xl mx-auto w-full">
          {session.user.image && (
            <img src={session.user.image} alt="Profile" className="w-12 h-12 rounded-full border border-gray-200 dark:border-gray-700" />
          )}
          <div>
            <div className="font-semibold text-lg text-gray-900 dark:text-white">{session.user.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{session.user.email}</div>
          </div>
        </div>
      )} */}
      <Navbar
        search={search}
        setSearch={setSearch}
        rightActions={
          <button
            onClick={() => router.push("/settings")}
            className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a] hover:bg-gray-50 dark:hover:bg-[#2a2a2a] transition-all duration-200 hover:shadow-sm ml-2"
            title="Settings"
          >
            <SettingsIcon size={20} />
          </button>
        }
      />
      <main className="flex-1 pt-20 transition-all duration-300 max-w-6xl mx-auto px-4 w-full">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 justify-center">
          <button
            className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold text-sm transition
              ${tab === "all"
                ? "bg-blue-600 text-white shadow"
                : "bg-gray-100 dark:bg-[#18181b] text-gray-700 dark:text-gray-300 hover:bg-blue-100 dark:hover:bg-blue-900/30"}
            `}
            onClick={() => setTab("all")}
          >
            <LayoutGrid size={18} />
            All Notes
          </button>
          <button
            className={`flex items-center gap-2 px-5 py-2 rounded-full font-semibold text-sm transition
              ${tab === "favorites"
                ? "bg-yellow-400 text-white shadow"
                : "bg-gray-100 dark:bg-[#18181b] text-gray-700 dark:text-gray-300 hover:bg-yellow-100 dark:hover:bg-yellow-900/30"}
            `}
            onClick={() => setTab("favorites")}
          >
            <StarIcon size={18} />
            Favorites
          </button>
        </div>
        {/* Hero Section */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h1 className="heading-1 gradient-text mb-4">
              AI Notes
            </h1>
            <p className="body-large text-gray-600 dark:text-gray-400 mb-2">
              Smart, clean, minimal AI-powered notes
            </p>
            <p className="body-small text-gray-500 dark:text-gray-500">
              Built with Next.js, Tailwind, and AI — take notes like a pro.
            </p>
          </div>
          {/* Quick Add Note */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Plus className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="heading-4 text-gray-900 dark:text-white">Quick Note</h3>
                  <p className="body-small text-gray-500 dark:text-gray-400">Capture your thoughts instantly</p>
                </div>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Note title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-[#2a2a2a] border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200"
                />
                <textarea
                  placeholder="Write your note here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-[#2a2a2a] border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 resize-none"
                />
                <div className="flex justify-end">
                  <button
                    onClick={handleAddNote}
                    disabled={!title || !content}
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <Plus size={16} />
                    Add Note
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Notes Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="heading-3 text-gray-900 dark:text-white">Your Notes</h2>
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>{filteredNotes.length} notes</span>
              <span>•</span>
              <span>Recently updated</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <div
                key={note._id}
                className={`group bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-sm border border-gray-200/50 dark:border-gray-700/50 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer`}
                onClick={() => setSelectedNote(note)}
              >
                {/* Note Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {highlight(note.title, search)}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <Clock size={12} />
                      <span>{note.createdAt ? formatDistanceToNow(new Date(note.createdAt), { addSuffix: true }) : "just now"}</span>
                    </div>
                  </div>
                </div>
                {/* Note Content (no line clamp) */}
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 break-words whitespace-pre-line">
                  {highlight(note.content, search)}
                </p>
                {/* Note Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      className={`p-1 ${note.favorite ? "text-yellow-400" : "text-gray-400"} hover:text-yellow-500 transition-colors duration-200`}
                      onClick={e => {
                        e.stopPropagation();
                        handleToggleFavorite(note._id!, !!note.favorite);
                      }}
                      aria-label={note.favorite ? "Remove from favorites" : "Add to favorites"}
                    >
                      <Star size={14} fill={note.favorite ? "#facc15" : "none"} />
                    </button>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {note.content.length > 100 ? `${Math.ceil(note.content.length / 100)} min read` : 'Quick read'}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Empty State */}
          {filteredNotes.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 dark:bg-[#2a2a2a] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="text-gray-400" size={24} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No notes yet</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">Create your first note to get started</p>
              <button
                onClick={() => setIsAddingNote(true)}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
              >
                Create Note
              </button>
            </div>
          )}
        </div>
        {/* Note Detail Modal */}
        {selectedNote && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white dark:bg-[#18181b] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 max-w-lg w-full mx-4 p-8 relative animate-fade-in">
              <button
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition"
                onClick={() => setSelectedNote(null)}
                aria-label="Close"
              >
                <X size={20} />
              </button>
              <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white break-words">{selectedNote.title}</h2>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
                <Clock size={12} />
                <span>{selectedNote.createdAt ? formatDistanceToNow(new Date(selectedNote.createdAt), { addSuffix: true }) : "just now"}</span>
              </div>
              <div className="mb-6">
                <p className="text-gray-700 dark:text-gray-200 whitespace-pre-line break-words text-base">
                  {selectedNote.content}
                </p>
              </div>
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => handleSummarize(selectedNote._id!)}
                  disabled={summarizingNote === selectedNote._id}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <Sparkles size={16} className={summarizingNote === selectedNote._id ? 'animate-spin' : ''} />
                  {summarizingNote === selectedNote._id ? 'Summarizing...' : 'Summarize'}
                </button>
                <button
                  onClick={() => handleToggleFavorite(selectedNote._id!, !!selectedNote.favorite)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                    selectedNote.favorite
                      ? "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-300"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-300"
                  } font-medium hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-all duration-200`}
                >
                  <Star size={16} fill={selectedNote.favorite ? "#facc15" : "none"} />
                  {selectedNote.favorite ? "Remove Favorite" : "Add to Favorite"}
                </button>
                <button
                  onClick={() => handleDeleteNote(selectedNote._id!)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 font-medium hover:bg-red-200 dark:hover:bg-red-800 transition-all duration-200"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
              {selectedNote.summary && (
                <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 break-words whitespace-pre-line">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={14} className="text-blue-500" />
                    <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">AI Summary</span>
                  </div>
                  <p className="text-blue-700 dark:text-blue-200 break-words whitespace-pre-line">{selectedNote.summary}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}