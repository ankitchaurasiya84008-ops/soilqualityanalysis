import { useState } from "react";
import { Mail, MapPin, Phone, Send, Sprout } from "lucide-react";
import { useLang } from "@/lib/i18n";

export default function Contact() {
  const { t, lang } = useLang();
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSent(true);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 bg-leaf-50/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <span className="text-leaf-700 font-semibold text-sm uppercase tracking-wider">{t.contact.title}</span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-forest-900 mt-3 mb-4">
              {t.contact.title}
            </h2>
            <p className="text-soil-700 leading-relaxed mb-8">{t.contact.sub}</p>

            <div className="space-y-5">
              {[
                { icon: Mail, label: t.contact.info.email },
                { icon: Phone, label: t.contact.info.phone },
                { icon: MapPin, label: t.contact.info.address },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-4">
                  <span className="w-11 h-11 rounded-xl bg-white border border-leaf-200 text-leaf-700 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="text-forest-900 font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-leaf-100 p-6 sm:p-8">
            {sent ? (
              <div className="h-full min-h-[280px] flex flex-col items-center justify-center text-center gap-4">
                <span className="w-16 h-16 rounded-full bg-leaf-50 border border-leaf-200 text-leaf-700 flex items-center justify-center">
                  <Sprout className="w-8 h-8" />
                </span>
                <p className="text-lg font-semibold text-forest-900">{t.contact.sent}</p>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-forest-900 mb-1.5">{t.contact.name}</label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-leaf-200 bg-cream/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-leaf-500/40 text-forest-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-forest-900 mb-1.5">{t.contact.email}</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-leaf-200 bg-cream/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-leaf-500/40 text-forest-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-forest-900 mb-1.5">{t.contact.message}</label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-leaf-200 bg-cream/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-leaf-500/40 text-forest-900 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-leaf-600 hover:bg-leaf-700 text-white font-bold shadow-lg shadow-leaf-600/25 transition-all hover:-translate-y-0.5"
                >
                  <Send className="w-5 h-5" />
                  {t.contact.send}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
