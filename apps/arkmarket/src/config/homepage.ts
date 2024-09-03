export enum Collections {
  REALMS = "realms",
  BEASTS = "beasts",
  GOLDEN_TOKEN = "goldentoken",
  BLOBERT = "blobert",
  BANNERS = "banners",
}

export enum ChainId {
  MAINNET = 1,
  SEPOLIA = 11155111,
  MISSISSIPPI_TESTNET = 33784,

  SN_MAIN = "0x534e5f4d41494e",
  SN_SEPOLIA = "0x534e5f5345504f4c4941",

  REALMS_L3 = "420",

  SLOT_TESTNET = 555, // TODO: update with the real value

  SN_DEVNET = 556, // TODO: update with the real value
}

export const CollectionAddresses: {
  readonly [key in Collections]: Partial<{ [key in ChainId]: string }>;
} = {
  [Collections.REALMS]: {
    [ChainId.MAINNET]: "0x7afe30cb3e53dba6801aa0ea647a0ecea7cbe18d",
    [ChainId.SEPOLIA]: "0x0A642270Cc73B2FC1605307F853712F944394564",
    [ChainId.SN_SEPOLIA]:
      "0x3e64aa2c669ffd66a1c78d120812005d8f7e03b75696dd9c0f06e8def143844",
    [ChainId.SN_MAIN]:
      "0x07ae27a31bb6526e3de9cf02f081f6ce0615ac12a6d7b85ee58b8ad7947a2809",
  },
  [Collections.BEASTS]: {
    [ChainId.SN_MAIN]:
      "0x0158160018d590d93528995b340260e65aedd76d28a686e9daa5c4e8fad0c5dd",
    [ChainId.SN_SEPOLIA]:
      "0x03065c1db93be057c40fe92c9cba7f898de8d3622693d128e4e97fdc957808a3",
  },
  [Collections.GOLDEN_TOKEN]: {
    [ChainId.SN_MAIN]:
      "0x04f5e296c805126637552cf3930e857f380e7c078e8f00696de4fc8545356b1d",
    [ChainId.SN_SEPOLIA]:
      "0x024f21982680442892d2f7ac4cee98c7d62708b04fdf9f8a0453415baca4b16f",
  },
  [Collections.BLOBERT]: {
    [ChainId.SN_MAIN]:
      "0x00539f522b29ae9251dbf7443c7a950cf260372e69efab3710a11bf17a9599f1",
    [ChainId.SN_SEPOLIA]:
      "0x007075083c7f643a2009cf1dfa28dfec9366f7d374743c2e378e03c01e16c3af",
  },
  [Collections.BANNERS]: {
    [ChainId.SN_MAIN]:
      "0x02d66679de61a5c6d57afd21e005a8c96118bd60315fd79a4521d68f5e5430d1",
    [ChainId.SN_SEPOLIA]: "",
  },
};

export const CollectionNames = {
  [Collections.REALMS]: "Realms",
  [Collections.BEASTS]: "Beasts",
  [Collections.GOLDEN_TOKEN]: "Golden Token",
  [Collections.BLOBERT]: "Blobert",
  [Collections.BANNERS]: "Banners",
}

interface CollectionDescription {
  created: string;
  description: string;
}
export const CollectionDescription: Record<string, CollectionDescription> = {
  // @ts-expect-error It's ok compiler
  [CollectionAddresses[Collections.REALMS][ChainId.SN_MAIN]]: {
    created: "2023",
    description: "Loot Realms"
  },
  // @ts-expect-error It's ok compiler
  [CollectionAddresses[Collections.BEASTS][ChainId.SN_MAIN]]: {
    created: "2023",
    description: "Beasts from Loot Survivor"
  },
  // @ts-expect-error It's ok compiler
  [CollectionAddresses[Collections.GOLDEN_TOKEN][ChainId.SN_MAIN]]: {
    created: "2023",
    description: "One free game for ever...."
  },
  // @ts-expect-error It's ok compiler
  [CollectionAddresses[Collections.BLOBERT][ChainId.SN_MAIN]]: {
    created: "2023",
    description: "Blobert, squire of the Realms"
  },
  // @ts-expect-error It's ok compiler
  [CollectionAddresses[Collections.BANNERS][ChainId.SN_MAIN]]: {
    created: "2023",
    description: "Golden Token"
  },
}


