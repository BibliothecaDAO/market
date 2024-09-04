import { RpcProvider } from "starknet";
import { env } from "~/env";

export const getL2Rpc = () => {
  return buildRpcProvider(env.NEXT_PUBLIC_RPC_URL);
}

function buildRpcProvider(nodeUrl: string): RpcProvider {
  return new RpcProvider({
    nodeUrl: `${nodeUrl}?apikey=${env.NEXT_PUBLIC_RPC_API_KEY}`,
    headers: {
      "Content-Type": "application/json",
    }
  });
}
