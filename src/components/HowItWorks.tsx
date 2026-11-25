import { Search, ClipboardList, Gauge, Sprout } from "lucide-react";
import { useLang } from "@/lib/i18n";

const icons = [Search, ClipboardList, Gauge, Sprout];

export default function HowItWorks() {
  const { t, lang } = useLang();

  return (
    <section id="how" className="py-20 sm:py-28 bg-forest-950 relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-leaf-600/20 blur-[100px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-harvest-400 font-semibold text-sm uppercase tracking-wider">
            {lang === "hi" ? "सरल 4 चरण" : "Simple 4 steps"}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mt-3">{t.how.title}</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.how.steps.map((s, i) => {
            const Icon = icons[i];
            return (
              <div
                key={s.title}
                className="relative bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-7 hover:bg-white/10 transition-colors group"
              >
                <span className="absolute top-5 right-6 font-display text-5xl font-bold text-white/10 group-hover:text-white/20 transition-colors">
                  {i + 1}
                </span>
                <span className="w-12 h-12 rounded-xl bg-leaf-600/30 border border-leaf-500/40 text-harvest-400 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6" />
                </span>
                <h3 className="font-bold text-white text-lg mb-2">{s.title}</h3>
                <p className="text-cream/70 text-sm leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
