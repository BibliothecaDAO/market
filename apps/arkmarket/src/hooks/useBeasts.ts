import { useMemo } from "react";
import { ChainId, CollectionAddresses, Collections } from "~/config/homepage";
import type { CollectionToken, Token } from "~/types";
import magicalIcon from "~/../public/beasts/types/magical.svg";
import hunterIcon from "~/../public/beasts/types/hunter.svg";
import bruteIcon from "~/../public/beasts/types/brute.svg";
import type { WalletToken } from "~/app/wallet/[walletAddress]/queries/getWalletData";

export interface BeastAttributes {
  prefix: string | number;
  suffix: string | number;
  name: string;
  type: string;
  health: number;
  level: number;
  tier: number;
}

const typeIcons = {
  magical: magicalIcon,
  hunter: hunterIcon,
  brute: bruteIcon,
};

export function useBeasts(token: CollectionToken | Token | WalletToken) {
  const formatBeastName = (attributes: BeastAttributes): string => {
    if (attributes.prefix === 0 && attributes.suffix === 0) {
      return attributes.name;
    }
    return `'${attributes.prefix} ${attributes.suffix}' ${attributes.name}`
  };

  const isBeast = (collectionAddress: string) => collectionAddress === CollectionAddresses[Collections.BEASTS][ChainId.SN_MAIN];

  const attributes: BeastAttributes = useMemo(() => {
    if (null === token.metadata?.attributes) {
      return {};
    }

    return token.metadata?.attributes.reduce((acc, attr) => {
      acc[attr.trait_type] = isNaN(attr.value) ? attr.value : Number(attr.value);
      return acc;
    }, {});
  }, [token]);

  const beastTypeIcon = (icon: keyof typeof typeIcons) => {
    return typeIcons[icon];
  }

  return {
    formatBeastName,
    isBeast,
    beastTypeIcon,
    attributes,
  };
}