export const homepageConfig = {
  mainCarousel: [
    {
      bannerSrc: "/banners/blobert.png",
      collectionSrc: "/collections/blobert.png",
      name: CollectionNames[Collections.BLOBERT],
      description: "Blobert, squire of the Realms",
      address: CollectionAddresses[Collections.BLOBERT][ChainId.SN_MAIN],
      itemsCount: 4844,
      // floorPrice: 0.12,
    },
    {
      bannerSrc: "/banners/beasts.png",
      collectionSrc: "/collections/beasts.png",
      name: CollectionNames[Collections.BEASTS],
      description: "Beasts from Loot Survivor",
      address: CollectionAddresses[Collections.BEASTS][ChainId.SN_MAIN],
      itemsCount: 1151,
      // floorPrice: 0.12,
    },
    {
      bannerSrc: "/banners/golden-token.png",
      collectionSrc: "/collections/golden-token.png",
      name: CollectionNames[Collections.GOLDEN_TOKEN],
      description: "One free game for ever....",
      address: CollectionAddresses[Collections.GOLDEN_TOKEN][ChainId.SN_MAIN],
      itemsCount: 20,
      // floorPrice: 0.12,
    },
    {
      bannerSrc: "/banners/realms.png",
      collectionSrc: "/collections/realms.png",
      name: CollectionNames[Collections.REALMS],
      description: "Loot Realms",
      address: CollectionAddresses[Collections.REALMS][ChainId.SN_MAIN],
      itemsCount: 3788,
      // floorPrice: 0.12,
    },
    {
      bannerSrc: "/banners/banners.png",
      collectionSrc: "/collections/banners.png",
      name: CollectionNames[Collections.BANNERS],
      description: "Loot Realms",
      address: CollectionAddresses[Collections.BANNERS][ChainId.SN_MAIN],
      itemsCount: 9170,
      // floorPrice: 0.12,
    },

  ],
  exploreCategory: [
    { name: "Gaming", image: "/collection_categories/gaming.png" },
  ],
  latestDropCollections: [
    {
      name: "Influence Asteroids",
      address:
        "0x0603cf837055c64d026a3c5a9e3a83036cea6c4a3f68a9e19f7a687d726fe817",
      image: "/medias/influence.png",
      status: "live",
    },
  ] as {
    name: string;
    address: string;
    image: string;
    status: "live" | "upcoming";
  }[],
  trendingNow: [],
  exploreCollections: [
    {
      name: CollectionNames[Collections.REALMS],
      address: CollectionAddresses[Collections.REALMS][ChainId.SN_MAIN],
      image: "/collections/realms.png",
      banner_image: "/banners/realms.png",
    },
    {
      name: CollectionNames[Collections.BLOBERT],
      address: CollectionAddresses[Collections.BLOBERT][ChainId.SN_MAIN],
      image: "/collections/blobert.png",
      banner_image: "/banners/blobert.png",
    },
    {
      name: CollectionNames[Collections.BEASTS],
      address: CollectionAddresses[Collections.BEASTS][ChainId.SN_MAIN],
      image: "/collections/beasts.png",
      banner_image: "/banners/beasts.png",
    },
    {
      name: CollectionNames[Collections.GOLDEN_TOKEN],
      address: CollectionAddresses[Collections.GOLDEN_TOKEN][ChainId.SN_MAIN],
      image: "/collections/golden-token.png",
      banner_image: "/banners/golden-token.png",
    },
    {
      name: CollectionNames[Collections.BANNERS],
      address: CollectionAddresses[Collections.BANNERS][ChainId.SN_MAIN],
      image: "/collections/pixel-banners.png",
      banner_image: "/banners/pixel-banners.png",
    },
  ],
  liveAuctions: [],
  latestSales: [
    {
      token: {
        name: "Everai #2345",
        collection_name: "Everai",
        collection_address:
          "0x02acee8c430f62333cf0e0e7a94b2347b5513b4c25f699461dd8d7b23c072478",
        image: "/nfts/everai_1.png",
      },
      price: "52500000000000000",
      from: "0x7689b5",
      to: "kwiss.stark",
    },
  ],
};
