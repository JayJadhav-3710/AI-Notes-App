import { ReactNode } from "react";

export default function StatsCard({ icon, label, value }: { icon: ReactNode; label: string; value: any }) {
  return (
    <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/70 dark:bg-[#18181b]/80 shadow-md border border-gray-200 dark:border-gray-800 glass">
      <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
        <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
      </div>
    </div>
  );
}
