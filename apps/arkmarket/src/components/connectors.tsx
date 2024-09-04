import CartridgeConnector from "@cartridge/connector";
import { Connector } from "@starknet-react/core";

export const getConnectors = (): { connectors: Connector[] } => {
  const paymaster: any = { caller: "0x414e595f43414c4c4552" };
  //   const options: any = { theme: "paved", paymaster };
  const cartridge = new CartridgeConnector({
    rpc: process.env.NEXT_PUBLIC_RPC_URL,
  }) as never as Connector;
  return { connectors: [cartridge] };
};
