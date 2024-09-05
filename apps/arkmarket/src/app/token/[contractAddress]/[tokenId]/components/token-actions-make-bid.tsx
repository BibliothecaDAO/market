"use client";

import { useEffect, useState } from "react";
import { useConfig, useCreateOffer } from "@ark-project/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAccount } from "@starknet-react/core";
import { useForm } from "react-hook-form";
import { formatEther, parseEther } from "viem";
import * as z from "zod";

import { cn } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@ark-market/ui/dialog";
import EthInput from "@ark-market/ui/eth-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ark-market/ui/form";
import { ActivityOffer, LoaderCircle, NoOffer } from "@ark-market/ui/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ark-market/ui/select";
import { useToast } from "@ark-market/ui/use-toast";

import type { Token, TokenMarketData } from "~/types";
import { ETH } from "~/constants/tokens";
import { env } from "~/env";
import useBalance from "~/hooks/useBalance";
import useConnectWallet from "~/hooks/useConnectWallet";
import formatAmount from "~/lib/formatAmount";
import ToastExecutedTransactionContent from "./toast-executed-transaction-content";
import ToastRejectedTransactionContent from "./toast-rejected-transaction-content";
import TokenActionsTokenOverview from "./token-actions-token-overview";

interface TokenActionsMakeBidProps {
  token: Token;
  tokenMarketData: TokenMarketData;
  small?: boolean;
}

export default function TokenActionsMakeBid({
  token,
  tokenMarketData,
  small,
}: TokenActionsMakeBidProps) {
  const { account, address } = useAccount();
  const [isOpen, setIsOpen] = useState(false);
  const [modalEnabled, setModalEnabled] = useState(true);
  const config = useConfig();
  const { createOffer, status } = useCreateOffer();
  const { toast } = useToast();
  const { data: ethBalance } = useBalance({ address, token: ETH });
  const { ensureConnect } = useConnectWallet({
    account,
    onConnect: () => {
      setIsOpen(true);
    },
  });

  const formSchema = z.object({
    startAmount: z
      .string()
      .refine(
        (val) => {
          const num = parseFloat(val);
          return !isNaN(num) && num > 0.00001;
        },
        {
          message: "Must be a valid amount and greater than 0.00001",
        },
      )
      .refine(
        (val) => {
          const num = parseEther(val);

          return ethBalance && ethBalance.value >= num;
        },
        {
          message: "You don't have enough funds in your wallet",
        },
      ),
    duration: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "all",
    resolver: zodResolver(formSchema),
    defaultValues: {
      startAmount: formatEther(
        BigInt(tokenMarketData.listing.start_amount ?? 0),
      ),
      duration: "719",
    },
  });

  useEffect(() => {
    form.reset();
  }, [form, isOpen]);

  useEffect(() => {
    if (status === "error") {
      setIsOpen(false);
      toast({
        variant: "canceled",
        title: "Your bid could not be submitted",
        additionalContent: (
          <ToastRejectedTransactionContent
            token={token}
            price={BigInt(tokenMarketData.listing.start_amount ?? 0)}
            formattedPrice={startAmount}
          />
        ),
      });
    } else if (status === "success") {
      setIsOpen(false);
      toast({
        variant: "success",
        title: "Your bid has been sucessfullly sent",
        additionalContent: (
          <ToastExecutedTransactionContent
            token={token}
            price={BigInt(tokenMarketData.listing.start_amount ?? 0)}
            formattedPrice={startAmount}
          />
        ),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!account || !config) {
      return;
    }
    setModalEnabled(false)

    const tokenIdNumber = parseInt(token.token_id, 10);

    if (isNaN(tokenIdNumber)) {
      console.error("Invalid token ID");
      return;
    }

    const processedValues = {
      brokerId: env.NEXT_PUBLIC_BROKER_ID,
      currencyAddress: env.NEXT_PUBLIC_LORDS_TOKEN_ADDRESS,
      tokenAddress: token.collection_address,
      tokenId: BigInt(token.token_id),
      startAmount: parseEther(values.startAmount),
    };

    await createOffer({
      starknetAccount: account,
      ...processedValues,
    });
    setModalEnabled(true)
  }

  const isLoading = status === "loading";
  const isDisabled =
    !form.formState.isValid || form.formState.isSubmitting || isLoading;
  const startAmount = form.watch("startAmount");
  const formattedStartAmount = formatAmount(startAmount);
  const price = formatEther(BigInt(tokenMarketData.listing.start_amount ?? 0));
  const reservePrice = formatEther(
    BigInt(tokenMarketData.listing.end_amount ?? 0),
  );

  return (
    <Dialog open={isOpen} modal={modalEnabled} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn(small ?? "relative w-full lg:max-w-[50%]")}
          size={small ? "xl" : "xxl"}
          variant="secondary"
          onClick={ensureConnect}
        >
          <ActivityOffer />
          Place a bid
        </Button>
      </DialogTrigger>
      <DialogTitle className="hidden">Place a bid</DialogTitle>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex flex-col gap-6">
          <div className="mx-auto flex flex-col items-center justify-center rounded-full text-2xl">
            <NoOffer />
            <div className="text-center text-xl font-semibold">Place a bid</div>
          </div>
          <TokenActionsTokenOverview token={token} amount={startAmount} small />
          <div className="">
            <div className="flex justify-between">
              <div className="text-sm text-gray-500">Starting price</div>
              <div className="text-sm text-gray-500">{price} ETH</div>
            </div>
            <div className="flex justify-between">
              <div className="text-sm text-gray-500">Reserve price</div>
              <div className="text-sm text-gray-500">{reservePrice} ETH</div>
            </div>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <FormField
                control={form.control}
                name="startAmount"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Set Price</FormLabel>
                    <FormControl>
                      <EthInput
                        value={field.value}
                        onChange={field.onChange}
                        status={
                          formattedStartAmount !== "-" &&
                          fieldState.error?.message
                            ? "error"
                            : "default"
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex justify-between">
                      <FormLabel>Offer expiration</FormLabel>
                    </div>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="">
                          <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="3">3 hours</SelectItem>
                        <SelectItem value="6">6 hours</SelectItem>
                        <SelectItem value="24">1 day</SelectItem>
                        <SelectItem value="72">3 days</SelectItem>
                        <SelectItem value="168">7 days</SelectItem>
                        <SelectItem value="719">1 month</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isDisabled}
                className="mx-auto w-full px-10 lg:w-auto"
                size="xl"
              >
                {isLoading && <LoaderCircle className="mr-2 animate-spin" />}
                Place bid
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
