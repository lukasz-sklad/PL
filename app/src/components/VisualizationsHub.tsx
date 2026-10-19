import React, { useState } from 'react';
import {
  Sparkles,
  Keyboard,
  BarChart3,
  Check,
  X,
  Shield,
  Zap,
  Globe,
} from 'lucide-react';
import { CRAFT_APPS } from '../data/craftData';

export const VisualizationsHub: React.FC = () => {
  const [selectedShortcutAppId, setSelectedShortcutAppId] = useState<string>('vectorcraft');
  const activeShortcutApp =
    CRAFT_APPS.find((a) => a.id === selectedShortcutAppId) || CRAFT_APPS[0];

  const maxStrings = Math.max(...CRAFT_APPS.map((a) => a.translatedStrings));

  return (
    <section id="wizualizacje" className="py-16 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Part 1: Radar Spolszczenia + Mapa Skrótów Klawiszowych */}
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-sky-400">
            <Sparkles className="h-4 w-4" /> Interaktywne Wizualizacje Ekosystemu PL
          </div>
          <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-4xl">
            Statystyki tłumaczeń oraz interaktywne skróty klawiszowe
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Visualization A: Polish Translation Bar Chart */}
            <div className="lg:col-span-6 rounded-2xl border border-white/10 bg-[#1a1b1f] p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-amber-400" />
                  Liczba przetłumaczonych fraz w plikach pl.tsv / pl.rs
                </h3>
                <span className="rounded-full bg-amber-500/15 px-2.5 py-0.5 font-mono text-xs font-bold text-amber-300">
                  Razem: 12 290 fraz
                </span>
              </div>
              <p className="mt-1 text-xs text-zinc-400">
                Prawdziwe statystyki policzone bezpośrednio z plików lokalizacyjnych naszych repozytoriów:
              </p>

              <div className="mt-6 space-y-4">
                {CRAFT_APPS.map((app) => {
                  const widthPct = Math.max(12, Math.round((app.translatedStrings / maxStrings) * 100));
                  return (
                    <div key={app.id} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white flex items-center gap-2">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ backgroundColor: app.accentColor }}
                          />
                          {app.name}
                          <span className="font-normal text-zinc-400">({app.replaces.split('/')[0]})</span>
                        </span>
                        <span className="font-mono font-semibold text-zinc-200">
                          {app.translatedStrings.toLocaleString('pl-PL')} linii PL
                        </span>
                      </div>
                      <div className="h-3 w-full overflow-hidden rounded-full bg-black/50 p-0.5">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${widthPct}%`,
                            backgroundColor: app.accentColor,
                          }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-3.5 text-xs text-zinc-400">
                Każdy wiersz w <code className="text-amber-300">pl.tsv</code> to przetłumaczone menu,
                podpowiedź narzędzia, filtr, okno dialogowe albo komunikat błędu.
              </div>
            </div>

            {/* Visualization B: Interactive Polish Keyboard Shortcuts Explorer */}
            <div className="lg:col-span-6 rounded-2xl border border-white/10 bg-[#1a1b1f] p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Keyboard className="h-4 w-4 text-emerald-400" />
                    Interaktywna Ściągawka Skrótów Klawiszowych (PL)
                  </h3>
                  <span className="text-xs text-zinc-400">Wybierz program</span>
                </div>

                {/* App Tabs for Shortcuts */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {CRAFT_APPS.map((app) => (
                    <button
                      key={app.id}
                      type="button"
                      onClick={() => setSelectedShortcutAppId(app.id)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                        selectedShortcutAppId === app.id
                          ? 'text-zinc-950 shadow'
                          : 'border border-white/10 bg-black/30 text-zinc-300 hover:bg-white/10'
                      }`}
                      style={
                        selectedShortcutAppId === app.id
                          ? { backgroundColor: app.accentColor }
                          : undefined
                      }
                    >
                      {app.name}
                    </button>
                  ))}
                </div>

                {/* Shortcuts Grid */}
                <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {activeShortcutApp.shortcuts.map((sc) => (
                    <div
                      key={sc.key}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#121316] p-3"
                    >
                      <kbd
                        className="flex min-w-[52px] items-center justify-center rounded-lg border border-white/20 bg-white/10 px-2.5 py-1.5 font-mono text-xs font-extrabold text-amber-300 shadow-inner"
                      >
                        {sc.key}
                      </kbd>
                      <div>
                        <div className="text-xs font-semibold text-white">{sc.action}</div>
                        <div className="text-[10px] text-zinc-400">{sc.category}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs text-zinc-300">
                <span>Wszystkie skróty działają zarówno w przeglądarce, jak i w wersji Desktop!</span>
                <a
                  href={activeShortcutApp.primaryUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-amber-400 hover:underline shrink-0 ml-2"
                >
                  Przetestuj w {activeShortcutApp.name} →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Part 2: Comparison Table (Modeled on vectorcraft.app) */}
        <div className="rounded-3xl border border-white/10 bg-[#18191c] p-6 sm:p-10">
          <div>
            <h3 className="text-xl font-extrabold text-white sm:text-2xl lg:text-3xl tracking-tight sm:whitespace-nowrap">
              Dlaczego warto korzystać z naszych aplikacji Craft?
            </h3>
            <p className="mt-2 text-sm text-zinc-400 max-w-3xl">
              Porównanie naszego otwartoźródłowego ekosystemu WebAssembly z zamkniętymi chmurami
              subskrypcyjnymi:
            </p>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/15 text-zinc-400">
                  <th className="py-3.5 pr-4 font-semibold">Cecha / Możliwość</th>
                  <th className="py-3.5 px-4 font-bold text-amber-400 bg-amber-500/[0.06] rounded-t-xl">
                    Ekosystem Craft (Web)
                  </th>
                  <th className="py-3.5 px-4 font-semibold">
                    Komercyjne Chmury (Adobe CC / MS 365 / Corel)
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-zinc-300">
                <tr>
                  <td className="py-3.5 pr-4 font-medium text-white">Język interfejsu i dokumentacji</td>
                  <td className="py-3.5 px-4 bg-amber-500/[0.06] text-emerald-300 font-semibold">
                    <span className="inline-flex items-center gap-1.5">
                      <Check className="h-4 w-4 text-emerald-400" /> 100% po polsku (otwarte pliki pl.tsv, szybkie poprawki od ręki)
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-zinc-400">
                    Często wymuszony angielski lub sztywne tłumaczenia korporacyjne bez wpływu użytkowników
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 font-medium text-white">Otwieranie plików .cdr, .psd, .mp4 z linku (?file=)</td>
                  <td className="py-3.5 px-4 bg-amber-500/[0.06] text-emerald-300 font-semibold">
                    <span className="inline-flex items-center gap-1.5">
                      <Check className="h-4 w-4 text-emerald-400" /> Tak! Jednym linkiem URL (z wbudowanym mostkiem CORS)
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-zinc-400">
                    <span className="inline-flex items-center gap-1.5">
                      <X className="h-4 w-4 text-red-400" /> Wymaga ręcznego pobierania, instalacji gigabajtów i logowania
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 font-medium text-white">Prywatność i przetwarzanie plików</td>
                  <td className="py-3.5 px-4 bg-amber-500/[0.06] text-emerald-300 font-semibold">
                    <span className="inline-flex items-center gap-1.5">
                      <Shield className="h-4 w-4 text-emerald-400" /> 100% lokalnie w Twojej przeglądarce (Rust → WebAssembly)
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-zinc-400">
                    Wysyłanie plików na zewnętrzne serwery i przymusowe konta w chmurze
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 font-medium text-white">Szybkość uruchomienia</td>
                  <td className="py-3.5 px-4 bg-amber-500/[0.06] text-emerald-300 font-semibold">
                    <span className="inline-flex items-center gap-1.5">
                      <Zap className="h-4 w-4 text-amber-400" /> Natychmiast w karcie przeglądarki na każdym systemie
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-zinc-400">
                    <span className="inline-flex items-center gap-1.5">
                      <X className="h-4 w-4 text-red-400" /> Ciężkie instalatory i ograniczenia systemowe
                    </span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 pr-4 font-medium text-white">Koszt, subskrypcje i telemetria</td>
                  <td className="py-3.5 px-4 bg-amber-500/[0.06] text-emerald-300 font-semibold rounded-b-xl">
                    <span className="inline-flex items-center gap-1.5">
                      <Globe className="h-4 w-4 text-emerald-400" /> 0 zł • Open Source (MIT / Apache-2.0) • Zero kont i reklam
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-zinc-400">
                    Setki złotych miesięcznie za pojedyncze pakiety
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};
