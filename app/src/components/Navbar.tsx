import React, { useState, useEffect } from 'react';
import {
  ChevronDown,
  ExternalLink,
  Moon,
  Sun,
  BookOpen,
  Eye,
  Send,
  X,
  RotateCcw,
  Check,
} from 'lucide-react';
import { CRAFT_APPS, CraftApp } from '../data/craftData';

export type ThemeMode = 'dark' | 'light' | 'sepia';

interface NavbarProps {
  activeApp: CraftApp;
  onSelectApp: (app: CraftApp) => void;
  theme: ThemeMode;
  onSelectTheme: (theme: ThemeMode) => void;
}

interface A11yState {
  scale: 100 | 115 | 125 | 150;
  highContrast: boolean;
  dyslexiaFriendly: boolean;
  underlineLinks: boolean;
  reduceMotion: boolean;
  focusRing: boolean;
}

const DEFAULT_A11Y: A11yState = {
  scale: 100,
  highContrast: false,
  dyslexiaFriendly: false,
  underlineLinks: false,
  reduceMotion: false,
  focusRing: false,
};

const NAV_ITEMS = [
  { href: '#aplikacje', label: 'Aplikacje' },
  { href: '#manifest-pl', label: 'Manifest' },
  { href: '#kreator-url', label: 'Kreator ?file=' },
  { href: '#puls-githuba', label: 'GitHub' },
  { href: '#wizualizacje', label: 'Skróty' },
  { href: '#react-pl', label: 'React' },
];

