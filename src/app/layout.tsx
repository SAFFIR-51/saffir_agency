import type { Metadata } from "next";
import { Archivo, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { site } from "@/shared/config";
import "./globals.css";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
});
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
/** 영문 표시용 (ANCORS 세부 페이지 영문 서체) */
const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: { default: `${site.name} | ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${geistMono.variable} ${archivo.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col text-copy">{children}</body>
    </html>
  );
}
