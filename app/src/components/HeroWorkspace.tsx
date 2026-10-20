import React, { useState, useRef, useEffect } from 'react';
import {
  ExternalLink,
  Maximize2,
  Minimize2,
  CheckCircle2,
  Terminal,
  MonitorPlay,
  RotateCcw,
} from 'lucide-react';
import { CRAFT_APPS, CraftApp } from '../data/craftData';
import { ThemeMode } from './Navbar';

interface HeroWorkspaceProps {
  activeApp: CraftApp;
  onSelectApp: (app: CraftApp) => void;
  theme: ThemeMode;
}

export function applyThemeToUrl(baseUrl: string, theme: ThemeMode): string {
  try {
    const url = new URL(baseUrl, window.location.origin);
    url.searchParams.set('theme', theme);
    return url.toString();
  } catch {
    const sep = baseUrl.includes('?') ? '&' : '?';
    return `${baseUrl}${sep}theme=${theme}`;
  }
}

export const HeroWorkspace: React.FC<HeroWorkspaceProps> = ({
  activeApp,
  onSelectApp,
  theme,
}) => {
  // On mobile (< 640px, matching Tailwind 'sm' breakpoint), do not load heavy WebAssembly iframe by default
  const [liveIframe, setLiveIframe] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 640;
    }
    return false;
  });
  const [customIframeUrl, setCustomIframeUrl] = useState<string | null>(null);

  // Resizable window state (width & body height in px; null = default responsive size)
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const [windowHeight, setWindowHeight] = useState<number | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const windowRef = useRef<HTMLDivElement | null>(null);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Sync fullscreen state with document.fullscreenElement
  useEffect(() => {
    const onFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', onFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        if (windowRef.current?.requestFullscreen) {
          await windowRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        }
      }
    } catch (err) {
      console.warn('Błąd przełączania trybu pełnoekranowego:', err);
    }
  };

  // Handle mobile breakpoint changes: disable live iframe when resizing down to mobile
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mql = window.matchMedia('(min-width: 640px)');
    const handleMediaChange = (e: MediaQueryListEvent) => {
      if (!e.matches) {
        setLiveIframe(false);
      }
    };
    mql.addEventListener('change', handleMediaChange);
    return () => mql.removeEventListener('change', handleMediaChange);
  }, []);

  // Reset custom URL and disable iframe auto-loading when switching apps on mobile
  useEffect(() => {
    setCustomIframeUrl(null);
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
      setLiveIframe(false);
    }
  }, [activeApp.id]);

  const baseTargetUrl = customIframeUrl || activeApp.primaryUrl;
  const currentTargetUrl = applyThemeToUrl(baseTargetUrl, theme);

  // Live theme synchronization to embedded iframe via postMessage
  useEffect(() => {
    try {
      iframeRef.current?.contentWindow?.postMessage(
        { type: 'set_theme', theme },
        '*'
      );
    } catch (_) {}
  }, [theme]);

  const startResize = (
    e: React.PointerEvent,
    mode: 'both' | 'width' | 'height'
  ) => {
    e.preventDefault();
    e.stopPropagation();
    const winEl = windowRef.current;
    const bodyEl = bodyRef.current;
    if (!winEl || !bodyEl) return;

    const startX = e.clientX;
    const startY = e.clientY;
    const startW = winEl.getBoundingClientRect().width;
    const startH = bodyEl.getBoundingClientRect().height;

    setIsResizing(true);

    const onPointerMove = (moveEvent: PointerEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      if (mode === 'both' || mode === 'width') {
        const maxW = Math.max(720, window.innerWidth - 24);
        // Window is centered (mx-auto), so dragging right expands width symmetrically (* 2)
        const nextW = Math.min(maxW, Math.max(680, Math.round(startW + dx * 2)));
        setWindowWidth(nextW);
      }

      if (mode === 'both' || mode === 'height') {
        const nextH = Math.min(1600, Math.max(420, Math.round(startH + dy)));
        setWindowHeight(nextH);
      }
    };

    const onPointerUp = () => {
      setIsResizing(false);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  const resetWindowSize = () => {
    setWindowWidth(null);
    setWindowHeight(null);
  };

  const isCustomSized = windowWidth !== null || windowHeight !== null;

  return (
    <section id="top" className="relative overflow-hidden pt-3 pb-16 sm:pt-4">
      {/* Subtle Ambient Glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -z-10 h-[520px] w-[980px] -translate-x-1/2 rounded-full opacity-20 blur-[130px] transition-all duration-700"
        style={{ backgroundColor: activeApp.accentColor }}
      />

      {/* Resizable Studio Window */}
      <div className="mt-1 px-1 sm:px-2 flex justify-center">
        <div
          ref={windowRef}
          style={{
            width: isFullscreen ? '100vw' : windowWidth ? `${windowWidth}px` : 'min(100%, 1645px)',
            maxWidth: isFullscreen ? '100vw' : windowWidth ? '98vw' : '1645px',
            height: isFullscreen ? '100vh' : undefined,
          }}
          className={`relative overflow-hidden bg-[#1b1c1f] shadow-2xl transition-all ${
            isFullscreen ? 'rounded-none border-0' : 'rounded-2xl border border-white/15'
          } ${isResizing ? 'select-none ring-2 ring-amber-500/50' : ''}`}
        >
          {/* Window Top Chrome Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-[#141517] px-4 py-2.5">
            {/* Left: Online App + Odpowiednik */}
            <div className="flex flex-1 flex-wrap items-center gap-2.5 min-w-0">
              {/* Online: {Nazwa programu} + Otwórz w nowej karcie */}
              <div className="inline-flex items-center gap-1.5 shrink-0 text-xs font-normal">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-emerald-500 font-normal">Online:</span>
                <span
                  className="font-bold tracking-tight text-sm"
                  style={{ color: theme === 'dark' ? '#ffffff' : '#000000' }}
                >
                  {activeApp.name}
                </span>
                <a
                  href={currentTargetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Otwórz ${activeApp.name} w nowej karcie`}
                  className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/5 p-1 text-zinc-300 transition hover:border-amber-500/40 hover:bg-amber-500/20 hover:text-amber-300"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Odpowiednik z obramówką */}
              <span className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-zinc-300 shrink-0">
                Odpowiednik: {activeApp.replaces}
              </span>
            </div>

            {/* Right Controls: Reset Size / Tryb: Interaktywny / Pełny ekran */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {isCustomSized && !isFullscreen && (
                <button
                  type="button"
                  onClick={resetWindowSize}
                  title="Przywróć domyślny rozmiar okna"
                  className="inline-flex items-center justify-center gap-1 rounded-lg border border-white/15 bg-white/5 p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-medium text-zinc-300 transition hover:bg-white/10 hover:text-white"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Resetuj rozmiar</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => setLiveIframe((v) => !v)}
                title={
                  liveIframe
                    ? 'Tryb interaktywny (kliknij, aby zwinąć edytor)'
                    : 'Załaduj edytor interaktywny'
                }
                className={`inline-flex items-center justify-center gap-1.5 rounded-lg p-1.5 sm:px-3 sm:py-1.5 text-xs font-semibold transition ${
                  liveIframe
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-white/10 text-zinc-200 hover:bg-white/15'
                }`}
              >
                <MonitorPlay className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">
                  {liveIframe ? 'Tryb: Interaktywny' : 'Załaduj edytor'}
                </span>
              </button>
              <button
                type="button"
                onClick={toggleFullscreen}
                title={
                  isFullscreen
                    ? 'Opuść pełny ekran (Esc)'
                    : 'Włącz tryb pełnoekranowy (Fullscreen)'
                }
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/15 bg-white/5 p-1.5 sm:px-2.5 sm:py-1.5 text-xs font-semibold text-zinc-200 transition hover:bg-white/10 hover:text-white"
              >
                {isFullscreen ? (
                  <>
                    <Minimize2 className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Opuść pełny ekran</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="h-3.5 w-3.5 text-amber-400" />
                    <span className="hidden sm:inline">Pełny ekran</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Window Body: Either Live Embedded WASM App or Interactive Studio Dashboard */}
          <div
            ref={bodyRef}
            style={{
              height: isFullscreen
                ? 'calc(100vh - 49px)'
                : windowHeight
                ? `${windowHeight}px`
                : liveIframe
                ? 'calc(1078px - 49px)'
                : undefined,
              minHeight: isFullscreen ? 'calc(100vh - 49px)' : liveIframe ? '680px' : '470px',
            }}
            className="relative overflow-y-auto"
          >
            {liveIframe ? (
              <div className="relative h-full w-full bg-[#111214]">
                <iframe
                  ref={iframeRef}
                  key={currentTargetUrl}
                  src={currentTargetUrl}
                  title={`${activeApp.name} Live WebAssembly`}
                  className={`h-full w-full border-0 ${
                    isResizing ? 'pointer-events-none' : ''
                  }`}
                  allow="clipboard-read; clipboard-write; fullscreen"
                  onLoad={() => {
                    try {
                      iframeRef.current?.contentWindow?.postMessage(
                        { type: 'set_theme', theme },
                        '*'
                      );
                    } catch (_) {}
                  }}
                />
              </div>
            ) : (
              <div className="grid h-full grid-cols-1 lg:grid-cols-12">
                {/* Left Column: Polish App Details & URL Variants */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/10">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-0.5 text-xs font-semibold ${activeApp.badgeBg} ${activeApp.badgeText}`}
                      >
                        {activeApp.name} v{activeApp.version} PL
                      </span>
                      <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-xs text-zinc-400">
                        Paczka WASM: {activeApp.wasmSizeCompressedMb}
                      </span>
                      <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 text-xs text-emerald-300">
                        {activeApp.translatedStrings.toLocaleString('pl-PL')} fraz po polsku
                      </span>
                    </div>

                    <h2 className="mt-4 text-2xl font-bold text-white sm:text-3xl">
                      {activeApp.name} — {activeApp.taglinePl}
                    </h2>

                    <p className="mt-2 text-xs text-amber-300 font-medium">
                      Domyślna konfiguracja: {activeApp.defaultStateNote}
                    </p>

                    {/* Feature Bullet List */}
                    <ul className="mt-5 space-y-2.5">
                      {activeApp.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-300">
                          <CheckCircle2
                            className="mt-0.5 h-4 w-4 shrink-0"
                            style={{ color: activeApp.accentColor }}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Supported Formats */}
                    <div className="mt-6">
                      <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                        Obsługiwane formaty plików:
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {activeApp.formats.map((fmt) => (
                          <span
                            key={fmt}
                            className="rounded-lg border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-mono text-zinc-200"
                          >
                            {fmt}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Parametry URL SolidCraft (pod formatami plików) */}
                    {activeApp.id === 'solidcraft' && (
                      <div className="mt-6 border-t border-white/10 pt-5">
                        <div className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                          <Terminal className="h-3.5 w-3.5" />
                          <span>Parametry URL SolidCraft:</span>
                        </div>
                        <ul className="mt-3 space-y-2 text-[12px] leading-relaxed text-zinc-300">
                          <li className="flex items-start gap-2">
                            <span className="text-amber-400 font-bold shrink-0">•</span>
                            <span>
                              <code className="text-emerald-300 font-mono font-semibold">&orbit=continuous</code> / <code className="text-emerald-300 font-mono font-semibold">&spin=1</code> / <code className="text-emerald-300 font-mono font-semibold">&turntable=1</code> — <span className="text-zinc-300">ciągły obrót orbitalny detalu 360° (efekt gramofonu),</span>
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-amber-400 font-bold shrink-0">•</span>
                            <span>
                              <code className="text-emerald-300 font-mono font-semibold">&fit=1</code> / <code className="text-emerald-300 font-mono font-semibold">&center=1</code> / <code className="text-emerald-300 font-mono font-semibold">&view=fit</code> — <span className="text-zinc-300">automatyczne dopasowanie odległości kamery i wycentrowanie bryły w kadrze,</span>
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-amber-400 font-bold shrink-0">•</span>
                            <span>
                              <code className="text-emerald-300 font-mono font-semibold">&theme=light</code> / <code className="text-emerald-300 font-mono font-semibold">&theme=dark</code> — <span className="text-zinc-300">natychmiastowe uruchomienie w motywie jasnym lub ciemnym bez białego błysku (plus synchronizacja w czasie rzeczywistym),</span>
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-amber-400 font-bold shrink-0">•</span>
                            <span>
                              <code className="text-emerald-300 font-mono font-semibold">&lang=pl</code> / <code className="text-emerald-300 font-mono font-semibold">&lang=en</code> — <span className="text-zinc-300">wymuszenie języka polskiego lub angielskiego,</span>
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-amber-400 font-bold shrink-0">•</span>
                            <span>
                              <code className="text-emerald-300 font-mono font-semibold">&url=https://...</code> / <code className="text-emerald-300 font-mono font-semibold">&file=...</code> — <span className="text-zinc-300">wczytanie dowolnego modelu .stl, .step, .stp, .obj, .gltf z sieci,</span>
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-amber-400 font-bold shrink-0">•</span>
                            <span>
                              <code className="text-emerald-300 font-mono font-semibold">?sample</code> — <span className="text-zinc-300">wygenerowanie parametrycznej płytki inżynieryjnej B-Rep ze skryptu silnika,</span>
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-amber-400 font-bold shrink-0">•</span>
                            <span>
                              <code className="text-emerald-300 font-mono font-semibold">?new</code> — <span className="text-zinc-300">start z czystym obszarem roboczym CAD i płaszczyznami bazowymi XYZ,</span>
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-amber-400 font-bold shrink-0">•</span>
                            <span>
                              <code className="text-emerald-300 font-mono font-semibold">?webgl</code> / <code className="text-emerald-300 font-mono font-semibold">?webgpu</code> — <span className="text-zinc-300">przełączanie silnika graficznego między WebGL2 a WebGPU,</span>
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-amber-400 font-bold shrink-0">•</span>
                            <span>
                              <code className="text-emerald-300 font-mono font-semibold">?recover=1</code> — <span className="text-zinc-300">opcjonalne wywołanie okna przywracania sesji.</span>
                            </span>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Primary Launch Button */}
                  <div className="mt-8 flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setLiveIframe(true)}
                      className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold text-zinc-950 shadow-lg transition hover:brightness-110"
                      style={{ backgroundColor: activeApp.accentColor }}
                    >
                      <MonitorPlay className="h-4 w-4 fill-current" />
                      <span>Uruchom tutaj</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: Interactive URL Parameters & Instant Links */}
                <div className="lg:col-span-5 bg-[#16171a] p-6 sm:p-8 pb-10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                        <Terminal className="h-4 w-4 text-amber-400" />
                        Parametry URL i szybkie adresy
                      </h3>
                      <span className="text-[11px] text-zinc-400">Kliknij, aby przetestować</span>
                    </div>

                    {/* Quick Links Pills */}
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {activeApp.altUrls.map((link) => (
                        <a
                          key={link.url}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-200 transition hover:border-amber-500/40 hover:bg-amber-500/10 hover:text-amber-200"
                        >
                          <span>{link.label}</span>
                          <ExternalLink className="h-3 w-3 opacity-70" />
                        </a>
                      ))}
                    </div>

                    {/* Interactive URL Parameter Cards */}
                    <div className="mt-5 space-y-3">
                      {activeApp.urlParams.map((param, idx) => (
                        <div
                          key={idx}
                          className="rounded-xl border border-white/10 bg-[#111214] p-3.5 transition hover:border-white/20"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-xs font-semibold text-white">{param.label}</span>
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => {
                                  setCustomIframeUrl(param.exampleUrl);
                                  setLiveIframe(true);
                                }}
                                className="rounded bg-white/10 px-2 py-0.5 text-[10px] font-medium text-amber-300 hover:bg-amber-500/20"
                              >
                                W ramce
                              </button>
                              <a
                                href={param.exampleUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-semibold text-amber-300 hover:bg-amber-500/30"
                              >
                                Otwórz ↗
                              </a>
                            </div>
                          </div>
                          <div className="mt-1.5 break-all rounded bg-black/40 px-2.5 py-1.5 font-mono text-[11px] text-emerald-300">
                            {param.exampleUrl}
                          </div>
                          <p className="mt-1.5 text-[11px] leading-relaxed text-zinc-400">
                            {param.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Parity & Translation Bar */}
                  <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-4">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-zinc-300">
                        Poziom spolszczenia i parzystości funkcji
                      </span>
                      <span className="font-mono font-bold text-amber-400">
                        {activeApp.parityPercent}% ({activeApp.translatedStrings} fraz PL)
                      </span>
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${activeApp.parityPercent}%`,
                          backgroundColor: activeApp.accentColor,
                        }}
                      />
                    </div>
                    <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-400">
                      <span>Upstream: github.com/{activeApp.upstreamRepo}</span>
                      <a
                        href={`https://github.com/${activeApp.plWebRepo}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-300 hover:underline"
                      >
                        Repo PL ↗
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right-Edge Resize Strip */}
          <div
            onPointerDown={(e) => startResize(e, 'width')}
            title="Pociągnij, aby zmienić szerokość okna"
            className="hidden sm:block absolute top-12 right-0 bottom-7 w-2 cursor-ew-resize hover:bg-amber-500/30 transition"
          />

          {/* Bottom-Edge Resize Strip */}
          <div
            onPointerDown={(e) => startResize(e, 'height')}
            title="Pociągnij, aby zmienić wysokość okna"
            className="absolute left-0 right-7 bottom-0 h-2 cursor-ns-resize hover:bg-amber-500/30 transition"
          />

          {/* Bottom-Right Corner Grip Handle (ciągnij i rozciągaj!) */}
          <div
            onPointerDown={(e) => startResize(e, 'both')}
            onDoubleClick={resetWindowSize}
            title="Pociągnij za róg, aby rozciągnąć okno (dwuklik resetuje rozmiar)"
            className="group absolute bottom-0 right-0 z-30 flex h-8 w-8 cursor-nwse-resize items-end justify-end rounded-tl-xl border-t border-l border-white/20 bg-[#141517]/90 p-1.5 transition hover:border-amber-500/60 hover:bg-amber-500/20"
          >
            <svg
              viewBox="0 0 16 16"
              className="h-4 w-4 text-zinc-400 group-hover:text-amber-400"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="14" y1="6" x2="6" y2="14" />
              <line x1="14" y1="10" x2="10" y2="14" />
              <line x1="14" y1="2" x2="2" y2="14" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};
