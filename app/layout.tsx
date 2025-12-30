import type { Metadata, Viewport } from "next";
import { Playfair_Display, Assistant, Heebo, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import { JewelryHeader } from "@/components/layout/JewelryHeader";
import { JewelryFooter } from "@/components/layout/JewelryFooter";
import { JewelryLanguageProvider } from "@/lib/i18n/JewelryLanguageContext";
import { LanguageProvider } from "@/lib/i18n/LanguageContext";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const assistant = Assistant({
  subsets: ["latin", "hebrew"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const heebo = Heebo({
  subsets: ["latin", "hebrew"],
  variable: "--font-body-hebrew",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-body-arabic",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// בדיקה בטוחה של baseUrl
function getBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_BASE_URL;
  
  if (envUrl) {
    try {
      new URL(envUrl); // בדיקה שהערך תקין
      return envUrl;
    } catch {
      // אם לא תקין, נשתמש בברירת מחדל
    }
  }
  
  // ברירת מחדל לפי סביבה
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000';
  }
  
  return 'https://example.com';
}

const baseUrl = getBaseUrl();

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Hallel Diamonds - תכשיטים שמרגישים כמו \"אחד מתוך מיליון\"",
    template: "%s | Hallel Diamonds",
  },
  description:
    "יהלומים טבעיים ויהלומי מעבדה • זהב 14K/18K • עבודת צורפות ברמת גימור גבוהה",
  keywords: "תכשיטים, יהלומים, זהב, טבעות, שרשראות, עגילים, צמידים, תכשיטי יוקרה, יהלומי מעבדה",
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: baseUrl,
    title: "Hallel Diamonds - תכשיטים שמרגישים כמו \"אחד מתוך מיליון\"",
    description:
      "יהלומים טבעיים ויהלומי מעבדה • זהב 14K/18K • עבודת צורפות ברמת גימור גבוהה",
    siteName: "Hallel Diamonds",
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${playfair.variable} ${assistant.variable} ${heebo.variable} ${notoSansArabic.variable} font-body`}>
        <JewelryLanguageProvider>
          <LanguageProvider>
            <div className="min-h-screen flex flex-col">
              <JewelryHeader />
              <main className="flex-1">{children}</main>
              <JewelryFooter />
            </div>
          </LanguageProvider>
        </JewelryLanguageProvider>
      </body>
    </html>
  );
}

