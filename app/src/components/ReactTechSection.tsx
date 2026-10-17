import React, { useState } from 'react';
import {
  Code2,
  ExternalLink,
  Cpu,
  BookOpen,
  Layers,
  Terminal,
  PackageCheck,
  Sparkles,
} from 'lucide-react';

const CODE_SNIPPETS = [
  {
    id: 'react-pl',
    title: 'Komponent React PL (Kreator ?file=)',
    lang: 'tsx',
    explanation:
      'W React używamy hooków useState oraz useMemo (opisanych po polsku na pl.react.dev), aby błyskawicznie reagować na wpisywany adres pliku i dobierać odpowiednią aplikację *Craft:',
    code: `// Przykład prosto z kodu źródłowego tej strony (PL-craft)
import { useState, useMemo } from 'react'; // -> https://pl.react.dev/reference/react

export function KreatorLinkuCraft() {
  const [adresPliku, setAdresPliku] = useState('https://filedn.eu/.../zawiercie_logo.cdr');

  const aplikacjaDocelowa = useMemo(() => {
    if (adresPliku.endsWith('.cdr')) return 'https://corel.lmk.one';
    if (adresPliku.endsWith('.mp4')) return 'https://film.lmk.one';
    if (adresPliku.endsWith('.psd')) return 'https://photocraft.lmk.one';
    return 'https://vectorcraft.lmk.one';
  }, [adresPliku]);

  return (
    <a href={\`\${aplikacjaDocelowa}/?file=\${adresPliku}\`}>
      Otwórz plik bezpośrednio w polskiej aplikacji *Craft!
    </a>
  );
}`,
  },
  {
    id: 'cors-wasm',
    title: 'Mostek CORS + Strumieniowy WASM',
    lang: 'js',
    explanation:
      'Gdy serwer chmurowy (np. pCloud filedn.eu) nie zwraca nagłówka CORS, nasze aplikacje webowe automatycznie przełączają pobieranie na bezserwerowy mostek lmk.one/api/cors:',
    code: `// Automatyczny fallback CORS w naszych wersjach webowych (corel-web, film-web)
async function fetchWithCorsFallback(fileUrl) {
  try {
    const resp = await fetch(fileUrl, { mode: 'cors' });
    if (resp.ok) return resp;
  } catch (_) {
    // Brak nagłówka Access-Control-Allow-Origin (np. pCloud filedn.eu)
  }
  const proxyUrl = 'https://lmk.one/api/cors?url=' + encodeURIComponent(fileUrl);
  return await fetch(proxyUrl);
}`,
  },
  {
    id: 'steamos-pgo',
    title: '4-etapowa kompilacja PGO (SteamOS znver2)',
    lang: 'bash',
    explanation:
      'Wersje natywne (CLI oraz GUI) kompilujemy z flagami architektury AMD Zen 2 (Steam Deck) oraz pełnym profilowaniem PGO (Profile-Guided Optimization):',
    code: `# Flagi optymalizacji pod procesor AMD Custom APU (znver2) + Fat LTO
export RUSTFLAGS="-C target-cpu=znver2 -C profile-generate=/tmp/pgo-data"
cargo build --release -p filmcraft -p filmcraft-cli

# Etap 2 i 3: Trening binarki na prawdziwych zadaniach renderowania i montażu
./target/release/filmcraft-cli bench
llvm-profdata merge -o /tmp/pgo-data/merged.profdata /tmp/pgo-data

# Etap 4: Finalna rekompilacja z wygenerowanym profilem wykonania
export RUSTFLAGS="-C target-cpu=znver2 -C profile-use=/tmp/pgo-data/merged.profdata"
cargo build --release -p filmcraft -p filmcraft-cli`,
  },
];

