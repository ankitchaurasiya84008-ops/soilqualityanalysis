import { FlaskConical, Wheat, Target, Users } from "lucide-react";
import { useLang } from "@/lib/i18n";

const icons = [FlaskConical, Wheat, Target, Users];

export default function About() {
  const { t } = useLang();

  return (
    <section id="about" className="py-20 sm:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <span className="text-leaf-700 font-semibold text-sm uppercase tracking-wider">
              {t.about.title}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-forest-900 mt-3 mb-6 leading-snug">
              {t.about.sub.length > 0 ? t.about.title : ""}
            </h2>
            <p className="text-lg text-soil-800 leading-relaxed">{t.about.sub}</p>
            <div className="mt-8 space-y-4">
              {[
                { title: t.how.steps[0].title, desc: t.how.steps[0].desc },
                { title: t.how.steps[3].title, desc: t.how.steps[3].desc },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <span className="mt-1 w-2.5 h-2.5 rounded-full bg-leaf-500 shrink-0" />
                  <div>
                    <h3 className="font-semibold text-forest-900">{item.title}</h3>
                    <p className="text-soil-700 text-sm mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-6">
            {t.about.stats.map((s, i) => {
              const Icon = icons[i];
              return (
                <div
                  key={s.label}
                  className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-leaf-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="w-11 h-11 rounded-xl bg-leaf-50 text-leaf-700 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </span>
                  <div className="font-display text-3xl sm:text-4xl font-bold text-forest-900">{s.value}</div>
                  <div className="text-sm text-soil-700 mt-1.5 font-medium">{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
