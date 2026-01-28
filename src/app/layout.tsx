import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import "./textEditorStyles.css";
import AuthProvider from "@/Provider/AuthProvider/AuthProvider";
import ReactQueryClientProvider from "@/Provider/ReactQueryClientProvider";
import Navbar from "@/components/custom/Navbar/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Candal } from "next/font/google";
import Footer from "@/components/custom/Footer/Footer";
import { DataProvider } from "@/Provider/DataProvider/DataProvider";
import ScrollToTop from "@/components/custom/Navbar/ScrollToTop";
import Script from "next/script";
import FacebookPixel from "./homePageComponents/FacebookPixel";
import { Suspense } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const candal = Candal({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-candal",
});

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-noto-serif-bengali",
});

export const metadata: Metadata = {
  title: "TechVibe Global - Innovative Engineering Solutions",
  description:
    "Your nationwide partner for comprehensive engineering and technology. TechVibe Global delivers expert services and premium products in Fire Safety, Electrical Systems, and IT Infrastructure. Since 2017, we have been providing the essential hardware and certified expertise required to build a safer, smarter Bangladesh.",
  keywords: [
    "TechVibe Global",
    "fire safety",
    "engineering solutions Bangladesh",
    "fire safety engineering",
    "electrical safety",
    "electrical products",
    "fire alarm system",
    "IT surveillance",
    "NFPA compliance",
    "OSHA standards",
    "fire protection systems",
    "electrical hazard analysis",
    "CCTV systems",
    "access control",
    "Dhaka engineering",
    "Chittagong engineering",
    "sustainable infrastructure",
    "security system",
    "safety audits",
    "risk assessment",
  ],
  authors: [{ name: "TechVibe Global" }],
  metadataBase: new URL("https://techvibeglobal.com"),
  creator: "TechVibe Global",
  publisher: "TechVibe Global",
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${candal.variable} ${notoSerifBengali.variable}`}
    >

      <head>
        {/* Meta Pixel */}
        <Script
          id="1426779722336683"
          strategy="afterInteractive"
        >
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1426779722336683');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={null}>
          <FacebookPixel />
        </Suspense>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ReactQueryClientProvider>
            <DataProvider>
              <AuthProvider>
                <Navbar />
                <ScrollToTop />
                <main className="min-h-[calc(100vh-80px)] px-2 lg:px-0">
                  {children}
                </main>
                <Footer />
                <Toaster />
              </AuthProvider>
            </DataProvider>
          </ReactQueryClientProvider>
        </ThemeProvider>
      </body>

      <noscript> <img height="1" width="1" style={{ display: "none" }} src="https://www.facebook.com/tr?id=1426779722336683&ev=PageView&noscript=1" /></noscript>

    </html>
  );
}
