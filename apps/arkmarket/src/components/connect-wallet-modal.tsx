
import Image from "next/image";
import type { Connector } from "@starknet-react/core";
import type { PropsWithChildren } from "react";
import { useCallback, useMemo, useState } from "react";
import { argent, useConnect } from "@starknet-react/core";

import { Button } from "@ark-market/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ark-market/ui/dialog";
import { ConnectWallet, Loader2, Mail } from "@ark-market/ui/icons";
import { Separator } from "@ark-market/ui/separator";

import { env } from "~/env";

const walletIdToName = new Map([
  ["argentX", "Argent X"],
  ["braavos", "Braavos"],
  ["argentWebWallet", "Email"],
  ["argentMobile", "Argent mobile"],
]);

const backgroundImageStyle = {
  backgroundImage: `url(/pink_crown.gif)`,
  backgroundPosition: "top",
  backgroundRepeat: "repeat-y",
  backgroundOpacity: 0.1,
};

export default function ConnectWalletModal({ children }: PropsWithChildren) {
  const { connectors, connectAsync } = useConnect();
  const [modalEnabled, setModalEnabled] = useState(false);
  const regularConnectors = useMemo(
    () => connectors.filter((connector) => connector.id !== "argentWebWallet"),
    [connectors],
  );

  const webWalletConnector = useMemo(
    () => connectors.find((connector) => connector.id === "argentWebWallet"),
    [connectors],
  );

  const [pendingConnectorId, setPendingConnectorId] = useState<
    string | undefined
  >(undefined);

  const connect = useCallback(async (connector: Connector) => {
    setModalEnabled(false)
    setPendingConnectorId(connector.id);
    try {
      await connectAsync({ connector });
    } catch (error) {
      setModalEnabled(true);
      console.error(error);
    }
    setPendingConnectorId(undefined);
  }, [connectAsync]);

  function isWalletConnecting(connectorId: string) {
    return pendingConnectorId === connectorId;
  }

  return (
    <Dialog modal={modalEnabled} onOpenChange={setModalEnabled}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="my-auto sm:max-w-[26.25rem]">
        <DialogHeader>
          <div style={backgroundImageStyle} className="mx-auto mb-3 mt-3 size-20 rounded-full bg-secondary">
            <Image
              alt="profile image"
              width={16}
              height={16}
              src="/pink_crown.gif"
              className="size-20 rounded-full"
            />
          </div>
          <DialogTitle className="mx-auto text-xl font-semibold">
            Connect to Realms.World Market
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 flex flex-col gap-3.5">
          {regularConnectors.map((connector) => {
            const isArgentMobile = connector.id === "argentMobile";
            return (
              <Button
                key={connector.id}
                onClick={() => connect(connector)}
                variant="secondary"
                className="relative"
                size="xl"
              >
                <div className="absolute left-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-xs bg-background">
                  <img
                    src={
                      isArgentMobile ? argent().icon.dark : connector.icon.dark
                    }
                    className="size-5"
                    alt={`${connector.name}`}
                  />
                </div>
                {walletIdToName.get(connector.id) ?? connector.name}
                {isWalletConnecting(connector.id) && (
                  <Loader2
                    className="absolute right-2.5 top-3 animate-spin"
                    size={24}
                  />
                )}
              </Button>
            );
          })}
          {webWalletConnector !== undefined && (
            <>
              <div className="flex w-full items-center justify-between gap-3">
                <Separator className="w-24" />
                <p className="flex-shrink-0 font-medium">Or continue with</p>
                <Separator className="w-24" />
              </div>
              <Button
                onClick={() => connect(webWalletConnector)}
                variant="secondary"
                className="relative h-14"
                size="xl"
              >
                <div className="absolute left-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-xs bg-background">
                  <Mail className="size-5" />
                </div>
                <div>
                  <p>
                    {walletIdToName.get(webWalletConnector.id) ??
                      webWalletConnector.name}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Powered by Argent
                  </p>
                </div>
                {isWalletConnecting(webWalletConnector.id) && (
                  <Loader2
                    className="absolute right-2.5 top-4 animate-spin"
                    size={24}
                  />
                )}
              </Button>
            </>
          )}

          <p className="text-sm text-muted-foreground">
            By using RealmsWorld marketplace, you agree to our Terms of Service and
            our Privacy Policy.
          </p>
        </div>
      </DialogContent>
    </Dialog >
  );
}
