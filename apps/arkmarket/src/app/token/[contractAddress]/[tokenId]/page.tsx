import { notFound } from "next/navigation";

import type { Token, TokenMarketData } from "~/types";
import getToken from "~/lib/getToken";
import getTokenMarketData from "~/lib/getTokenMarketData";
import TokenAbout from "./components/token-about";
import TokenActions from "./components/token-actions";
import TokenActivity from "./components/token-activity";
import TokenOffers from "./components/token-offers";
import TokenStats from "./components/token-stats";
import TokenSummary from "./components/token-summary";
import TokenTraits from "./components/token-traits";
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
  let token;
  try {
    token = await getToken({
      contractAddress,
      tokenId,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (err) {
    return notFound();
  }

  const tokenMarketData = await getTokenMarketData({
    contractAddress,
    tokenId,
  });

  const collection = CollectionDescription[token.collection_address];
  if (!collection) {
    return notFound();
  }

  if (!token.owner || !tokenMarketData) {
    return notFound();
  }

  return (
    <main className="mx-auto max-w-[120rem] p-5 pt-0 lg:p-8">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-8">
        <TokenSummary
          className="top-[calc(var(--site-header-height)+2rem)] h-fit lg:sticky"
          token={token}
        />
        <div className="flex flex-col lg:gap-8">
          <div className="flex flex-col-reverse gap-5 lg:flex-col lg:gap-8">
            <TokenStats
              token={token}
              tokenMarketData={tokenMarketData}
              className="mb-5 lg:mb-0"
            />
            <TokenActions
              token={token}
              tokenMarketData={tokenMarketData}
              className="-mx-5 lg:mx-0"
            />
          </div>
          <TokenOffers
            token={token}
            tokenMarketData={tokenMarketData}
            className="-mx-5 lg:mx-0"
          />
          <TokenTraits
            className="-mx-5 lg:mx-0"
            tokenAttributes={token.metadata?.attributes ?? []}
          />
          <TokenAbout
            className="-mx-5 lg:mx-0"
            contractAddress={contractAddress}
            token={token}
            tokenId={tokenId}
          />
        </div>
      </div>
      <TokenActivity
        className="mt-6 lg:mt-20"
        contractAddress={contractAddress}
        tokenId={tokenId}
      />
    </main>
  );
}
