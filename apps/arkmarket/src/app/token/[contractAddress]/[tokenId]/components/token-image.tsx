import type { PropsWithClassName } from "@ark-market/ui";
import Media from "~/components/media";
import { useBeasts } from "~/hooks/useBeasts";
import type { Resources } from "~/hooks/useSeasonPass";
import { useSeasonPass } from "~/hooks/useSeasonPass";
import type { Token } from "~/types";

interface TokenSummaryProps {
  token: Token;
}

export function TokenImage({ token }: PropsWithClassName<TokenSummaryProps>) {
  const { attributes, isBeast, beastTypeIcon, formatBeastName } = useBeasts(token);
  const { isSeasonPass, realmsResources } = useSeasonPass(token);

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

  if (isSeasonPass(token.collection_address)) {
    return (
      <div className="aspect-square w-full object-contain p-3 pt-4">
        <Media
          src={token.metadata?.image}
          mediaKey={token.metadata?.image_key}
          thumbnailKey={token.metadata?.image_key_540_540}
          alt={token.metadata?.name ?? "Empty"}
          className="aspect-square w-full object-contain transition-transform group-hover:scale-110"
        />
        <div className="flex flex-row flex-wrap gap-2 mt-4">
          {realmsResources.map((r, idx) => <RealmsResourceItem key={idx} resource={r} />)}
        </div>
      </div>
    )
  }

  return (
    <Media
      src={token.metadata?.animation_url ?? token.metadata?.image}
      mediaKey={token.metadata?.image_key}
      alt={
        token.metadata?.name ?? `${token.collection_name} #${token.token_id}`
      }
      className="aspect-square w-full rounded-lg object-contain"
      height={1000}
      width={1000}
      priority
    />
  );
}

function RealmsResourceItem({ resource }: { resource: Resources }) {
  return (
    <div className="flex items-center">
      <Media src={resource.img} height={25} width={25} alt={resource.description} />
      <span className="pl-2">{resource.trait}</span>
    </div>
  )
}
