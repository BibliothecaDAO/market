"use client";

import { useMemo, useState } from "react";
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

import type { ViewType } from "../../../../components/view-type-toggle-group";
import type {
  CollectionSortBy,
  CollectionSortDirection,
  CollectionTokensApiResponse,
} from "~/lib/getCollectionTokens";
import type { CollectionToken, Filters } from "~/types";
import useInfiniteWindowScroll from "~/hooks/useInfiniteWindowScroll";
import { getCollectionTokens } from "~/lib/getCollectionTokens";
import CollectionItemsDataGridView from "./collection-items-data-grid-view";
import CollectionItemsDataListView from "./collection-items-data-list-view";

interface CollectionItemsDataProps {
  collectionAddress: string;
  sortBy: CollectionSortBy;
  sortDirection: CollectionSortDirection;
  viewType: ViewType;
  filters: Filters;
  buyNow: boolean;
}

export default function CollectionItemsData({
  collectionAddress,
  sortBy,
  sortDirection,
  viewType,
  filters,
  buyNow,
}: CollectionItemsDataProps) {
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: [
      "collectionTokens",
      sortDirection,
      sortBy,
      collectionAddress,
      filters,
      buyNow,
    ],
    refetchInterval: 10_000,
    getNextPageParam: (lastPage: CollectionTokensApiResponse) =>
      lastPage.next_page,
    initialPageParam: undefined as number | undefined,
    queryFn: ({ pageParam }) =>
      getCollectionTokens({
        collectionAddress,
        page: pageParam,
        sortDirection,
        sortBy,
        filters,
        buyNow,
      }),
  });

  useInfiniteWindowScroll({
    fetchNextPage,
    hasNextPage: !!hasNextPage,
    isFetchingNextPage,
  });

  const collectionTokens: CollectionToken[] = useMemo(
    () => infiniteData.pages.flatMap((page) => page.data),
    [infiniteData],
  );
  // FIX: we hide token 861 because it was listed out in another currency than lords.
  // Becase we force the use of lords it causes a bug where nobody can buy it
  // To fix, we need to have the field `currency_address` supported for listing
  const collectionTokensFiltered = useMemo(() => collectionTokens.filter((token) => !(token.token_id === "861" && token.collection_address === "0x00539f522b29ae9251dbf7443c7a950cf260372e69efab3710a11bf17a9599f1"), [collectionTokens]));

  return (
    <>
      {viewType === "list" ? (
        <CollectionItemsDataListView collectionTokens={collectionTokensFiltered} />
      ) : (
        <CollectionItemsDataGridView
          className="mb-6"
          collectionTokens={collectionTokensFiltered}
          viewType={viewType}
        />
      )}
    </>
  );
}
