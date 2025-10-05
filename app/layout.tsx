import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://app.deki.com"),
  title: {
    default: "Deki Music — Музыкальный сервис в Telegram",
    template: "%s • Deki Music",
  },
  description:
    "Deki Music — современный музыкальный сервис внутри Telegram. Слушай треки, открывай плейлисты недели и эксклюзивы!",
  keywords: [
    "музыка",
    "deki music",
    "плейлисты недели",
    "эксклюзивы deki",
    "трек по настроению",
    "музыкальный бот",
    "telegram музыка",
  ],
  authors: [{ name: "AWD", url: "https://github.com/AmirSherov" }],
  creator: "Mr Amir",
  publisher: "Deki Music",
  robots: { index: true, follow: true },
  alternates: {
    canonical: "https://app.deki.com",
  },
  openGraph: {
    type: "website",
    url: "https://app.deki.com",
    title: "Deki Music — Музыкальный сервис в Telegram",
    description:
      "Слушай любимые треки и эксклюзивы прямо в Telegram с Deki Music.",
    siteName: "Deki Music",
    images: [
      {
        url: "https://app.deki.com/deki-logo.png",
        width: 1200,
        height: 630,
        alt: "Deki Music Cover",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Deki Music — Музыкальный сервис в Telegram",
    description: "Плейлисты недели, эксклюзивы и треки по настроению.",
    creator: "@dekimusic",
    images: ["https://app.deki.com/deki-logo.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  category: "Music",
  verification: {
    google: "google-site-verification=ваш_токен",
    yandex: "yandex-verification=ваш_токен",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MusicService",
              name: "Deki Music",
              url: "https://app.deki.com",
              description:
                "Музыкальный сервис внутри Telegram. Плейлисты, эксклюзивы и треки по настроению.",
              sameAs: [
                "https://t.me/dekimusicbot",
                "https://github.com/AmirSherov",
              ],
              founder: {
                "@type": "Person",
                name: "AWD",
                url: "https://t.me/noname_tcp",
              },
              potentialAction: {
                "@type": "ListenAction",
                target: "https://t.me/deki_music_bot",
              },
              image: "https://app.deki.com/deki-logo.png",
            }),
          }}
        />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
          backgroundColor: "#000",
          color: "#fff",
          fontFamily: "Inter, sans-serif",
        }}
      >
        {children}
      </body>
    </html>
  );
}
