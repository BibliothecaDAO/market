import type { CollectionTraits } from "~/types";
import { env } from "~/env";

interface GetCollectionParams {
  collectionAddress: string;
}

export interface CollectionTraitsApiResponse {
  data: CollectionTraits;
}

export default async function getCollectionTraits({
  collectionAddress,
}: GetCollectionParams) {
  const response = await fetch(
    `${env.NEXT_PUBLIC_MARKETPLACE_API_URL}/collections/${collectionAddress}/traits`,
  );

  if (!response.ok) {
    console.error("Failed to fetch collection data");

    return {};
  }

  const { data } = (await response.json()) as CollectionTraitsApiResponse;

  return data;
}
