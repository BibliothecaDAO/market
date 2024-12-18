"use client";

import { useMemo, useRef } from "react";

import type { PropsWithClassName } from "@ark-market/ui";
import { cn } from "@ark-market/ui";

import useInfiniteWindowScroll from "~/hooks/useInfiniteWindowScroll";
import DesktopTokenActivity from "./desktop-token-activity";
import MobileTokenActivity from "./mobile-token-activity";
import useTokenActivity from "~/hooks/useTokenActivity";

interface TokenActivityProps {
  contractAddress: string;
  tokenId: string;
}

export default function TokenActivity({
  className,
  contractAddress,
  tokenId,
}: PropsWithClassName<TokenActivityProps>) {
  const tableContainerRef = useRef<HTMLTableElement | null>(null);
  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTokenActivity({ contractAddress, tokenId })

  const totalCount = infiniteData?.pages[0]?.count ?? 0;
  const tokenActivity = useMemo(
    () => infiniteData?.pages.flatMap((page) => page.data) ?? [],
    [infiniteData],
  );

  useInfiniteWindowScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });

  return (
    <div className={cn("", className)}>
      <div className="flex items-center gap-4 lg:gap-1.5">
        <h2 className="font-display text-2xl font-semibold">Activity</h2>
        <div className="flex h-6 items-center rounded-full bg-secondary px-3 text-sm font-medium text-secondary-foreground">
          {totalCount}
        </div>
      </div>

      <div className="mt-6 lg:mt-12" ref={tableContainerRef}>
        <div className="hidden lg:block">
          <DesktopTokenActivity tokenActivity={tokenActivity} />
        </div>
        <div className="lg:hidden">
          <MobileTokenActivity tokenActivity={tokenActivity} />
        </div>
      </div>
    </div>
  );
}
