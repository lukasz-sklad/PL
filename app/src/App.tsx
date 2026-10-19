import React, { useState, useEffect, useCallback } from 'react';
import { CRAFT_APPS, CraftApp } from './data/craftData';
import { Navbar, ThemeMode } from './components/Navbar';
import { HeroWorkspace } from './components/HeroWorkspace';
import { AppDirectory } from './components/AppDirectory';
import { ManifestoSection } from './components/ManifestoSection';
import { UrlWizard } from './components/UrlWizard';
import { GithubPulse } from './components/GithubPulse';
import { VisualizationsHub } from './components/VisualizationsHub';
import { ReactTechSection } from './components/ReactTechSection';
import { Footer } from './components/Footer';

// Canonical short slug for each app in the URL (craft.lmk.one/:slug)
export const APP_CANONICAL_SLUGS: Record<string, string> = {
  solidcraft: 'solid',
  figcraft: 'fig',
  wordcraft: 'word',
  vectorcraft: 'vector',
  photocraft: 'photo',
  gridcraft: 'excel',
  deckcraft: 'deck',
  pdfcraft: 'pdf',
  filmcraft: 'film',
  soundcraft: 'sound',
  lightcraft: 'light',
};

// Aliases accepted from URL pathname, query parameters, or hash
export const APP_ALIASES: Record<string, string> = {
  // FigCraft
  fig: 'figcraft',
  figma: 'figcraft',
  figcraft: 'figcraft',

  // WordCraft
  word: 'wordcraft',
  doc: 'wordcraft',
  docx: 'wordcraft',
  wordcraft: 'wordcraft',

  // SolidCraft (CAD / 3D)
  solid: 'solidcraft',
  cad: 'solidcraft',
  stl: 'solidcraft',
  '3d': 'solidcraft',
  solidcraft: 'solidcraft',

  // PhotoCraft
  photo: 'photocraft',
  psd: 'photocraft',
  photoshop: 'photocraft',
  gimp: 'photocraft',
  photocraft: 'photocraft',

  // VectorCraft (Corel / Illustrator)
  vector: 'vectorcraft',
  corel: 'vectorcraft',
  cdr: 'vectorcraft',
  draw: 'vectorcraft',
  illustrator: 'vectorcraft',
  vectorcraft: 'vectorcraft',

  // GridCraft (Excel)
  grid: 'gridcraft',
  excel: 'gridcraft',
  sheet: 'gridcraft',
  xlsx: 'gridcraft',
  gridcraft: 'gridcraft',

  // DeckCraft (PowerPoint)
  deck: 'deckcraft',
  slides: 'deckcraft',
  ppt: 'deckcraft',
  pptx: 'deckcraft',
  powerpoint: 'deckcraft',
  deckcraft: 'deckcraft',

  // PDFCraft
  pdf: 'pdfcraft',
  acrobat: 'pdfcraft',
  pdfcraft: 'pdfcraft',

  // FilmCraft
  film: 'filmcraft',
  video: 'filmcraft',
  premiere: 'filmcraft',
  filmcraft: 'filmcraft',

  // SoundCraft
  sound: 'soundcraft',
  audio: 'soundcraft',
  music: 'soundcraft',
  soundcraft: 'soundcraft',

  // LightCraft (Lightroom / RAW)
  light: 'lightcraft',
  raw: 'lightcraft',
  lightroom: 'lightcraft',
  lightcraft: 'lightcraft',
};

export function resolveAppFromLocation(): CraftApp | undefined {
  if (typeof window === 'undefined') return undefined;

  // 1. Pathname extraction (e.g. /fig, /word, /craft/fig, /pl/solid)
  const segments = window.location.pathname
    .toLowerCase()
    .split('/')
    .filter(Boolean);

  let candidatePath = segments[0] || '';
  if ((candidatePath === 'craft' || candidatePath === 'pl') && segments[1]) {
    candidatePath = segments[1];
  }

  // 2. Query param: ?app=xxx or standalone flag ?fig / ?word
  const searchParams = new URLSearchParams(window.location.search);
  const appParam = searchParams.get('app')?.toLowerCase();
  let queryFlag: string | undefined;
  for (const key of searchParams.keys()) {
    const val = searchParams.get(key);
    if (!val || val === '') {
      if (APP_ALIASES[key.toLowerCase()]) {
        queryFlag = key.toLowerCase();
        break;
      }
    }
  }

  // 3. Hash: #fig, #word, etc.
  const hash = window.location.hash.replace(/^#/, '').toLowerCase().trim();

  const candidates = [candidatePath, appParam, queryFlag, hash].filter(Boolean) as string[];

  for (const c of candidates) {
    const targetId = APP_ALIASES[c];
    if (targetId) {
      const match = CRAFT_APPS.find((a) => a.id === targetId);
      if (match) return match;
    }
  }

  return undefined;
}

export function App() {
  const [activeApp, setActiveApp] = useState<CraftApp>(() => {
    const fromUrl = resolveAppFromLocation();
    if (fromUrl) return fromUrl;
    return CRAFT_APPS.find((a) => a.id === 'solidcraft') || CRAFT_APPS[0];
  });

  const [theme, setTheme] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem('pl_craft_theme_v2');
    if (saved === 'light' || saved === 'sepia' || saved === 'dark') {
      return saved;
    }
    return 'sepia';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('pl_craft_theme_v2', theme);
  }, [theme]);

  // Synchronize browser history (popstate / back & forward buttons)
  useEffect(() => {
    const onPopState = () => {
      const resolved = resolveAppFromLocation();
      if (resolved) {
        setActiveApp(resolved);
      } else {
        const defaultApp = CRAFT_APPS.find((a) => a.id === 'solidcraft') || CRAFT_APPS[0];
        setActiveApp(defaultApp);
      }
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const handleSelectApp = useCallback((app: CraftApp) => {
    setActiveApp(app);
    const slug = APP_CANONICAL_SLUGS[app.id] || app.id;
    const currentSegments = window.location.pathname.toLowerCase().split('/').filter(Boolean);
    const currentPathSlug =
      currentSegments[0] === 'craft' || currentSegments[0] === 'pl'
        ? currentSegments[1]
        : currentSegments[0];

    if (currentPathSlug !== slug) {
      const prefix =
        currentSegments[0] === 'craft' || currentSegments[0] === 'pl'
          ? `/${currentSegments[0]}`
          : '';
      const newUrl = `${prefix}/${slug}${window.location.search}${window.location.hash}`;
      window.history.pushState({ appId: app.id }, '', newUrl);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#151617] text-[#F5F5F7]">
      <Navbar
        activeApp={activeApp}
        onSelectApp={handleSelectApp}
        theme={theme}
        onSelectTheme={setTheme}
      />
      <main>
        <HeroWorkspace
          activeApp={activeApp}
          onSelectApp={handleSelectApp}
          theme={theme}
        />
        <AppDirectory onSelectApp={handleSelectApp} />
        <ManifestoSection />
        <UrlWizard />
        <GithubPulse activeAppName={activeApp.name} />
        <VisualizationsHub />
        <ReactTechSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
