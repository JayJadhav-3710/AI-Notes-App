// ai-notes-app/components/FrontPage.tsx
"use client";
import NavbarNoSearch from "./NavbarNoSearch";
import Footer from "./Footer";
import { Sparkles, Star, Pen, ShieldCheck, Users, MessageCircle, ArrowUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import RegisterModal from "./RegisterModal";
import { useSession } from "next-auth/react";

export default function FrontPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] flex flex-col">
      <NavbarNoSearch />
      <main className="flex-1 pt-20 pb-10">
        {/* Hero Section */}
        <section className="max-w-3xl mx-auto text-center mb-16 px-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full mb-4 shadow">
            <Sparkles size={20} />
            <span>AI-powered, minimal, beautiful</span>
          </div>
          <h1 className="heading-1 gradient-text mb-4">Welcome to AI Notes</h1>
          <p className="body-large text-gray-600 dark:text-gray-300 mb-8">
            The smartest, cleanest way to take notes. Summarize, organize, and never lose a thought again.
          </p>
          <button
            type="button"
            onClick={() => {
              if (status === "authenticated") {
                router.push("/notes");
              } else {
                setShowRegister(true);
              }
            }}
            className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold text-lg shadow hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
          >
            + Add your first note
          </button>
        </section>

        {/* Features Grid */}
        <section className="max-w-5xl mx-auto mb-16 px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <Feature icon={<Sparkles size={32} />} title="AI Summaries" desc="Instantly summarize your notes with powerful AI." />
            <Feature icon={<Pen size={32} />} title="Minimal UI" desc="Distraction-free, beautiful, and easy to use." />
            <Feature icon={<Star size={32} />} title="Favorites" desc="Star important notes for quick access." />
            <Feature icon={<ShieldCheck size={32} />} title="Private & Secure" desc="Your notes are safe and private." />
            <Feature icon={<Users size={32} />} title="Collaboration" desc="(Coming soon) Share and collaborate with others." />
            <Feature icon={<MessageCircle size={32} />} title="Smart Search" desc="Find anything instantly with global search." />
          </div>
        </section>

        {/* Testimonials */}
        <section className="max-w-4xl mx-auto mb-16 px-4">
          <h2 className="text-2xl font-bold text-center mb-8">What users are saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Testimonial
              quote="AI Notes has completely changed how I organize my thoughts. The summaries are spot on!"
              name="Priya S."
              title="Product Designer"
            />
            <Testimonial
              quote="The clean interface and AI features make this my go-to notes app."
              name="Rahul M."
              title="Startup Founder"
            />
          </div>
        </section>
      </main>
      {/* FAQ Section */}
      <FAQSection />
      <RegisterModal open={showRegister} onClose={() => setShowRegister(false)} />
      <Footer />
      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.3 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-transform"
            aria-label="Scroll to top"
          >
            <ArrowUp size={22} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex flex-col items-center text-center bg-white dark:bg-[#18181b] rounded-2xl shadow p-6 border border-gray-100 dark:border-gray-800 hover:shadow-lg transition">
      <div className="mb-3 text-blue-500 dark:text-purple-400">{icon}</div>
      <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm">{desc}</p>
    </div>
  );
}

function Testimonial({ quote, name, title }: { quote: string; name: string; title: string }) {
  return (
    <div className="bg-white dark:bg-[#18181b] rounded-2xl shadow p-6 border border-gray-100 dark:border-gray-800 flex flex-col gap-3">
      <p className="text-lg italic text-gray-700 dark:text-gray-200">“{quote}”</p>
      <div>
        <span className="font-semibold text-gray-900 dark:text-white">{name}</span>
        <span className="ml-2 text-xs text-gray-500 dark:text-gray-400">{title}</span>
      </div>
    </div>
  );
}

// FAQ Accordion UI
function FAQSection() {
  const faqs = [
    {
      q: "What is AI Notes?",
      a: "AI Notes is a modern, minimal note-taking app powered by AI for smart summaries and organization.",
    },
    {
      q: "How do I use AI summaries?",
      a: "Simply create a note and click the Summarize button to generate an instant AI-powered summary.",
    },
    {
      q: "Is my data private?",
      a: "Yes, your notes are private and never shared with third parties.",
    },
    {
      q: "Can I favorite important notes?",
      a: "Yes, you can star notes to mark them as favorites for quick access.",
    },
    {
      q: "Is there a dark mode?",
      a: "Absolutely! Toggle between light and dark mode anytime from the Navbar.",
    },
  ];
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="max-w-3xl mx-auto mb-16 px-4">
      <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={faq.q}
            className="bg-white dark:bg-[#18181b] border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden transition-all duration-300"
          >
            <button
              className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none group"
              onClick={() => setOpen(open === idx ? null : idx)}
              aria-expanded={open === idx}
            >
              <span className="text-base font-medium text-gray-900 dark:text-white">{faq.q}</span>
              <svg
                className={`w-5 h-5 text-gray-400 transform transition-transform duration-300 ${open === idx ? "rotate-180" : "rotate-0"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              className={`px-6 pb-4 text-gray-600 dark:text-gray-300 text-sm transition-all duration-300 grid ${open === idx ? "grid-rows-[1fr] py-2" : "grid-rows-[0fr] p-0"}`}
              style={{ overflow: "hidden" }}
            >
              <div className={`transition-opacity duration-300 ${open === idx ? "opacity-100" : "opacity-0"}`}>{faq.a}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
