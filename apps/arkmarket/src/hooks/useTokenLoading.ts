import { CollectionDescription } from "~/config/homepage";
import getToken from "~/lib/getToken";
import getTokenMarketData from "~/lib/getTokenMarketData";
import type { Token, TokenMarketData } from "~/types";
import { use } from "react";

interface UseTokenLoadingParams {
  contractAddress: string;
  tokenId: string;
}

interface UseTokenLoadingResponse {
  token: Token | null;
  tokenMarketData: TokenMarketData | null;
  isRealmsCollection: boolean;
}
const timeout = async (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const withRetry = async (fn, params) => {
  let value
  let counter = 0;
  while (!value) {
    ++counter;
    try {
      value = await fn(params);
    } catch (err) {
      if (counter >= 30) {
        return null;
      }
      await timeout(3000);
      console.error(`Retrying ${fn} to fetch data ${err}`);
    }
  }
  return value;

}

export function useSuspenseLoadingTokens({ contractAddress, tokenId }: UseTokenLoadingParams) {
  const token = use(withRetry(getToken, { contractAddress, tokenId }));
  const tokenMarketData = use(withRetry(getTokenMarketData, { contractAddress, tokenId }));
  return { token, tokenMarketData };
}

export async function useTokenLoading({ contractAddress, tokenId }: UseTokenLoadingParams): Promise<UseTokenLoadingResponse> {
  let token;
  try {
    token = await getToken({
      contractAddress,
      tokenId,
    });
  } catch (err) {
    console.error(err)
    return {
      token: null,
      tokenMarketData: null,
      isRealmsCollection: false,
    };
  }

  const tokenMarketData = await getTokenMarketData({
    contractAddress,
    tokenId,
  });

  const collection = CollectionDescription[token.collection_address];

  return {
    token,
    tokenMarketData,
    isRealmsCollection: !!collection,
  };
}

