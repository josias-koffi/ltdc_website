import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { DEFAULT_META_DESCRIPTION, DEFAULT_TITLE } from "@/libs/constants";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: DEFAULT_TITLE,
  description: DEFAULT_META_DESCRIPTION,
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
        <Script
          id={process?.env?.COOKIEYES_ANALYTICS_ID}
          type={process?.env?.COOKIEYES_ANALYTICS_TYPE}
          src={process?.env?.COOKIEYES_ANALYTICS_SRC}
        />
      </body>
    </html>
  );
}
