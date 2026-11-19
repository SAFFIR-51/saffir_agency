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
  applicationName: site.name,
  // 전화번호·주소가 자동 링크로 바뀌어 디자인이 깨지지 않게
  formatDetection: { telephone: false, address: false, email: false },
  // 페이지별 값이 없을 때 쓰는 공유 미리보기 (페이지는 shared/seo pageMetadata로 덮어쓴다)
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: site.name,
    title: `${site.name} | ${site.tagline}`,
    description: site.description,
    images: [{ url: "/og/default.jpg", width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image", images: ["/og/default.jpg"] },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
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
