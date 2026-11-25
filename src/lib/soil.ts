export interface SoilInput {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
  organicCarbon: number;
  ec: number;
  moisture: number;
  temperature: number;
  soilType: string;
}

export type Level = "Low" | "Medium" | "High";

export interface SoilResult {
  rating: "Poor" | "Average" | "Good" | "Excellent";
  score: number; // 0-100
  levels: Record<keyof Omit<SoilInput, "soilType">, Level>;
  phStatus: "Acidic" | "Neutral" | "Alkaline";
  suggestions: string[];
  crops: string[];
}

const clamp01 = (v: number, min: number, max: number) =>
  Math.min(1, Math.max(0, (v - min) / (max - min)));

function level(v: number, lowMax: number, medMax: number): Level {
  if (v < lowMax) return "Low";
  if (v < medMax) return "Medium";
  return "High";
}

export function analyzeSoil(input: SoilInput): SoilResult {
  const { nitrogen, phosphorus, potassium, ph, organicCarbon, ec, moisture } = input;

  // Ideal agronomic bands (heuristic for Indian soils)
  const nScore = clamp01(nitrogen, 0, 300) * (1 - Math.abs(clamp01(nitrogen, 0, 560) - 0.5) * 0.6);
  const pScore = clamp01(phosphorus, 0, 40) * (1 - Math.abs(clamp01(phosphorus, 0, 80) - 0.5) * 0.6);
  const kScore = clamp01(potassium, 0, 100) * (1 - Math.abs(clamp01(potassium, 0, 200) - 0.5) * 0.6);

  // pH: ideal 6.0-7.5, penalty outside
  const phScore =
    ph >= 6.0 && ph <= 7.5 ? 1 : ph < 6.0 ? clamp01(ph, 4.0, 6.0) : clamp01(ph, 7.5, 9.5);

  const ocScore = clamp01(organicCarbon, 0, 1.2);
  const ecScore = ec <= 0.8 ? 1 : Math.max(0, 1 - (ec - 0.8) / 2.2); // salinity penalty
  const moistureScore = clamp01(moisture, 5, 40) * (1 - Math.abs(clamp01(moisture, 0, 60) - 0.5) * 0.5);

  const weighted =
    nScore * 0.18 +
    pScore * 0.14 +
    kScore * 0.14 +
    phScore * 0.2 +
    ocScore * 0.18 +
    ecScore * 0.08 +
    moistureScore * 0.08;

  const score = Math.round(Math.min(100, Math.max(0, weighted * 100)));

  const rating: SoilResult["rating"] =
    score >= 80 ? "Excellent" : score >= 60 ? "Good" : score >= 40 ? "Average" : "Poor";

  const phStatus: SoilResult["phStatus"] = ph < 6.0 ? "Acidic" : ph > 7.5 ? "Alkaline" : "Neutral";

  const levels = {
    nitrogen: level(nitrogen, 140, 280),
    phosphorus: level(phosphorus, 15, 30),
    potassium: level(potassium, 60, 120),
    ph: level(Math.abs(ph - 6.75) < 0.75 ? 2 : Math.abs(ph - 6.75) < 1.75 ? 1 : 0, 1, 2),
    organicCarbon: level(organicCarbon, 0.5, 0.75),
    ec: level(ec, 1.0, 2.0),
    moisture: level(moisture, 15, 30),
    temperature: level(input.temperature, 15, 35),
  } as SoilResult["levels"];

  // Crop suitability — heuristic matrix by soil type + NPK/pH profile
  const crops = recommendCrops(input);

  return { rating, score, levels, phStatus, suggestions: buildSuggestions(input, levels, phStatus), crops };
}

function recommendCrops(input: SoilInput): string[] {
  const { nitrogen, phosphorus, potassium, ph, organicCarbon, ec, soilType } = input;

  const bySoil: Record<string, string[]> = {
    Alluvial: ["Wheat", "Rice", "Sugarcane", "Maize", "Mustard"],
    Black: ["Cotton", "Soybean", "Sorghum", "Sugarcane", "Sunflower"],
    Red: ["Groundnut", "Millets", "Pigeon Pea", "Castor", "Mango"],
    Sandy: ["Bajra", "Watermelon", "Cluster Bean", "Cumin", "Date Palm"],
    Clay: ["Rice", "Jute", "Taro", "Sugarcane", "Amaranth"],
    Loamy: ["Wheat", "Vegetables", "Pulses", "Maize", "Berseem"],
  };

  let base = [...(bySoil[soilType] ?? ["Mixed Farming"])];

  // Adjust for pH extremes
  if (ph < 5.5) base = base.filter((c) => !["Wheat", "Berseem"].includes(c)).concat(["Tea", "Potato"]);
  if (ph > 8.5) base = base.filter((c) => !["Potato", "Tea"].includes(c)).concat(["Barley", "Date Palm"]);
  if (ec > 1.5) base = base.filter((c) => !["Berseem", "Pulses"].includes(c)).concat(["Barley", "Dhaincha"]);
  if (nitrogen >= 200 && phosphorus >= 20 && potassium >= 100)
    base = ["Sugarcane", "Banana", "Wheat", ...base.filter((c) => c !== "Sugarcane")].slice(0, 5);
  if (nitrogen < 80 && phosphorus < 10 && potassium < 50)
    base = base.filter((c) => !["Sugarcane", "Banana"].includes(c));

  if (organicCarbon < 0.4 && ec > 1.0) base = base.slice(0, 3);

  return [...new Set(base)].slice(0, 5);
}

function buildSuggestions(
  input: SoilInput,
  levels: SoilResult["levels"],
  phStatus: SoilResult["phStatus"]
): string[] {
  const s: string[] = [];
  if (levels.nitrogen === "Low")
    s.push("Apply urea or nitrogen-rich fertilizer (e.g., 40–60 kg N/ha); add compost or farmyard manure.");
  if (levels.nitrogen === "High")
    s.push("Nitrogen is high — reduce urea use this season to avoid lodging and groundwater nitrate loss.");
  if (levels.phosphorus === "Low")
    s.push("Broadcast single super phosphate (SSP) before sowing to raise phosphorus availability.");
  if (levels.potassium === "Low")
    s.push("Apply muriate of potash (MOP) at sowing; mulch crop residue to recycle potassium.");
  if (phStatus === "Acidic")
    s.push("Soil is acidic — apply agricultural lime (2–4 t/ha) two weeks before sowing to raise pH.");
  if (phStatus === "Alkaline")
    s.push("Soil is alkaline/saline — apply gypsum (1–2 t/ha) and use drip irrigation to leach salts.");
  if (levels.organicCarbon === "Low")
    s.push("Organic carbon is low — add 5–10 t/ha of well-decomposed farmyard manure or vermicompost; grow a green manure crop (dhaincha/sunhemp).");
  if (levels.ec === "High")
    s.push("Electrical conductivity is high (salinity risk) — flush the field with good-quality water before planting.");
  if (levels.moisture === "Low")
    s.push("Moisture is low — irrigate before sowing and mulch with straw to retain water.");
  if (levels.moisture === "High")
    s.push("Moisture is high — improve drainage with raised beds to prevent root rot.");
  if (s.length === 0)
    s.push("Your soil looks balanced. Keep adding compost each season and rotate legumes with cereals.");
  return s;
}
