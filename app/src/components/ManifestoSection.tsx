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

interface TranslationCase {
  app: string;
  english: string;
  badLiteral: string;
  naturalPolish: string;
  story: string;
}

const TRANSLATION_CASES: TranslationCase[] = [
  {
    app: 'FilmCraft / VectorCraft',
    english: 'Magenta',
    badLiteral: 'Karmazynowy / Purpurowy',
    naturalPolish: 'Magenta',
    story:
      'W poligrafii (CMYK) i korekcji barwnej wideo nikt nie mówi „dodaj trochę karmazynu w cieniach”. Używa się po prostu słowa Magenta — i dokładnie tak zostawiliśmy w pl.tsv!',
  },
  {
    app: 'FilmCraft (Oś czasu)',
    english: 'Ripple Edit / Roll Edit',
    badLiteral: 'Edycja zmarszczkowa / Edycja toczona',
    naturalPolish: 'Edycja z falowaniem / Edycja z zawijaniem',
    story:
      'Terminologia montażowa musi mówić to, co faktycznie dzieje się z klipami na osi czasu: przesunięcie całej reszty sekwencji (falowanie) albo przesunięcie samego punktu cięcia (zawijanie).',
  },
  {
    app: 'VectorCraft (Krzywe)',
    english: 'Compound Path & Artboard',
    badLiteral: 'Ścieżka mieszankowa i deska artystyczna',
    naturalPolish: 'Ścieżka złożona i Obszar roboczy',
    story:
      'Zamiast kalek słownikowych stosujemy naturalne określenia znane polskim grafikom pracującym w CorelDRAW oraz Illustratorze.',
  },
  {
    app: 'GridCraft (Arkusze)',
    english: 'Pivot Table & Sparklines',
    badLiteral: 'Tabela obrotowa i linie iskrowe',
    naturalPolish: 'Tabela przestawna i Mikrowykresy',
    story:
      'Każdy, kto liczył cokolwiek w polskim arkuszu kalkulacyjnym, szuka „Tabeli przestawnej” oraz „Mikrowykresów w komórce”.',
  },
  {
    app: 'EffectCraft (Kompozycja & Animacja)',
    english: 'Easy Ease & Graph Editor',
    badLiteral: 'Łatwe złagodzenie i Edytor grafu',
    naturalPolish: 'Łagodne przejście i Edytor wykresów',
    story:
      'W animacji grafiki i motion designie kluczowe pojęcia to Łagodne przejście (Easy Ease dla interpolacji Béziera) oraz Edytor wykresów prędkości i wartości.',
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
                Ta strona — podobnie jak wszystkie zebrane na niej aplikacje — jest{' '}
                <strong className="text-white">w wersji PL i wszystko tutaj będzie po polsku</strong>,
                rozwijane uczciwie <strong className="text-amber-300">w miarę wolnego czasu i sił</strong>.
                Dlaczego? Bo po prostu fajnie, jak wszystko jest po polsku!
              </p>

              <div className="rounded-2xl border border-amber-500/25 bg-amber-500/[0.06] p-5">
                <div className="flex items-center gap-2 text-sm font-bold text-amber-300">
                  <BookOpen className="h-4 w-4" />
                  Pamiętasz projekt „Jajko Polskie” (jajkopolskie)?
                </div>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-300">
                  Kiedyś w polskim internecie działała legendarna strona{' '}
                  <strong className="text-white">Jajko Polskie</strong>, gdzie można było przeczytać
                  dokumentację jądra Linuksa przetłumaczoną na język polski. Człowiek otwierał opis
                  konfiguracji kernela i od razu czuł się jak u siebie w domu. Czasem naprawdę nie
                  wiadomo, który język wybrać, żeby coś technicznego lepiej i szybciej zrozumieć —
                  dlatego my nie kombinujemy: <strong className="text-amber-300">trzymamy się PL!</strong>
                </p>
              </div>

              <p>
                Przetłumaczenie sześciu ogromnych programów (od krzywych Béziera w{' '}
                <strong className="text-white">VectorCraft</strong>, przez maski warstw w{' '}
                <strong className="text-white">PhotoCraft</strong>, aż po koła barwne i montaż w{' '}
                <strong className="text-white">FilmCraft</strong>) to ponad{' '}
                <strong className="text-emerald-400">12 290 fraz</strong>. Robimy to z pasją, ale
                jesteśmy ludźmi — więc na pewno gdzieś trafi się niezręczne sformułowanie albo słowo,
                które brzmi zbyt „słownikowo”.
              </p>

              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5">
                <div className="flex items-center gap-2 text-base font-extrabold text-emerald-300">
                  <SmilePlus className="h-5 w-5 shrink-0" />
                  Wytykanie błędów będzie bardzo miło traktowane!
                </div>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-zinc-200">
                  Serio! Jeśli zobaczysz w menu dziwne tłumaczenie, literówkę albo słowo, którego nikt
                  w branży nie używa — <strong>wytknij nam to śmiało!</strong> Każde wytknięcie
                  traktujemy z uśmiechem, bo to najbardziej mobilizuje do poprawy tłumaczeń i samych
                  aplikacji!
                </p>
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Interactive "Kuźnia Tłumaczeń PL" (Examples like Magenta!) */}
          <div className="lg:col-span-5 rounded-2xl border border-white/15 bg-[#1b1c20] p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <Sparkles className="h-4 w-4" /> Żywe przykłady z plików pl.tsv
              </div>
              <span className="rounded bg-white/10 px-2 py-0.5 text-[10px] text-zinc-300">
                Żywy język vs słownik
              </span>
            </div>

            <h3 className="mt-2 text-lg font-bold text-white">
              Jak poprawiamy tłumaczenia dzięki Waszym uwagom
            </h3>
            <p className="mt-1 text-xs text-zinc-400">
              Kliknij przykład poniżej, aby zobaczyć dlaczego nie tłumaczymy wszystkiego ślepo ze słownika:
            </p>

            {/* Case Selector Buttons */}
            <div className="mt-4 grid grid-cols-2 gap-2">
              {TRANSLATION_CASES.map((item, idx) => (
                <button
                  key={item.english}
                  type="button"
                  onClick={() => setSelectedCase(idx)}
                  className={`rounded-xl border px-3 py-2 text-left text-xs transition ${
                    selectedCase === idx
                      ? 'border-amber-500/50 bg-amber-500/15 text-white font-semibold'
                      : 'border-white/10 bg-black/30 text-zinc-400 hover:bg-white/5 hover:text-zinc-200'
                  }`}
                >
                  <div className="truncate font-mono text-[11px] text-amber-300">{item.english}</div>
                  <div className="truncate text-[10px] text-zinc-400">{item.app}</div>
                </button>
              ))}
            </div>

            {/* Active Case Comparison Box */}
            <div className="mt-4 rounded-xl border border-white/10 bg-[#121316] p-4 space-y-3">
              <div className="text-xs text-zinc-400">
                Oryginał (EN):{' '}
                <code className="rounded bg-white/10 px-1.5 py-0.5 text-white font-mono">
                  {TRANSLATION_CASES[selectedCase].english}
                </code>
              </div>

              <div className="flex items-start gap-2.5 rounded-lg border border-red-500/20 bg-red-500/10 p-2.5 text-xs">
                <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-red-300">Sztywna kalka słownikowa (odrzucona):</div>
                  <div className="text-zinc-300 line-through">
                    {TRANSLATION_CASES[selectedCase].badLiteral}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2.5 text-xs">
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-emerald-300">W naszej wersji PL (pl.tsv):</div>
                  <div className="text-white font-bold text-sm">
                    {TRANSLATION_CASES[selectedCase].naturalPolish}
                  </div>
                </div>
              </div>

              <p className="text-xs leading-relaxed text-zinc-300 pt-1">
                {TRANSLATION_CASES[selectedCase].story}
              </p>
            </div>

            {/* Call to Action: Report a translation tweak */}
            <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
              <div className="text-xs text-zinc-300">
                Znalazłeś lepsze polskie słowo w którymś programie?
              </div>
              <a
                href="https://github.com/lukasz-sklad/PL/issues/new?title=Poprawka+t%C5%82umaczenia+PL&body=Aplikacja:+%0AObecny+tekst:+%0AProponowane+polskie+brzmienie:+"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-3.5 py-2 text-xs font-bold text-zinc-950 transition hover:bg-amber-400 shrink-0"
              >
                <MessageSquarePlus className="h-3.5 w-3.5" />
                <span>Wytknij / Zgłoś poprawkę</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
