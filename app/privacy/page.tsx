"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex flex-col">
      <Navbar search="" setSearch={() => {}} />
      <main className="flex-1 pt-20 pb-10">
        <section className="max-w-3xl mx-auto px-4 text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full mb-4 shadow">
            <ShieldCheck size={20} />
            <span>Privacy Policy</span>
          </div>
          <h1 className="text-4xl font-bold mb-4 gradient-text">Your Privacy Matters</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            We respect your privacy. Your notes are private, secure, and never shared with third parties.
          </p>
        </section>
        <section className="max-w-3xl mx-auto bg-white dark:bg-[#18181b] rounded-2xl shadow p-8 border border-gray-100 dark:border-gray-800 text-left">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">What We Collect</h2>
          <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6">
            <li>Your notes and content (stored securely)</li>
            <li>Basic usage analytics (to improve the app)</li>
            <li>No personal data is sold or shared</li>
          </ul>
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Your Rights</h2>
          <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6">
            <li>You can delete your notes at any time</li>
            <li>We do not use your data for advertising</li>
            <li>Contact us for any privacy concerns</li>
          </ul>
          <p className="text-gray-500 dark:text-gray-400 mt-4">
            For questions, email <a href="mailto:support@example.com" className="underline">support@example.com</a>
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
