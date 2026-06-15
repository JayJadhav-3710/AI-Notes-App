// ai-notes-app/components/Footer.tsx
import { ArrowLeft } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#18181b] py-6 mt-12">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-6">
        <div className="text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} AI Notes. All rights reserved.
        </div>
        <div className="flex gap-6 text-sm">
          <a href="/about" className="hover:underline text-gray-600 dark:text-gray-300">About</a>
          <a href="/contact" className="hover:underline text-gray-600 dark:text-gray-300">Contact</a>
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-600 dark:text-gray-300">GitHub</a>
          <a href="/privacy" className="hover:underline text-gray-600 dark:text-gray-300">Privacy</a>
        </div>
      </div>
    </footer>
  );
}