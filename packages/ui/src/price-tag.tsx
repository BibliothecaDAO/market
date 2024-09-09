import type { PropsWithClassName } from ".";
import { cn, formatUnits } from ".";
import { Ethereum, Lords } from "./icons";

interface PriceTagProps {
  price: number | bigint | string;
  token?: "ethereum" | "starknet" | "lords";
}
export function PriceTag({
  className,
  price,
  token = "ethereum",
}: PropsWithClassName<PriceTagProps>) {
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