export const Navbar: React.FC<NavbarProps> = ({
  activeApp,
  onSelectApp,
  theme,
  onSelectTheme,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [a11yOpen, setA11yOpen] = useState(false);
  const [activeHash, setActiveHash] = useState<string>('#aplikacje');
  const [bannerDismissed, setBannerDismissed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('pl_craft_tg_banner_dismissed') === '1';
    } catch {
      return false;
    }
  });

  const [a11y, setA11y] = useState<A11yState>(() => {
    try {
      const raw = localStorage.getItem('pl_craft_a11y_v1');
      if (raw) {
        return { ...DEFAULT_A11Y, ...JSON.parse(raw) };
      }
    } catch {
      // ignore
    }
    return DEFAULT_A11Y;
  });

  useEffect(() => {
    const root = document.documentElement;
    root.style.fontSize = `${a11y.scale}%`;
    root.toggleAttribute('data-a11y-contrast', a11y.highContrast);
    root.toggleAttribute('data-a11y-dyslexia', a11y.dyslexiaFriendly);
    root.toggleAttribute('data-a11y-links', a11y.underlineLinks);
    root.toggleAttribute('data-a11y-motion', a11y.reduceMotion);
    root.toggleAttribute('data-a11y-focus', a11y.focusRing);
    try {
      localStorage.setItem('pl_craft_a11y_v1', JSON.stringify(a11y));
    } catch {
      // ignore
    }
    // Synchronize UI scaling with embedded *Craft WASM iframe (1.25 default base * user factor)
    try {
      const frames = document.querySelectorAll('iframe');
      const wasmScale =
        a11y.scale === 100
          ? 1.25
          : a11y.scale === 115
          ? 1.35
          : a11y.scale === 125
          ? 1.5
          : 1.75;
      frames.forEach((f) => {
        f.contentWindow?.postMessage({ type: 'set_scale', scale: wasmScale }, '*');
      });
    } catch {
      // ignore
    }
  }, [a11y]);

  const hasCustomA11y =
    a11y.scale !== 100 ||
    a11y.highContrast ||
    a11y.dyslexiaFriendly ||
    a11y.underlineLinks ||
    a11y.reduceMotion ||
    a11y.focusRing;

  const shareUrl =
    typeof window !== 'undefined' ? window.location.href : 'https://craft.lmk.one';
  const shareText = `${activeApp.name} v${activeApp.version} PL (${activeApp.replaces}) — polska stacja robocza WebAssembly na craft.lmk.one`;
  const telegramShareHref = `https://t.me/share/url?url=${encodeURIComponent(
    shareUrl
  )}&text=${encodeURIComponent(shareText)}`;

  return (
    <>
      {/* Top Announcement Bar for Telegram */}
      {!bannerDismissed && (
        <aside
          aria-label="Powiadomienie Telegram"
          className="relative z-50 border-b border-white/10 bg-gradient-to-r from-sky-500/15 via-amber-500/10 to-sky-500/15 px-3 py-1.5 text-xs backdrop-blur-md"
        >
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2 text-[12px] text-zinc-200">
              <span
                aria-hidden="true"
                className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-sky-400/30 bg-sky-500/20 text-[11px]"
              >
                📣
              </span>
              <span>
                <strong className="font-semibold text-white">Stacja *Craft PL na Telegramie:</strong>{' '}
                powiadomienia o nowych kompilacjach WASM/Flatpak (VectorCraft 0.17 CDR, PDF, CAD) i szybkie udostępnianie projektów.
              </span>
              <a
                href={telegramShareHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md border border-sky-400/40 bg-sky-500/20 px-2 py-0.5 text-[11px] font-semibold text-sky-200 transition hover:bg-sky-500/30 hover:text-white"
              >
                <Send className="h-3 w-3" />
                <span>Wyślij na Telegram</span>
              </a>
            </div>
            <button
              type="button"
              onClick={() => {
                setBannerDismissed(true);
                try {
                  localStorage.setItem('pl_craft_tg_banner_dismissed', '1');
                } catch {
                  // ignore
                }
              }}
              title="Zamknij pasek Telegram"
              aria-label="Zamknij pasek powiadomień"
              className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-zinc-400 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </aside>
      )}

      {/* Slim Segmented Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#151617]/88 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-1.5 sm:px-5 lg:px-7">
          {/* Left: Slim Brand + Ecosystem App Switcher */}
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex h-8 items-center justify-center rounded-[10px] border border-white/12 bg-white/[0.04] px-3 text-[13px] font-extrabold tracking-tight text-white transition hover:border-amber-500/40 hover:bg-white/[0.08]"
            >
              Craft
            </button>

            {/* Ecosystem App Switcher */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setDropdownOpen((v) => !v)}
                className="inline-flex h-8 items-center gap-1.5 rounded-[10px] border border-white/12 bg-white/[0.04] px-3 text-xs font-semibold text-zinc-200 transition hover:border-amber-500/40 hover:bg-white/[0.08] hover:text-white"
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
                  <div className="absolute left-0 mt-1.5 w-72 rounded-2xl border border-white/15 bg-[#1b1c1e] p-2 shadow-2xl z-50">
                    <div className="space-y-1">
                      {CRAFT_APPS.map((app) => (
                        <div
                          key={app.id}
                          className={`flex items-center justify-between rounded-xl px-3 py-1.5 transition ${
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
                                  v{app.version}
                                </span>
                              </div>
                              <div className="text-[11px] text-zinc-400">
                                {app.displayDomain ||
                                  (app.id === 'solidcraft'
                                    ? 'solidcraft.lmk'
                                    : app.primaryUrl
                                        .replace('https://', '')
                                        .split('?')[0]
                                        .replace(/\/$/, ''))}
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

          {/* Center: Single Segmented Pill Menu */}
          <nav
            aria-label="Nawigacja główna"
            className="hidden md:flex items-center justify-center"
          >
            <ul className="nav-menu-pill inline-flex items-center gap-[3px] rounded-[13px] border border-white/12 bg-white/[0.04] p-[4px] backdrop-blur-md">
              {NAV_ITEMS.map((item) => {
                const isActive = activeHash === item.href;
                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={() => setActiveHash(item.href)}
                      className={`nav-menu-item inline-flex h-[30px] items-center justify-center rounded-[9px] px-3 text-[12.5px] font-semibold tracking-[-0.01em] transition-all duration-150 ${
                        isActive
                          ? 'bg-white/12 text-white shadow-[0_2px_8px_rgba(0,0,0,0.22)]'
                          : 'text-zinc-300 hover:bg-white/[0.08] hover:text-white'
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right: Telegram Icon + Accessibility (WCAG) Icon + 3 Icon-Only Theme Buttons */}
          <div className="flex items-center gap-1.5">
            {/* Telegram Share Button */}
            <a
              href={telegramShareHref}
              target="_blank"
              rel="noopener noreferrer"
              title="Udostępnij bieżącą aplikację na Telegramie"
              aria-label="Udostępnij na Telegramie"
              className="inline-flex h-8 w-8 items-center justify-center rounded-[11px] border border-white/12 bg-white/[0.04] text-sky-300 transition-all duration-150 hover:border-sky-400/50 hover:bg-sky-500/20 hover:text-sky-200 hover:shadow-[0_0_12px_rgba(56,189,248,0.35)]"
            >
              <Send className="h-3.5 w-3.5" />
            </a>

            {/* Accessibility (Ułatwienia dostępu dla osób słabowidzących i niepełnosprawnych) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setA11yOpen((v) => !v)}
                title="Ułatwienia dostępu (WCAG — dla osób słabowidzących i niepełnosprawnych)"
                aria-label="Ułatwienia dostępu"
                aria-expanded={a11yOpen}
                className={`inline-flex h-8 w-8 items-center justify-center rounded-[11px] border transition-all duration-150 ${
                  hasCustomA11y || a11yOpen
                    ? 'border-amber-400/70 bg-amber-500/25 text-amber-300 shadow-[0_0_14px_rgba(245,158,11,0.4)]'
                    : 'border-white/12 bg-white/[0.04] text-zinc-300 hover:border-amber-400/50 hover:bg-amber-500/15 hover:text-amber-200 hover:shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                }`}
              >
                <Eye className="h-4 w-4" />
              </button>

              {a11yOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setA11yOpen(false)}
                  />
                  <div
                    role="dialog"
                    aria-label="Panel ułatwień dostępu"
                    className="absolute right-0 mt-2 w-80 rounded-2xl border border-white/15 bg-[#1b1c1e] p-4 shadow-2xl z-50 text-xs"
                  >
                    <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                      <div>
                        <div className="font-bold text-white text-[13px] flex items-center gap-1.5">
                          <Eye className="h-4 w-4 text-amber-400" />
                          <span>Ułatwienia dostępu (WCAG)</span>
                        </div>
                        <div className="text-[11px] text-zinc-400">
                          Dla osób słabowidzących, z dysleksją i nawigujących klawiaturą
                        </div>
                      </div>
                      {hasCustomA11y && (
                        <button
                          type="button"
                          onClick={() => setA11y(DEFAULT_A11Y)}
                          title="Przywróć domyślne ustawienia dostępności"
                          className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-zinc-300 hover:bg-white/10 hover:text-white"
                        >
                          <RotateCcw className="h-3 w-3" />
                          <span>Reset</span>
                        </button>
                      )}
                    </div>

                    {/* Font & UI Scale */}
                    <div className="mt-3">
                      <div className="text-[11px] font-semibold text-zinc-300 mb-1.5">
                        Powiększenie tekstu i programu:
                      </div>
                      <div className="grid grid-cols-4 gap-1.5">
                        {([100, 115, 125, 150] as const).map((sz) => (
                          <button
                            key={sz}
                            type="button"
                            onClick={() => setA11y((prev) => ({ ...prev, scale: sz }))}
                            className={`rounded-lg border py-1.5 font-mono text-xs font-bold transition ${
                              a11y.scale === sz
                                ? 'border-amber-400 bg-amber-500 text-zinc-950'
                                : 'border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10'
                            }`}
                          >
                            {sz}%
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Toggles */}
                    <div className="mt-3 space-y-1.5">
                      {[
                        {
                          key: 'highContrast' as const,
                          label: 'Wysoki kontrast (WCAG AAA)',
                          desc: 'Wyraźne obrysy i maksymalny kontrast tekstu',
                        },
                        {
                          key: 'dyslexiaFriendly' as const,
                          label: 'Czytelny tekst (Dysleksja)',
                          desc: 'Większe odstępy między literami i wierszami',
                        },
                        {
                          key: 'underlineLinks' as const,
                          label: 'Podkreślaj wszystkie linki',
                          desc: 'Ułatwia odróżnienie przycisków i odnośników',
                        },
                        {
                          key: 'focusRing' as const,
                          label: 'Wyraźny fokus klawiatury (Tab)',
                          desc: 'Gruba złota ramka wokół aktywnego elementu',
                        },
                        {
                          key: 'reduceMotion' as const,
                          label: 'Zatrzymaj animacje i błyski',
                          desc: 'Wyłącza ruchome przejścia i pulsowanie',
                        },
                      ].map((opt) => {
                        const checked = a11y[opt.key];
                        return (
                          <button
                            key={opt.key}
                            type="button"
                            onClick={() =>
                              setA11y((prev) => ({ ...prev, [opt.key]: !prev[opt.key] }))
                            }
                            className={`flex w-full items-start justify-between gap-2 rounded-xl border p-2 text-left transition ${
                              checked
                                ? 'border-amber-400/50 bg-amber-500/15 text-white'
                                : 'border-white/10 bg-white/[0.03] text-zinc-300 hover:bg-white/[0.07]'
                            }`}
                          >
                            <div>
                              <div className="text-xs font-semibold text-white">
                                {opt.label}
                              </div>
                              <div className="text-[10.5px] text-zinc-400">{opt.desc}</div>
                            </div>
                            <span
                              className={`mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                                checked
                                  ? 'border-amber-400 bg-amber-500 text-zinc-950'
                                  : 'border-white/20 bg-transparent'
                              }`}
                            >
                              {checked && <Check className="h-3 w-3 stroke-[3]" />}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* 3 Icon-Only Theme Buttons (Sepia / Jasny / Ciemny) with Hover Glow */}
            <div
              role="group"
              aria-label="Przełącznik motywu (Sepia, Jasny, Ciemny)"
              className="nav-menu-pill inline-flex items-center gap-[3px] rounded-[13px] border border-white/12 bg-white/[0.04] p-[3px]"
            >
              <button
                type="button"
                onClick={() => onSelectTheme('sepia')}
                title="Motyw Sepia (w programie: Średni szary + Ciemnoszare płótno)"
                aria-label="Motyw Sepia"
                aria-pressed={theme === 'sepia'}
                className={`inline-flex h-7 w-7 items-center justify-center rounded-[9px] transition-all duration-150 ${
                  theme === 'sepia'
                    ? 'bg-amber-500 text-zinc-950 shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                    : 'text-zinc-300 hover:bg-amber-500/20 hover:text-amber-300 hover:shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                }`}
              >
                <BookOpen className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onSelectTheme('light')}
                title="Motyw Jasny (w programie: Jasny + Średnioszare płótno)"
                aria-label="Motyw Jasny"
                aria-pressed={theme === 'light'}
                className={`inline-flex h-7 w-7 items-center justify-center rounded-[9px] transition-all duration-150 ${
                  theme === 'light'
                    ? 'bg-amber-500 text-zinc-950 shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                    : 'text-zinc-300 hover:bg-amber-500/20 hover:text-amber-300 hover:shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                }`}
              >
                <Sun className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => onSelectTheme('dark')}
                title="Motyw Ciemny (w programie: Ciemno + Ciemnoszare płótno)"
                aria-label="Motyw Ciemny"
                aria-pressed={theme === 'dark'}
                className={`inline-flex h-7 w-7 items-center justify-center rounded-[9px] transition-all duration-150 ${
                  theme === 'dark'
                    ? 'bg-amber-500 text-zinc-950 shadow-[0_0_12px_rgba(245,158,11,0.5)]'
                    : 'text-zinc-300 hover:bg-amber-500/20 hover:text-amber-300 hover:shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                }`}
              >
                <Moon className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
