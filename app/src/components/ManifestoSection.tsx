import React, { useState } from 'react';
import {
  MessageSquarePlus,
  Sparkles,
  BookOpen,
  SmilePlus,
  CheckCircle2,
  XCircle,
  ExternalLink,
} from 'lucide-react';

interface FormatShowcase {
  app: string;
  extension: string;
  cloudProblem: string;
  wasmAdvantage: string;
  story: string;
}

const FORMAT_SHOWCASES: FormatShowcase[] = [
  {
    app: 'CAD / 2D & 3D',
    extension: '.dwg / .dxf / AutoLISP',
    cloudProblem: 'Ciężkie pakiety instalacyjne albo podglądy wysyłające dokumentację techniczną na cudze serwery',
    wasmAdvantage: 'Natywny parser DWG/DXF, wiązania 2D i skrypty AutoLISP w Twojej karcie przeglądarki',
    story:
      'Rysunki techniczne i rzuty architektoniczne otwierają się lokalnie na Twoim GPU bez zakładania konta i bez opuszczania komputera.',
  },
  {
    app: 'Vector / Grafika wektorowa',
    extension: '.cdr / .ai / .svg',
    cloudProblem: 'Brak wsparcia dla plików CorelDRAW (.cdr) w przeglądarkowych edytorach i wymuszona subskrypcja',
    wasmAdvantage: 'Bezpośredni odczyt krzywych Béziera, gradientów i obszarów roboczych z .cdr i .ai',
    story:
      'Silnik napisany od zera w języku Rust renderuje kształty, warstwy i typografię bezpośrednio przez WebGPU lub WebGL2.',
  },
  {
    app: 'Photo / Grafika rastrowa',
    extension: '.psd / .psb / .exr',
    cloudProblem: 'Wysyłanie wielowarstwowych projektów ze zdjęciami do chmury przy każdym podglądzie',
    wasmAdvantage: 'Warstwy, maski przycinające, pędzle i filtry 32-bit float liczone lokalnie w RAM i GPU',
    story:
      'Każda operacja na pikselach wykonuje się po stronie przeglądarki — nawet po odłączeniu od internetu wczytana karta działa dalej.',
  },
  {
    app: 'Effect & Film / Wideo i VFX',
    extension: '.ecproj / .mp4 / WebCodecs',
    cloudProblem: 'Długie wgrywanie materiałów wideo na serwer przed jakimkolwiek cięciem lub animacją',
    wasmAdvantage: 'Kompozycja wielowarstwowa 2D/3D, klatki kluczowe i sprzętowe dekodowanie w przeglądarce',
    story:
      'Dane strumienia wideo pozostają na Twoim dysku, a karta robocza korzysta bezpośrednio z akceleracji sprzętowej przeglądarki.',
  },
  {
    app: 'Solid / Druk 3D CAD',
    extension: '.stl / .step / .fcstd',
    cloudProblem: 'Zamknięte przeglądarki 3D ograniczające eksport siatek bez płatnego abonamentu',
    wasmAdvantage: 'Parametryczne bryły B-Rep, fazowanie, zaokrąglenia i błyskawiczny eksport do druku 3D',
    story:
      'Gotowe części mechaniczne możesz obejrzeć w trybie ?orbit=continuous, zweryfikować geometrię i zapisać do .stl w kilka sekund.',
  },
];

