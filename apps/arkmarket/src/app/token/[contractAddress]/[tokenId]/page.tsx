"use server";

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Suspense } from "react";
import { TokenPageDetails, TokenPageDetailsSkeleton } from "./components/token-page-details";
import { CollectionDescription } from "~/config/homepage";
import { env } from "~/env";
import getToken from "~/lib/getToken";

interface GenerateMetadataProps {
  params: { contractAddress: string; tokenId: string };
}

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const { contractAddress, tokenId } = params;
  const token = await getToken({ contractAddress, tokenId });
  const platform =
    env.NEXT_PUBLIC_THEME === "unframed" ? "Unframed" : "Ark Market";
  const name =
    token.metadata?.name ?? `${token.collection_name} #${token.token_id}`;

  return {
    title: `${name} | ${platform}`,
    openGraph: {
      images: [
        `https://ark-market-unframed.vercel.app/api/og/token?collection_address=${contractAddress}&token_id=${tokenId}`,
      ],
    },
  };
}

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
      <Suspense fallback={<TokenPageDetailsSkeleton />}>
        <TokenPageDetails
          contractAddress={contractAddress}
          tokenId={tokenId}
        />
      </Suspense>
    </>
  );
}
