import { notFound } from "next/navigation";

import getCollection from "~/lib/getCollection";
import CollectionBanner from "./components/collection-banner";
import CollectionHeader from "./components/collection-header";
import CollectionItems from "./components/collection-items";
import MobileCollectionHeader from "./components/mobile-collection-header";
import { CollectionDescription } from "~/config/homepage";

interface CollectionPageProps {
  params: {
    collectionAddress: string;
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { collectionAddress } = params;
  const collection = await getCollection({ collectionAddress });

  const collectionDescription = CollectionDescription[collectionAddress];
  if (!collectionDescription || !collection) {
    return notFound();
  }

  return (
    <div className="flex min-h-[calc(100vh-var(--site-header-height))] flex-col">
      <CollectionBanner
        className="hidden md:block"
        collectionAddress={collectionAddress}
      />
      <CollectionHeader
        collectionAddress={collectionAddress}
        collection={collection}
      />
      <MobileCollectionHeader
        collectionAddress={collectionAddress}
        collection={collection}
      />
      <CollectionItems
        collectionAddress={collectionAddress}
        collectionTokenCount={collection.token_count}
      />
    </div>);
}
