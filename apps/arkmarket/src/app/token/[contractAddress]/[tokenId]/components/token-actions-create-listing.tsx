"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useCreateAuction, useCreateListing } from "@ark-project/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAccount } from "@starknet-react/core";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useForm } from "react-hook-form";
import { formatEther, parseEther } from "viem";
import * as z from "zod";

import { cn } from "@ark-market/ui";
import { Button } from "@ark-market/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@ark-market/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ark-market/ui/form";
import { Check, List, LoaderCircle } from "@ark-market/ui/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ark-market/ui/select";
import { useToast } from "@ark-market/ui/use-toast";

import type { WalletToken } from "~/app/wallet/[walletAddress]/queries/getWalletData";
import type { Token } from "~/types";
import { env } from "~/env";
import usePrices from "~/hooks/usePrices";
import formatAmount from "~/lib/formatAmount";
import getCollection from "~/lib/getCollection";
import ToastExecutedTransactionContent from "./toast-executed-transaction-content";
import ToastRejectedTransactionContent from "./toast-rejected-transaction-content";
import TokenActionsTokenOverview from "./token-actions-token-overview";
import LordsInput from "~/components/lords-input";

interface TokenActionsCreateListingProps {
  token: Token | WalletToken;
  small?: boolean;
  children?: ReactNode;
}

