import type { Lang } from "./i18n";

export interface Crop {
  name: string;
  nameHi: string;
  icon: string;
  soilTypes: string[];
  seasons: Array<"kharif" | "rabi" | "zaid">;
  water: "Low" | "Medium" | "High";
  waterHi: string;
  durationDays: string;
  sowWindow: string;
  sowWindowHi: string;
  prefersPh: [number, number];
}

export const crops: Crop[] = [
  { name: "Wheat", nameHi: "गेहूँ", icon: "Wheat", soilTypes: ["Alluvial", "Loamy"], seasons: ["rabi"], water: "Medium", waterHi: "मध्यम", durationDays: "120–140", sowWindow: "Nov–Dec", sowWindowHi: "नव–दिस", prefersPh: [6.0, 7.5] },
  { name: "Rice", nameHi: "धान", icon: "Sprout", soilTypes: ["Alluvial", "Clay"], seasons: ["kharif"], water: "High", waterHi: "अधिक", durationDays: "120–150", sowWindow: "Jun–Jul", sowWindowHi: "जून–जुल", prefersPh: [5.5, 7.0] },
  { name: "Cotton", nameHi: "कपास", icon: "Flower2", soilTypes: ["Black"], seasons: ["kharif"], water: "Medium", waterHi: "मध्यम", durationDays: "150–180", sowWindow: "May–Jun", sowWindowHi: "मई–जून", prefersPh: [6.0, 8.0] },
  { name: "Sugarcane", nameHi: "गन्ना", icon: "Grass", soilTypes: ["Alluvial", "Black", "Clay"], seasons: ["kharif", "rabi"], water: "High", waterHi: "अधिक", durationDays: "300–365", sowWindow: "Feb–Mar / Oct", sowWindowHi: "फ़र–मार्च / अक्टू", prefersPh: [6.5, 7.5] },
  { name: "Maize", nameHi: "मक्का", icon: "Corn", soilTypes: ["Alluvial", "Loamy"], seasons: ["kharif", "zaid", "rabi"], water: "Medium", waterHi: "मध्यम", durationDays: "90–110", sowWindow: "Jun–Jul", sowWindowHi: "जून–जुल", prefersPh: [5.8, 7.5] },
  { name: "Groundnut", nameHi: "मूंगफली", icon: "Nut", soilTypes: ["Red", "Sandy"], seasons: ["kharif", "zaid"], water: "Low", waterHi: "कम", durationDays: "100–130", sowWindow: "Jun–Jul", sowWindowHi: "जून–जुल", prefersPh: [6.0, 7.5] },
  { name: "Soybean", nameHi: "सोयाबीन", icon: "Leaf", soilTypes: ["Black"], seasons: ["kharif"], water: "Medium", waterHi: "मध्यम", durationDays: "95–110", sowWindow: "Jun–Jul", sowWindowHi: "जून–जुल", prefersPh: [6.0, 7.5] },
  { name: "Millets", nameHi: "बाजरा/मोती बाजरा", icon: "Wheat", soilTypes: ["Red", "Sandy"], seasons: ["kharif", "zaid"], water: "Low", waterHi: "कम", durationDays: "75–95", sowWindow: "Jun–Aug", sowWindowHi: "जून–अग", prefersPh: [5.5, 8.0] },
  { name: "Bajra", nameHi: "बाजरा", icon: "Wheat", soilTypes: ["Sandy"], seasons: ["kharif"], water: "Low", waterHi: "कम", durationDays: "75–90", sowWindow: "Jul", sowWindowHi: "जुलाई", prefersPh: [6.0, 8.5] },
  { name: "Mustard", nameHi: "सरसों", icon: "Flower", soilTypes: ["Alluvial", "Loamy"], seasons: ["rabi"], water: "Low", waterHi: "कम", durationDays: "110–130", sowWindow: "Oct–Nov", sowWindowHi: "अक्टू–नव", prefersPh: [6.0, 7.5] },
  { name: "Pigeon Pea", nameHi: "अरहर", icon: "Bean", soilTypes: ["Red"], seasons: ["kharif"], water: "Low", waterHi: "कम", durationDays: "150–180", sowWindow: "Jun–Jul", sowWindowHi: "जून–जुल", prefersPh: [6.0, 7.5] },
  { name: "Sorghum", nameHi: "ज्वार", icon: "Grass", soilTypes: ["Black"], seasons: ["kharif", "rabi"], water: "Low", waterHi: "कम", durationDays: "100–120", sowWindow: "Jun–Jul / Sep–Oct", sowWindowHi: "जून–जुल / सित–अक्टू", prefersPh: [5.5, 8.0] },
  { name: "Jute", nameHi: "जूट", icon: "Sprout", soilTypes: ["Clay"], seasons: ["kharif"], water: "High", waterHi: "अधिक", durationDays: "100–120", sowWindow: "Mar–Apr", sowWindowHi: "मार्च–अप्रै", prefersPh: [5.5, 7.0] },
  { name: "Sunflower", nameHi: "सूरजमुखी", icon: "Sun", soilTypes: ["Black", "Loamy"], seasons: ["rabi", "zaid"], water: "Medium", waterHi: "मध्यम", durationDays: "100–115", sowWindow: "Sep–Nov / Jan–Feb", sowWindowHi: "सित–नव / जन–फ़र", prefersPh: [6.0, 8.0] },
  { name: "Watermelon", nameHi: "तरबूज़", icon: "Melon", soilTypes: ["Sandy"], seasons: ["zaid"], water: "Medium", waterHi: "मध्यम", durationDays: "85–100", sowWindow: "Jan–Mar", sowWindowHi: "जन–मार्च", prefersPh: [6.0, 7.5] },
  { name: "Vegetables", nameHi: "सब्ज़ियाँ", icon: "Carrot", soilTypes: ["Loamy"], seasons: ["kharif", "rabi", "zaid"], water: "Medium", waterHi: "मध्यम", durationDays: "60–120", sowWindow: "Year-round by crop", sowWindowHi: "फ़सल अनुसार", prefersPh: [6.0, 7.5] },
  { name: "Barley", nameHi: "जौ", icon: "Wheat", soilTypes: ["Alluvial", "Sandy"], seasons: ["rabi"], water: "Low", waterHi: "कम", durationDays: "100–120", sowWindow: "Nov–Dec", sowWindowHi: "नव–दिस", prefersPh: [6.5, 8.5] },
  { name: "Pulses", nameHi: "दालें (मसूर/चना)", icon: "Bean", soilTypes: ["Loamy", "Alluvial"], seasons: ["rabi"], water: "Low", waterHi: "कम", durationDays: "90–120", sowWindow: "Oct–Nov", sowWindowHi: "अक्टू–नव", prefersPh: [6.0, 7.5] },
  { name: "Cumin", nameHi: "जीरा", icon: "Leaf", soilTypes: ["Sandy"], seasons: ["rabi"], water: "Low", waterHi: "कम", durationDays: "100–115", sowWindow: "Nov", sowWindowHi: "नवंबर", prefersPh: [6.0, 8.0] },
  { name: "Mango", nameHi: "आम", icon: "Apple", soilTypes: ["Red"], seasons: ["kharif", "rabi", "zaid"], water: "Medium", waterHi: "मध्यम", durationDays: "Perennial", sowWindow: "Jul–Sep", sowWindowHi: "जुल–सित", prefersPh: [5.5, 7.5] },
];

export function cropName(c: Crop, lang: Lang) {
  return lang === "hi" ? c.nameHi : c.name;
}

export function sowWindow(c: Crop, lang: Lang) {
  return lang === "hi" ? c.sowWindowHi : c.sowWindow;
}

export function waterLabel(c: Crop, lang: Lang) {
  return lang === "hi" ? c.waterHi : c.water;
}
