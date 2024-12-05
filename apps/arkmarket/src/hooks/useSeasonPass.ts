import { useMemo } from "react";
import { ChainId, CollectionAddresses, Collections } from "~/config/homepage";
import type { CollectionToken, Token } from "~/types";

export interface Resources {
  trait: string;
  value: number;
  colour: string;
  id: number;
  description: string;
  img: string;
  ticker: string;
  rarity?: string;
}

export const resources: Resources[] = [
  {
    trait: "Stone",
    value: 3941,
    colour: "#e0e0e0",
    id: 1,
    description: "Stone masonry is a culture bending the bones of the earth itself to their own purpose.",
    img: "https://github.com/BibliothecaDAO/eternum/blob/main/client/public/images/resources/2.png?raw=true",
    ticker: "$STONE",
  },
  {
    trait: "Coal",
    value: 3833,
    colour: "#757575",
    id: 2,
    description:
      "Coal is the only answer when fire is not enough to stave off the gnawing, winter cold or the ravenous demands of iron forges.",
    img: "https://github.com/BibliothecaDAO/eternum/blob/main/client/public/images/resources/3.png?raw=true",
    ticker: "$COAL",
  },
  {
    trait: "Wood",
    value: 5015,
    colour: "#78350f",
    id: 3,
    description: "Wood is the backbone of civilization. Fire, industry, and shelter spawned from its sinew and sap.",
    img: "https://github.com/BibliothecaDAO/eternum/blob/main/client/public/images/resources/1.png?raw=true",
    ticker: "$WOOD",
  },
  {
    trait: "Copper",
    value: 2643,
    colour: "#f59e0b",
    id: 4,
    description:
      "The malleability of copper is a strength. A copper axe will crush a skull as easily as a copper pot sizzles an egg.",
    img: "https://github.com/BibliothecaDAO/eternum/blob/main/client/public/images/resources/4.png?raw=true",
    ticker: "$COPPER",
  },
  {
    trait: "Ironwood",
    value: 1179,
    colour: "#b91c1c",
    id: 5,
    description:
      "Metallic minerals drawn from the ironwood's deep delving roots are the source of its legendary hardness and appearance.",
    img: "https://github.com/BibliothecaDAO/eternum/blob/main/client/public/images/resources/7.png?raw=true",
    ticker: "$IRNWD",
  },
  {
    trait: "Obsidian",
    value: 2216,
    colour: "#000000",
    id: 6,
    description:
      "Hard and brittle, obsidian can be honed to a razors edge nanometers wide, parting armor on an atomic level. The preferred material of assassins and cheap jewelers.",
    img: "https://github.com/BibliothecaDAO/eternum/blob/main/client/public/images/resources/5.png?raw=true",
    ticker: "$OBS",
  },
  {
    trait: "Gold",
    value: 914,
    colour: "#fcd34d",
    id: 7,
    description: "Ripped from its million-year geological womb within the earth to be hoarded in mortal coffers.",
    img: "https://github.com/BibliothecaDAO/eternum/blob/main/client/public/images/resources/9.png?raw=true",
    ticker: "$GOLD",
  },
  {
    trait: "Silver",
    value: 1741,
    colour: "#eeeeee",
    id: 8,
    description: "The luster and rarity of silver draws out the basest instinct of laymen and nobility alike. Greed.",
    img: "https://github.com/BibliothecaDAO/eternum/blob/main/client/public/images/resources/6.png?raw=true",
    ticker: "$SILVER",
  },
  {
    trait: "Mithral",
    value: 37,
    colour: "#60a5fa",
    id: 9,
    description:
      "This otherworldly metal has the strength of adamantine but is lighter than air. The pieces are held in place by strange gravitational core. Those who spend much time with it slowly succumb to neurotic delusions of a rapturous, divine apocalypse.",
    img: "https://github.com/BibliothecaDAO/eternum/blob/main/client/public/images/resources/21.png?raw=true",
    ticker: "$MITHRL",
  },
  {
    trait: "Alchemical Silver",
    value: 93,
    colour: "#bdbdbd",
    id: 10,
    description:
      "Alchemical Silver is found pooled beneath battlegrounds from a forgotten, lost era. It can retain an almost unlimited amount of potential energy, making it the perfect catalyst for those delving into the mysteries of the universe.",
    img: "https://github.com/BibliothecaDAO/eternum/blob/main/client/public/images/resources/19.png?raw=true",
    ticker: "$ALCHMY",
  },
  {
    trait: "Cold Iron",
    value: 957,
    colour: "#fca5a5",
    id: 11,
    description:
      "Something has infected this metallic ore with a cruel chill and an extraordinary thirst for the warmth of living things.",
    img: "https://github.com/BibliothecaDAO/eternum/blob/main/client/public/images/resources/8.png?raw=true",
    ticker: "$CLDIRN",
  },
  {
    trait: "Deep Crystal",
    value: 239,
    colour: "#93c5fd",
    id: 12,
    description:
      "Deep crystal was imprisoned from the mortal world by a timeless geode, the source of these formations have confounded scholars for centuries. Strange vibrations can be felt when held.",
    img: "https://github.com/BibliothecaDAO/eternum/blob/main/client/public/images/resources/14.png?raw=true",
    ticker: "$CRYSTL",
  },
  {
    trait: "Ruby",
    value: 239,
    colour: "#dc2626",
    id: 13,
    description:
      "Rubies are the chimeric fusion of metal alloys and oxygen. This hybrid of metal and minerals is often scarcer than the lives of those who seek it.",
    img: "https://github.com/BibliothecaDAO/eternum/blob/main/client/public/images/resources/13.png?raw=true",
    ticker: "$RUBY",
  },
  {
    trait: "Diamonds",
    value: 300,
    colour: "#ccbcfb",
    id: 14,
    description:
      "Diamonds carry the hardness of obsidian, the strength of cold iron, and the preciousness of gold. Blood is easily spilled in its name.",
    img: "https://github.com/BibliothecaDAO/eternum/blob/main/client/public/images/resources/11.png?raw=true",
    ticker: "$DMND",
  },
  {
    trait: "Hartwood",
    value: 594,
    colour: "#fca5a5",
    id: 15,
    description:
      "Revered by the Orders of Cunning, hartwood is only cut in dire circumstance. It bleeds like any mortal and some claim to hear voices from its sap long after being tapped from the trunk.",
    img: "https://github.com/BibliothecaDAO/eternum/blob/main/client/public/images/resources/10.png?raw=true",
    ticker: "$HRTWD",
  },
  {
    trait: "Ignium",
    value: 172,
    colour: "#ef4444",
    id: 16,
    description:
      "Some horrible power has irrevocably scarred this ignium stone with an infernal radiation that evaporates water and skin alike.",
    img: "https://github.com/BibliothecaDAO/eternum/blob/main/client/public/images/resources/15.png?raw=true",
    ticker: "$IGNIUM",
  },
  {
    trait: "Twilight Quartz",
    value: 111,
    colour: "#6d28d9",
    id: 17,
    description:
      "Fortunately, this gemstone grows deep within the earth, far away from the soft flesh of mortal kind. Its elegance hides a tendency to rapidly engulf organic matter it encounters in a matter of hours.",
    img: "https://github.com/BibliothecaDAO/eternum/blob/main/client/public/images/resources/18.png?raw=true",
    ticker: "$QUARTZ",
  },
  {
    trait: "True Ice",
    value: 139,
    colour: "#ffffff",
    id: 18,
    description:
      "True ice does not melt, it is carved like living stone from frozen abyssal caverns far beneath the earth. Many a careless mason has lost their life when placing this near Ignium.",
    img: "https://github.com/BibliothecaDAO/eternum/blob/main/client/public/images/resources/17.png?raw=true",
    ticker: "$TRUICE",
  },
  {
    trait: "Adamantine",
    value: 55,
    colour: "#1e3a8a",
    id: 19,
    description:
      "Adamantine forms around ontological anomalies like the immune response of a planetary entity. It contains the supernatural strength to contain such terrors from spreading. Woe to those who shortsightedly take it from its original purpose.",
    img: "https://github.com/BibliothecaDAO/eternum/blob/main/client/public/images/resources/20.png?raw=true",
    ticker: "$ADMT",
  },
  {
    trait: "Sapphire",
    value: 247,
    colour: "#3b82f6",
    id: 20,
    description:
      "Sapphires are given birth from titanic forces that crush and grind for thousands of years in a hellscape of heat and pressure. The result is a gemstone accustomed to both pain and beauty.",
    img: "https://github.com/BibliothecaDAO/eternum/blob/main/client/public/images/resources/12.png?raw=true",
    ticker: "$SPHR",
  },
  {
    trait: "Ethereal Silica",
    value: 162,
    colour: "#10b981",
    id: 21,
    description:
      "Ethereal silica is a glass that funnels and bends light in ways that deviate from known physics. Those exposed for long periods of time experience an all- consuming lethargic bliss.",
    img: "https://github.com/BibliothecaDAO/eternum/blob/main/client/public/images/resources/16.png?raw=true",
    ticker: "$SILICA",
  },
  {
    trait: "Dragonhide",
    value: 23,
    colour: "#ec4899",
    id: 22,
    description:
      "Dragons are the hidden guardians of our reality. No mortal can witness their work, lest they be purged by dragonfire. If you find one of these scales, flee. Only death can be found in their presence or by the forces they fight in secret.",
    img: "https://github.com/BibliothecaDAO/eternum/blob/main/client/public/images/resources/22.png?raw=true",
    ticker: "$DRGNHD",
  },
  {
    trait: "Donkey",
    value: 249,
    colour: "#ec4899",
    id: 249,
    description: "Donkey.",
    img: "https://github.com/BibliothecaDAO/eternum/blob/main/client/public/images/resources/249.png?raw=true",
    ticker: "$DONKEY",
  },
  {
    trait: "Knight",
    value: 250,
    colour: "#ec4899",
    id: 250,
    description: "Wheat.",
    img: "https://github.com/BibliothecaDAO/eternum/blob/main/client/public/images/resources/250.png?raw=true",
    ticker: "$KNIGHT",
  },
  {
    trait: "Crossbowman",
    value: 251,
    colour: "#ec4899",
    id: 251,
    description: "Wheat.",
    img: "https://github.com/BibliothecaDAO/eternum/blob/main/client/public/images/resources/251.png?raw=true",
    ticker: "$CRSSBW",
  },
  {
    trait: "Paladin",
    value: 252,
    colour: "#ec4899",
    id: 252,
    description: "Wheat.",
    img: "https://github.com/BibliothecaDAO/eternum/blob/main/client/public/images/resources/252.png?raw=true",
    ticker: "$PLDN",
  },
  {
    trait: "Lords",
    value: 253,
    colour: "#ec4899",
    id: 253,
    description: "Lords.",
    img: "https://github.com/BibliothecaDAO/eternum/blob/main/client/public/images/resources/253.png?raw=true",
    ticker: "$LORDS",
  },
  {
    trait: "Wheat",
    value: 254,
    colour: "#F5DEB3",
    id: 254,
    description: "Wheat.",
    img: "https://github.com/BibliothecaDAO/eternum/blob/main/client/public/images/resources/254.png?raw=true",
    ticker: "$WHEAT",
  },
  {
    trait: "Fish",
    value: 255,
    colour: "#87CEEB",
    id: 255,
    description: "Fish.",
    img: "https://github.com/BibliothecaDAO/eternum/blob/main/client/public/images/resources/255.png?raw=true",
    ticker: "$FISH",
  },
  {
    trait: "Ancient Fragment",
    value: 29,
    colour: "#ec4899",
    id: 29,
    description: "Ancient Fragment is a rare and powerful resource that can be used to create powerful items.",
    img: "https://github.com/BibliothecaDAO/eternum/blob/main/client/public/images/resources/29.png?raw=true",
    ticker: "$FRAGMENT",
  },
];

export function useSeasonPass(token: Token | CollectionToken) {
  const isSeasonPass = (collectionAddress: string) => collectionAddress === CollectionAddresses[Collections.ETERNUMSEASONPASS][ChainId.SN_MAIN];
  const realmsResources: Resources[] = useMemo(() => {
    return token.metadata?.attributes.map((a) => resources.find(r => r.trait === a.value)).filter(Boolean) as Resources[]
  }, [token])

  return {
    isSeasonPass,
    realmsResources,
  }
}
