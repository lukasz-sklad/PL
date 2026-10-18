import React, { useState, useMemo } from 'react';
import {
  Link2,
  ExternalLink,
  Copy,
  Check,
  Cloud,
  Sparkles,
  ShieldCheck,
  Wand2,
} from 'lucide-react';
import { CRAFT_APPS } from '../data/craftData';

const PRESET_FILES = [
  {
    label: 'Herb Zawiercia (.cdr z GitHuba)',
    appId: 'vectorcraft',
    fileUrl: 'https://raw.githubusercontent.com/lukasz-sklad/corel-web/main/zawiercie_logo.cdr',
  },
  {
    label: 'Wektorowy Tygrys (.svg Wikimedia)',
    appId: 'vectorcraft',
    fileUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fd/Ghostscript_Tiger.svg',
  },
  {
    label: 'Przykładowy klip wideo (.mp4 CC0 w FilmCraft)',
    appId: 'filmcraft',
    fileUrl: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  },
  {
    label: 'Grafika rastrowa (.png w PhotoCraft)',
    appId: 'photocraft',
    fileUrl: 'https://photocraft.lmk.one/favicon.png',
  },
];

export const UrlWizard: React.FC = () => {
  const [inputUrl, setInputUrl] = useState(
    'https://raw.githubusercontent.com/lukasz-sklad/corel-web/main/zawiercie_logo.cdr'
  );
  const [selectedAppId, setSelectedAppId] = useState<string>('auto');
  const [modeNew, setModeNew] = useState(false);
  const [modeWebgl, setModeWebgl] = useState(false);
  const [copied, setCopied] = useState(false);

  // Auto-detect app from extension
  const detectedApp = useMemo(() => {
    if (selectedAppId !== 'auto') {
      return CRAFT_APPS.find((a) => a.id === selectedAppId) || CRAFT_APPS[0];
    }
    const lower = inputUrl.toLowerCase();
    if (lower.endsWith('.cdr') || lower.endsWith('.svg') || lower.endsWith('.ai') || lower.endsWith('.eps')) {
      return CRAFT_APPS.find((a) => a.id === 'vectorcraft')!;
    }
    if (lower.endsWith('.mp4') || lower.endsWith('.mov') || lower.endsWith('.webm') || lower.endsWith('.mkv') || lower.endsWith('.fcproj')) {
      return CRAFT_APPS.find((a) => a.id === 'filmcraft')!;
    }
    if (lower.endsWith('.psd') || lower.endsWith('.xcf') || lower.endsWith('.png') || lower.endsWith('.jpg') || lower.endsWith('.webp')) {
      return CRAFT_APPS.find((a) => a.id === 'photocraft')!;
    }
    if (lower.endsWith('.docx') || lower.endsWith('.odt') || lower.endsWith('.rtf') || lower.endsWith('.md')) {
      return CRAFT_APPS.find((a) => a.id === 'wordcraft')!;
    }
    if (lower.endsWith('.xlsx') || lower.endsWith('.csv') || lower.endsWith('.ods')) {
      return CRAFT_APPS.find((a) => a.id === 'gridcraft')!;
    }
    if (lower.endsWith('.pptx') || lower.endsWith('.odp')) {
      return CRAFT_APPS.find((a) => a.id === 'deckcraft')!;
    }
    if (lower.endsWith('.pdf')) {
      return CRAFT_APPS.find((a) => a.id === 'pdfcraft') || CRAFT_APPS[0];
    }
    if (lower.endsWith('.fig')) {
      return CRAFT_APPS.find((a) => a.id === 'figcraft') || CRAFT_APPS[0];
    }
    if (lower.endsWith('.dng') || lower.endsWith('.cr2') || lower.endsWith('.nef') || lower.endsWith('.arw') || lower.endsWith('.raw')) {
      return CRAFT_APPS.find((a) => a.id === 'lightcraft') || CRAFT_APPS[0];
    }
    if (
      lower.endsWith('.scraftz') ||
      lower.endsWith('.scraft') ||
      lower.endsWith('.wav') ||
      lower.endsWith('.flac') ||
      lower.endsWith('.mp3') ||
      lower.endsWith('.ogg') ||
      lower.endsWith('.aif') ||
      lower.endsWith('.aiff') ||
      lower.endsWith('.caf') ||
      lower.endsWith('.mid') ||
      lower.endsWith('.midi')
    ) {
      return CRAFT_APPS.find((a) => a.id === 'soundcraft') || CRAFT_APPS[0];
    }
    if (
      lower.endsWith('.stl') ||
      lower.endsWith('.step') ||
      lower.endsWith('.stp') ||
      lower.endsWith('.solidcraft') ||
      lower.endsWith('.obj') ||
      lower.endsWith('.fcstd')
    ) {
      return CRAFT_APPS.find((a) => a.id === 'solidcraft') || CRAFT_APPS[0];
    }
    return CRAFT_APPS[0];
  }, [inputUrl, selectedAppId]);

  const generatedLink = useMemo(() => {
    const base = detectedApp.primaryUrl.split('?')[0].replace(/\/$/, '');
    const params: string[] = [];
    if (modeNew) {
      params.push('new');
    } else if (inputUrl.trim()) {
      params.push(`file=${ inputUrl.trim() }`);
    }
    if (modeWebgl) {
      params.push('webgl');
    }
    return params.length > 0 ? `${base}/?${params.join('&')}` : `${base}/`;
  }, [detectedApp, inputUrl, modeNew, modeWebgl]);

  const copyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="kreator-url" className="py-16 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/15 bg-gradient-to-br from-[#1b1d22] via-[#17181c] to-[#131417] p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 items-center">
            {/* Left 7 Cols: Interactive Builder */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-300">
                <Wand2 className="h-3.5 w-3.5" /> Interaktywny Kreator Linków ?file=...
              </div>

              <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                Otwieraj pliki bezpośrednio z adresu URL (GitHub, chmura, własny serwer)
              </h2>

              <p className="text-sm text-zinc-300 leading-relaxed">
                Wklej link do pliku <code className="text-amber-300">.cdr</code>,{' '}
                <code className="text-purple-300">.mp4</code>,{' '}
                <code className="text-blue-300">.psd</code>,{' '}
                <code className="text-sky-300">.docx</code> lub{' '}
                <code className="text-emerald-300">.xlsx</code>. Kreator sam rozpozna program i
                wygeneruje gotowy link startowy!
              </p>

              {/* Preset Buttons */}
              <div className="space-y-1.5">
                <div className="text-xs font-semibold text-zinc-400">
                  Szybkie przykłady (kliknij, aby wstawić):
                </div>
                <div className="flex flex-wrap gap-2">
                  {PRESET_FILES.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => {
                        setInputUrl(preset.fileUrl);
                        setSelectedAppId(preset.appId);
                        setModeNew(false);
                      }}
                      className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1.5 text-xs text-zinc-200 transition hover:border-amber-500/40 hover:bg-amber-500/15 hover:text-amber-200"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input URL Field */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Adres URL Twojego pliku w sieci:
                </label>
                <input
                  type="text"
                  value={inputUrl}
                  disabled={modeNew}
                  onChange={(e) => setInputUrl(e.target.value)}
                  placeholder="https://raw.githubusercontent.com/.../plik.cdr"
                  className="w-full rounded-xl border border-white/15 bg-black/50 px-4 py-3 font-mono text-xs sm:text-sm text-white placeholder-zinc-500 focus:border-amber-400 focus:outline-none disabled:opacity-50"
                />
              </div>

              {/* App Selection & Flags */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-400">Program:</span>
                  <select
                    value={selectedAppId}
                    onChange={(e) => setSelectedAppId(e.target.value)}
                    className="rounded-lg border border-white/15 bg-[#121316] px-3 py-1.5 text-xs font-semibold text-white"
                  >
                    <option value="auto">
                      Automatycznie ({detectedApp.name})
                    </option>
                    {CRAFT_APPS.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.name} ({a.primaryUrl.replace('https://', '').split('?')[0].replace(/\/$/, '')})
                      </option>
                    ))}
                  </select>
                </div>

                <label className="inline-flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={modeNew}
                    onChange={(e) => setModeNew(e.target.checked)}
                    className="rounded border-white/20 bg-black text-amber-500"
                  />
                  <span>Parametr <code className="text-amber-300">?new</code> (czysty edytor)</span>
                </label>

                <label className="inline-flex items-center gap-2 text-xs text-zinc-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={modeWebgl}
                    onChange={(e) => setModeWebgl(e.target.checked)}
                    className="rounded border-white/20 bg-black text-amber-500"
                  />
                  <span>Parametr <code className="text-purple-300">?webgl</code> (WebGL2 fallback)</span>
                </label>
              </div>
            </div>

            {/* Right 5 Cols: Output Card & CORS Bridge Visualization */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-2xl border border-amber-500/30 bg-black/50 p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Link2 className="h-4 w-4" /> Wygenerowany Link Startowy
                  </span>
                  <span
                    className="rounded-full px-2.5 py-0.5 text-[11px] font-bold text-zinc-950"
                    style={{ backgroundColor: detectedApp.accentColor }}
                  >
                    {detectedApp.name}
                  </span>
                </div>

                <div className="mt-3 break-all rounded-xl border border-white/10 bg-[#0d0e10] p-3.5 font-mono text-xs text-emerald-300">
                  {generatedLink}
                </div>

                <div className="mt-4 flex flex-wrap gap-2.5">
                  <button
                    type="button"
                    onClick={copyLink}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-white/15"
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 text-emerald-400" />
                        <span className="text-emerald-300">Skopiowano do schowka!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        <span>Kopiuj gotowy link</span>
                      </>
                    )}
                  </button>

                  <a
                    href={generatedLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-bold text-zinc-950 transition hover:bg-amber-400"
                  >
                    <span>Otwórz teraz</span>
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>

              {/* How CORS Bridge Works Visual Box */}
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-xs text-zinc-300 space-y-2">
                <div className="flex items-center gap-2 font-bold text-white">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  Jak działa otwieranie plików z zewnętrznych serwerów?
                </div>
                <p className="text-zinc-400 leading-relaxed">
                  Niektóre zewnętrzne serwery nie wysyłają nagłówka{' '}
                  <code className="text-zinc-200">Access-Control-Allow-Origin</code>. Nasze aplikacje
                  webowe najpierw próbują pobrać plik bezpośrednio, a w razie blokady CORS
                  automatycznie przełączają się na bezserwerowy mostek{' '}
                  <code className="text-amber-300">lmk.one/api/cors</code>!
                </p>
                <div className="flex items-center justify-between rounded-lg bg-black/40 px-3 py-2 font-mono text-[11px] text-zinc-300">
                  <span className="flex items-center gap-1.5">
                    <Cloud className="h-3.5 w-3.5 text-sky-400" /> Zewnętrzny URL
                  </span>
                  <span className="text-amber-400">──►</span>
                  <span>Mostek CORS</span>
                  <span className="text-emerald-400">──►</span>
                  <span className="text-white font-bold">{detectedApp.name} WASM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
