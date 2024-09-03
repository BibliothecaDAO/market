import Link from "next/link";
import { useAccount } from "@starknet-react/core";

import { timeSince } from "@ark-market/ui";
import { NoActivity } from "@ark-market/ui/icons";
import { PriceTag } from "@ark-market/ui/price-tag";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ark-market/ui/table";

import type { TokenActivity } from "~/types";
import activityTypeMetadata from "~/constants/activity-type-metadata";
import ownerOrShortAddress from "~/lib/ownerOrShortAddress";

interface DesktopTokenActivityProps {
  tokenActivity: TokenActivity[];
}

export default function DesktopTokenActivity({
  tokenActivity,
}: DesktopTokenActivityProps) {
  const { address } = useAccount();

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-background">
            <TableHead className="pl-5">Event</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead className="text-end">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-sm font-medium font-numbers">
          {tokenActivity.map((activity, index) => {
            const activityItem = activityTypeToItem.get(activity.activity_type);

            return (
              <TableRow className="group h-[4.6875rem]" key={index}>
                <TableCell className="pl-5 transition-colors group-hover:text-muted-foreground">
                  <div className="flex items-center gap-4 whitespace-nowrap">
                    {activityItem?.icon}
                    <p>{activityItem?.title}</p>
                  </div>
                </TableCell>
                <TableCell>
                  {activity.price !== null ? (
                    <PriceTag price={activity.price} token="lords" />
                  ) : (
                    "_"
                  )}
                </TableCell>
                <TableCell>
                  {activity.from ? (
                    <Link href={`/wallet/${activity.from}`}>
                      {ownerOrShortAddress({
                        ownerAddress: activity.from,
                        address,
                      })}
                    </Link>
                  ) : (
                    "_"
                  )}
                </TableCell>
                <TableCell>
                  {activity.to ? (
                    <Link href={`/wallet/${activity.to}`}>
                      {ownerOrShortAddress({
                        ownerAddress: activity.to,
                        address,
                      })}
                    </Link>
                  ) : (
                    "_"
                  )}
                </TableCell>
                <TableCell className="text-end">
                  {timeSince(activity.time_stamp)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {tokenActivity.length === 0 && (
        <div className="flex flex-col items-center gap-3 pt-8 text-muted-foreground">
          <NoActivity size={42} />
          <p className="text-xl font-semibold">No activity yet!</p>
        </div>
      )}
    </>
  );
}
