import { ArrowRight, MapPin } from "lucide-react";
import { useLang } from "@/lib/i18n";

export default function Hero() {
  const { t } = useLang();
  const go = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-forest-950">
      {/* layered landscape backdrop */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-forest-900 via-forest-800 to-soil-900" />
        {/* sun glow */}
        <div className="absolute -top-32 right-[10%] w-[480px] h-[480px] rounded-full bg-harvest-400/30 blur-[120px]" />
        <div className="absolute top-1/4 -left-24 w-[380px] h-[380px] rounded-full bg-leaf-500/20 blur-[100px]" />
        {/* stylized field rows */}
        <svg
          className="absolute bottom-0 inset-x-0 w-full text-black/25"
          viewBox="0 0 1440 320"
          fill="none"
          preserveAspectRatio="none"
        >
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <path
              key={i}
              d={`M-100 ${260 + i * 12} C 300 ${180 + i * 18}, 700 ${320 - i * 8}, 1540 ${200 + i * 16}`}
              stroke="currentColor"
              strokeWidth="14"
              strokeLinecap="round"
            />
          ))}
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 w-full">
        <div className="max-w-3xl">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur border border-white/20 text-cream text-sm font-medium mb-6">
            <MapPin className="w-4 h-4 text-harvest-400" />
            {t.hero.badge}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.15] mb-6">
            {t.hero.title}
          </h1>
          <p className="text-lg sm:text-xl text-cream/85 leading-relaxed mb-9 max-w-2xl">{t.hero.sub}</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => go("analysis")}
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-harvest-500 hover:bg-harvest-600 text-forest-950 font-bold text-base shadow-lg shadow-harvest-500/25 transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              {t.hero.cta1}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => go("crops")}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/30 backdrop-blur text-white font-semibold text-base transition-all hover:-translate-y-0.5"
            >
              {t.hero.cta2}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
