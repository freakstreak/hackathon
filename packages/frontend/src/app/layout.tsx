import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import QueryClientProvider from "@/providers/QueryClientProvider";
import { AuthProvider } from "@/contexts/AuthContext";

import { Toaster } from "@/components/ui/toaster";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${poppins.variable} antialiased`}>
        <AuthProvider>
          <QueryClientProvider>
            {children}

            <Toaster  />
          </QueryClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
