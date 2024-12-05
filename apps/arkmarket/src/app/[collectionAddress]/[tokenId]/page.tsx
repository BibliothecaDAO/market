import { notFound } from "next/navigation";
import { ChainId, CollectionAddresses, Collections } from "~/config/homepage";
import TokenPage from "~/app/token/[contractAddress]/[tokenId]/page";
import type { Metadata } from "next";
import getCollection from "~/lib/getCollection";
import { env } from "~/env";

interface GenerateMetadataProps {
  params: Promise<{ collectionAddress: string }>;
}

export async function generateMetadata({
  params,
}: GenerateMetadataProps): Promise<Metadata> {
  const collection = CollectionAddresses[params.collectionAddress];
  const collectionAddress = collection[ChainId.SN_MAIN];
  if (collectionAddress === CollectionAddresses[Collections.ETERNUMSEASONPASS][ChainId.SN_MAIN]) {
    return {
      title: `Eternum Season 0 Pass`,
      description: 'Conquer the Realms',
      openGraph: {
        images: [
          {
            url: `https://market.realms.world/og/eternum-season-pass.png`,
            width: 1200,
            height: 630,
          },
        ],
      },
      twitter: {
        images: [
          {
            url: `https://market.realms.world/og/eternum-season-pass.png`,
            width: 1200,
            height: 630,
          },
        ],
      },
    }
  }
  const platform =
    env.NEXT_PUBLIC_THEME === "unframed" ? "Unframed" : "Ark Market";
  const name = collection?.name ?? "Collection";

  return {
    title: `${name} | ${platform}`,
    openGraph: {
      images: [
        `https://ark-market-unframed.vercel.app/api/og/collection?collection_address=${collectionAddress}`,
      ],
    },
  };
}

export default function TokenPageRoute({ params }) {
  const collection = CollectionAddresses[params.collectionAddress];
  if (undefined === collection) {
    return notFound()
  }
  const address = collection[ChainId.SN_MAIN];
  return TokenPage({ params: { contractAddress: address, tokenId: params.tokenId } })
}
