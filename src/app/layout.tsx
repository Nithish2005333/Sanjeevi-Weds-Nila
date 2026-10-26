import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sanjeeviwedsnila.vercel.app"),
  title: "Sanjeevi & Nila — Wedding Invitation (திருமண வரவேற்பு அழைப்பிதழ்)",
  description:
    "With divine grace and families' blessings, we joyfully invite you to celebrate the wedding ceremony of Sanjeevi & Nila on 22nd November 2026 at Malaiamman Marriage Hall, Karur.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/icon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
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
        url: "/apple-touch-icon.png",
        width: 180,
        height: 180,
        alt: "Sanjeevi & Nila Royal Wedding Invitation",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Sanjeevi & Nila — Royal Wedding Invitation",
    description:
      "With divine grace and families' blessings, we joyfully invite you to celebrate the wedding ceremony of Sanjeevi & Nila on 22nd November 2026 at Malaiamman Marriage Hall, Karur.",
    images: ["https://sanjeeviwedsnila.vercel.app/apple-touch-icon.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="image_src" href="https://sanjeeviwedsnila.vercel.app/apple-touch-icon.png" />
        <meta itemProp="image" content="https://sanjeeviwedsnila.vercel.app/apple-touch-icon.png" />
        <meta property="og:title" content="Sanjeevi & Nila — Royal Wedding Invitation" />
        <meta
          property="og:description"
          content="With divine grace and families' blessings, we joyfully invite you to celebrate the wedding ceremony of Sanjeevi & Nila on 22nd November 2026 at Malaiamman Marriage Hall, Karur."
        />
        <meta property="og:image" content="https://sanjeeviwedsnila.vercel.app/apple-touch-icon.png" />
        <meta property="og:image:secure_url" content="https://sanjeeviwedsnila.vercel.app/apple-touch-icon.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="180" />
        <meta property="og:image:height" content="180" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://sanjeeviwedsnila.vercel.app" />
        <meta property="og:site_name" content="Sanjeevi & Nila Wedding" />
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
