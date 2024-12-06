import type { Components } from "react-virtuoso";
import React from "react";
import Link from "next/link";
import { VirtuosoGrid } from "react-virtuoso";
import { formatEther } from "viem";

import {
  cn,
  ellipsableStyles,
  focusableStyles,
  formatUnits,
} from "@ark-market/ui";
import { NoResult, VerifiedIcon } from "@ark-market/ui/icons";
import {
  NftCard,
  NftCardAction,
  NftCardContent,
  NftCardMedia,
} from "@ark-market/ui/nft-card";

import type { ViewType } from "../../../../components/view-type-toggle-group";
import type { WalletToken } from "../queries/getWalletData";
import { TokenActionsCreateListing } from "~/app/token/[contractAddress]/[tokenId]/components/token-actions-create-listing";
import Media from "~/components/media";
import { CollectionDescription } from "~/config/homepage";
import { CollectionTokenImage } from "~/app/collection/[collectionAddress]/components/collection-token-image";
import { useSeasonPass } from "~/hooks/useSeasonPass";

const LargeGridContainer: Components["List"] = React.forwardRef(
  ({ style, children }, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        className="mb-2 grid w-full grid-cols-2 gap-4 px-5 py-6 sm:grid-cols-[repeat(auto-fill,_minmax(15rem,1fr))] sm:gap-2"
      >
        {children}
      </div>
    );
  },
);

LargeGridContainer.displayName = "LargeGridContainer";

const SmallGridContainer: Components["List"] = React.forwardRef(
  ({ style, children }, ref) => {
    return (
      <div
        ref={ref}
        style={style}
        className="mb-2 grid w-full grid-cols-2 gap-4 px-5 py-6 sm:grid-cols-[repeat(auto-fill,_minmax(10rem,1fr))] sm:gap-2"
      >
        {children}
      </div>
    );
  },
);

SmallGridContainer.displayName = "SmallGridContainer";

interface CollectionItemsDataGridViewProps {
  walletTokens: WalletToken[];
  viewType: ViewType;
  isOwner: boolean;
}

export default function CollectionItemsDataGridView({
  walletTokens,
  viewType,
  isOwner,
}: CollectionItemsDataGridViewProps) {
  const filteredWalletTokens = walletTokens.filter((token, idx) => {
    const collection = CollectionDescription[token.collection_address];
    return collection !== undefined
  });
  return (
    <VirtuosoGrid
      // initialItemCount same as totalCount but needed for SSR
      initialItemCount={filteredWalletTokens.length}
      totalCount={filteredWalletTokens.length}
      useWindowScroll
      components={{
        List:
          viewType === "large-grid" ? LargeGridContainer : SmallGridContainer,
      }}
      itemContent={(index) => {
        const token = filteredWalletTokens[index];
        if (token === undefined) {
          return null;
        }
        return <PortfolioTokenItem token={token} viewType={viewType} isOwner={isOwner} />
      }}
    />
  );
}
function PortfolioTokenItem({ token, viewType, isOwner }: { token: WalletToken, viewType: string, isOwner: boolean }) {
  const canListItem = isOwner && !token.list_price;
  const { realmName, isSeasonPass } = useSeasonPass(token);
  const tokenName = isSeasonPass(token.collection_address) ? realmName : token.metadata?.name ?? token.token_id;

  return (
    // TODO @YohanTz: Extract to NftCard component and sub-components
    <NftCard>
      <Link
        href={`/token/${token.collection_address}/${token.token_id}`}
        className={cn("flex items-center gap-1", focusableStyles)}
      >
        <NftCardMedia className="aspect-auto">
          {/* TODO: Media part of NftCardMedia */}
          <CollectionTokenImage
            token={token}
            height={viewType === "large-grid" ? 540 : 340}
            width={viewType === "large-grid" ? 540 : 340}
          />
        </NftCardMedia>
      </Link>
      <NftCardContent>
        <div className="flex w-full justify-between">
          <div className="w-full overflow-hidden">
            <Link
              href={`/token/${token.collection_address}/${token.token_id}`}
              className={cn("flex items-center gap-1", focusableStyles)}
            >
              <p
                className={cn(
                  "text-base font-bold leading-none",
                  viewType === "large-grid" && "font-bold sm:text-xl",
                  ellipsableStyles,
                )}
              >
                {tokenName}
              </p>
            </Link>
            <Link
              href={`/collection/${token.collection_address}`}
              className={cn(
                "mt-1 flex items-center gap-1",
                focusableStyles,
              )}
            >
              <p
                className={cn(
                  "text-sm font-normal text-accent-foreground transition-colors hover:text-primary",
                  viewType === "large-grid" && "sm:text-base",
                  ellipsableStyles,
                )}
              >
                {token.collection_name}
              </p>
              <VerifiedIcon className="size-4 flex-shrink-0 text-primary" />
            </Link>

            {token.list_price ? (
              <p className={cn("mt-2 text-sm font-semibold", ellipsableStyles)}>
                {formatUnits(token.list_price, 18)} LORDS
              </p>
            ) : (
              <p className="mt-2 text-sm font-semibold">Not for sale</p>
            )}
          </div>
        </div>
        <div className="mt-5 h-5">
          {token.last_price ? (
            <p className="mt-5 text-sm font-medium text-secondary-foreground">
              Last sale {formatEther(BigInt(token.last_price))} LORDS
            </p>
          ) : null}
        </div>
        {canListItem ? (
          <TokenActionsCreateListing token={token}>
            <NftCardAction>List for sale</NftCardAction>
          </TokenActionsCreateListing>
        ) : (
          <NftCardAction asChild>
            <Link
              href={`/token/${token.collection_address}/${token.token_id}`}
            >
              Details
            </Link>
          </NftCardAction>
        )}
      </NftCardContent>
    </NftCard>
  );
}
