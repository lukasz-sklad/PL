import React from 'react';
import { ExternalLink, Heart, Code2 } from 'lucide-react';
import { CRAFT_APPS } from '../data/craftData';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-[#101113] py-12 text-xs text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gradient-to-br from-white via-slate-100 to-red-500 text-[11px] font-extrabold text-zinc-950">
                PL
              </span>
              <span className="text-sm font-bold text-white">*Craft Polska (lmk.one)</span>
            </div>
            <p className="leading-relaxed text-zinc-400">
              Polski portal zbierający w jednym miejscu aplikacje z rodziny *Craft. Wszystko po polsku
              — w miarę wolnego czasu i sił, z ukłonem dla legendarnego Jajka Polskiego.
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] text-zinc-300">
              <a
                href="https://craft.lmk.one"
                className="rounded bg-white/5 px-2 py-1 hover:text-amber-300"
              >
                craft.lmk.one
              </a>
              <a
                href="https://pl.lmk.one"
                className="rounded bg-white/5 px-2 py-1 hover:text-amber-300"
              >
                pl.lmk.one
              </a>
              <a
                href="https://lmk.one"
                className="rounded bg-white/5 px-2 py-1 hover:text-amber-300"
              >
                lmk.one
              </a>
            </div>

            <div className="pt-2">
              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-2.5">
                <a
                  href="https://buycoffee.to/lmk.one"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block shrink-0 rounded-xl bg-white p-1 transition hover:opacity-90 active:scale-95 shadow-sm"
                  title="Zeskanuj kod QR aparatem w telefonie, aby postawić kawę"
                >
                  <img
                    src="./QR_buycoffee.png"
                    alt="QR Kod - Postaw kawę na buycoffee.to/lmk.one"
                    className="h-16 w-16 rounded-lg object-contain"
                    loading="lazy"
                  />
                </a>
                <div className="flex flex-col justify-center space-y-1.5">
                  <a
                    href="https://buycoffee.to/lmk.one"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block transition-transform hover:scale-105 active:scale-95"
                    title="Postaw kawę dla Lucas.One na buycoffee.to"
                  >
                    <img
                      src="./postaw-kawe-2.png"
                      alt="Postaw kawę dla Lucas.One na buycoffee.to"
                      className="h-8 w-auto rounded shadow-sm hover:opacity-95"
                      loading="lazy"
                    />
                  </a>
                  <span className="text-[10px] text-zinc-400">
                    Zeskanuj telefonem lub kliknij
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 2: Direct Web Apps */}
          <div>
            <div className="font-bold uppercase tracking-wider text-zinc-200">
              Aplikacje Web
            </div>
            <ul className="mt-3 space-y-2">
              {CRAFT_APPS.map((app) => (
                <li key={app.id}>
                  <a
                    href={app.primaryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-zinc-400 transition hover:text-amber-300"
                  >
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: app.accentColor }}
                    />
                    <span className="font-medium text-zinc-200">{app.name}</span>
                    <span>— {app.primaryUrl.replace('https://', '').split('?')[0].replace(/\/$/, '')}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Docs & Code */}
          <div>
            <div className="font-bold uppercase tracking-wider text-zinc-200">
              Dokumentacja i Kod
            </div>
            <ul className="mt-3 space-y-2">
              <li>
                <a
                  href="https://github.com/lukasz-sklad/PL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-zinc-300 hover:text-white"
                >
                  <span>Repozytorium portalu (lukasz-sklad/PL)</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/lukasz-sklad/corel-web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-zinc-300 hover:text-white"
                >
                  <span>VectorCraft Web (lukasz-sklad/corel-web)</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/lukasz-sklad/film-web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-zinc-300 hover:text-white"
                >
                  <span>FilmCraft Web (lukasz-sklad/film-web)</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/lukasz-sklad/excel-web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-zinc-300 hover:text-white"
                >
                  <span>GridCraft Web (lukasz-sklad/excel-web)</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/lukasz-sklad/deck-web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-zinc-300 hover:text-white"
                >
                  <span>DeckCraft Web (lukasz-sklad/deck-web)</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/lukasz-sklad/pdf-web"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-zinc-300 hover:text-white"
                >
                  <span>PDFCraft Web (lukasz-sklad/pdf-web)</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
              <li className="pt-1 border-t border-white/5">
                <a
                  href="https://pl.react.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-cyan-300 hover:underline"
                >
                  <Code2 className="h-3.5 w-3.5" />
                  <span>Polska Dokumentacja React (pl.react.dev)</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Feedback Note */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 space-y-2">
            <div className="font-bold text-white flex items-center gap-1.5">
              <Heart className="h-3.5 w-3.5 text-red-400" /> Wytykanie mile widziane!
            </div>
            <p className="text-[11px] leading-relaxed text-zinc-400">
              Widzisz literówkę lub niezgrabne tłumaczenie w którejś aplikacji? Daj znać! Każda uwaga
              mobilizuje nas do dalszego ulepszania.
            </p>
            <a
              href="https://github.com/lukasz-sklad/PL/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 hover:underline pt-1"
            >
              Zgłoś uwagę na GitHubie →
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-white/10 pt-6 sm:flex-row">
          <div>
            © {new Date().getFullYear()} Polska Stacja *Craft (`craft.lmk.one` / `pl.lmk.one`). Kod na
            licencji MIT OR Apache-2.0.
          </div>
          <div className="text-zinc-500">
            Zbudowano w React 19 + Vite + Tailwind CSS • Rozmiar całej strony: ~0,25 MB
          </div>
        </div>
      </div>
    </footer>
  );
};
