import React, { useState } from 'react';
import {
  ChevronDown,
  ExternalLink,
  Moon,
  Sun,
  BookOpen,
} from 'lucide-react';
import { CRAFT_APPS, CraftApp } from '../data/craftData';

export type ThemeMode = 'dark' | 'light' | 'sepia';

interface NavbarProps {
  activeApp: CraftApp;
  onSelectApp: (app: CraftApp) => void;
  theme: ThemeMode;
  onSelectTheme: (theme: ThemeMode) => void;
}

const NAV_ITEMS = [
  { href: '#aplikacje', label: 'Aplikacje' },
  { href: '#manifest-pl', label: 'Manifest PL' },
  { href: '#kreator-url', label: 'Kreator ?file=' },
  { href: '#puls-githuba', label: 'GitHub' },
  { href: '#wizualizacje', label: 'Skróty' },
  { href: '#react-pl', label: 'React PL' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeApp,
  onSelectApp,
  theme,
  onSelectTheme,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#151617]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-2.5 sm:px-6 lg:px-8">
        {/* Left: Minimalist "Craft" Brand Button + App Switcher */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex h-9 items-center justify-center rounded-xl border border-white/10 bg-[#1e2022] px-3.5 text-sm font-bold tracking-tight text-white transition hover:border-amber-500/40"
          >
            Craft
          </button>

          {/* Ecosystem App Switcher */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen((v) => !v)}
              className="inline-flex h-9 items-center gap-2 rounded-xl border border-white/10 bg-[#1e2022] px-3.5 text-xs font-medium text-zinc-200 transition hover:border-amber-500/40 hover:text-white"
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: activeApp.accentColor }}
              />
              <span>{activeApp.name}</span>
              <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
            </button>

            {dropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setDropdownOpen(false)}
                />
                <div className="absolute left-0 mt-2 w-72 rounded-2xl border border-white/15 bg-[#1b1c1e] p-2 shadow-2xl z-50">
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
                            <div className="text-xs font-semibold text-white">{app.name}</div>
                            <div className="text-[11px] text-zinc-400">
                              {app.primaryUrl.replace('https://', '').replace(/\/$/, '')}
                            </div>
                          </div>
                        </button>
                        <a
                          href={app.primaryUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`Otwórz ${app.name}`}
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

        {/* Center: Uniform, Aligned Navigation Buttons */}
        <nav className="hidden items-center gap-1.5 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="inline-flex h-9 items-center justify-center rounded-xl border border-white/10 bg-[#1e2022] px-3.5 text-xs font-medium text-zinc-200 transition hover:border-amber-500/40 hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: Uniform Theme Switcher (Sepia / Jasny / Ciemny) + Launch */}
        <div className="flex items-center gap-2">
          <div
            role="group"
            aria-label="Przełącznik motywu"
            className="inline-flex h-9 items-center rounded-xl border border-white/10 bg-[#1e2022] p-1 text-xs"
          >
            <button
              type="button"
              onClick={() => onSelectTheme('sepia')}
              title="Motyw sepia"
              className={`inline-flex h-7 items-center gap-1 rounded-lg px-2.5 font-medium transition ${
                theme === 'sepia'
                  ? 'bg-amber-500 text-zinc-950 font-semibold'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Sepia</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectTheme('light')}
              title="Motyw jasny"
              className={`inline-flex h-7 items-center gap-1 rounded-lg px-2.5 font-medium transition ${
                theme === 'light'
                  ? 'bg-amber-500 text-zinc-950 font-semibold'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              <Sun className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Jasny</span>
            </button>
            <button
              type="button"
              onClick={() => onSelectTheme('dark')}
              title="Motyw ciemny"
              className={`inline-flex h-7 items-center gap-1 rounded-lg px-2.5 font-medium transition ${
                theme === 'dark'
                  ? 'bg-amber-500 text-zinc-950 font-semibold'
                  : 'text-zinc-300 hover:text-white'
              }`}
            >
              <Moon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Ciemny</span>
            </button>
          </div>

          <a
            href={activeApp.primaryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-amber-500 px-3.5 text-xs font-semibold text-zinc-950 transition hover:bg-amber-400"
          >
            <span className="hidden md:inline">{activeApp.name}</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </header>
  );
};
