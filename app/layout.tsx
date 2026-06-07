import { TooltipProvider } from "@/components/ui/tooltip";
import { auth } from "@/lib/auth";
import AuthProvider from "@/lib/auth-provider";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "SAUD Overseas | Best Manpower Company in Dhaka, Bangladesh",
  description:
    "SAUD Overseas is a leading manpower company based in Dhaka, Bangladesh. We specialize in providing skilled and unskilled labor for various industries worldwide. Our commitment to excellence and customer satisfaction has made us a trusted partner for businesses seeking reliable workforce solutions.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

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
        <TooltipProvider>
          <AuthProvider session={session}>
            {children}
            <Toaster />
          </AuthProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
