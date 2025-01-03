import type { PropsWithClassName } from "@ark-market/ui";
import type { WalletToken } from "~/app/wallet/[walletAddress]/queries/getWalletData";
import Media from "~/components/media";
import { useBeasts } from "~/hooks/useBeasts";
import type { CollectionToken } from "~/types";

interface CollectionTokenImageProps {
  token: CollectionToken | WalletToken;
  height?: number;
  width?: number;
}


export function CollectionTokenImage({ token, height, width }: PropsWithClassName<CollectionTokenImageProps>) {
  const { attributes, isBeast, beastTypeIcon, formatBeastName } = useBeasts(token);

  if (isBeast(token.collection_address)) {
    const TypeIcon = beastTypeIcon(attributes.type.toLowerCase() as keyof typeof beastTypeIcon);
    return (
      <div className="aspect-square w-full rounded-lg object-contain border border-foreground p-3 pt-4">
        <div className="flex justify-between pb-6">
          <div className=""><TypeIcon className="fill-foreground" /></div>
          <div># <strong>{token.token_id}</strong></div>
          <div className="">{attributes.health} HP</div>
        </div>

        <Media
          src={token.metadata?.image}
          mediaKey={token.metadata?.image_key}
          alt={
            token.metadata?.name ?? `${token.collection_name} #${token.token_id}`
          }
          className="aspect-square w-full rounded-lg object-contain"
          priority
        />
        <div className="flex flex-col gap-1 items-center justify-center py-6 overflow-hidden">
          <div className="whitespace-nowrap text-ellipsis overflow-hidden">{formatBeastName(attributes)}</div>
          <div className="text-sm">Lvl {attributes.level}</div>
        </div>
      </div>
    )
  }

  return (
    <Media
      src={token.metadata?.image}
      mediaKey={token.metadata?.image_key}
      thumbnailKey={token.metadata?.image_key_540_540}
      alt={token.metadata?.name ?? "Empty"}
      className="aspect-square w-full object-contain transition-transform group-hover:scale-110"
      height={height}
      width={width}
    />
  );
}
