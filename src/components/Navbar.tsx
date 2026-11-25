import { useEffect, useState } from "react";
import { Menu, X, Languages, Sprout } from "lucide-react";
import { useLang } from "@/lib/i18n";

const links = [
  { id: "home", key: "home" },
  { id: "about", key: "about" },
  { id: "analysis", key: "analysis" },
  { id: "crops", key: "crops" },
  { id: "how", key: "how" },
  { id: "gallery", key: "gallery" },
  { id: "contact", key: "contact" },
] as const;

export default function Navbar() {
  const { lang, t, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-cream/95 backdrop-blur-md shadow-md shadow-soil-900/10"
          : "bg-gradient-to-b from-black/50 to-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <button onClick={() => go("home")} className="flex items-center gap-2.5 group">
          <span className="w-9 h-9 rounded-xl bg-leaf-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform">
            <Sprout className="w-5 h-5" />
          </span>
          <span
            className={`font-display font-bold text-lg leading-tight transition-colors ${
              scrolled ? "text-forest-900" : "text-white"
            }`}
          >
            Soil<span className="text-leaf-500">Sense</span>
          </span>
        </button>

        <div className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                scrolled
                  ? "text-forest-900 hover:bg-leaf-50 hover:text-leaf-700"
                  : "text-white/90 hover:bg-white/10 hover:text-white"
              }`}
            >
              {t.nav[l.key]}
            </button>
          ))}
          <div
            className={`ml-2 flex items-center rounded-lg p-0.5 border transition-colors ${
              scrolled ? "border-leaf-200 bg-white" : "border-white/30 bg-white/10 backdrop-blur"
            }`}
          >
            <Languages className={`w-4 h-4 mx-1.5 ${scrolled ? "text-leaf-600" : "text-white"}`} />
            {(["en", "hi"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`px-2 py-1 text-xs font-semibold rounded-md transition-colors ${
                  lang === l
                    ? "bg-leaf-600 text-white"
                    : scrolled
                      ? "text-forest-800 hover:bg-leaf-50"
                      : "text-white/80 hover:bg-white/10"
                }`}
              >
                {l === "en" ? "EN" : "हिं"}
              </button>
            ))}
          </div>
        </div>

        <button
          className={`lg:hidden p-2 rounded-lg ${scrolled ? "text-forest-900" : "text-white"}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {open && (
        <div className="lg:hidden bg-cream border-t border-leaf-100 shadow-xl">
          <div className="px-4 py-3 space-y-1">
            {links.map((l) => (
              <button
                key={l.id}
                onClick={() => go(l.id)}
                className="block w-full text-left px-4 py-2.5 rounded-lg text-forest-900 font-medium hover:bg-leaf-50"
              >
                {t.nav[l.key]}
              </button>
            ))}
            <div className="flex items-center gap-2 pt-2 border-t border-leaf-100 mt-2">
              {(["en", "hi"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold ${
                    lang === l ? "bg-leaf-600 text-white" : "bg-white text-forest-800 border border-leaf-200"
                  }`}
                >
                  {l === "en" ? "English" : "हिन्दी"}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
