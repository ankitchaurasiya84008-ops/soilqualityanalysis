import { useMemo, useState } from "react";
import { Droplet, CalendarDays, Timer } from "lucide-react";
import { crops, cropName, sowWindow, waterLabel } from "@/lib/crops";
import { useLang } from "@/lib/i18n";

type Season = "all" | "kharif" | "rabi" | "zaid";

export default function CropRecommendation() {
  const { t, lang } = useLang();
  const [soilType, setSoilType] = useState(0);
  const [season, setSeason] = useState<Season>("all");

  const soilNames = ["Alluvial", "Black", "Red", "Sandy", "Clay", "Loamy"];

  const filtered = useMemo(
    () =>
      crops.filter(
        (c) =>
          c.soilTypes.includes(soilNames[soilType]) &&
          (season === "all" || c.seasons.includes(season))
      ),
    [soilType, season]
  );

  return (
    <section id="crops" className="py-20 sm:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-leaf-700 font-semibold text-sm uppercase tracking-wider">
            {lang === "hi" ? "फसल पुस्तिका" : "Crop Library"}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-forest-900 mt-3">{t.crops.title}</h2>
          <p className="text-soil-700 mt-4 leading-relaxed">{t.crops.sub}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch sm:items-center mb-10">
          <select
            value={soilType}
            onChange={(e) => setSoilType(Number(e.target.value))}
            className="px-5 py-3 rounded-xl border border-leaf-200 bg-white text-forest-900 font-medium focus:outline-none focus:ring-2 focus:ring-leaf-500/40"
          >
            {t.analysis.soilTypes.map((s, i) => (
              <option key={s} value={i}>
                {s} {lang === "hi" ? "मिट्टी" : "soil"}
              </option>
            ))}
          </select>
          <div className="flex flex-wrap gap-2 justify-center">
            {(Object.keys(t.crops.seasons) as Season[]).map((s) => (
              <button
                key={s}
                onClick={() => setSeason(s)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  season === s
                    ? "bg-leaf-600 text-white shadow-md shadow-leaf-600/25"
                    : "bg-white border border-leaf-200 text-forest-800 hover:bg-leaf-50"
                }`}
              >
                {t.crops.seasons[s]}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <p className="text-center text-soil-600 py-12">{t.crops.noResults}</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((c) => (
              <div
                key={c.name}
                className="group bg-white rounded-2xl border border-leaf-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="font-display text-xl font-bold text-forest-900">{cropName(c, lang)}</span>
                  <span
                    className={`w-2.5 h-2.5 rounded-full mt-2 ${
                      c.water === "Low" ? "bg-harvest-400" : c.water === "Medium" ? "bg-leaf-500" : "bg-sky-500"
                    }`}
                    title={`${t.crops.water}: ${waterLabel(c, lang)}`}
                  />
                </div>
                <div className="space-y-2.5 text-sm">
                  <div className="flex items-center gap-2.5 text-soil-700">
                    <Droplet className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>
                      {t.crops.water}: <strong className="text-forest-900">{waterLabel(c, lang)}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 text-soil-700">
                    <Timer className="w-4 h-4 text-leaf-600 shrink-0" />
                    <span>
                      {t.crops.duration}: <strong className="text-forest-900">{c.durationDays}</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5 text-soil-700">
                    <CalendarDays className="w-4 h-4 text-harvest-600 shrink-0" />
                    <span>
                      {t.crops.sow}: <strong className="text-forest-900">{sowWindow(c, lang)}</strong>
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {c.seasons.map((s) => (
                    <span
                      key={s}
                      className="px-2.5 py-1 rounded-md bg-leaf-50 border border-leaf-100 text-leaf-700 text-[11px] font-semibold uppercase tracking-wide"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
