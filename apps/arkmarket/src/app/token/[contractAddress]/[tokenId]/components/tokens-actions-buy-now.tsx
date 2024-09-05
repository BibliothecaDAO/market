"use client";

import { useEffect, useState } from "react";
import { useFulfillListing } from "@ark-project/react";
import { useAccount } from "@starknet-react/core";
import { formatEther } from "viem";

import { areAddressesEqual, cn } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import { Dialog, DialogContent } from "@ark-market/ui/dialog";
import { ActivityList, LoaderCircle, NoListing } from "@ark-market/ui/icons";
import { toast as sonner } from "@ark-market/ui/sonner";
import { useToast } from "@ark-market/ui/use-toast";

import type { Token, TokenMarketData } from "~/types";
import { env } from "~/env";
import useConnectWallet from "~/hooks/useConnectWallet";
import ToastExecutedTransactionContent from "./toast-executed-transaction-content";
import ToastRejectedTransactionContent from "./toast-rejected-transaction-content";
import TokenActionsTokenOverview from "./token-actions-token-overview";
import { useTokenBalance } from "~/hooks/useTokenBalance";

interface TokenActionsBuyNowProps {
  token: Token;
  tokenMarketData: TokenMarketData;
  small?: boolean;
}

export default function TokenActionsBuyNow({
  token,
  tokenMarketData,
  small,
}: TokenActionsBuyNowProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalEnabled, setModalEnabled] = useState(true);
  const { fulfillListing, status } = useFulfillListing();
  const { address, account } = useAccount();
  const isOwner = areAddressesEqual(tokenMarketData.owner, address);
  const { data } = useTokenBalance({ token: env.NEXT_PUBLIC_LORDS_TOKEN_ADDRESS });
  const { toast } = useToast();

  const buy = async () => {
    if (
      !data ||
      data.value < BigInt(tokenMarketData.listing.start_amount ?? 0)
    ) {
      sonner.error("Insufficient balance");
      return;
    }
    setModalEnabled(false);

    setIsOpen(true);

    await fulfillListing({
      starknetAccount: account,
      brokerId: env.NEXT_PUBLIC_BROKER_ID,
      tokenAddress: token.collection_address,
      tokenId: token.token_id,
      orderHash: tokenMarketData.listing.order_hash,
      startAmount: tokenMarketData.listing.start_amount,
      currencyAddress: env.NEXT_PUBLIC_LORDS_TOKEN_ADDRESS,
    });
    setModalEnabled(true)
  };

  const { ensureConnect } = useConnectWallet({
    account,
    onConnect: () => {
      void buy();
    },
  });

  useEffect(() => {
    if (status === "error") {
      setIsOpen(false);
      toast({
        variant: "canceled",
        title: "Purchase canceled",
        additionalContent: (
          <ToastRejectedTransactionContent
            price={BigInt(tokenMarketData.listing.start_amount ?? 0)}
            formattedPrice={formatEther(
              BigInt(tokenMarketData.listing.start_amount ?? 0),
            )}
            token={token}
          />
        ),
      });
    } else if (status === "success") {
      toast({
        variant: "success",
        title: "Your purchase is confirmed",
        additionalContent: (
          <ToastExecutedTransactionContent
            token={token}
            price={BigInt(tokenMarketData.listing.start_amount ?? 0)}
            formattedPrice={formatEther(
              BigInt(tokenMarketData.listing.start_amount ?? 0),
            )}
          />
        ),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  if (isOwner || !tokenMarketData.is_listed) {
    return null;
  }

  const isSuccess = status === "success";

  return (
    <>
      <Dialog open={isOpen} modal={modalEnabled} onOpenChange={setIsOpen}>
        <DialogContent
          className="justify-normal lg:justify-center"
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-col gap-10 sm:gap-8">
            <div className="flex flex-col gap-4">
              <div className="mx-auto mt-6 flex flex-col items-center justify-center text-2xl text-foreground">
                <NoListing />
                <div className="mb-5 text-center text-xl font-semibold sm:mb-0">
                  {isSuccess
                    ? "Congratulations for your purchase"
                    : "Confirm your purchase"}
                </div>
              </div>
              {isSuccess && (
                <div className="mb-4 text-center text-sm">
                  Nice purchase, this NFT is now in your wallet ;)
                </div>
              )}
            </div>
            <TokenActionsTokenOverview
              token={token}
              amount={formatEther(
                BigInt(tokenMarketData.listing.start_amount ?? 0),
              )}
            />
            {isSuccess ? (
              <Button
                onClick={() => setIsOpen(false)}
                size="xl"
                className="mx-auto w-full lg:w-fit"
              >
                Continue to explore NFTs
              </Button>
            ) : (
              <div className="flex flex-col items-center gap-4 rounded-md bg-card p-5 lg:flex-row lg:gap-5 lg:p-4">
                <LoaderCircle className="size-10 animate-spin" />

                <div className="text-center lg:text-left">
                  <div className="text-lg font-semibold">
                    Checking your payment
                  </div>
                  <div className="text-sm">
                    Checking your payment can take a few seconds...
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
      <Button
        className={cn(small ?? "relative w-full lg:max-w-[50%]")}
        size={small ? "xl" : "xxl"}
        disabled={status === "loading" || tokenMarketData.buy_in_progress}
        onClick={(e) => {
          ensureConnect(e);

          if (account) {
            void buy();
          }
        }}
      >
        {tokenMarketData.buy_in_progress ? (
          <>
            <LoaderCircle
              className={cn("animate-spin", small ?? "absolute left-4")}
              size={small ? 20 : 24}
            />
            Buy in progress
          </>
        ) : (
          <>
            <ActivityList />
            {"Buy now for "}
            {formatEther(BigInt(tokenMarketData.listing.start_amount ?? 0))} LORDS
          </>
        )}
      </Button>
    </>
  );
}
