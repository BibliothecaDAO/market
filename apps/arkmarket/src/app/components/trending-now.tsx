"use client";

import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";

import {
  Carousel,
} from "@ark-market/ui/carousel";

import Media from "~/components/media";
import getHomepageTrendingNow from "~/lib/getHomepageTrendingNow";
import TrendingNowCard from "./trending-now-card";

export default function TrendingNow() {
  const { data } = useQuery({
    queryKey: ["home-page-trending"],
    queryFn: () => getHomepageTrendingNow(),
    refetchInterval: 10_000,
  });

  if (data === undefined || data.data.length === 0) {
    return null;
  }

  return (
    <section>
      <h2 className="text-3xl font-semibold">Trending now</h2>
      <Carousel
        className="mt-8"
        plugins={[WheelGesturesPlugin()]}
        opts={{ skipSnaps: true }}
      >
        {/* <CarouselContent> */}
        {/*   {homepageConfig.trendingNow.map((collection, index) => { */}
        {/*     return ( */}
        {/*       <CarouselItem */}
        {/*         key={index} */}
        {/*         className="basis-[calc(100%-3rem)] md:basis-1/2 lg:basis-1/2 xl:basis-1/3 2xl:basis-1/4" */}
        {/*       > */}
        {/*         <Link */}
        {/*           href={`/collection/${collection.address}`} */}
        {/*           className={cn( */}
        {/*             "group block rounded-lg bg-card p-5", */}
        {/*             focusableStyles, */}
        {/*           )} */}
        {/*         > */}
        {/*           <div className="grid grid-cols-2 gap-7 sm:grid-cols-3"> */}
        {/*             {collection.second_nft ? ( */}
        {/*               <div className="w-full overflow-hidden rounded-sm"> */}
        {/*                 <Image */}
        {/*                   height={150} */}
        {/*                   width={150} */}
        {/*                   className="aspect-square w-full transition-transform group-hover:scale-110" */}
        {/*                   alt={collection.name} */}
        {/*                   src={collection.second_nft} */}
        {/*                 /> */}
        {/*               </div> */}
        {/*             ) : ( */}
        {/*               <div className="aspect-square w-full rounded-sm bg-secondary" /> */}
        {/*             )} */}
        {/*             {collection.first_nft ? ( */}
        {/*               <div className="w-full overflow-hidden rounded-sm"> */}
        {/*                 <Image */}
        {/*                   height={150} */}
        {/*                   width={150} */}
        {/*                   className="aspect-square w-full transition-transform group-hover:scale-110" */}
        {/*                   alt={collection.name} */}
        {/*                   src={collection.first_nft} */}
        {/*                 /> */}
        {/*               </div> */}
        {/*             ) : ( */}
        {/*               <div className="aspect-square w-full rounded-sm bg-secondary" /> */}
        {/*             )} */}
        {/*             {collection.third_nft ? ( */}
        {/*               <div className="hidden w-full overflow-hidden rounded-sm sm:block"> */}
        {/*                 <Image */}
        {/*                   height={150} */}
        {/*                   width={150} */}
        {/*                   className="aspect-square w-full transition-transform group-hover:scale-110" */}
        {/*                   alt={collection.name} */}
        {/*                   src={collection.third_nft} */}
        {/*                 /> */}
        {/*               </div> */}
        {/*             ) : ( */}
        {/*               <div className="hidden aspect-square w-full rounded-sm bg-secondary sm:block" /> */}
        {/*             )} */}
        {/*           </div> */}
        {/**/}
        {/*           <div className="mt-6 flex items-center justify-between gap-4"> */}
        {/*             <div className="flex items-center gap-2 overflow-hidden"> */}
        {/*               <Image */}
        {/*                 src={collection.image} */}
        {/*                 height={64} */}
        {/*                 width={64} */}
        {/*                 alt={collection.name} */}
        {/*                 className="flex-shrink-0 rounded-sm" */}
        {/*               /> */}
        {/*               <div className="flex flex-col justify-between gap-2 overflow-hidden"> */}
        {/*                 <div className="flex items-center gap-2"> */}
        {/*                   <h4 */}
        {/*                     className={cn( */}
        {/*                       "text-xl font-semibold", */}
        {/*                       ellipsableStyles, */}
        {/*                     )} */}
        {/*                   > */}
        {/*                     {collection.name} */}
        {/*                   </h4> */}
        {/*                   <VerifiedIcon className="flex-shrink-0 text-primary" /> */}
        {/*                 </div> */}
        {/**/}
        {/*                 <p className="font-medium sm:hidden"> */}
        {/*                   1.6 ETH{" "} */}
        {/*                   <span className="font-bold text-green-500"> */}
        {/*                     + 0,02% */}
        {/*                   </span> */}
        {/*                 </p> */}
        {/*               </div> */}
        {/*             </div> */}
        {/*             <div className="hidden flex-shrink-0 flex-col items-end sm:flex"> */}
        {/*               <p className="text-sm font-medium text-muted-foreground"> */}
        {/*                 Floor price */}
        {/*               </p> */}
        {/*               <p className="text-end font-medium"> */}
        {/*                 1.6 ETH{" "} */}
        {/*                 <span className="font-bold text-green-500"> */}
        {/*                   + 0,02% */}
        {/*                 </span> */}
        {/*               </p> */}
        {/*             </div> */}
        {/*           </div> */}
        {/*         </Link> */}
        {/*       </CarouselItem> */}
        {/*     ); */}
        {/*   })} */}
        {/* </CarouselContent> */}
      </Carousel>
    </section>
  );
}
