import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  adjustFontFallback: false,
});

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
      <body className={montserrat.className} style={{ margin: 0 }}>
        {children}
        <Script
          defer
          data-domain={process?.env?.PLAUSIBLE_DATA_DOMAINE}
          src={process?.env?.PLAUSIBLE_SCRIPT_SRC}
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
