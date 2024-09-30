import Link from "next/link";
import type { CollectionToken } from "~/types";
import { TableCell } from "@ark-market/ui/table";

interface TokenOwnerCellProps {
  token: CollectionToken;
}

export default function TokenOwnerCell({ token }: TokenOwnerCellProps) {
  return (
    <TableCell className="flex w-[10%] whitespace-nowrap">
      {token.owner ? (
        <Link href={`/wallet/${token.owner}`} className="hover:text-primary">
          {token.owner.slice(0, 6)}
        </Link>
      ) : (
        "_"
      )}
    </TableCell>
  );
}
