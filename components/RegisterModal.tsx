import { signIn } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, ArrowRight, Shield, Zap } from "lucide-react";
import { useState } from "react";

export default function RegisterModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [isLoading, setIsLoading] = useState(false);
  
  if (!open) return null;

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    await signIn("google", { callbackUrl: "/notes" });
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Backdrop with blur */}
        <motion.div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />
        
        {/* Modal */}
        <motion.div
          className="relative w-full max-w-md"
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ 
            type: "spring", 
            damping: 25, 
            stiffness: 300,
            duration: 0.5 
          }}
        >
          {/* Glassmorphism container */}
          <div className="relative overflow-hidden rounded-3xl bg-white/10 dark:bg-gray-900/10 backdrop-blur-xl border border-white/20 dark:border-gray-700/30 shadow-2xl">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
            
            {/* Content */}
            <div className="relative p-8">
              {/* Close button */}
              <motion.button
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-white/20 dark:hover:bg-gray-700/50 transition-all duration-200"
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Close"
              >
                <X size={18} />
              </motion.button>

              {/* Header */}
              <div className="text-center mb-8">
                <motion.div
                  className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", damping: 15 }}
                >
                  <Sparkles className="text-white" size={28} />
                </motion.div>
                
                <motion.h2 
                  className="heading-2 gradient-text mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Welcome to AI Notes
                </motion.h2>
                
                <motion.p 
                  className="body-large text-gray-600 dark:text-gray-400"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Start your journey with smart, AI-powered notes
                </motion.p>
              </div>

              {/* Features */}
              <motion.div 
                className="mb-8 space-y-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-6 h-6 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Zap size={12} className="text-green-600 dark:text-green-400" />
                  </div>
                  <span>AI-powered summaries and insights</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Shield size={12} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <span>Secure and private by default</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                    <Sparkles size={12} className="text-purple-600 dark:text-purple-400" />
                  </div>
                  <span>Beautiful, distraction-free interface</span>
                </div>
              </motion.div>

              {/* Google Sign In Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  className="group relative w-full flex items-center justify-center gap-3 px-6 py-4 bg-white dark:bg-gray-800 rounded-2xl font-semibold text-gray-900 dark:text-white shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Google Icon */}
                  <div className="relative">
                    <svg width="20" height="20" viewBox="0 0 48 48">
                      <g>
                        <path fill="#4285F4" d="M43.611 20.083H42V20H24v8h11.303C34.73 32.091 29.884 35 24 35c-6.627 0-12-5.373-12-12s5.373-12 12-12c2.803 0 5.377.99 7.413 2.626l6.293-6.293C34.583 5.099 29.584 3 24 3 12.954 3 4 11.954 4 23s8.954 20 20 20c11.045 0 19.799-7.949 19.799-19.799 0-1.326-.138-2.617-.188-3.118z"/>
                        <path fill="#34A853" d="M6.306 14.691l6.571 4.819C14.655 16.108 19.001 13 24 13c2.803 0 5.377.99 7.413 2.626l6.293-6.293C34.583 5.099 29.584 3 24 3c-7.732 0-14.41 4.41-17.694 11.691z"/>
                        <path fill="#FBBC05" d="M24 43c5.522 0 10.523-1.877 14.413-5.099l-6.627-5.428C29.884 35 24 35 24 35c-5.884 0-10.73-2.909-13.303-7.083l-6.571 4.819C9.59 40.59 16.268 45 24 45z"/>
                        <path fill="#EA4335" d="M43.611 20.083H42V20H24v8h11.303C34.73 32.091 29.884 35 24 35c-5.884 0-10.73-2.909-13.303-7.083l-6.571 4.819C9.59 40.59 16.268 45 24 45c7.732 0 14.41-4.41 17.694-11.691z"/>
                      </g>
                    </svg>
                  </div>
                  
                  <span className="text-base">
                    {isLoading ? "Signing in..." : "Continue with Google"}
                  </span>
                  
                  <motion.div
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    initial={{ x: -10 }}
                    animate={{ x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <ArrowRight size={18} />
                  </motion.div>
                  
                  {/* Loading spinner */}
                  {isLoading && (
                    <motion.div
                      className="absolute right-4"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-500 rounded-full" />
                    </motion.div>
                  )}
                </motion.button>
              </motion.div>

              {/* Footer */}
              <motion.p 
                className="text-center text-xs text-gray-500 dark:text-gray-400 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                By continuing, you agree to our Terms of Service and Privacy Policy
              </motion.p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 