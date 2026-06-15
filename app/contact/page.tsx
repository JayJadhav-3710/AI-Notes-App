"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex flex-col">
      <Navbar search="" setSearch={() => {}} />
      <main className="flex-1 flex items-center justify-center pt-20 pb-10">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Contact</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">Contact page coming soon!</p>
        </div>
      </main>
      <Footer />
    </div>
  );
} 