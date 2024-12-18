"use client";

import { useState } from "react";
import Link from "next/link";
import { validateAndParseAddress } from "starknet";

import { getRoundedRemainingTime } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import { PriceTag } from "@ark-market/ui/price-tag";
import { TableCell, TableRow } from "@ark-market/ui/table";

import type { Token, TokenMarketData, TokenOffer } from "~/types";
import OfferFloorDiffCell from "~/components/cells/offer-floor-diff-cell";
import OfferPriceCell from "~/components/cells/offer-price-cell";
import ConnectWalletModal from "~/components/connect-wallet-modal";
import ownerOrShortAddress from "~/lib/ownerOrShortAddress";
import AcceptOffer from "./accept-offer";
import CancelOffer from "./cancel-offer";

interface TokenOffersTableProps {
  address?: string;
  offer: TokenOffer;
  token: Token;
  tokenMarketData: TokenMarketData;
}

export default function TokenOffersTableItem({
  address,
  offer,
  token,
  tokenMarketData,
}: TokenOffersTableProps) {
  const [isSuccess, setIsSuccess] = useState(false);
  const formattedSource = ownerOrShortAddress({
    ownerAddress: offer.source,
    address,
  });
  const expiresIn = getRoundedRemainingTime(offer.expire_at);
  const isOwner = address
    ? validateAndParseAddress(address) ===
    validateAndParseAddress(tokenMarketData.owner)
    : false;
  const isOfferer = address
    ? validateAndParseAddress(address) === validateAndParseAddress(offer.source)
    : false;

  if (isSuccess) {
    return null;
  }

  return (
    <TableRow
      key={offer.offer_id}
      className="grid h-[4.625rem] w-full grid-cols-5 items-center"
    >
      <OfferPriceCell offer={offer} />
      <OfferFloorDiffCell offer={offer} />
      <TableCell>
        <Link href={`/wallet/${offer.source}`}>{formattedSource}</Link>
      </TableCell>
      <TableCell>In {expiresIn}</TableCell>
      <TableCell className="text-end">
        {address ? (
          <>
            {isOwner && (
              <AcceptOffer
                onSuccess={() => setIsSuccess(true)}
                collectionAddress={token.collection_address}
                collectionName={token.collection_name}
                tokenId={token.token_id}
                tokenMetadata={token.metadata}
                offerOrderHash={offer.hash}
                offerPrice={offer.price}
                isListed={tokenMarketData.is_listed}
                listing={tokenMarketData.listing}
                floor={tokenMarketData.floor}
              />
            )}
            {isOfferer && (
              <CancelOffer
                onSuccess={() => setIsSuccess(true)}
                tokenId={token.token_id}
                offerOrderHash={offer.hash}
                collectionAddress={token.collection_address}
                offerPrice={offer.price}
                collectionName={token.collection_name}
                tokenMetadata={token.metadata}
              />
            )}
          </>
        ) : (
          <ConnectWalletModal>
            <Button size="sm">Connect wallet</Button>
          </ConnectWalletModal>
        )}
      </TableCell>
    </TableRow>
  );
}
