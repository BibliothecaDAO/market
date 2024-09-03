"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn, focusableStyles } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import DiscordIcon from "@ark-market/ui/icons/discord-icon";
import GithubIcon from "@ark-market/ui/icons/github-icon";
import XIcon from "@ark-market/ui/icons/x-icon";

import { siteConfig } from "~/config/site";
import { Icons } from "./icons";

export default function Footer() {
  const pathname = usePathname();
  if (
    pathname.includes("/wallet/") ||
    pathname.includes("/collection/") ||
    pathname.includes("/token/")
  ) {
    return null;
  }

  return (
    <footer className="border-t border-border px-8 py-11">
      <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-center">
        <div className="flex flex-col gap-6 lg:max-w-lg">
          <Link
            href="/"
            className={cn("flex items-center space-x-2", focusableStyles)}
          >
            <Icons.logo />
            <span className="sr-only font-bold">{siteConfig.name}</span>
          </Link>
          <p className="font-medium text-muted-foreground">Realms World</p>
          <div className="flex items-center gap-4">
            <Link href="https://twitter.com/RealmsWorld" className="flex items-center gap-2">
              <Button variant="outline" className="w-full lg:w-auto" size="xl">
                <p className="hidden lg:block">Follow us on </p>
                <XIcon className="size-4" />
              </Button>
            </Link>

            <Link href="https://discord.com/invite/realmsworld" className="flex items-center gap-2">
              <Button variant="outline" className="w-full lg:w-auto" size="xl">
                <p className="hidden lg:block">Join us on</p>
                <DiscordIcon className="size-4" />
              </Button>
            </Link>
            <Link href="https://github.com/bibliothecaDAO" className="flex items-center gap-2">
              <Button variant="outline" className="w-full lg:w-auto" size="xl">
                <p className="hidden lg:block">Browse our code </p>
                <GithubIcon className="size-4" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex justify-between text-muted-foreground lg:gap-40">
          <div className="flex flex-col gap-6">
            <h4 className="text-xl font-semibold text-foreground">Resources</h4>

            <a
              href="https://bibliothecadao.xyz/"
              className="hover:underline"
            >
              Bibliotheca DAO
            </a>
            <a
              href="https://www.coingecko.com/en/coins/lords"
              className="hover:underline"
            >
              Coin Gecko
            </a>
            <a
              href="https://frontinus.house/"
              className="hover:underline"
            >
              Frontinus House
            </a>
          </div>
          <div className="flex flex-col gap-6 lg:mr-16">
            <a
              href="https://realms.world/swap"
              className="hover:underline"
            >
              Buy Lords
            </a>
            <a
              href="https://shop.realms.world"
              className="hover:underline"
            >
              Realms World Shop
            </a>
            <a
              href="https://dev.realms.world"
              className="hover:underline"
            >
              Developer Docs
            </a>
            <a
              href="https://drive.google.com/drive/folders/17vrwIjwqifxBVTkHmxoK1VhQ31hVSbDH"
              className="hover:underline"
            >
              Brand Assets
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
