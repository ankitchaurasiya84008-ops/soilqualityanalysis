import { Sprout, Heart } from "lucide-react";
import { useLang } from "@/lib/i18n";

export default function Footer() {
  const { t, lang } = useLang();

  return (
    <footer className="bg-forest-950 text-cream/70 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl bg-leaf-600 text-white flex items-center justify-center">
              <Sprout className="w-5 h-5" />
            </span>
            <span className="font-display font-bold text-lg text-white">
              Soil<span className="text-leaf-400">Sense</span>
            </span>
          </div>
          <p className="text-sm text-center">{t.footer.tagline}</p>
          <p className="text-xs text-cream/50 flex items-center gap-1.5">
            {lang === "hi" ? "© 2026 SoilSense" : "© 2026 SoilSense"}
            <Heart className="w-3.5 h-3.5 text-harvest-500" />
          </p>
        </div>
      </div>
    </footer>
  );
}
