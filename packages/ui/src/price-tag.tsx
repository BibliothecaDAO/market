import { formatUnits } from "viem";

import type { PropsWithClassName } from ".";
import { cn, formatUnits } from ".";
import { Ethereum, Lords, Starknet } from "./icons";

export type TokenSymbol = "eth" | "strk" | "lords" | "starknet" | "ethereum";

interface PriceTagProps {
  price: number | bigint | string;
  token?: TokenSymbol;
}

export function PriceTag({
  className,
  price,
  token = "ethereum",
}: PropsWithClassName<PriceTagProps>) {
  if (!price || !currency) {
    return null;
  }

  return (
    <div
      className={cn(
        "inline-flex h-10 items-center gap-1 rounded-xs bg-secondary px-3 font-medium",
        className,
      )}
    >
      <CurrencyLogo token={token} />
      <p className="whitespace-nowrap">
        {formatUnits(price, 18)}
        <span className="text-muted-foreground"> <CurrencySymbol token={token} /></span>
      </p>
    </div>
  );
}

function CurrencySymbol({ token }: { token?: TokenSymbol }) {
  if (token === "lords") {
    return <>LORDS</>;
  }
  if (token === "starknet" || token === "strk") {
    return <>STRK</>;
  }
  return <>ETH</>;
}

function CurrencyLogo({ token }: { token?: TokenSymbol }) {
  if (token === "lords") {
    return <Lords className="size-5" />;
  }
  if (token === "starknet" || token === "strk") {
    return <Starknet className="size-5" />;
  }

  return <Ethereum className="size-5" />;
}
