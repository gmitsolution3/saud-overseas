import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from 'react-hot-toast';
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "SAUD Overseas | Best Manpower Company in Dhaka, Bangladesh",
  description: "SAUD Overseas is a leading manpower company based in Dhaka, Bangladesh. We specialize in providing skilled and unskilled labor for various industries worldwide. Our commitment to excellence and customer satisfaction has made us a trusted partner for businesses seeking reliable workforce solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        inter.variable,
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
