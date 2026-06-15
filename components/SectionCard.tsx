import { ReactNode } from "react";
import { Star, Sparkles } from "lucide-react";

export default function SectionCard({
  title,
  icon,
  notes,
  onSelectNote,
  showSummary = false,
}: {
  title: string;
  icon: ReactNode;
  notes: any[];
  onSelectNote: (note: any) => void;
  showSummary?: boolean;
}) {
  return (
    <div className="bg-white/80 dark:bg-[#18181b]/80 rounded-2xl shadow border border-gray-200 dark:border-gray-800 p-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-blue-500 dark:text-blue-400">{icon}</span>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
      </div>
      <div className="space-y-4">
        {notes.length === 0 && (
          <div className="text-gray-400 text-sm">No notes yet.</div>
        )}
        {notes.map((note) => (
          <div
            key={note._id}
            className="rounded-xl p-4 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-[#23232a] dark:to-[#18181b] shadow hover:shadow-lg transition cursor-pointer border border-gray-100 dark:border-gray-800 group"
            onClick={() => onSelectNote(note)}
            tabIndex={0}
            title={note.title}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-gray-900 dark:text-white">{note.title}</span>
              {note.favorite && <Star size={14} className="text-yellow-400" />}
              {note.summary && <Sparkles size={14} className="text-blue-400" />}
            </div>
            {showSummary && note.summary && (
              <div className="text-xs text-blue-700 dark:text-blue-300 mt-1 line-clamp-2">{note.summary}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
