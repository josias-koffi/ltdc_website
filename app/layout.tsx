import type {Metadata} from "next";
import {Montserrat} from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({subsets: ["latin"], weight: ["400"]});

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
        <body className={montserrat.className} style={{margin: 0}}>
        {children}
        </body>
        </html>
    );
}