export const ManifestoSection: React.FC = () => {
  const [selectedCase, setSelectedCase] = useState<number>(0);

  return (
    <section
      id="manifest-pl"
      className="relative overflow-hidden border-t border-white/10 bg-gradient-to-b from-[#18191d] to-[#141517] py-16"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 items-start">
          {/* Left 7 Cols: The Story & Jajko Polskie Tribute */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="text-amber-400">Wspomnienie „Jajka Polskiego”</span> i tworzenia w miarę sił
            </h2>

            <div className="space-y-4 text-sm sm:text-base leading-relaxed text-zinc-300">
              <p>
                Ta strona oraz zebrane na niej aplikacje webowe powstają i są utrzymywane{' '}
                <strong className="text-amber-300">w miarę wolnego czasu i sił</strong>. Cel jest prosty:
                dać wygodny dostęp do otwartoźródłowych narzędzi graficznych, biurowych i inżynieryjnych
                bezpośrednio w przeglądarce.
              </p>

              <div className="rounded-2xl border border-amber-500/25 bg-amber-500/[0.06] p-5">
                <div className="flex items-center gap-2 text-sm font-bold text-amber-300">
                  <BookOpen className="h-4 w-4" />
                  Pamiętasz projekt „Jajko Polskie” (jajkopolskie)?
                </div>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-300">
                  Kiedyś w polskim internecie działała legendarna strona{' '}
                  <strong className="text-white">Jajko Polskie</strong>, przybliżająca dokumentację
                  jądra Linuksa w przystępny sposób. Człowiek otwierał opis konfiguracji kernela i od
                  razu czuł się jak u siebie. Ten portal powstał w tym samym duchu: wszystko pod ręką,
                  klarownie i bez zbędnych barier.
                </p>
              </div>

              <p>
                Wszystkie programy kompilujemy z natywnego kodu w języku Rust do lekkich paczek{' '}
                <strong className="text-white">WebAssembly</strong>, dokładając wspólne parametry{' '}
                <code className="text-amber-300">?file=</code>, motywy{' '}
                <code className="text-amber-300">Dark / Light / Sepia</code> oraz automatyczny mostek{' '}
                <code className="text-amber-300">WebGPU → WebGL2</code>.
              </p>

              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
                <div className="flex items-center gap-2 text-base font-extrabold text-emerald-300">
                  <SmilePlus className="h-5 w-5 shrink-0" />
                  Wytykanie błędów będzie bardzo miło traktowane!
                </div>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-200">
                  Serio! Jeśli trafisz na plik, który źle się otwiera, błąd graficzny w przeglądarce albo
                  niedziałający parametr — <strong>wytknij nam to śmiało!</strong> Każde zgłoszenie
                  mobilizuje do dopracowania kolejnych wydań webowych.
                </p>
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Interactive Native Format Showcase */}
          <div className="lg:col-span-5 rounded-2xl border border-white/15 bg-[#1b1c20] p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <Sparkles className="h-4 w-4" /> Natywne formaty w przeglądarce
              </div>
              <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-zinc-300">
                Zero wysyłania w chmurę
              </span>
            </div>

            <h3 className="mt-2 text-lg font-bold text-white">
              Co wyróżnia lokalne silniki Rust + WebAssembly
            </h3>
            <p className="mt-1 text-xs text-zinc-400">
              Wybierz kategorię poniżej, aby porównać podejście desktopowo-webowe z zamkniętymi chmurami:
            </p>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {FORMAT_SHOWCASES.map((item, idx) => (
                <button
                  key={item.extension}
                  type="button"
                  onClick={() => setSelectedCase(idx)}
                  className={`rounded-xl border px-3 py-2 text-left text-xs transition ${
                    selectedCase === idx
                      ? 'border-amber-500/50 bg-amber-500/15 text-white font-semibold'
                      : 'border-white/10 bg-black/30 text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                  }`}
                >
                  <div className="truncate font-mono text-[11px] text-amber-300">{item.extension}</div>
                  <div className="truncate text-[10px] text-zinc-400">{item.app}</div>
                </button>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-[#121316] p-4 space-y-3">
              <div className="text-xs text-zinc-400">
                Formaty:{' '}
                <code className="rounded bg-white/10 px-1.5 py-0.5 text-white font-mono">
                  {FORMAT_SHOWCASES[selectedCase].extension}
                </code>
              </div>

              <div className="flex items-start gap-2.5 rounded-lg border border-red-500/20 bg-red-500/10 p-2.5 text-xs">
                <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-red-300">Tradycyjne ograniczenia:</div>
                  <div className="text-zinc-300">
                    {FORMAT_SHOWCASES[selectedCase].cloudProblem}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2.5 text-xs">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-emerald-300">W naszych wersjach Web:</div>
                  <div className="text-white font-bold text-sm">
                    {FORMAT_SHOWCASES[selectedCase].wasmAdvantage}
                  </div>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-zinc-300 pt-1">
                {FORMAT_SHOWCASES[selectedCase].story}
              </p>
            </div>

            <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
              <div className="text-xs text-zinc-300">
                Znalazłeś błąd lub nietypowy plik do sprawdzenia?
              </div>
              <a
                href="https://github.com/lukasz-sklad/PL/issues/new?title=Zg%C5%82oszenie+b%C5%82%C4%99du&body=Aplikacja:+%0AOpis+problemu:+"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-3.5 py-2 text-xs font-bold text-zinc-950 transition hover:bg-amber-400 shrink-0"
              >
                <MessageSquarePlus className="h-3.5 w-3.5" />
                <span>Wytknij / Zgłoś błąd</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
