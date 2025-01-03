"use client";

import { useMemo, useState } from "react";
import { useAccount } from "@starknet-react/core";
import { parseAsArrayOf, parseAsStringLiteral, useQueryState } from "nuqs";
import { validateAndParseAddress } from "starknet";

import type { ViewType } from "~/components/view-type-toggle-group";
import CollectionActivityFiltersModal from "~/app/collection/[collectionAddress]/components/collection-activity-filters-modal";
import CollectionActivityFiltersToggle from "~/app/collection/[collectionAddress]/components/collection-activity-filters-toggle";
import { portfolioOffersTypeValues } from "~/lib/getPortfolioOffers";
import { activityTypes } from "~/types";
import {
  walletCollectionFilterKey,
  walletCollectionFilterParser,
} from "../search-params";
import PortfolioActivityData from "./portfolio-activity-data";
import PortfolioActivityFiltersPanel from "./portfolio-activity-filters-panel";
import PortfolioHeader from "./portfolio-header";
import PortfolioItemsData from "./portfolio-items-data";
import PortfolioItemsFiltersPanel from "./portfolio-items-filters-panel";
import PortfolioItemsToolsBar from "./portfolio-items-tools-bar";
import PortfolioOffersData from "./portfolio-offers-data";
import PortfolioOffersFiltersPanel from "./portfolio-offers-filters-panel";
import PortfolioOffersMobileFilters from "./portfolio-offers-mobile-filters";
import PortfolioTabs, { portfolioTabsValues } from "./portfolio-tabs";
import useWalletTokens from "~/hooks/useWalletTokens";

interface PortfolioProps {
  walletAddress: string;
  // walletCollectionsInitialData: WalletCollectionsApiResponse;
  // walletTokensInitialData: WalletTokensApiResponse;
}

export default function Portfolio({
  walletAddress,
  // walletCollectionsInitialData,
  // walletTokensInitialData,
}: PortfolioProps) {
  const [itemsFiltersOpen, setItemsFiltersOpen] = useState(false);
  // TODO @YohanTz: Choose between local storage and URL query param
  const [viewType, setViewType] = useState<ViewType>("large-grid");
  const [selectedTab, setSelectedTab] = useQueryState(
    "activeTab",
    parseAsStringLiteral(portfolioTabsValues).withDefault("items"),
  );

  const [offerType, setOfferType] = useQueryState(
    "offerType",
    parseAsStringLiteral(portfolioOffersTypeValues).withDefault("made"),
  );

  const [activityFilters, setActivityFilters] = useQueryState(
    "filters",
    parseAsArrayOf(parseAsStringLiteral(activityTypes)).withDefault([]),
  );

  const [filtersPanelOpen, setFiltersPanelOpen] = useState(false);
  const [filtersModalOpen, setFiltersModalOpen] = useState(false);

  const toggleFiltersPanel = () => setFiltersPanelOpen((open) => !open);
  const toggleFiltersModal = () => setFiltersModalOpen((open) => !open);

  const { address } = useAccount();

  const [collectionFilter, _] = useQueryState(
    walletCollectionFilterKey,
    walletCollectionFilterParser,
  );

  const isOwner =
    address !== undefined &&
    validateAndParseAddress(address) === validateAndParseAddress(walletAddress);

  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useWalletTokens({ collectionFilter, walletAddress })
  const portoflioItemsCount = infiniteData?.pages[0]?.token_count ?? 0;

  const walletTokens = useMemo(
    () => infiniteData?.pages.flatMap((page) => page.data) ?? [],
    [infiniteData],
  );

  return (
    <main className="flex">
      {selectedTab === "items" && (
        <PortfolioItemsFiltersPanel
          walletAddress={walletAddress}
          filtersOpen={itemsFiltersOpen}
          className="sticky top-[var(--site-header-height)] hidden h-[calc(100vh-var(--site-header-height)-var(--site-footer-height))] sm:block"
        // walletCollectionsInitialData={walletCollectionsInitialData}
        />
      )}
      {selectedTab === "offers" && (
        <PortfolioOffersFiltersPanel
          className="sticky top-[var(--site-header-height)] hidden h-[calc(100vh-var(--site-header-height)-var(--site-footer-height))] lg:block"
          value={offerType}
          onValueChange={setOfferType}
        // walletCollectionsInitialData={walletCollectionsInitialData}
        />
      )}
      {selectedTab === "activity" && (
        <>
          <PortfolioActivityFiltersPanel
            filters={activityFilters}
            open={filtersPanelOpen}
            setFilters={setActivityFilters}
          />
          <CollectionActivityFiltersModal
            open={filtersModalOpen}
            setOpen={setFiltersModalOpen}
            filters={activityFilters}
            setFilters={setActivityFilters}
          />
        </>
      )}
      <div className="flex-1">
        <PortfolioHeader walletAddress={walletAddress} />
        <div className="w-full">
          <div className="sticky top-[var(--site-header-height)] z-10 mb-6 border-b border-border bg-background px-5 pb-5 pt-5 sm:pt-4 lg:mb-0 lg:border-none">
            <PortfolioTabs
              isOwner={isOwner}
              value={selectedTab}
              onValueChange={setSelectedTab}
              portfolioItemsCount={portoflioItemsCount}
            />
            {selectedTab === "items" && (
              <PortfolioItemsToolsBar
                filtersOpen={itemsFiltersOpen}
                walletAddress={walletAddress}
                // walletCollectionsInitialData={walletCollectionsInitialData}
                toggleFiltersOpen={() =>
                  setItemsFiltersOpen((previous) => !previous)
                }
                setViewType={setViewType}
                viewType={viewType}
              />
            )}
            {selectedTab === "offers" && (
              <>
                <div className="pb-2.5 pt-6 lg:hidden">
                  <PortfolioOffersMobileFilters
                    value={offerType}
                    onValueChange={setOfferType}
                  />
                </div>
              </>
            )}
            {selectedTab === "activity" && (
              <div className="pt-5">
                <div className="hidden md:block">
                  <CollectionActivityFiltersToggle
                    open={filtersPanelOpen}
                    toggleOpen={toggleFiltersPanel}
                    filtersCount={activityFilters.length}
                  />
                </div>
                <div className="md:hidden">
                  <CollectionActivityFiltersToggle
                    open={filtersModalOpen}
                    toggleOpen={toggleFiltersModal}
                    filtersCount={activityFilters.length}
                  />
                </div>
              </div>
            )}
          </div>
          {selectedTab === "items" && (
            <PortfolioItemsData
              viewType={viewType}
              walletTokens={walletTokens}
              collectionFilter={collectionFilter}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              isOwner={isOwner}
            />
          )}
          {selectedTab === "offers" && (
            <PortfolioOffersData
              walletAddress={walletAddress}
              offerType={offerType}
              isOwner={isOwner}
            />
          )}
          {selectedTab === "activity" && (
            <PortfolioActivityData
              walletAddress={walletAddress}
              activityFilters={activityFilters}
            />
          )}
        </div>
      </div>
    </main>
  );
}
