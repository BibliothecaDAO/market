import { cn } from "@ark-market/ui";
import { TableCell } from "@ark-market/ui/table";

import type { TokenOffer } from "~/types";

interface FloorDiffProps {
  offer: TokenOffer;
}

export default function OfferFloorDiffCell({ offer }: FloorDiffProps) {
  return (
    <TableCell>
      {offer.floor_difference ? (
        <p
          className={cn(
            "text-sm font-medium",
            offer.floor_difference >= 0 ? "text-green-500" : "text-red-500",
          )}
        >
          {parseFloat(offer.floor_difference).toFixed(2)}%
        </p>
      ) : (
        "_"
      )}
    </TableCell>
  );
}
