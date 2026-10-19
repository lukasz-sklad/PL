import { Sparkles, Layers, ArrowUpRight, FolderGit2 } from 'lucide-react';
import { CRAFT_APPS, SIBLING_APPS, CraftApp } from '../data/craftData';

interface AppDirectoryProps {
  onSelectApp: (app: CraftApp) => void;
}

export const AppDirectory: React.FC<AppDirectoryProps> = ({ onSelectApp }) => {
  return (
    <section id="aplikacje" className="py-16 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
              <Layers className="h-4 w-4" /> Katalog Aplikacji Online
            </div>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-4xl">
              {CRAFT_APPS.length} gotowych aplikacji webowych
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-zinc-400">
              W Twojej przeglądarce.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-zinc-300">
            Łącznie przetłumaczono:{' '}
            <strong className="text-amber-400 font-mono">16 200+ fraz UI</strong>
          </div>
        </div>

        {/* 6 Main Deployed Cards */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CRAFT_APPS.map((app) => (
            <div
              key={app.id}
              onClick={() => {
                onSelectApp(app);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              title="Kliknij, aby wczytać podgląd na górze"
              className={`group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-gradient-to-b ${app.gradientFrom} ${app.gradientTo} bg-[#1a1b1e] p-6 transition-all hover:border-white/25 hover:shadow-xl cursor-pointer`}
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: app.accentColor }}
                      />
                      <h3 className="text-xl font-extrabold text-white">{app.name}</h3>
                      <span className="rounded-md bg-white/10 px-2 py-0.5 font-mono text-[11px] text-zinc-300">
                        v{app.version}
                      </span>
                    </div>
                    <div className="mt-1 text-xs font-medium text-zinc-400">
                      Odpowiednik: <span className="text-zinc-200">{app.replaces}</span>
                    </div>
                  </div>
                  <span className="rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-300">
                    Online
                  </span>
                </div>

                {/* Description */}
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">{app.taglinePl}</p>

                {/* Formats */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {app.formats.slice(0, 4).map((f) => (
                    <span
                      key={f}
                      className="rounded-md border border-white/10 bg-black/30 px-2 py-0.5 font-mono text-[11px] text-zinc-300"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* All URLs for this App */}
                <div className="mt-5 rounded-xl border border-white/10 bg-black/30 p-3">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                    Dostępne polskie adresy URL:
                  </div>
                  <div className="mt-2 space-y-1.5">
                    {app.altUrls.map((u) => (
                      <a
                        key={u.url}
                        href={u.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center justify-between rounded-lg px-2 py-1 text-xs text-zinc-300 transition hover:bg-white/10 hover:text-amber-300"
                      >
                        <span className="truncate font-mono">{u.label}</span>
                        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 opacity-70" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Repo Link */}
              <div className="mt-5 flex items-center justify-end border-t border-white/10 pt-4 text-[11px] text-zinc-400">
                <a
                  href={`https://github.com/${app.upstreamRepo}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  title={`Repozytorium ${app.upstreamRepo}`}
                  className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-amber-300"
                >
                  <FolderGit2 className="h-4 w-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Sibling Apps in the *Craft Ecosystem (Waiting in Queue for PL Web) */}
        <div className="mt-14 rounded-2xl border border-white/10 bg-[#18191c] p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-400" />
                Aktualnie na warsztacie i w przygotowaniu (kolejne na tapecie)
              </h3>
              <p className="mt-1 text-xs text-zinc-400">
                Aplikacje, które aktywnie modyfikujemy, ulepszamy lub przygotowujemy do kolejnych wydań.
              </p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SIBLING_APPS.map((sib) => (
              <div
                key={sib.name}
                className="flex flex-col justify-between rounded-xl border border-white/10 bg-black/30 p-4"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">{sib.name}</span>
                    <span className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-[10px] text-zinc-300">
                      v{sib.version}
                    </span>
                  </div>
                  <div className="mt-0.5 text-[11px] font-semibold text-amber-300">{sib.replaces}</div>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-400">{sib.descriptionPl}</p>
                </div>
                <div className="mt-3 flex items-center justify-end border-t border-white/5 pt-2.5 text-[11px] text-zinc-400">
                  <a
                    href={`https://github.com/${sib.upstreamRepo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Repozytorium ${sib.upstreamRepo}`}
                    className="inline-flex items-center gap-1.5 text-zinc-300 hover:text-amber-300"
                  >
                    <FolderGit2 className="h-4 w-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
