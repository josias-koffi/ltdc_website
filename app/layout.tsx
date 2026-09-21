import type { Metadata } from "next";
import { Sen } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { DEFAULT_META_DESCRIPTION, DEFAULT_TITLE } from "@/libs/constants";
import SeasonalThemeProvider from "@/components/theme/SeasonalThemeProvider";
import { SEASON_BOOTSTRAP_SCRIPT } from "@/config/seasonBootstrap";

const sen = Sen({
  subsets: ["latin"],
  weight: ["400", "700"],
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
    // data-season est posé par le script de bootstrap avant le premier paint :
    // les pages étant prérendues au build, la saison ne peut pas être calculée
    // côté serveur sans être figée à la date de compilation.
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SEASON_BOOTSTRAP_SCRIPT }} />
      </head>
      <body className={sen.className} style={{ margin: 0 }}>
        <SeasonalThemeProvider>{children}</SeasonalThemeProvider>
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
