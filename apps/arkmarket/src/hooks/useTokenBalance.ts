import { getL2Rpc } from "~/lib/rpc";
import { useAccount } from "@starknet-react/core";
import { useEffect, useState } from "react";
import { BlockTag } from "starknet";

const LORDS_DECIMALS = 18;
interface UseTokenBalance {
  data: Balance;
  isLoading: boolean;
}
interface Balance {
  value: bigint;
  formatted: string;
  rounded: string;
}

function formatLords(value: string) {
  return parseInt(value, 16) / Math.pow(10, LORDS_DECIMALS);
}

// Converts a string hex amount to a decimal number
// - currency_address: string address of the currency
// - radix: radix of the amount
export function useTokenBalance({ token: currency_address, radix = 16 }: { token: string, radix?: number }): UseTokenBalance {
  const { address } = useAccount();
  const [balance, setBalance] = useState<Balance>({ value: BigInt(0), formatted: "0.0", rounded: "0.0" });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function fetchPrice() {
      const rpcProvider = getL2Rpc();

      const res = await rpcProvider.callContract({
        contractAddress: currency_address,
        entrypoint: "balance_of",
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        calldata: [address!],
      }, BlockTag.LATEST)
      // if there's an error we use de default decimals of 18 : 0x12 in hex
      const balance = res[0] ?? "0x0";
      setBalance({
        value: BigInt(balance),
        formatted: formatLords(balance).toFixed(4),
        rounded: formatLords(balance).toFixed(4),
      })
      setIsLoading(false);
    }

    fetchPrice().catch(console.error)

  }, [currency_address, address, radix]);

  return { data: balance, isLoading };
}
