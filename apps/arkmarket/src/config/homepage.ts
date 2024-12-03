export enum Collections {
  REALMS = "realms",
  BEASTS = "beasts",
  GOLDEN_TOKEN = "goldentoken",
  BLOBERT = "blobert",
  BANNERS = "banners",
  LOOTSURVIVOR = "lootsurvivor",
  SYNDICATE = "syndicate",
  DUNGEON_DUCKS = "dungeonducks",
  KARAT = "karat",
  JOKERSOFNEON = "jokersofneon",
  ETERNUMSEASONPASS = "eternumseasonpass",
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
  [Collections.LOOTSURVIVOR]: {
    [ChainId.SN_MAIN]:
      "0x018108b32cea514a78ef1b0e4a0753e855cdf620bc0565202c02456f618c4dc4",
    [ChainId.SN_SEPOLIA]: "",
  },
  [Collections.SYNDICATE]: {
    [ChainId.SN_MAIN]:
      "0x065a413ce0b5c169c583c7efad857913523485f1febcf5ef4f3909133f04904a",
    [ChainId.SN_SEPOLIA]: "",

  },
  [Collections.DUNGEON_DUCKS]: {
    [ChainId.SN_MAIN]:
      "0x04fa864a706e3403fd17ac8df307f22eafa21b778b73353abf69a622e47a2003",
    [ChainId.SN_SEPOLIA]: "",

  },
  [Collections.KARAT]: {
    [ChainId.SN_MAIN]:
      "0x07d8ea58612a5de25f29281199a4fc1f2ce42f0f207f93c3a35280605f3b8e68",
    [ChainId.SN_SEPOLIA]: "",
  },
  [Collections.JOKERSOFNEON]: {
    [ChainId.SN_MAIN]:
      "0x07268fcf96383f8691b91ba758cc8fefe0844146f0557909345b841fb1de042f",
    [ChainId.SN_SEPOLIA]: "",
  },
  [Collections.ETERNUMSEASONPASS]: {
    [ChainId.SN_MAIN]:
      "0x057675b9c0bd62b096a2e15502a37b290fa766ead21c33eda42993e48a714b80",
    [ChainId.SN_SEPOLIA]: "",
  },
};

export const CollectionNames = {
  [Collections.REALMS]: "Realms",
  [Collections.BEASTS]: "Beasts",
  [Collections.GOLDEN_TOKEN]: "Golden Token",
  [Collections.BLOBERT]: "Blobert",
  [Collections.BANNERS]: "Banners",
  [Collections.LOOTSURVIVOR]: "Loot Survivor",
  [Collections.SYNDICATE]: "Syndicate",
  [Collections.DUNGEON_DUCKS]: "Dungeon Ducks",
  [Collections.KARAT]: "Karat",
  [Collections.JOKERSOFNEON]: "Jokers of Neon x Loot Survivor: Beasts",
  [Collections.ETERNUMSEASONPASS]: "Eternum Season Pass",
};

interface CollectionDescription {
  created: string;
  description: string;
}

