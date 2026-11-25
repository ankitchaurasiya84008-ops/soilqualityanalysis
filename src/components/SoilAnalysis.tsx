import { useMemo, useState } from "react";
import {
  Activity, Beaker, Droplets, FlaskConical, Gauge, Leaf, Sprout, Sun, Thermometer, Waves,
} from "lucide-react";
import { analyzeSoil, type SoilResult } from "@/lib/soil";
import { useLang } from "@/lib/i18n";
import { supabase } from "@/lib/supabase";

type FormKey = "nitrogen" | "phosphorus" | "potassium" | "ph" | "organicCarbon" | "ec" | "moisture" | "temperature";

const SAMPLE: Record<FormKey, string> = {
  nitrogen: "180", phosphorus: "22", potassium: "110", ph: "7.2",
  organicCarbon: "0.6", ec: "0.5", moisture: "24", temperature: "27",
};

const ratingStyles: Record<SoilResult["rating"], { ring: string; text: string; bg: string }> = {
  Poor: { ring: "#dc2626", text: "text-red-700", bg: "bg-red-50 border-red-200" },
  Average: { ring: "#d97706", text: "text-amber-700", bg: "bg-amber-50 border-amber-200" },
  Good: { ring: "#16a34a", text: "text-green-700", bg: "bg-green-50 border-green-200" },
  Excellent: { ring: "#15803d", text: "text-emerald-700", bg: "bg-emerald-50 border-emerald-200" },
};

const levelStyles = {
  Low: { bar: "bg-red-400", text: "text-red-600", bg: "bg-red-50" },
  Medium: { bar: "bg-amber-400", text: "text-amber-600", bg: "bg-amber-50" },
  High: { bar: "bg-green-500", text: "text-green-700", bg: "bg-green-50" },
};

