import { useSuspenseLoadingTokens } from "~/hooks/useTokenLoading";
import TokenSummary from "./token-summary";
import TokenStats from "./token-stats";
import TokenActions from "./token-actions";
import TokenOffers from "./token-offers";
import TokenTraits from "./token-traits";
import TokenAbout from "./token-about";
import TokenActivity from "./token-activity";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@ark-market/ui/button";

interface TokenPageDetailsProps {
  contractAddress: string;
  tokenId: string;
}

export function TokenPageDetails({ contractAddress, tokenId }: TokenPageDetailsProps) {
  const { token, tokenMarketData } = useSuspenseLoadingTokens({ contractAddress, tokenId });

  if (null === token || null === tokenMarketData) {
    return notFound()
  }

  return (
    <main className="mx-auto max-w-[120rem] p-5 pt-0 lg:p-8">
      <div className="mb-5">
        <Link href={`/collection/${token.collection_address}`} className="text-primary">
          <Button variant="link" size="sm">
            {"<"} Back to collection
          </Button>
        </Link>
      </div>
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
            contractAddress={contractAddress}
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
  )
}

export function TokenPageDetailsSkeleton() {
  return (
    <main className="max-w-[120rem] p-5 pt-0 lg:p-8">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-8">
        <div className="top-[calc(var(--site-header-height)+2rem)] h-fit lg:sticky">
          <div className="h-[400px] animate-pulse rounded-lg bg-gray-200"></div>
        </div>
        <div className="flex flex-col lg:gap-8">
          <div className="flex flex-col-reverse gap-5 lg:flex-col lg:gap-8">
            <div className="mb-5 lg:mb-0">
              <div className="h-[200px] animate-pulse rounded-lg bg-gray-200"></div>
            </div>
            <div className="-mx-5 lg:mx-0">
              <div className="h-[150px] animate-pulse rounded-lg bg-gray-200"></div>
            </div>
          </div>
          <div className="-mx-5 lg:mx-0">
            <div className="h-[200px] animate-pulse rounded-lg bg-gray-200"></div>
          </div>
          <div className="-mx-5 lg:mx-0">
            <div className="h-[180px] animate-pulse rounded-lg bg-gray-200"></div>
          </div>
          <div className="-mx-5 lg:mx-0">
            <div className="h-[250px] animate-pulse rounded-lg bg-gray-200"></div>
          </div>
        </div>
      </div>
      <div className="mt-6 lg:mt-20">
        <div className="h-[300px] animate-pulse rounded-lg bg-gray-200"></div>
      </div>
    </main>
  )
}
