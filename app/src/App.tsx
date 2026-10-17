import React, { useState, useEffect } from 'react';
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

export function App() {
  const [activeApp, setActiveApp] = useState<CraftApp>(CRAFT_APPS[0]);
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

  return (
    <div className="min-h-screen bg-[#151617] text-[#F5F5F7]">
      <Navbar
        activeApp={activeApp}
        onSelectApp={setActiveApp}
        theme={theme}
        onSelectTheme={setTheme}
      />
      <main>
        <HeroWorkspace activeApp={activeApp} onSelectApp={setActiveApp} />
        <AppDirectory onSelectApp={setActiveApp} />
        <ManifestoSection />
        <UrlWizard />
        <GithubPulse />
        <VisualizationsHub />
        <ReactTechSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
