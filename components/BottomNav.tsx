import { Home, Star, Sparkles, Settings } from "lucide-react";
import Link from "next/link";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 bg-white/90 dark:bg-[#18181b]/90 border-t border-gray-200 dark:border-gray-800 flex justify-around items-center py-2 md:hidden shadow-lg">
      <Link href="/" className="flex flex-col items-center text-gray-500 hover:text-blue-500">
        <Home size={22} />
        <span className="text-xs">Home</span>
      </Link>
      <Link href="/favorites" className="flex flex-col items-center text-gray-500 hover:text-yellow-500">
        <Star size={22} />
        <span className="text-xs">Favorites</span>
      </Link>
      <Link href="/summaries" className="flex flex-col items-center text-gray-500 hover:text-blue-500">
        <Sparkles size={22} />
        <span className="text-xs">Summaries</span>
      </Link>
      <Link href="/settings" className="flex flex-col items-center text-gray-500 hover:text-purple-500">
        <Settings size={22} />
        <span className="text-xs">Settings</span>
      </Link>
    </nav>
  );
}
