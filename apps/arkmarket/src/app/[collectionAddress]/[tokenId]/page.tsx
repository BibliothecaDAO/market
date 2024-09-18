import { notFound } from "next/navigation";
import { ChainId, CollectionAddresses } from "~/config/homepage";
import TokenPage from "~/app/token/[contractAddress]/[tokenId]/page";

export default function TokenPageRoute({ params }) {
  const collection = CollectionAddresses[params.collectionAddress];
  if (undefined === collection) {
    return notFound()
  }
  const address = collection[ChainId.SN_MAIN];
  return TokenPage({ params: { contractAddress: address, tokenId: params.tokenId } })
}
