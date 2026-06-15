import { X, Star, Sparkles } from "lucide-react";

export default function NoteDetail({ note, onClose }: { note: any; onClose: () => void }) {
  return (
    <div>
      <button
        className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 transition"
        onClick={onClose}
        aria-label="Close"
      >
        <X size={20} />
      </button>
      <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white break-words">{note.title}</h2>
      <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-4">
        {note.favorite && <Star size={16} className="text-yellow-400" />}
        {note.summary && <Sparkles size={16} className="text-blue-400" />}
      </div>
      <div className="mb-6">
        <p className="text-gray-700 dark:text-gray-200 whitespace-pre-line break-words text-base">
          {note.content}
        </p>
      </div>
      {note.summary && (
        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800 break-words whitespace-pre-line">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={14} className="text-blue-500" />
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">AI Summary</span>
          </div>
          <p className="text-blue-700 dark:text-blue-200 break-words whitespace-pre-line">{note.summary}</p>
        </div>
      )}
    </div>
  );
}
