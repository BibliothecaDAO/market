import { Fragment } from "react";
import Link from "next/link";
import { useAccount } from "@starknet-react/core";

import {
  cn,
  ellipsableStyles,
  focusableStyles,
  timeSince,
} from "@ark-market/ui";
import { VerifiedIcon } from "@ark-market/ui/icons";
import { PriceTag } from "@ark-market/ui/price-tag";
import { Separator } from "@ark-market/ui/separator";

import type { PortfolioActivity } from "~/types";
import Media from "~/components/media";
import activityTypeMetadata from "~/constants/activity-type-metadata";
import ownerOrShortAddress from "~/lib/ownerOrShortAddress";

interface MobilePortfolioActivityProps {
  portfolioActivity: PortfolioActivity[];
}

export default function MobilePortfolioActivity({
  portfolioActivity,
}: MobilePortfolioActivityProps) {
  const { address } = useAccount();

  return (
    <div className="px-5">
      <p className="text-numbers text-sm font-medium text-muted-foreground">
        Event
      </p>
      <Separator className="my-5" />
      {portfolioActivity.map((activity, index) => (
        <Fragment key={index}>
          <div>
            <div className="mb-3 flex items-center gap-2.5">
              {activityTypeMetadata[activity.activity_type].icon}
              <p>{activityTypeMetadata[activity.activity_type].title}</p>
            </div>
            <div className="flex items-center gap-4">
              <Media
                alt={activity.metadata?.name ?? ""}
                height={84}
                width={84}
                src={activity.metadata?.image}
                mediaKey={activity.metadata?.image_key}
                className="size-10 rounded-xs"
              />

              <div className="w-full">
                <div className="flex w-full items-center justify-between">
                  <Link
                    className={cn("text-base font-medium", focusableStyles)}
                    href={`/token/${activity.collection_address}/${activity.token_id}`}
                  >
                    {activity.metadata?.name ?? activity.collection_name}
                  </Link>

                  {activity.price ? (
                    <PriceTag
                      price={activity.price}
                      currency={activity.currency}
                      className="h-7 text-xs"
                    />
                  ) : null}
                </div>

                <Link
                  href={`/collection/${activity.collection_address}`}
                  className={cn(
                    "flex items-center gap-1 text-muted-foreground",
                    focusableStyles,
                  )}
                >
                  <p className={cn("text-sm", ellipsableStyles)}>
                    {activity.collection_name}
                  </p>
                  {activity.collection_is_verified && (
                    <VerifiedIcon className="size-4 flex-shrink-0 text-primary" />
                  )}
                </Link>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between text-sm font-semibold">
              <div className="flex items-center gap-2">
                {activity.from ? (
                  <p>
                    by{" "}
                    <span className="text-muted-foreground">
                      <Link
                        href={`/wallet/${activity.from}`}
                        className="text-muted-foreground"
                      >
                        {ownerOrShortAddress({
                          ownerAddress: activity.from,
                          address,
                        })}
                      </Link>
                    </span>
                  </p>
                ) : null}
                {activity.to ? (
                  <p>
                    for{" "}
                    <span className="text-muted-foreground">
                      <Link
                        href={`/wallet/${activity.to}`}
                        className="text-muted-foreground"
                      >
                        {ownerOrShortAddress({
                          ownerAddress: activity.to,
                          address,
                        })}
                      </Link>
                    </span>
                  </p>
                ) : null}
              </div>
              <p className="text-xs text-muted-foreground">
                {timeSince(activity.time_stamp)}
              </p>
            </div>
          </div>
          <Separator className="my-5" />
        </Fragment>
      ))}
    </div>
  );
}
