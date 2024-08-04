import type { Metadata } from "next";
import { Sen } from "next/font/google";
import "./globals.css";

const sen = Sen({ subsets: ["latin"], weight: ["400"] });

export const metadata: Metadata = {
  title: "LTDC",
  description: "Une association a but non lucrative",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={sen.className} style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
