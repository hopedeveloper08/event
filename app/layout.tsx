import type { Metadata } from "next";
import { Vazirmatn, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

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
      dir="rtl" className={cn("font-sans", inter.variable)}
    >
      <body
        className={`${vazirmatn.variable} antialiased min-h-screen dark`}
      >
        {children}
      </body>
    </html>
  );
}
