import { formatEther } from "viem";

import { Button } from "@ark-market/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@ark-market/ui/dialog";
import { LoaderCircle, NoListing, Success } from "@ark-market/ui/icons";

import type { CollectionToken, Token } from "~/types";
import TokenActionsTokenOverview from "~/app/token/[contractAddress]/[tokenId]/components/token-actions-token-overview";

interface BuyNowDialogProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  modalEnabled: boolean;
  isSuccess: boolean;
  token: Token | CollectionToken;
  price?: string;
}

export default function BuyNowDialog({
  isOpen,
  setIsOpen,
  modalEnabled,
  isSuccess,
  token,
  price,
}: BuyNowDialogProps) {
  return (
    <Dialog open={isOpen} modal={modalEnabled} onOpenChange={setIsOpen}>
      <DialogContent
        className="justify-normal lg:justify-center"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogTitle className="sr-only">Buy now</DialogTitle>
        <div className="flex flex-col gap-10 sm:gap-8">
          <div className="flex flex-col gap-4">
            <div className="mx-auto mt-6 flex size-20 items-center justify-center rounded-full bg-slate-800 text-2xl text-foreground">
              {isSuccess ? <Success /> : <NoListing />}
            </div>
            <div className="mb-5 text-center text-xl font-semibold sm:mb-0">
              {isSuccess
                ? "Congratulations for your purchase"
                : "Confirm your purchase"}
            </div>
            {isSuccess && (
              <div className="mb-4 text-center text-sm">
                Nice purchase, this NFT is now in your wallet ;)
              </div>
            )}
          </div>
          <TokenActionsTokenOverview
            token={token}
            amount={formatEther(BigInt(price ?? 0))}
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
  );
}
