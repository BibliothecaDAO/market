"use client";

import type { Connector } from "@starknet-react/core";
import type { PropsWithChildren } from "react";
import { mainnet } from "@starknet-react/chains";
import {
  argent,
  braavos,
  nethermindProvider,
  StarknetConfig,
  useInjectedConnectors,
  voyager,
} from "@starknet-react/core";
import { ArgentMobileConnector } from "starknetkit/argentMobile";
import { WebWalletConnector } from "starknetkit/webwallet";

import { env } from "~/env";
import { getConnectors } from "./connectors";

const { connectors: cartridgeConnectors } = getConnectors();

export function StarknetProvider({ children }: PropsWithChildren) {
  const provider = nethermindProvider({
    apiKey: env.NEXT_PUBLIC_RPC_API_KEY,
  });
  const { connectors: injectedConnectors } = useInjectedConnectors({
    recommended: [argent(), braavos()],
    includeRecommended: "onlyIfNoConnectors",
    order: "alphabetical",
  });

  const connectors = [
    ...cartridgeConnectors,
    ...injectedConnectors,
    new WebWalletConnector({ url: "https://web.argent.xyz" }),
    new ArgentMobileConnector({
      projectId: env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
      dappName: "Realms.World",
      icons: [],
      description: "Realms.World",
    }),
  ] as Connector[];

  return (
    <StarknetConfig
      chains={[mainnet]}
      provider={provider}
      connectors={connectors}
      explorer={voyager}
      autoConnect
    >
      {children}
    </StarknetConfig>
  );
}
