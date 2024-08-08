import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TalkFlow",
  description:
    "An AI Voice & Text Translation platform.",
  keywords: [
    "TalkFlow",
    "AI Translation",
    "Voice Translation",
    "Text Translation",
    "NextJS",
    "Tailwind CSS",
    "TypeScript",
  ],
  authors: [{ name: "GOUZGAR ANASS", url: "https://anassgouzgar.com" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <script src="./node_modules/preline/dist/preline.js"></script>
      </body>
    </html>
  );
}
