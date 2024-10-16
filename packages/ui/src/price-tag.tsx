import type { PropsWithClassName } from ".";
import { cn, formatUnits } from ".";
import { Ethereum, Lords } from "./icons";

import LordsLogo from "./svg/lords.svg";
interface PriceTagProps {
  price: number | bigint | string;
  token?: "ethereum" | "starknet" | "lords";
}

function CurrencyIcon({ symbol }: { symbol: string }) {
  switch (symbol) {
    case "STRK":
      return <Starknet className="size-5" />;
    case "ETH":
      return <Ethereum className="size-5" />;
    default:
      return null;
  }
}

export function PriceTag({
  className,
  price,
  token = "ethereum",
}: PropsWithClassName<PriceTagProps>) {
  if (!price) {
    return null;
  }

  const parsedPrice = parseFloat(formatUnits(price, 18));

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
function CurrencySymbol({ token }: { token?: "ethereum" | "starknet" | "lords" }) {
  if (token === "lords") {
    return <>LORDS</>;
  }
  return <>ETH</>;
}

function CurrencyLogo({ token }: { token?: "ethereum" | "starknet" | "lords" }) {
  if (token === "lords") {
    return <Lords className="size-5" />;
  }

  return <Ethereum className="size-5" />;
}
