import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Software Circuit",
  description: "Ask questions, share answers, and connect with top contributors.",
};

// Navbar removed as requested

function Footer() {
  return (
    <footer className="w-full text-center py-6 bg-black/90 border-t border-zinc-800 mt-8">
      <span className="text-sm text-neutral-400">&copy; {new Date().getFullYear()} Software Circuit. All rights reserved.</span>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased bg-gradient-to-br from-black to-zinc-900 min-h-screen flex flex-col text-base`}>
        <Header />
        <div className="flex-1 flex flex-col pt-24">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
