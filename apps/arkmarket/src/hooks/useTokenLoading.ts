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
  isLoading: boolean;
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
      isLoading: false,
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
    isLoading: false,
  };
}