export const CollectionDescription: Record<string, CollectionDescription> = {
  // @ts-expect-error It's ok compiler
  [CollectionAddresses[Collections.REALMS][ChainId.SN_MAIN]]: {
    created: "2023",
    description:
      "Every Realm has been procedurally generated and is unique down to the language. Each Realm has a map showing the regions, cities, rivers and topography that exist in the world. Each Realm’s rankings will display the number of regions, cities, rivers, and harbors within the Realm. Resource deposits can be found in each realm with varying rarity and there are 50 Wonders spread among the 8000 Realms.",
  },
  // @ts-expect-error It's ok compiler
  [CollectionAddresses[Collections.BEASTS][ChainId.SN_MAIN]]: {
    created: "2023",
    description:
      "Beasts from Loot Survivor. Time to find them all. There are roughly 90,000 Loot Survivor beasts to collect. Each beast is unique and comes with its own set of attributes and characteristics. Collectors can explore various regions to discover and capture these beasts, adding them to their growing collection.",
  },
  // @ts-expect-error It's ok compiler
  [CollectionAddresses[Collections.GOLDEN_TOKEN][ChainId.SN_MAIN]]: {
    created: "2023",
    description:
      "One free game for ever.... The Golden Token works with Loot Survivor and offers a free game every day forever.",
  },
  // @ts-expect-error It's ok compiler
  [CollectionAddresses[Collections.BLOBERT][ChainId.SN_MAIN]]: {
    created: "2023",
    description:
      "Blobert, squire of the Realms. Snarky blobert has a lot to say. Modeled after the Blobert character from the Realms.",
  },
  // @ts-expect-error It's ok compiler
  [CollectionAddresses[Collections.BANNERS][ChainId.SN_MAIN]]: {
    created: "2023",
    description:
      "Pixel Banners. These are dynamically user-generated banners that can be customized and added to your collection. Each banner is unique and can be tailored to represent your personal style or the theme of your collection.",
  },
  // @ts-expect-error It's ok compiler
  [CollectionAddresses[Collections.LOOTSURVIVOR][ChainId.SN_MAIN]]: {
    created: "2023",
    description:
      "Loot Survivor. Each NFT represents a Survivor in the game, dead or alive. Trade them, collect them, and use them to play the game. Each Survivor has a unique set of attributes and characteristics that can be used to your advantage in the game.",
  },
  // @ts-expect-error It's ok compiler
  [CollectionAddresses[Collections.SYNDICATE][ChainId.SN_MAIN]]: {
    created: "2024",
    description:
      "A Syndicate of Web3 communities, initially assembled for the purpose of winning the Loot Survivor launch tournament",
  },
  // @ts-expect-error It's ok compiler
  [CollectionAddresses[Collections.DUNGEON_DUCKS][ChainId.SN_MAIN]]: {
    created: "2024",
    description:
      "A collection of feathered adventurers, initially created for the purpose of including the Ducks Everywhere community in the Loot Survivor launch tournament",
  },
  // @ts-expect-error It's ok compiler
  [CollectionAddresses[Collections.KARAT][ChainId.SN_MAIN]]: {
    created: "2024",
    description:
      "Karats are composable gems discovered under the Realms. A fully on-chain generative art collection made with Dojo.",
  },
  // @ts-expect-error It's ok compiler
  [CollectionAddresses[Collections.JOKERSOFNEON][ChainId.SN_MAIN]]: {
    created: "2024",
    description:
      "Jokers of Neon mod exclusive collection",
  },
  // @ts-expect-error It's ok compiler
  [CollectionAddresses[Collections.ETERNUMSEASONPASS][ChainId.SN_MAIN]]: {
    created: "2024",
    description:
      "Eternum Season Pass",
  },
};

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
      bannerSrc: "/banners/realms.png",
      collectionSrc: "/collections/realms.png",
      name: CollectionNames[Collections.REALMS],
      description: "Loot Realms",
      address: CollectionAddresses[Collections.REALMS][ChainId.SN_MAIN],
      itemsCount: 3788,
      // floorPrice: 0.12,
    },
    {
      bannerSrc: "/banners/syndicate-banner.png",
      collectionSrc: "/collections/syndicate-collection.svg",
      name: CollectionNames[Collections.SYNDICATE],
      description: "Syndicate",
      address: CollectionAddresses[Collections.SYNDICATE][ChainId.SN_MAIN],
      itemsCount: 1600,
      // floorPrice: 0.12,
    },
    {
      bannerSrc: "/banners/realms.png",
      collectionSrc: "/collections/eternum-season-pass.png",
      name: CollectionNames[Collections.ETERNUMSEASONPASS],
      description: "Eternum Season Pass",
      address: CollectionAddresses[Collections.ETERNUMSEASONPASS][ChainId.SN_MAIN],
      itemsCount: 0,
      // floorPrice: 0.12,
    },
    {
      bannerSrc: "/banners/dungeon-ducks-banner.png",
      collectionSrc: "/collections/dungeon-ducks-collection.png",
      name: CollectionNames[Collections.DUNGEON_DUCKS],
      description: "Dungeon Ducks",
      address: CollectionAddresses[Collections.DUNGEON_DUCKS][ChainId.SN_MAIN],
      itemsCount: 300,
      // floorPrice: 0.12,
    },
    {
      bannerSrc: "/banners/karat.png",
      collectionSrc: "/collections/karat.png",
      name: CollectionNames[Collections.KARAT],
      description: "Karat",
      address: CollectionAddresses[Collections.KARAT][ChainId.SN_MAIN],
      itemsCount: 512,
      // floorPrice: 0.12,
    },
    {
      bannerSrc: "/banners/jokersofneon.png",
      collectionSrc: "/collections/jokersofneon.png",
      name: CollectionNames[Collections.JOKERSOFNEON],
      description: "Jokers of Neon mod exclusive collection",
      address: CollectionAddresses[Collections.JOKERSOFNEON][ChainId.SN_MAIN],
      itemsCount: 2,
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
      name: CollectionNames[Collections.LOOTSURVIVOR],
      address: CollectionAddresses[Collections.LOOTSURVIVOR][ChainId.SN_MAIN],
      image: "/collections/loot-survivor.png",
      banner_image: "/banners/loot-survivor.png",
    },
    {
      name: CollectionNames[Collections.REALMS],
      address: CollectionAddresses[Collections.REALMS][ChainId.SN_MAIN],
      image: "/collections/realms.png",
      banner_image: "/banners/realms.png",
    },
    {
      name: CollectionNames[Collections.ETERNUMSEASONPASS],
      address: CollectionAddresses[Collections.ETERNUMSEASONPASS][ChainId.SN_MAIN],
      image: "/collections/eternum-season-pass.png",
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
    {
      name: CollectionNames[Collections.SYNDICATE],
      address: CollectionAddresses[Collections.SYNDICATE][ChainId.SN_MAIN],
      image: "/collections/syndicate-collection.svg",
      banner_image: "/banners/syndicate-banner.png",
    },
    {
      name: CollectionNames[Collections.DUNGEON_DUCKS],
      address: CollectionAddresses[Collections.DUNGEON_DUCKS][ChainId.SN_MAIN],
      image: "/collections/dungeon-ducks-collection.png",
      banner_image: "/banners/dungeon-ducks-banner.png",
    },
    {
      name: CollectionNames[Collections.KARAT],
      address: CollectionAddresses[Collections.KARAT][ChainId.SN_MAIN],
      image: "/collections/karat.png",
      banner_image: "/banners/karat.png",
    },
    {
      name: CollectionNames[Collections.JOKERSOFNEON],
      address: CollectionAddresses[Collections.JOKERSOFNEON][ChainId.SN_MAIN],
      image: "/collections/jokersofneon.png",
      banner_image: "/banners/jokersofneon.png",
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
