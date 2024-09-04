import LordsLogo from "~/icons/lords.svg";

import usePrices from "~/hooks/usePrices";
import { useTokenBalance } from "~/hooks/useTokenBalance";
import { env } from "~/env";

export default function PortfolioValue() {
  const { convertInUsd, isLoading: isLoadingPrices } = usePrices();
  const { data: lordsBalance } = useTokenBalance({
    token: env.NEXT_PUBLIC_LORDS_TOKEN_ADDRESS,
  });
  const ethBalanceInUsd = convertInUsd({ token: "lords", amount: lordsBalance.value });

  if (isLoadingPrices) {
    return null;
  }

  return (
    <div className="flex rounded-lg py-2 bg-card px-2.5">
      <div className="flex items-center gap-1">
        <div className="flex flex-col">
          <p className="text-sm text-secondary-foreground">Portfolio value</p>
          <p className="flex items-center text-md font-semibold space-x-1.5">
            <LordsLogo className="size-5" />
            <div className="text-xl">
              {lordsBalance.rounded}{" "}
              <span className="text-secondary-foreground">LORDS</span>
            </div>
          </p>
        </div>
      </div>

      <div className="ml-10 hidden items-end sm:flex">
        <span className="text-muted-foreground">${ethBalanceInUsd}</span>
      </div>
    </div>
  );
}