export const ReactTechSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="react-pl" className="py-16 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* React Polish Documentation Showcase */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-start">
          {/* Left 5 Cols: Why React + Link to pl.react.dev */}
          <div className="lg:col-span-5 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1 text-xs font-bold text-cyan-300">
              <Code2 className="h-4 w-4" /> Technologia Strony: React 19 + Tailwind CSS
            </div>

            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
              Zbudowano w technologii <span className="text-cyan-400">React</span> — poznaj oficjalną{' '}
              <span className="text-amber-400">polską dokumentację!</span>
            </h2>

            <p className="text-sm leading-relaxed text-zinc-300">
              Ta strona została napisana w technologii <strong className="text-white">React</strong>{' '}
              (dokładnie jak oryginalny portal <code className="text-zinc-200">vectorcraft.app</code>).
              Cała skompilowana paczka tej strony waży zaledwie{' '}
              <strong className="text-emerald-400">~0,25 MB (250 KB)</strong> — czyli aż{' '}
              <strong>100 razy mniej</strong> niż limit 25 MB na Cloudflare Pages!
            </p>

            <p className="text-sm leading-relaxed text-zinc-300">
              Co najlepsze: <strong className="text-white">React posiada znakomitą, oficjalną dokumentację w języku polskim!</strong>{' '}
              Jeśli chcesz zobaczyć, jak działają komponenty, stany (<code className="text-cyan-300">useState</code>)
              albo efekty (<code className="text-cyan-300">useEffect</code>), nie musisz szukać po angielsku:
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
                  <BookOpen className="h-6 w-6 text-cyan-300 shrink-0" />
                  <div>
                    <div className="text-sm font-extrabold text-white">
                      pl.react.dev — Polska Dokumentacja Reacta
                    </div>
                    <div className="text-xs text-cyan-200/90">
                      Oficjalny podręcznik, interaktywne przykłady i opis API po polsku
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
          <div className="lg:col-span-7 rounded-2xl border border-white/15 bg-[#16171b] overflow-hidden shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-[#111215] px-4 py-3">
              <div className="flex flex-wrap gap-1.5">
                {CODE_SNIPPETS.map((snip, idx) => (
                  <button
                    key={snip.id}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-bold transition ${
                      activeTab === idx
                        ? 'bg-cyan-500 text-zinc-950'
                        : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {snip.title}
                  </button>
                ))}
              </div>
              <span className="font-mono text-[11px] text-zinc-400">
                /home/deck/GIT/app/PL-craft
              </span>
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

        {/* SteamOS Native Builds + PGO + Flatpak + AppImage + MCP */}
        <div
          id="steamos-pgo"
          className="rounded-3xl border border-white/15 bg-gradient-to-br from-[#1d1916] via-[#17181c] to-[#141518] p-6 sm:p-10"
        >
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-orange-400">
                <Cpu className="h-4 w-4" /> Kompilacje Natywne SteamOS (AMD Zen 2 + PGO)
              </div>
              <h3 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
                Nie tylko w przeglądarce: Flatpak, AppImage, PGO oraz serwery MCP
              </h3>
              <p className="mt-2 max-w-3xl text-sm text-zinc-300">
                Oprócz wersji webowych (<code className="text-amber-300">*.lmk.one</code>), każdą
                aplikację kompilujemy natywnie na Linuksa / SteamOS z docelową architekturą{' '}
                <code className="text-orange-300">-C target-cpu=znver2</code>, pełnym LTO oraz
                4-etapową optymalizacją <strong className="text-white">PGO (Profile-Guided Optimization)</strong>.
              </p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-300">
                <Terminal className="h-4 w-4" /> Binarki PGO (/home/deck/bin)
              </div>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Natywne pliki wykonywalne GUI i CLI wytrenowane na rzeczywistych operacjach
                wektorowych, rastrowych i wideo przy użyciu <code className="text-zinc-200">llvm-profdata</code>.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-300">
                <PackageCheck className="h-4 w-4" /> Paczki Flatpak &amp; AppImage
              </div>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Samowystarczalne pakiety <code className="text-zinc-200">.flatpak</code> oraz{' '}
                <code className="text-zinc-200">.AppImage</code> w{' '}
                <code className="text-zinc-200">~/Applications/</code> gotowe do uruchomienia w trybie
                Desktop i Gaming Mode.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-purple-300">
                <Sparkles className="h-4 w-4" /> Integracja MCP dla AI
              </div>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Każda aplikacja wystawia serwer <strong className="text-zinc-200">Model Context Protocol (MCP)</strong>,
                dzięki czemu asystent AI może rysować wektory, montować filmy i edytować arkusze.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
              <div className="flex items-center gap-2 text-sm font-bold text-sky-300">
                <Layers className="h-4 w-4" /> Kontenery Podman Quadlet
              </div>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                Bezserwerowe kontenery rootless Nginx (<code className="text-zinc-200">systemctl --user</code>)
                połączone z tunelem Cloudflare oraz mirrorem na GitHubie.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
