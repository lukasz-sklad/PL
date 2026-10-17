import React, { useState } from 'react';
import {
  ChevronDown,
  ExternalLink,
  Sparkles,
  GitCommit,
  Link2,
  HeartHandshake,
  Code2,
  Cpu,
  Layers,
} from 'lucide-react';
import { CRAFT_APPS, CraftApp } from '../data/craftData';

interface NavbarProps {
  activeApp: CraftApp;
  onSelectApp: (app: CraftApp) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeApp, onSelectApp }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#151617]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Left: Brand + App Switcher Dropdown (like vectorcraft.app) */}
        <div className="flex items-center gap-3">
          <a
            href="#top"
            className="flex items-center gap-2.5 rounded-xl bg-white/[0.04] px-3 py-1.5 ring-1 ring-white/10 transition hover:bg-white/[0.08]"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-white via-slate-100 to-red-500 text-xs font-extrabold text-zinc-900 shadow-sm">
              PL
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-white">
                *Craft <span className="text-amber-400">Polska</span>
              </span>
              <span className="text-[10px] text-zinc-400">Stacja Aplikacji Web &amp; SteamOS</span>
            </div>
          </a>

          {/* Ecosystem App Switcher */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen((v) => !v)}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-[#1e2022] px-3 py-1.5 text-xs font-medium text-zinc-200 transition hover:border-amber-500/40 hover:text-white"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: activeApp.accentColor }}
              />
              <span>{activeApp.name}</span>
              <span className="hidden rounded bg-white/10 px-1.5 py-0.5 text-[10px] text-zinc-300 sm:inline">
                v{activeApp.version}
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
            </button>

            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setDropdownOpen(false)}
                />
                <div className="absolute left-0 mt-2 w-80 rounded-2xl border border-white/15 bg-[#1b1c1e] p-2 shadow-2xl z-50">
                  <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                    Wybierz aplikację (oryginalne nazwy)
                  </div>
                  <div className="space-y-1">
                    {CRAFT_APPS.map((app) => (
                      <div
                        key={app.id}
                        className={`flex items-center justify-between rounded-xl px-3 py-2 transition ${
                          app.id === activeApp.id
                            ? 'bg-white/10 text-white'
                            : 'text-zinc-300 hover:bg-white/5 hover:text-white'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            onSelectApp(app);
                            setDropdownOpen(false);
                          }}
                          className="flex flex-1 items-center gap-2.5 text-left"
                        >
                          <span
                            className="h-2.5 w-2.5 rounded-full shrink-0"
                            style={{ backgroundColor: app.accentColor }}
                          />
                          <div>
                            <div className="text-xs font-semibold text-white">
                              {app.name}{' '}
                              <span className="text-[10px] font-normal text-zinc-400">
                                ({app.replaces.split('/')[0].trim()})
                              </span>
                            </div>
                            <div className="text-[11px] text-zinc-400">
                              {app.primaryUrl.replace('https://', '').replace(/\/$/, '')}
                            </div>
                          </div>
                        </button>
                        <a
                          href={app.primaryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`Otwórz ${app.name} w nowej karcie`}
                          className="ml-2 rounded-lg bg-white/5 p-1.5 text-zinc-300 hover:bg-amber-500/20 hover:text-amber-300"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden items-center gap-1 lg:flex">
          <a
            href="#aplikacje"
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white"
          >
            <Layers className="h-3.5 w-3.5 text-amber-400" />
            Aplikacje (6)
          </a>
          <a
            href="#manifest-pl"
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white"
          >
            <HeartHandshake className="h-3.5 w-3.5 text-red-400" />
            Manifest PL („Jajko Polskie”)
          </a>
          <a
            href="#kreator-url"
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white"
          >
            <Link2 className="h-3.5 w-3.5 text-emerald-400" />
            Kreator ?file=
          </a>
          <a
            href="#puls-githuba"
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white"
          >
            <GitCommit className="h-3.5 w-3.5 text-purple-400" />
            Newsy z GitHuba
          </a>
          <a
            href="#wizualizacje"
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white"
          >
            <Sparkles className="h-3.5 w-3.5 text-sky-400" />
            Wizualizacje &amp; Skróty
          </a>
          <a
            href="#react-pl"
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white"
          >
            <Code2 className="h-3.5 w-3.5 text-cyan-400" />
            React po polsku
          </a>
          <a
            href="#steamos-pgo"
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-white/5 hover:text-white"
          >
            <Cpu className="h-3.5 w-3.5 text-orange-400" />
            SteamOS PGO
          </a>
        </nav>

        {/* Right: Quick Launch Active App */}
        <div className="flex items-center gap-2">
          <a
            href={activeApp.primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-3.5 py-1.5 text-xs font-semibold text-zinc-950 shadow-lg shadow-amber-500/20 transition hover:bg-amber-400"
          >
            <span>Uruchom {activeApp.name}</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
};
