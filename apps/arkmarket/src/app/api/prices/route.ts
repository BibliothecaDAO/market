import { env } from "~/env";
import { Mobula } from "mobula-sdk";

const mobula = new Mobula({
  apiKeyAuth: env.NEXT_PUBLIC_MOBULA_API_KEY,
});

const defaultResponse = {
  ethereum: { price: 0 },
  starknet: { price: 0 },
  lords: { price: 0 },
};
export async function GET() {
  try {
    const { multiDataResponse } = await mobula.fetchMultipleAssetMarketData({
      assets: "ethereum,starknet,lords",
    });

    if (multiDataResponse?.data === undefined) {
      return Response.json(defaultResponse);
    }

    return Response.json({
      ethereum: {
        // @ts-expect-error trust me compiler
        price: multiDataResponse.data.ethereum.price as number,
      },
      starknet: {
        // @ts-expect-error It's ok compiler
        price: multiDataResponse.data.starknet.price as number,
      },
      lords: {
        // @ts-expect-error It's ok compiler
        price: multiDataResponse.data.lords.price as number,
      }
    })
  } catch (error) {
    console.error("Failed to fetch prices", error);
    return Response.json(defaultResponse);
  }
}
