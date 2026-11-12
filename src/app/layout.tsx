import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { site } from "@/shared/config";
import "./globals.css";

/** Pretendard Std (OFL-1.1, fonts/Pretendard-LICENSE.txt). 상용 한글 2,780자 + 라틴, 약 290KB */
const pretendard = localFont({
  src: "./fonts/PretendardStdVariable.woff2",
  variable: "--font-pretendard",
  weight: "45 920",
  display: "swap",
});
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: { default: `${site.name} | ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
