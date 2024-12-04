import { RpcProvider } from "starknet";
import { env } from "~/env";

export const getL2Rpc = () => {
  return buildRpcProvider(env.NEXT_PUBLIC_RPC_URL);
}

function buildRpcProvider(nodeUrl: string, apiKey?: string): RpcProvider {
  return new RpcProvider({
    nodeUrl: `${nodeUrl}${apiKey ? `?api_key=${apiKey}` : ""}`,
    headers: {
      "Content-Type": "application/json",
    }
  });
}
