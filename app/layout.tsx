import type { Metadata } from "next";
import { Vazirmatn, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import LightRays from "@/components/LightRays";
import Navbar from "@/components/Navbar/Navbar";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
});

export const metadata: Metadata = {
  title: "رویداد",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="fa"
      dir="rtl"
      className={`${vazirmatn.variable} antialiased dark`}
    >
      <body className="min-h-screen">
        <div className="absolute top-0 inset-0 z-[-1] min-h-screen">
          <LightRays raysColor="#10B981" distortion={0.01} />
        </div>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
