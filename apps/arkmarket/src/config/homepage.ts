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

export const homepageConfig = {
  mainCarousel: [
    {
      bannerSrc: "/banners/blobert.png",
      collectionSrc: "/collections/everai.png",
      name: Collections.BLOBERT,
      description: "Blob Blob",
      address: CollectionAddresses[Collections.BLOBERT][ChainId.SN_MAIN],
      itemsCount: 3000,
      // floorPrice: 0.12,
    },
    {
      bannerSrc: "/banners/blobert.png",
      collectionSrc: "/collections/everai.png",
      name: Collections.BEASTS,
      description: "Blob Blob",
      address: CollectionAddresses[Collections.BEASTS][ChainId.SN_MAIN],
      itemsCount: 3000,
      // floorPrice: 0.12,
    },
    {
      bannerSrc: "/banners/blobert.png",
      collectionSrc: "/collections/everai.png",
      name: Collections.GOLDEN_TOKEN,
      description: "Blob Blob",
      address: CollectionAddresses[Collections.GOLDEN_TOKEN][ChainId.SN_MAIN],
      itemsCount: 3000,
      // floorPrice: 0.12,
    },
    {
      bannerSrc: "/banners/blobert.png",
      collectionSrc: "/collections/everai.png",
      name: Collections.REALMS,
      description: "Blob Blob",
      address: CollectionAddresses[Collections.REALMS][ChainId.SN_MAIN],
      itemsCount: 3000,
      // floorPrice: 0.12,
    },
    {
      bannerSrc: "/banners/blobert.png",
      collectionSrc: "/collections/everai.png",
      name: Collections.REALMS,
      description: "Blob Blob",
      address: CollectionAddresses[Collections.REALMS][ChainId.SN_MAIN],
      itemsCount: 3000,
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
  trendingNow: [
    {
      name: "EveraiDuo",
      address:
        "0x02acee8c430f62333cf0e0e7a94b2347b5513b4c25f699461dd8d7b23c072478",
      image:
        "https://media.arkproject.dev/contracts/0x02acee8c430f62333cf0e0e7a94b2347b5513b4c25f699461dd8d7b23c072478/avatar.png",
      first_nft: "/nfts/everai_1.png",
      second_nft: "/nfts/everai_2.png",
      third_nft: "/nfts/everai_3.png",
      token_count: 923,
    },
    {
      name: "Starkurabu",
      address:
        "0x03ab1124ef9ec3a2f2b1d9838f9066f9a894483d40b33390dda8d85c01a315a3",
      image:
        "https://img.starkurabu.com/15576896767724894447561965312147459.png",
      first_nft: "/nfts/starkurabu_1.png",
      second_nft: "/nfts/starkurabu_2.png",
      third_nft: "/nfts/starkurabu_3.png",
      token_count: 10_000,
    },
    {
      name: "Influence CrewMate",
      address:
        "0x0241b9c4ce12c06f49fee2ec7c16337386fa5185168f538a7631aacecdf3df74",
      image:
        "https://media.arkproject.dev/contracts/0x0241b9c4ce12c06f49fee2ec7c16337386fa5185168f538a7631aacecdf3df74/avatar.jpg",
      first_nft: "/nfts/crewmates_1.png",
      second_nft: "/nfts/crewmates_2.png",
      third_nft: "/nfts/crewmates_3.png",
      token_count: 18_926,
    },
    {
      name: "Everai",
      address:
        "0x02acee8c430f62333cf0e0e7a94b2347b5513b4c25f699461dd8d7b23c072478",
      image: "/collections/everai.png",
      first_nft: "/nfts/everai_1.png",
      second_nft: "/nfts/everai_2.png",
      third_nft: "/nfts/everai_3.png",
      token_count: 919,
    },
  ],
  exploreCollections: [
    {
      name: Collections.REALMS,
      address: CollectionAddresses[Collections.REALMS][ChainId.SN_MAIN],
      image: "/collections/c6fc5552-1051-4f68-87c9-fcd6ddc1f026.jpeg",
      banner_image: "/banners/blobert.png",
    },
    {
      name: Collections.BLOBERT,
      address: CollectionAddresses[Collections.BLOBERT][ChainId.SN_MAIN],
      image: "/collections/c6fc5552-1051-4f68-87c9-fcd6ddc1f026.jpeg",
      banner_image: "/banners/blobert.png",
    },
    {
      name: Collections.BEASTS,
      address: CollectionAddresses[Collections.BEASTS][ChainId.SN_MAIN],
      image: "/collections/c6fc5552-1051-4f68-87c9-fcd6ddc1f026.jpeg",
      banner_image: "/banners/blobert.png",
    },
    {
      name: Collections.GOLDEN_TOKEN,
      address: CollectionAddresses[Collections.GOLDEN_TOKEN][ChainId.SN_MAIN],
      image: "/collections/c6fc5552-1051-4f68-87c9-fcd6ddc1f026.jpeg",
      banner_image: "/banners/blobert.png",
    },
    {
      name: Collections.BANNERS,
      address: CollectionAddresses[Collections.BANNERS][ChainId.SN_MAIN],
      image: "/collections/c6fc5552-1051-4f68-87c9-fcd6ddc1f026.jpeg",
      banner_image: "/banners/blobert.png",
    },
  ],
  liveAuctions: [
    {
      name: "Nounsters #23",
      image: "/nfts/nounsters_23.png",
    },
    {
      name: "Masked Duck",
      image: "/nfts/masked_duck.png",
    },
    {
      name: "Nounsters #67",
      image: "/nfts/nounsters_67.png",
    },
    {
      name: "Canadian Rapper Duck",
      image: "/nfts/canadian_rapper_duck.png",
    },
    {
      name: "Nounsters #23",
      image: "/nfts/nounsters_23.png",
    },
    {
      name: "Masked Duck",
      image: "/nfts/masked_duck.png",
    },
    {
      name: "Nounsters #67",
      image: "/nfts/nounsters_67.png",
    },
    {
      name: "Canadian Rapper Duck",
      image: "/nfts/canadian_rapper_duck.png",
    },
  ],
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
    {
      token: {
        name: "Everai #2345",
        collection_name: "Everai",
        collection_address:
          "0x02acee8c430f62333cf0e0e7a94b2347b5513b4c25f699461dd8d7b23c072478",
        image: "/nfts/everai_2.png",
      },
      price: "52500000000000000",
      from: "0x7689b5",
      to: "kwiss.stark",
    },
    {
      token: {
        name: "Everai #2345",
        collection_name: "Everai",
        collection_address:
          "0x02acee8c430f62333cf0e0e7a94b2347b5513b4c25f699461dd8d7b23c072478",
        image: "/nfts/everai_3.png",
      },
      price: "52500000000000000",
      from: "0x7689b5",
      to: "kwiss.stark",
    },
  ],
};
