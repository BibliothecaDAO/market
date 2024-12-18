import type { TokenMetadata } from "~/types";
import Media from "~/components/media";
import usePrices from "~/hooks/usePrices";

interface ToastExecutedTransactionContentProps {
  collectionName: string;
  formattedPrice: string;
  price: bigint;
  tokenId: string;
  tokenMetadata?: TokenMetadata;
}

export default function ToastExecutedTransactionContent({
  collectionName,
  formattedPrice,
  price,
  tokenId,
  tokenMetadata,
}: ToastExecutedTransactionContentProps) {
  const { convertInUsd } = usePrices();
  const priceInUsd = convertInUsd({ token: "lords", amount: price });

  return (
    <div className="mt-5 flex flex-col gap-2">
      <div className="font-numbers flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Media
            src={tokenMetadata?.animation_url ?? tokenMetadata?.image}
            alt={tokenMetadata?.name ?? `${collectionName} #${tokenId}`}
            mediaKey={tokenMetadata?.image_key}
            height={84}
            width={84}
            className="size-10 rounded-xs object-contain"
          />
          <p className="text-base font-medium">
            {tokenMetadata?.name ?? `${collectionName} #${tokenId}`}
          </p>
        </div>
        <div className="text-end">
          <p className="font-medium">{formattedPrice} LORDS</p>
          <p className="text-xs font-medium">${priceInUsd}</p>
        </div>
      </div>
    </div>
  );
}
