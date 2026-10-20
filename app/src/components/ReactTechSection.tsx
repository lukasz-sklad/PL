import React, { useState } from 'react';
import {
  Code2,
  ExternalLink,
  BookOpen,
} from 'lucide-react';

const CODE_SNIPPETS = [
  {
    id: 'react-pl',
    title: 'Komponent React PL (?file=)',
    explanation:
      'W React używamy hooków useState oraz useMemo (opisanych na pl.react.dev), aby reagować na wpisywany adres pliku i dobierać odpowiednią aplikację Craft:',
    code: `import { useState, useMemo } from 'react'; // -> https://pl.react.dev/reference/react

export function KreatorLinkuCraft() {
  const [adresPliku, setAdresPliku] = useState('https://raw.githubusercontent.com/lukasz-sklad/corel-web/main/zawiercie_logo.cdr');

  const aplikacjaDocelowa = useMemo(() => {
    if (adresPliku.endsWith('.cdr')) return 'https://corel.lmk.one';
    if (adresPliku.endsWith('.mp4')) return 'https://film.lmk.one';
    if (adresPliku.endsWith('.psd')) return 'https://photocraft.lmk.one';
    if (adresPliku.endsWith('.idml') || adresPliku.endsWith('.designcraft')) return 'https://design.lmk.one';
    return 'https://vectorcraft.lmk.one';
  }, [adresPliku]);

  return (
    <a href={\`\${aplikacjaDocelowa}/?file=\${adresPliku}\`}>
      Otwórz plik w polskiej aplikacji Craft!
    </a>
  );
}`,
  },
  {
    id: 'cors-wasm',
    title: 'Mostek CORS + WebAssembly',
    explanation:
      'Gdy zewnętrzny serwer nie zwraca nagłówka CORS, nasze aplikacje webowe automatycznie przełączają pobieranie na mostek lmk.one/api/cors:',
    code: `async function fetchWithCorsFallback(fileUrl) {
  try {
    const resp = await fetch(fileUrl, { mode: 'cors' });
    if (resp.ok) return resp;
  } catch (_) {
    // Brak nagłówka Access-Control-Allow-Origin
  }
  const proxyUrl = 'https://lmk.one/api/cors?url=' + encodeURIComponent(fileUrl);
  return await fetch(proxyUrl);
}`,
  },
];

export const ReactTechSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="react-pl" className="py-16 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left 5 Cols: Why React + Link to pl.react.dev */}
          <div className="lg:col-span-5 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-bold text-cyan-300">
              <Code2 className="h-3.5 w-3.5" /> Technologia: React + Tailwind CSS
            </div>

            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              Strona w technologii <span className="text-cyan-400">React</span> — oficjalna{' '}
              <span className="text-amber-400">dokumentacja</span>
            </h2>

            <p className="text-sm leading-relaxed text-zinc-300">
              Ta strona została napisana w technologii <strong className="text-white">React</strong>.
              Jeśli chcesz zobaczyć, jak działają komponenty, stany (<code className="text-cyan-300">useState</code>)
              albo efekty (<code className="text-cyan-300">useEffect</code>), React posiada oficjalną
              dokumentację po polsku:
            </p>

            {/* Polish React Docs Links */}
            <div className="space-y-2.5 pt-1">
              <a
                href="https://pl.react.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-2xl border border-cyan-500/40 bg-cyan-500/15 p-4 text-left transition hover:bg-cyan-500/25"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="h-5 w-5 text-cyan-300 shrink-0" />
                  <div>
                    <div className="text-sm font-extrabold text-white">
                      pl.react.dev — Polska Dokumentacja Reacta
                    </div>
                    <div className="text-xs text-cyan-200/90">
                      Oficjalny podręcznik i opis API po polsku
                    </div>
                  </div>
                </div>
                <ExternalLink className="h-4 w-4 text-cyan-300 shrink-0" />
              </a>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <a
                  href="https://pl.react.dev/learn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs font-semibold text-zinc-200 transition hover:border-cyan-500/40 hover:text-cyan-300"
                >
                  <span>Kurs „Szybki Start” (PL)</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <a
                  href="https://pl.react.dev/reference/react"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-xs font-semibold text-zinc-200 transition hover:border-cyan-500/40 hover:text-cyan-300"
                >
                  <span>Słownik Hooków React (PL)</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right 7 Cols: Interactive Technical Code Viewer */}
          <div className="lg:col-span-7 rounded-2xl border border-white/15 bg-[#16171b] overflow-hidden shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-[#111215] px-4 py-3">
              <div className="flex flex-wrap gap-1.5">
                {CODE_SNIPPETS.map((snip, idx) => (
                  <button
                    key={snip.id}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                      activeTab === idx
                        ? 'bg-amber-500 text-zinc-950'
                        : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {snip.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-5 space-y-4">
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                {CODE_SNIPPETS[activeTab].explanation}
              </p>

              <pre className="overflow-x-auto rounded-xl border border-white/10 bg-[#0c0d0f] p-4 font-mono text-xs leading-relaxed text-emerald-300">
                <code>{CODE_SNIPPETS[activeTab].code}</code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
