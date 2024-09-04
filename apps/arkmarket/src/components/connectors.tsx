import CartridgeConnector from "@cartridge/connector";
import type { Connector } from "@starknet-react/core";
import { env } from "~/env";

export const getConnectors = (): { connectors: Connector[] } => {
  // const paymaster: any = { caller: "0x414e595f43414c4c4552" };
  //   const options: any = { theme: "paved", paymaster };
  const cartridge = new CartridgeConnector({
    rpc: env.NEXT_PUBLIC_RPC_URL + "?apikey=" + env.NEXT_PUBLIC_RPC_API_KEY,
  }) as never as Connector;
  return { connectors: [cartridge] };
};