export default function SoilAnalysis() {
  const { t, lang } = useLang();
  const [form, setForm] = useState<Record<FormKey, string>>({ ...SAMPLE, nitrogen: "", phosphorus: "", potassium: "", ph: "", organicCarbon: "", ec: "", moisture: "", temperature: "" });
  const [soilType, setSoilType] = useState(0);
  const [result, setResult] = useState<SoilResult | null>(null);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const fieldMeta: Array<{ key: FormKey; icon: typeof Leaf; step: string }> = [
    { key: "nitrogen", icon: Leaf, step: "0–560" },
    { key: "phosphorus", icon: FlaskConical, step: "0–80" },
    { key: "potassium", icon: Beaker, step: "0–200" },
    { key: "ph", icon: Gauge, step: "0–14" },
    { key: "organicCarbon", icon: Sprout, step: "0–2" },
    { key: "ec", icon: Waves, step: "0–3" },
    { key: "moisture", icon: Droplets, step: "0–100" },
    { key: "temperature", icon: Thermometer, step: "0–50" },
  ];

  const set = (k: FormKey, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const nums = Object.fromEntries(
      Object.entries(form).map(([k, v]) => [k, parseFloat(v)])
    ) as Record<FormKey, number>;
    for (const k of Object.keys(nums) as FormKey[]) {
      if (Number.isNaN(nums[k])) {
        setError(lang === "hi" ? "कृपया सभी मान भरें।" : "Please fill in every value.");
        return;
      }
    }
    const soilName = ["Alluvial", "Black", "Red", "Sandy", "Clay", "Loamy"][soilType];
    const res = analyzeSoil({ ...nums, soilType: soilName });
    setResult(res);

    setSaving(true);
    const { error: dbError } = await supabase.from("soil_analysis_results").insert({
      nitrogen: nums.nitrogen,
      phosphorus: nums.phosphorus,
      potassium: nums.potassium,
      ph_level: nums.ph,
      organic_carbon: nums.organicCarbon,
      electrical_conductivity: nums.ec,
      moisture: nums.moisture,
      temperature: nums.temperature,
      soil_type: soilName,
      quality_rating: res.rating,
      recommended_crops: res.crops.join(", "),
      language: lang,
    });
    setSaving(false);
    if (dbError) {
      console.error("Failed to save analysis", dbError);
    }
  };

  const fillSample = () => setForm({ ...SAMPLE });

  const ratingMeta = result ? ratingStyles[result.rating] : null;
  const score = result?.score ?? 0;

  return (
    <section id="analysis" className="py-20 sm:py-28 bg-gradient-to-b from-leaf-50 to-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-leaf-700 font-semibold text-sm uppercase tracking-wider">
            {lang === "hi" ? "इंटरैक्टिव उपकरण" : "Interactive Tool"}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-forest-900 mt-3">{t.analysis.title}</h2>
          <p className="text-soil-700 mt-4 leading-relaxed">{t.analysis.sub}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* form */}
          <form onSubmit={submit} className="lg:col-span-3 bg-white rounded-2xl shadow-sm border border-leaf-100 p-6 sm:p-8">
            <div className="grid sm:grid-cols-2 gap-5">
              {fieldMeta.map(({ key, icon: Icon, step }) => (
                <div key={key}>
                  <label className="flex items-center gap-2 text-sm font-semibold text-forest-900 mb-1.5">
                    <Icon className="w-4 h-4 text-leaf-600" />
                    {t.analysis.fields[key]}
                    <span className="text-xs font-normal text-soil-500">
                      ({t.analysis.units[key]}{step ? ` · ${step}` : ""})
                    </span>
                  </label>
                  <input
                    type="number"
                    step="any"
                    inputMode="decimal"
                    required
                    value={form[key]}
                    onChange={(e) => set(key, e.target.value)}
                    placeholder={t.analysis.placeholder}
                    className="w-full px-4 py-2.5 rounded-xl border border-leaf-200 bg-cream/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-leaf-500/40 focus:border-leaf-500 text-forest-900 transition-all"
                  />
                </div>
              ))}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-forest-900 mb-1.5">
                  <Activity className="w-4 h-4 text-leaf-600" />
                  {t.analysis.fields.soilType}
                </label>
                <select
                  value={soilType}
                  onChange={(e) => setSoilType(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-leaf-200 bg-cream/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-leaf-500/40 focus:border-leaf-500 text-forest-900 transition-all"
                >
                  {t.analysis.soilTypes.map((s, i) => (
                    <option key={s} value={i}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {error && (
              <p className="mt-4 px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">{error}</p>
            )}

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-leaf-600 hover:bg-leaf-700 disabled:opacity-60 text-white font-bold shadow-lg shadow-leaf-600/25 transition-all hover:-translate-y-0.5"
              >
                <Beaker className="w-5 h-5" />
                {t.analysis.submit}
              </button>
              <button
                type="button"
                onClick={fillSample}
                className="px-6 py-3.5 rounded-xl border border-leaf-300 bg-white text-leaf-700 font-semibold hover:bg-leaf-50 transition-colors"
              >
                {t.analysis.sample}
              </button>
            </div>
          </form>

          {/* result */}
          <div className="lg:col-span-2">
            {!result ? (
              <div className="h-full min-h-[320px] rounded-2xl border-2 border-dashed border-leaf-200 bg-white/60 flex flex-col items-center justify-center text-center p-8">
                <span className="w-16 h-16 rounded-2xl bg-leaf-50 text-leaf-600 flex items-center justify-center mb-4">
                  <Gauge className="w-8 h-8" />
                </span>
                <p className="text-soil-700 font-medium">
                  {lang === "hi"
                    ? "विश्लेषण के बाद आपकी रिपोर्ट यहाँ दिखेगी।"
                    : "Your soil report will appear here after analysis."}
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-lg border border-leaf-100 overflow-hidden animate-[fadeUp_0.5s_ease-out]">
                <div className={`px-6 py-5 border-b ${ratingMeta!.bg}`}>
                  <h3 className="font-display font-bold text-lg text-forest-900">{t.analysis.result.title}</h3>
                  <p className="text-sm text-soil-600">{t.analysis.result.rating}</p>
                </div>

                <div className="p-6 space-y-6">
                  {/* gauge */}
                  <div className="flex items-center gap-5">
                    <div className="relative w-28 h-28 shrink-0">
                      <svg viewBox="0 0 36 36" className="w-28 h-28 -rotate-90">
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e7efe5" strokeWidth="3.5" />
                        <circle
                          cx="18" cy="18" r="15.9" fill="none"
                          stroke={ratingMeta!.ring}
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeDasharray={`${score} 100`}
                          style={{ transition: "stroke-dasharray 1s ease" }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="font-display text-2xl font-bold text-forest-900">{score}</span>
                        <span className="text-[10px] text-soil-500 uppercase tracking-wide">/ 100</span>
                      </div>
                    </div>
                    <div>
                      <div className={`font-display text-2xl font-bold ${ratingMeta!.text}`}>{result.rating}</div>
                      <div className="text-sm text-soil-600 mt-1">
                        {t.analysis.fields.soilType}: {t.analysis.soilTypes[soilType]} · pH {result.phStatus}
                      </div>
                    </div>
                  </div>

                  {/* nutrient bars */}
                  <div>
                    <h4 className="text-sm font-bold text-forest-900 uppercase tracking-wide mb-3">
                      {t.analysis.result.nutrients}
                    </h4>
                    <div className="space-y-2.5">
                      {(["nitrogen", "phosphorus", "potassium", "organicCarbon", "ec", "moisture"] as const).map((k) => {
                        const lv = result.levels[k];
                        const st = levelStyles[lv];
                        const pct = lv === "Low" ? 33 : lv === "Medium" ? 66 : 100;
                        return (
                          <div key={k} className="flex items-center gap-3">
                            <span className="w-28 sm:w-32 text-xs font-medium text-soil-700 truncate">
                              {t.analysis.fields[k]}
                            </span>
                            <div className="flex-1 h-2.5 rounded-full bg-leaf-50 overflow-hidden">
                              <div
                                className={`h-full rounded-full ${st.bar} transition-all duration-700`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className={`w-16 text-xs font-bold ${st.text} text-right`}>{lv}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* suggestions */}
                  <div>
                    <h4 className="text-sm font-bold text-forest-900 uppercase tracking-wide mb-3">
                      {t.analysis.result.suggestions}
                    </h4>
                    <ul className="space-y-2">
                      {result.suggestions.map((s) => (
                        <li key={s} className="flex gap-2.5 text-sm text-soil-800 leading-relaxed">
                          <Sun className="w-4 h-4 text-harvest-600 shrink-0 mt-0.5" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* crops */}
                  <div>
                    <h4 className="text-sm font-bold text-forest-900 uppercase tracking-wide mb-3">
                      {t.analysis.result.crops}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {result.crops.map((c) => (
                        <span
                          key={c}
                          className="px-3 py-1.5 rounded-full bg-leaf-50 border border-leaf-200 text-leaf-800 text-sm font-semibold"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
