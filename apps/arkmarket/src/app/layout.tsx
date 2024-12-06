import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Space_Mono, VT323 } from "next/font/google";
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
import UnframedFooter from "~/components/unframed-footer";
import { env } from "~/env";
import { Maintenance } from "~/components/maintenance";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

const title = "Home to the Adventurers";
const description =
  "Created for Adventurers by Bibliotheca DAO - your window into the onchain world of Realms and the Lootverse.";

export const metadata: Metadata = {
  metadataBase: new URL(
    env.VERCEL_ENV === "production"
      ? "https://market.realms.world"
      : "http://localhost:3000",
  ),
  title: {
    template: "%s | Realms.World",
    default: "Realms.World | Home to the Adventurers",
  },
  description: description,
  icons: {
    icon: "/rw-logo.svg",
  },
  twitter: {
    card: "summary_large_image",
    title: "Realms.World | " + title,
    description: description,
    siteId: "1467726470533754880",
    creator: "@bibliothecadao",
    creatorId: "1467726470533754880",
    images: ["https://market.realms.world/backgrounds/banner.png"],
  },
  openGraph: {
    title: "Realms.World |" + title,
    description: description,
    url: "https://market.realms.world",
    siteName: "Realms World",
    images: [
      {
        url: "https://market.realms.world/backgrounds/banner.png",
        width: 800,
        height: 600,
        alt: "Realms Autonomous World",
      },
      {
        url: "https://market.realms.world/backgrounds/banner.png",
        width: 1800,
        height: 1600,
        alt: "Realms Autonomous World",
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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

const silkscreen = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-silkscreen",
  weight: ["400"],
  display: "swap",
});

const inconsolata = Space_Mono({
  subsets: ["latin"],
  variable: "--font-inconsolata",
  weight: "400",
  display: "swap",
});
const vt323 = VT323({
  subsets: ["latin"],
  variable: "--font-vt323",
  weight: "400",
  display: "swap",
})

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
      className={cn(

        env.NEXT_PUBLIC_THEME === "unframed"
          ? "unframed"
          : env.NEXT_PUBLIC_THEME,
        silkscreen.variable,
        inconsolata.variable,
        vt323.variable,
      )
      }
    >
      <body
        style={backgroundImageStyle}
        className="min-h-screen overscroll-y-none bg-background text-foreground antialiased lg:pb-10"
      >
        <CustomFonts />
        <Providers>
          <div className="flex-col md:flex">
            <SiteHeader />
            {/* {children} */}
            <Maintenance />
            <SpeedInsights />
          </div>
          {env.NEXT_PUBLIC_THEME === "unframed" ? (
            <UnframedFooter />
          ) : (
            <Footer />
          )}
          <DataFooter className="fixed bottom-0 hidden w-full lg:flex" />
          <Toaster />
          <Sonner richColors />
          <ConnectWalletDialog />
        </Providers>
      </body>
    </html>
  );
}
