import type { Metadata } from "next";
import "./globals.css";
import { SoundProvider } from "@/components/SoundProvider";

export const metadata: Metadata = {
  title: "Vaultly — ثروتك تعمل ليلًا ونهارًا، بهدوء تام",
  description:
    "Vaultly مدير ثروة شخصي يعمل بالذكاء الاصطناعي: يوازن محفظتك، يقتنص الفرص، ويحمي أهدافك المالية على مدار الساعة.",
  metadataBase: new URL("https://ahmad-full-stuck.github.io"),
  openGraph: {
    title: "Vaultly — إدارة ثروة بالذكاء الاصطناعي",
    description:
      "Vaultly يراقب أسواق العالم، يوازن محفظتك، ويقتنص الفرص نيابة عنك — بينما تعيش حياتك.",
    type: "website",
    locale: "ar_SA",
    siteName: "Vaultly",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vaultly — إدارة ثروة بالذكاء الاصطناعي",
    description:
      "Vaultly يراقب أسواق العالم، يوازن محفظتك، ويقتنص الفرص نيابة عنك.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=IBM+Plex+Sans+Arabic:wght@300;400;500;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#0A0E13" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect rx='20' width='100' height='100' fill='%23C9A96A'/><text x='50' y='68' font-size='52' text-anchor='middle' fill='%230A0E13' font-family='serif' font-weight='bold'>V</text></svg>" />
      </head>
      <body className="bg-abyss font-body text-mist antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:right-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-abyss"
        >
          تخطي إلى المحتوى
        </a>
        <SoundProvider>{children}</SoundProvider>
      </body>
    </html>
  );
}
