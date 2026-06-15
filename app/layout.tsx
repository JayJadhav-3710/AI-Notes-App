import "./globals.css";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Notes",
  description: "Smart, clean, minimal AI-powered notes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <body className="bg-gray-50 text-black dark:bg-[#0a0a0a] dark:text-white transition-colors duration-300 font-sans antialiased">
        <AuthProvider>
          <ThemeProvider 
            attribute="class" 
            defaultTheme="system" 
            enableSystem={true}
            disableTransitionOnChange={false}
          >
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}