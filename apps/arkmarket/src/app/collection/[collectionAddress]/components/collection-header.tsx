"use client";

import { useState } from "react";

import { cn, focusableStyles } from "@ark-market/ui";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ark-market/ui/collapsible";
import {
  ChevronDown,
  Discord,
  Globe,
  VerifiedIcon,
  XIcon,
} from "@ark-market/ui/icons";

import type { Collection } from "~/types";
import CopyButton from "~/components/copy-button";
import ExternalLink from "~/components/external-link";
import CollectionHeaderStats from "./collection-header-stats";
import { CollectionDescription } from "~/config/homepage";
import { useQuery } from "@tanstack/react-query";
import getCollection from "~/lib/getCollection";

interface CollectionHeaderProps {
  collectionAddress: string;
  collection: Collection;
}

export default function CollectionHeader({
  collectionAddress,
  collection,
}: CollectionHeaderProps) {
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);

  const description = CollectionDescription[collection.address];
  if (!description) {
    return null;
  }

  const { data } = useQuery({
    queryKey: ["collection", collectionAddress],
    queryFn: () => getCollection({ collectionAddress }),
    initialData: collection,
    refetchInterval: 15_000,
  });

  if (!data) {
    return null;
  }


  return (
    <div className="hidden lg:block">
      <Collapsible
        className="min-h-[6.875rem] w-full border-b border-border p-5 transition-[height]"
        open={collapsibleOpen}
        onOpenChange={setCollapsibleOpen}
      >
        <div className="flex h-full items-center justify-between gap-0">
          <div className="flex h-[3.875rem] flex-shrink-0 items-center gap-4 transition-[height]">
            {data.image ? (
              <img
                src={data.image}
                className="aspect-square h-full flex-shrink-0 rounded-lg"
                alt={data.name}
              />
            ) : (
              <div className="aspect-square h-full flex-shrink-0 rounded-lg bg-secondary" />
            )}
            <div className="flex h-full flex-shrink-0 flex-col items-start justify-between">
              <div>
                <div className="flex items-center gap-1 text-xl">
                  <p className="text-2xl font-semibold">{collection.name}</p>
                  {collection.is_verified && (
                    <VerifiedIcon className="mt-1 text-primary" />
                  )}
                </div>
              </div>
              <div className="mb-1 flex h-6 items-center gap-2 text-sm text-muted-foreground">
                <CopyButton textToCopy={collectionAddress} />
                <ExternalLink href="/">
                  <XIcon className="h-4" />
                </ExternalLink>
                <ExternalLink href="/">
                  <Discord className="h-4" />
                </ExternalLink>
                <ExternalLink href="/">
                  <Globe className="h-4" />
                </ExternalLink>
                <CollapsibleTrigger asChild>
                  <button
                    className={cn(
                      "ml-1 flex items-center gap-1 hover:text-accent-foreground",
                      focusableStyles,
                    )}
                  >
                    {collapsibleOpen ? "Less Info" : "More Info"}
                    <ChevronDown size={16} />
                  </button>
                </CollapsibleTrigger>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <CollectionHeaderStats collection={collection} />
          </div>
        </div>
        <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <p className="flex items-center gap-2 pt-8">
            Created

            {}
            <span className="text-muted-foreground"> {description.created}</span>
          </p>
          <p className="max-w-lg pt-4 text-sm">
            {}
            {description.description}
          </p>
          <div className="block lg:hidden">
            <CollectionHeaderStats collection={data} />
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
