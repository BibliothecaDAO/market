import type { Metadata, Viewport } from "next";
import { Jost, Inconsolata } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { cn } from "@ark-market/ui";
import { Toaster as Sonner } from "@ark-market/ui/sonner";
import { Toaster } from "@ark-market/ui/toaster";

import SiteHeader from "~/components/site-header";

import "~/app/globals.css";

import type { PropsWithChildren } from "react";

import ConnectWalletDialog from "~/components/connect-wallet-dialog";
import CustomFonts from "~/components/custom-fonts";
import DataFooter from "~/components/data-footer";
import Footer from "~/components/footer";
import Providers from "~/components/providers";
import { env } from "~/env";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://market.realms.world"
      : "http://localhost:3000",
  ),
  title: "Realms World Market",
  description: "FOCGing trade center",
  openGraph: {
    title: "Realms.World Market",
    description: "Simple monorepo with starknet marketplace",
    url: "https://market.realms.world",
    siteName: "Realms.World Market",
  },
  twitter: {
    card: "summary_large_image",
    site: "@RealmsWorld",
    creator: "@RealmsWorld",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  height: "device-height",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

const silkscreen = Jost({
  subsets: ["latin"],
  variable: "--font-spacemono",
  weight: ["400"],
  display: "swap",
});

const inconsolata = Inconsolata({
  subsets: ["latin"],
  variable: "--font-baebasneue",
  weight: "400",
  display: "swap",
});

const backgroundImageStyle = {
  backgroundImage: `url(/backgrounds/map.svg)`,
  backgroundOpacity: 0.1,
  backgroundSize: "cover",
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={env.NEXT_PUBLIC_THEME === "unframed" ? "unframed" : env.NEXT_PUBLIC_THEME}
    >
      <body
        style={backgroundImageStyle}
        className={cn(
          "min-h-screen overscroll-y-none bg-background text-foreground antialiased lg:pb-10",
          silkscreen.variable,
          inconsolata.variable,
        )}
      >
        <CustomFonts />
        <Providers>
          <div className="flex-col md:flex">
            <SiteHeader />
            {children}
            <SpeedInsights />
          </div>
          <Footer />
          <DataFooter className="fixed bottom-0 hidden w-full lg:flex" />
          <Toaster />
          <Sonner richColors />
          <ConnectWalletDialog />
        </Providers>
      </body>
    </html>
  );
}
