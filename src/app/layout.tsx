import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { WhatsAppButton } from "@/components/shared/whatsapp-button";
import { BackToTopButton } from "@/components/shared/back-to-top";
import { GradientOrbs } from "@/components/shared/gradient-orbs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Bike Mech | Professional Bicycle Repair Services",
  description: "Professional bicycle repair and maintenance services in Umtentweni, South Coast KwaZulu-Natal. From basic tune-ups to custom builds, we keep your ride smooth and safe. Event support for Sani2c, Go2Berg, Berg n Bush.",
  keywords: ["bicycle repair", "bike mechanic", "Umtentweni", "South Coast", "KwaZulu-Natal", "South Africa", "bike service", "cycle repair", "mountain bike", "road bike", "Sani2c"],
  authors: [{ name: "The Bike Mech" }],
  icons: {
    icon: "/images/logo.png",
  },
  openGraph: {
    title: "The Bike Mech | Professional Bicycle Repair Services",
    description: "Professional bicycle repair and maintenance services on the South Coast of KwaZulu-Natal.",
    url: "https://thebikemech.co.za",
    siteName: "The Bike Mech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Bike Mech | Professional Bicycle Repair Services",
    description: "Professional bicycle repair and maintenance services on the South Coast of KwaZulu-Natal.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}
      >
        <GradientOrbs />
        <Navbar />
        <main className="flex-1 relative z-10 pt-16 lg:pt-20">
          {children}
        </main>
        <Footer />
        <BackToTopButton />
        <WhatsAppButton />
        <Toaster />
      </body>
    </html>
  );
}
