"use client";

import { useRef } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";

import { cn, ellipsableStyles, formatUnits } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import LordsLogo from "~/icons/lords.svg";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ark-market/ui/table";

import type { CollectionToken } from "~/types";
import Media from "~/components/media";
import { PriceTag } from "@ark-market/ui/price-tag";
import Link from "next/link";

const gridTemplateColumnValue =
  "grid-cols-[minmax(10rem,2fr)_repeat(5,minmax(7.25rem,1fr))]";

interface CollectionItemsDataListViewProps {
  collectionTokens: CollectionToken[];
}

export default function CollectionItemsDataListView({
  collectionTokens,
}: CollectionItemsDataListViewProps) {
  const tableRef = useRef<HTMLTableElement | null>(null);

  const rowVirtualizer = useWindowVirtualizer({
    // Approximate initial rect for SSR
    initialRect: { height: 1080, width: 1920 },
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    count: collectionTokens.length ?? 0,
    estimateSize: () => 75, // Estimation of row height for accurate scrollbar dragging
    // Measure dynamic row height, except in firefox because it measures table border height incorrectly
    measureElement:
      typeof window !== "undefined" && !navigator.userAgent.includes("Firefox")
        ? (element) => element.getBoundingClientRect().height
        : undefined,
    overscan: 5,
    scrollMargin: tableRef.current?.offsetTop ?? 0,
  });

  return (
    <Table ref={tableRef} className="w-full min-w-[1024px] table-auto">
      <TableHeader className="sticky top-0 h-10 bg-green-500/20">
        <TableRow className="flex">
          <TableHead className="sticky left-0 top-0 flex min-w-[240px] flex-grow items-center bg-background pl-5">
            Item
          </TableHead>
          <TableHead className="flex w-[25%] items-center bg-background">
            Current price
          </TableHead>
          <TableHead className="flex w-[20%] items-center bg-background">
            Last sold
          </TableHead>
          <TableHead className="flex w-[15%] items-center bg-background">
            Floor difference
          </TableHead>
          <TableHead className="flex w-[10%] items-center bg-background">
            Owner
          </TableHead>
          <TableHead className="flex w-[10%] items-center bg-background">
            Time listed
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody
        className="font-numbers relative block font-medium"
        style={{
          height: `${rowVirtualizer.getTotalSize() + 2}px`, // Tells scrollbar how big the table is
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const token = collectionTokens[virtualRow.index];

          if (!token) {
            return null;
          }

          return (
            <TableRow
              data-index={virtualRow.index}
              key={`${token.collection_address}-${token.token_id}`}
              ref={(node) => rowVirtualizer.measureElement(node)}
              className="group absolute flex w-full items-center"
              style={{
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <Link
                prefetch={false}
                href={`/token/${token.collection_address}/${token.token_id}`}
                className={cn(
                  "grid h-full w-full items-center",
                  gridTemplateColumnValue,
                )}
              >
                <TableCell className="pl-5">
                  <div className="flex items-center gap-4">
                    <Media
                      src={token.metadata?.image}
                      mediaKey={token.metadata?.image_key}
                      alt={token.metadata?.name ?? "Empty NFT"}
                      className="h-[2.625rem] w-[2.625rem] rounded-md object-contain"
                      height={94}
                      width={94}
                    />
                    <p className={cn("w-full", ellipsableStyles)}>
                      {token.metadata?.name ?? token.token_id}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  {token.price ? (
                    <PriceTag price={token.price} token="lords" />
                  ) : (
                    "_"
                  )}
                </TableCell>
                <TableCell>
                  {token.last_price ? (
                    <div className="flex items-center">
                      <LordsLogo className="size-4" />
                      <p>
                        {formatUnits(token.last_price, 18)}{" "}
                        <span className="text-muted-foreground">LORDS</span>
                      </p>
                    </div>
                  ) : (
                    "_"
                  )}
                </TableCell>
                <TableCell>_</TableCell>
                <TableCell>
                  <Button asChild variant="link" className="px-0" size="xl">
                    <Link href={`/wallet/${token.owner}`}>
                      {token.owner ? `${token.owner.slice(0, 6)}...` : "_"}
                    </Link>
                  </Button>
                </TableCell>
                <TableCell>_</TableCell>
              </Link>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
