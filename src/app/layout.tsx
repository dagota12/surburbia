import type { Metadata } from "next";
import { Bowlby_One, Bowlby_One_SC, DM_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { SVGFilters } from "@/components/SVGFilters";
import Footer from "@/components/Footer";

const bowlbyOneSC = Bowlby_One_SC({
  variable: "--font-bowlby-sc",
  display: "swap",
  subsets: ["latin"],
  weight: "400",
});

const dmMono = DM_Mono({
  variable: "--font-dm-mono",
  display: "swap",
  subsets: ["latin"],
  weight: "500",
});

export const metadata: Metadata = {
  title: "SuburbSKS",
  description: "Build your skateboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bowlbyOneSC.variable} ${dmMono.variable} antialiased font-mono font-medium text-zinc-800`}
      >
        <main>
          <Header />
          {children}
          <Footer />
        </main>
        <SVGFilters />
      </body>
    </html>
  );
}
