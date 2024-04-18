import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Live REZZ",
  description: "Watch live WORLD CUP results / you have to create it first :D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-gray-800 p-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center">
              <h1 className="text-white font-bold text-xl">Live REZZ</h1>
            </div>
            <ul className="flex space-x-4 text-white">
              <li>
                <Link href="/live">Live</Link>
              </li>
              <li className="border-l border-gray-600 pl-4">
                <Link href="/results">Results</Link>
              </li>
              <li className="border-l border-gray-600 pl-4">
                <Link href="/create-match">Create Match</Link>
              </li>
              <li className="border-l border-gray-600 pl-4">
                <Link href="/update-match">Update score</Link>
              </li>
            </ul>
          </nav>
        </header>
        {children}
        <footer
          className="bg-gray-800 text-white text-center p-4"
          style={{ position: "fixed", bottom: "0", width: "100%" }}
        >
          Created by Tarik Pljakic
        </footer>
      </body>
    </html>
  );
}
