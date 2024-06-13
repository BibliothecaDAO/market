import type { PropsWithClassName } from "@ark-market/ui/lib/utils";
import DiscordIcon from "@ark-market/ui/components/icons/discord-icon";
import EthereumLogo2 from "@ark-market/ui/components/icons/ethereum-logo-2";
import StarknetLogo2 from "@ark-market/ui/components/icons/starknet-logo-2";
import XIcon from "@ark-market/ui/components/icons/x-icon";
import { Separator } from "@ark-market/ui/components/separator";
import { cn } from "@ark-market/ui/lib/utils";

import ExternalLink from "~/components/external-link";
import { siteConfig } from "~/config/site";

export default function CollectionFooter({ className }: PropsWithClassName) {
  return (
    <footer
      className={cn(
        "flex h-[var(--collection-footer-height)] items-center justify-between border-t border-border bg-background px-5 text-xs",
        className,
      )}
    >
      <div className="flex h-full items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
          </span>
          <p>Live data</p>
        </div>
        <Separator orientation="vertical" />
        <ExternalLink href={siteConfig.links.twitter}>
          <XIcon />
        </ExternalLink>
        <ExternalLink href="/">
          <DiscordIcon />
        </ExternalLink>
        <Separator orientation="vertical" />
      </div>
      <div className="flex h-full items-center gap-4">
        <div className="flex items-center gap-0.5">
          <EthereumLogo2 />
          <p>ETH Price: Unknown</p>
        </div>
        <Separator orientation="vertical" />
        <div className="flex items-center gap-2">
          <StarknetLogo2 />
          <p>STRK Price: Unknown</p>
        </div>
      </div>
    </footer>
  );
}