export function TokenActionsCreateListing({
  token,
  small,
  children,
}: TokenActionsCreateListingProps) {
  const { account } = useAccount();
  const [isOpen, setIsOpen] = useState(false);
  const [modalEnabled, setModalEnabled] = useState(true);
  const [isAuction, setIsAuction] = useState(false);
  const { data: collection } = useQuery({
    queryKey: ["collection", token.collection_address],
    queryFn: () =>
      getCollection({
        collectionAddress: token.collection_address,
      }),
    refetchInterval: 5_000,
  });
  const { createListing, status } = useCreateListing();
  const { create: createAuction, status: auctionStatus } = useCreateAuction();
  const { toast } = useToast();
  const { convertInUsd } = usePrices();

  const formSchema = z
    .object({
      startAmount: z.string().refine((val) => Number(val) >= 0.00001, {
        message: "Must be a valid amount and greater than 0.00001",
      }),
      endAmount: z.string().refine(
        (val) => {
          if (!isAuction) {
            return true;
          }

          const num = parseFloat(val);

          return !isNaN(num) && num >= 0.00001;
        },
        {
          message: "Must be a valid amount and greater than 0.00001",
        },
      ),
      duration: z.string(),
    })
    .refine(
      (data) => {
        if (!isAuction) {
          return true;
        }

        const sa = Number(data.startAmount);
        const ea = Number(data.endAmount);

        return ea > sa;
      },
      {
        message: "Must be greater than starting price",
        path: ["endAmount"],
      },
    );

  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      startAmount: "",
      endAmount: "",
      duration: "719",
      username: "",
    },
  });

  useEffect(() => {
    if (status === "error") {
      setIsOpen(false);
      toast({
        variant: "canceled",
        title: "Listing canceled",
        additionalContent: (
          <ToastRejectedTransactionContent
            token={token}
            price={parseEther(startAmount)}
            formattedPrice={startAmount}
          />
        ),
      });
    } else if (status === "success") {
      setIsOpen(false);

      toast({
        variant: "success",
        title: "Your token is successfully listed!",
        additionalContent: (
          <ToastExecutedTransactionContent
            token={token}
            price={parseEther(startAmount)}
            formattedPrice={startAmount}
          />
        ),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  useEffect(() => {
    if (auctionStatus === "error") {
      setIsOpen(false);
      toast({
        variant: "canceled",
        title: "Auction canceled",
        additionalContent: (
          <ToastRejectedTransactionContent
            token={token}
            price={parseEther(startAmount)}
            formattedPrice={startAmount}
          />
        ),
      });
    } else if (auctionStatus === "success") {
      setIsOpen(false);

      toast({
        variant: "success",
        title: "Auction successfully launched",
        additionalContent: (
          <ToastExecutedTransactionContent
            token={token}
            price={parseEther(startAmount)}
            formattedPrice={startAmount}
          />
        ),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auctionStatus]);

  useEffect(() => {
    setIsAuction(false);
    form.reset();
  }, [form, isOpen]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!account) {
      // TODO: Handle error with toast
      console.error("Account is missing");
      return;
    }
    setModalEnabled(false);

    const processedValues = {
      brokerId: env.NEXT_PUBLIC_BROKER_ID,
      tokenAddress: token.collection_address,
      tokenId: BigInt(token.token_id),
      startAmount: parseEther(values.startAmount),
      endAmount: values.endAmount ? parseEther(values.endAmount) : BigInt(0),
      endDate: moment().add(values.duration, "hours").unix(),
      currencyAddress: env.NEXT_PUBLIC_LORDS_TOKEN_ADDRESS,
    };

    try {
      if (isAuction) {
        await createAuction({
          starknetAccount: account,
          brokerId: env.NEXT_PUBLIC_BROKER_ID,
          tokenAddress: token.collection_address,
          tokenId: processedValues.tokenId,
          endDate: processedValues.endDate,
          startAmount: processedValues.startAmount,
          endAmount: processedValues.endAmount,
          currencyAddress: processedValues.currencyAddress,
        });
      } else {
        await createListing({
          starknetAccount: account,
          brokerId: env.NEXT_PUBLIC_BROKER_ID,
          tokenAddress: token.collection_address,
          tokenId: processedValues.tokenId,
          endDate: processedValues.endDate,
          startAmount: processedValues.startAmount,
          currencyAddress: processedValues.currencyAddress,
        });
      }
    } catch (error) {
      console.error("error: create listing failed", error);
      setModalEnabled(true);
    }
  }

  const startAmount = form.watch("startAmount");
  const isLoading = status === "loading" || auctionStatus === "loading";

  const formattedCollectionFloor = formatEther(BigInt(collection?.floor ?? 0));

  const isDisabled =
    !form.formState.isValid ||
    form.formState.isSubmitting ||
    status === "loading" ||
    auctionStatus === "loading";

  const startAmountInUsd = convertInUsd({ token: "lords", amount: parseEther(startAmount) });

  return (
    <Dialog open={isOpen} modal={modalEnabled} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children ?? (
          <Button
            className={cn(small ?? "relative w-full lg:max-w-[50%]")}
            size={small ? "xl" : "xxl"}
          >
            <List size={24} className={cn("left-4", small ? "" : "absolute")} />
            List for sale
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <div className="flex flex-col gap-8">
          <div className="mt-4 text-center text-xl font-semibold">
            List for sale
          </div>
          <TokenActionsTokenOverview token={token} amount={startAmount} small />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col space-y-4"
            >
              <FormItem className="!mt-0">
                <FormLabel className="text-lg">Type of sale</FormLabel>
                <div className="flex gap-6">
                  <Button
                    type="button"
                    className="w-full"
                    size="xl"
                    variant={isAuction ? "outline" : "default"}
                    onClick={() => setIsAuction(false)}
                  >
                    Fixed price
                  </Button>
                  <Button
                    type="button"
                    className="w-full"
                    size="xl"
                    variant={isAuction ? "default" : "outline"}
                    onClick={() => setIsAuction(true)}
                  >
                    In auction
                  </Button>
                </div>
              </FormItem>
              <FormField
                control={form.control}
                name="startAmount"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel className="text-lg">
                      Set {isAuction && "starting"} price
                    </FormLabel>
                    <Button
                      type="button"
                      className="relative w-full"
                      variant="outline"
                      size="xl"
                      onClick={async () => {
                        form.setValue(
                          "startAmount",
                          field.value === formattedCollectionFloor
                            ? ""
                            : formattedCollectionFloor,
                        );
                        await form.trigger("startAmount");
                      }}
                    >
                      <div className="absolute left-3 flex size-5 items-center justify-center rounded-xs bg-secondary">
                        {field.value === formattedCollectionFloor && <Check />}
                      </div>
                      <p>
                        Choose floor price of{" "}
                        <span className="font-bold">
                          {formattedCollectionFloor} LORDS
                        </span>
                      </p>
                    </Button>
                    <FormControl>
                      <LordsInput
                        {...field}
                        status={fieldState.error?.message ? "error" : "default"}
                        autoFocus
                      />
                    </FormControl>
                    {fieldState.error?.message ? (
                      <FormMessage />
                    ) : (
                      <p className="!mt-1 ml-3 text-sm font-medium text-muted-foreground">
                        $<span>{startAmountInUsd}</span>
                      </p>
                    )}
                  </FormItem>
                )}
              />
              {isAuction && (
                <FormField
                  control={form.control}
                  name="endAmount"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel className="text-lg">
                        Set reserve price
                      </FormLabel>
                      <FormControl>
                        <LordsInput
                          {...field}
                          onChange={async (e) => {
                            field.onChange(e);
                            await form.trigger("endAmount");
                          }}
                          status={
                            fieldState.error?.message ? "error" : "default"
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">
                      Listing expiration
                    </FormLabel>
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
              <div className="!mt-8 text-xl font-semibold">
                <div className="flex items-center justify-between">
                  <p>Earning details</p>
                  <p>--- LORDS</p>
                </div>
                <div className="mt-2 flex items-center justify-between text-sm font-medium text-muted-foreground">
                  <p>Arkmarket fees 2%</p>
                  <p>-- LORDS</p>
                </div>
                <div className="mt-0.5 flex items-center justify-between text-sm font-medium text-muted-foreground">
                  <p>Creator royalties 2%</p>
                  <p>-- LORDS</p>
                </div>
              </div>
              <div className="sticky bottom-0 !mt-8 flex w-full translate-y-5 items-center justify-center bg-background pb-5">
                <Button
                  type="submit"
                  className="mx-auto w-full px-10 lg:w-auto"
                  disabled={isDisabled}
                  size="xl"
                >
                  {isLoading && <LoaderCircle className="mr-2 animate-spin" />}
                  <p>
                    List
                    {startAmount ? (
                      <>
                        {" "}
                        for{" "}
                        <span className="font-bold">
                          {formatAmount(startAmount)} LORDS
                        </span>
                      </>
                    ) : null}
                  </p>
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
