"use server";

import { notFound } from "next/navigation";

import { useTokenLoading } from "~/hooks/useTokenLoading";
import { Suspense } from "react";
import { TokenPageDetails, TokenPageDetailsSkeleton } from "./components/token-page-details";
import { CollectionDescription } from "~/config/homepage";

interface TokenPageProps {
  params: {
    contractAddress: string;
    tokenId: string;
  };
}

export default async function TokenPage({
  params: { contractAddress, tokenId },
}: TokenPageProps) {
  const isRealmsCollection = CollectionDescription[contractAddress];
  if (!isRealmsCollection) {
    return notFound();
  }

  return (
    <>
      <head>
        <meta
          property="og:image"
          content={`https://ark-market-unframed.vercel.app/api/og/token?collection_address=${contractAddress}&token_id=${tokenId}`}
        />
      </head>
        <Suspense fallback={<TokenPageDetailsSkeleton />}>
          <TokenPageDetails
            contractAddress={contractAddress}
            tokenId={tokenId}
          />
        </Suspense>
    </>
  );
}
