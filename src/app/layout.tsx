import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sanjeeviwedsnila.vercel.app"),
  title: "Sanjeevi & Nila — Royal Wedding Invitation (திருமண வரவேற்பு அழைப்பிதழ்)",
  description:
    "With divine grace and families' blessings, we joyfully invite you to celebrate the wedding ceremony of Sanjeevi & Nila on 22nd November 2026 at Malaiamman Marriage Hall, Karur.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-new.png", type: "image/png" },
    ],
    shortcut: "/favicon-new.png",
    apple: [
      { url: "/favicon-new.png", sizes: "300x300", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://sanjeeviwedsnila.vercel.app",
    siteName: "Sanjeevi & Nila Wedding",
    title: "Sanjeevi & Nila — Royal Wedding Invitation",
    description:
      "With divine grace and families' blessings, we joyfully invite you to celebrate the wedding ceremony of Sanjeevi & Nila on 22nd November 2026 at Malaiamman Marriage Hall, Karur.",
    images: [
      {
        url: "https://sanjeeviwedsnila.vercel.app/favicon-new.png",
        width: 300,
        height: 300,
        alt: "Sanjeevi & Nila Royal Wedding Monogram",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Sanjeevi & Nila — Royal Wedding Invitation",
    description:
      "With divine grace and families' blessings, we joyfully invite you to celebrate the wedding ceremony of Sanjeevi & Nila on 22nd November 2026 at Malaiamman Marriage Hall, Karur.",
    images: ["https://sanjeeviwedsnila.vercel.app/favicon-new.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" prefix="og: http://ogp.me/ns#" suppressHydrationWarning>
      <head>
        <link rel="icon" href="https://sanjeeviwedsnila.vercel.app/favicon-new.png" />
        <link rel="apple-touch-icon" href="https://sanjeeviwedsnila.vercel.app/favicon-new.png" />
        <link rel="image_src" href="https://sanjeeviwedsnila.vercel.app/favicon-new.png" />
        <meta itemProp="image" content="https://sanjeeviwedsnila.vercel.app/favicon-new.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cinzel:wght@400;500;600;700;800;900&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Great+Vibes&family=Inter:wght@300;400;500;600;700&family=Noto+Sans+Tamil:wght@400;500;600;700&family=Noto+Serif+Tamil:wght@400;500;600;700;800&family=Pinyon+Script&family=Bodoni+Moda:ital,opsz,wght@0,6..96,500;0,6..96,600;0,6..96,700;0,6..96,800;0,6..96,900;1,6..96,700&family=Lora:ital,wght@0,500;0,600;0,700;1,600;1,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className="bg-[#FAF6F0] text-[#1A100B] min-h-screen antialiased selection:bg-[#C9A46A]/30 selection:text-[#1A100B]"
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
