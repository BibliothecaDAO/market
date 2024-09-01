export const homepageConfig = {
  mainCarousel: [
    {
      bannerSrc: "/carousel_banner/everai.png",
      collectionSrc: "/collections/everai.png",
      name: "Everai",
      description:
        "In the Everai Universe, the Everais stand as the mightiest heroes of Shodai's civilization… Get yours now to join us in this collaborative journey to shape the Everai Universe!",
      address:
        "0x02acee8c430f62333cf0e0e7a94b2347b5513b4c25f699461dd8d7b23c072478",
      itemsCount: 923,
      floorPrice: 0.12,
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
      name: "Blobert",
      address:
        "0x00539f522b29ae9251dbf7443c7a950cf260372e69efab3710a11bf17a9599f1",
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
