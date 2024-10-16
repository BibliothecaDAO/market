"use client";

import Link from "next/link";
import { useAccount, useStarkProfile } from "@starknet-react/core";
import { formatEther } from "viem";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn, ellipsableStyles } from "@ark-market/ui";
import { Lords, Ethereum } from "@ark-market/ui/icons";
import { Separator } from "@ark-market/ui/separator";

import type { Token, TokenMarketData } from "~/types";
import ProfilePicture from "~/components/profile-picture";
import useTokenMarketdata from "~/hooks/useTokenMarketData";
import ownerOrShortAddress from "~/lib/ownerOrShortAddress";

interface TokenStatsProps {
  token: Token;
  tokenMarketData: TokenMarketData;
}

export default function TokenStats({
  className,
  token,
  tokenMarketData,
}: PropsWithClassName<TokenStatsProps>) {
  const { address } = useAccount();
  const { data, isError } = useTokenMarketdata({
    collectionAddress: token.collection_address,
    tokenId: token.token_id,
    initialData: tokenMarketData,
  });
  const { data: starkProfile } = useStarkProfile({ address: data?.owner });

  if (isError) {
    return null;
  }

  if (!data) {
    return null;
  }

  const owner = starkProfile?.name
    ? starkProfile.name
    : data.owner
      ? ownerOrShortAddress({
          ownerAddress: data.owner,
          address,
        })
      : "";

  const floor = data.floor ? formatEther(BigInt(data.floor)) : "_";
  const lastPrice = data.last_price
    ? formatEther(BigInt(data.last_price))
    : "_";
  const topOffer = data.has_offer
    ? formatEther(BigInt(data.top_offer.amount))
    : "_";

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0",
        className,
      )}
    >
      <div className="flex flex-col justify-between p-2 lg:pr-4">
        <p className="text-sm font-medium text-muted-foreground">
          Collection Floor
        </p>
        <div className="flex min-h-6 items-center gap-1 font-medium font-numbers text-xl">
          <Lords className="size-5" />
          <> {data.floor ? formatEther(BigInt(data.floor)) : "_"} LORDS</>
          {/* TODO @YohanTz: Proper color */}
          {/* <p className={cn("text-sm font-semibold text-green-500")}>+ {"_"}%</p> */}
        </div>
      </div>
      <div className="flex flex-col justify-between p-2 lg:border-l lg:px-4">
        <p className="text-sm font-medium text-muted-foreground">Last sale</p>
        <div className="flex items-center gap-1 font-numbers text-xl">
          <Lords className="size-5" />
          <p className="font-medium">
            {data.last_price ? formatEther(BigInt(data.last_price)) : "_"} LORDS
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-between p-2 lg:border-l lg:px-4">
        <p className="text-sm font-medium text-muted-foreground">Top offer</p>
        <div className="flex items-center gap-1 font-numbers text-xl">
          <Lords className="size-5" />
          <p className="font-medium">
            {data.has_offer ? formatEther(BigInt(data.top_offer.amount)) : "_"}{" "}LORDS
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-between p-2 lg:border-l lg:pl-4">
        <p className="text-sm font-medium text-muted-foreground">Owner</p>
        <div className="font-numbers flex items-center gap-2 text-lg">
          <ProfilePicture
            address={data.owner}
            className="size-6 flex-shrink-0 rounded-full"
          />
          <div className="min-w-0 flex-1">
            <Link href={`/wallet/${data.owner}`} className="block">
              <p className="truncate font-medium transition-colors hover:text-primary">
                {owner}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
