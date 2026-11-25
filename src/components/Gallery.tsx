import { Mountain, Wheat, Droplets, Sun } from "lucide-react";
import { useLang } from "@/lib/i18n";

export default function Gallery() {
  const { t } = useLang();

  const tiles = [
    { icon: Mountain, title: "Terraced Farms", tone: "from-leaf-700 to-forest-800" },
    { icon: Wheat, title: "Golden Harvest", tone: "from-harvest-500 to-harvest-700" },
    { icon: Droplets, title: "Irrigation in Bloom", tone: "from-sky-600 to-leaf-700" },
    { icon: Sun, title: "Morning on the Field", tone: "from-amber-500 to-soil-700" },
  ];

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-leaf-700 font-semibold text-sm uppercase tracking-wider">
            {t.gallery.title}
          </span>
          <p className="text-soil-700 mt-4 leading-relaxed">{t.gallery.sub}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {tiles.map(({ icon: Icon, title, tone }) => (
            <div
              key={title}
              className={`relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br ${tone} group cursor-pointer`}
            >
              <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity bg-[radial-gradient(circle_at_30%_20%,white,transparent_60%)]" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white">
                <Icon className="w-10 h-10 opacity-90 group-hover:scale-110 transition-transform duration-300" />
                <span className="font-display font-semibold text-sm sm:text-base text-center px-3">{title}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
