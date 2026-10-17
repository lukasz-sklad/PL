export interface ShortcutItem {
  key: string;
  action: string;
  category: string;
}

export interface CraftApp {
  id: string;
  name: string; // Oryginalna nazwa, np. VectorCraft
  taglinePl: string;
  replaces: string;
  version: string;
  primaryUrl: string;
  altUrls: { label: string; url: string }[];
  upstreamRepo: string;
  plWebRepo: string;
  accentColor: string;
  badgeBg: string;
  badgeText: string;
  gradientFrom: string;
  gradientTo: string;
  translatedStrings: number;
  parityPercent: number;
  wasmSizeCompressedMb: string;
  defaultStateNote: string;
  urlParams: {
    label: string;
    exampleUrl: string;
    description: string;
  }[];
  formats: string[];
  highlights: string[];
  sampleFileUrl: string;
  shortcuts: ShortcutItem[];
}

export const CRAFT_APPS: CraftApp[] = [
  {
    id: 'vectorcraft',
    name: 'VectorCraft',
    taglinePl: 'Grafika wektorowa, ilustracje, DTP i obsługa plików CorelDRAW (.cdr)',
    replaces: 'Adobe Illustrator / CorelDRAW',
    version: '0.11.0',
    primaryUrl: 'https://corel.lmk.one/',
    altUrls: [
      { label: 'corel.lmk.one (Domyślnie: Herb Zawiercia .cdr)', url: 'https://corel.lmk.one/' },
      { label: 'vectorcraft.lmk.one', url: 'https://vectorcraft.lmk.one/' },
      { label: 'Czysty edytor (?new)', url: 'https://corel.lmk.one/?new' },
      { label: 'lmk.one/corel', url: 'https://lmk.one/corel' },
    ],
    upstreamRepo: 'storytold/vectorcraft',
    plWebRepo: 'lukasz-sklad/corel-web',
    accentColor: '#F59E0B',
    badgeBg: 'bg-amber-500/15 border-amber-500/40',
    badgeText: 'text-amber-300',
    gradientFrom: 'from-amber-500/20',
    gradientTo: 'to-orange-600/5',
    translatedStrings: 4653,
    parityPercent: 93,
    wasmSizeCompressedMb: '20,1 MB (gzip)',
    defaultStateNote: 'Polski interfejs (PL) + Ciemny motyw + Domyślnie otwiera plik zawiercie_logo.cdr',
    urlParams: [
      {
        label: 'Domyślny start (z logo Zawiercia)',
        exampleUrl: 'https://corel.lmk.one/',
        description: 'Automatycznie wczytuje przykładowy projekt wektorowy zawiercie_logo.cdr.',
      },
      {
        label: 'Czysty edytor bez pliku',
        exampleUrl: 'https://corel.lmk.one/?new',
        description: 'Otwiera pusty obszar roboczy gotowy na nowy dokument.',
      },
      {
        label: 'Otwórz dowolny plik .cdr / .svg z sieci',
        exampleUrl: 'https://corel.lmk.one/?file=https://filedn.eu/lPq6O1K7j8DR1n7JwTuYjYz/cdr/zawiercie_logo.cdr',
        description: 'Pobiera plik bezpośrednio z URL (obsługuje pCloud, własne serwery oraz automatyczny mostek CORS).',
      },
    ],
    formats: ['.cdr (v1–X3 RIFF oraz X4+ ZIP)', '.svg', '.ai / .pdf', '.eps', '.vectorcraft', '.png / .webp'],
    highlights: [
      'Bezpośrednie otwieranie plików CorelDRAW (.cdr) w przeglądarce i na pulpicie',
      'Krzywe Béziera, operacje logiczne Pathfinder (Połącz, Odejmij, Część wspólna)',
      'Obsługa wielowarstwowych obszarów roboczych (Artboards), gradientów, wzorków i tekstu na ścieżce',
      'Pełne polskie tłumaczenie (ponad 4 650 fraz UI, menu i narzędzi)',
    ],
    sampleFileUrl: 'https://filedn.eu/lPq6O1K7j8DR1n7JwTuYjYz/cdr/zawiercie_logo.cdr',
    shortcuts: [
      { key: 'V', action: 'Narzędzie Zaznaczanie (Selection)', category: 'Narzędzia' },
      { key: 'A', action: 'Zaznaczanie bezpośrednie węzłów', category: 'Narzędzia' },
      { key: 'P', action: 'Pióro (Pen) – rysowanie ścieżek Béziera', category: 'Rysowanie' },
      { key: 'M', action: 'Prostokąt (Rectangle)', category: 'Kształty' },
      { key: 'L', action: 'Elipsa / Okrąg (Ellipse)', category: 'Kształty' },
      { key: 'T', action: 'Tekst (Tekst punktowy, obszarowy i na ścieżce)', category: 'Typografia' },
      { key: 'Ctrl+G', action: 'Grupuj zaznaczone obiekty', category: 'Obiekty' },
      { key: 'Spacja', action: 'Rączka – przesuwanie widoku płótna', category: 'Widok' },
    ],
  },
  {
    id: 'photocraft',
    name: 'PhotoCraft',
    taglinePl: 'Zaawansowana edycja zdjęć, fotomontaż, warstwy i obsługa plików PSD',
    replaces: 'Adobe Photoshop / GIMP',
    version: '0.9.0',
    primaryUrl: 'https://photocraft.lmk.one/',
    altUrls: [
      { label: 'photocraft.lmk.one', url: 'https://photocraft.lmk.one/' },
      { label: 'lmk.one/photocraft', url: 'https://lmk.one/photocraft' },
    ],
    upstreamRepo: 'storytold/photocraft',
    plWebRepo: 'lukasz-sklad/PL',
    accentColor: '#3B82F6',
    badgeBg: 'bg-blue-500/15 border-blue-500/40',
    badgeText: 'text-blue-300',
    gradientFrom: 'from-blue-500/20',
    gradientTo: 'to-indigo-600/5',
    translatedStrings: 3744,
    parityPercent: 91,
    wasmSizeCompressedMb: '14,8 MB (gzip)',
    defaultStateNote: 'Polski interfejs (PL) + Ciemny motyw studyjny + Akceleracja WebGPU / WebGL2',
    urlParams: [
      {
        label: 'Uruchom edytor PhotoCraft PL',
        exampleUrl: 'https://photocraft.lmk.one/',
        description: 'Otwiera pełne polskie środowisko do obróbki grafiki rastrowej i plików PSD.',
      },
      {
        label: 'Wczytaj obraz z adresu URL',
        exampleUrl: 'https://photocraft.lmk.one/?file=https://lmk.one/sample.png',
        description: 'Automatycznie otwiera wskazany plik graficzny (.psd, .png, .jpg, .webp).',
      },
    ],
    formats: ['.psd / .psb', '.xcf', '.png', '.jpg / .jpeg', '.webp', '.avif', '.tiff', '.exr'],
    highlights: [
      'Nieniszczące warstwy dopasowania (Krzywe, Poziomy, Barwa/Nasycenie, Balans kolorów)',
      'Maski warstw, maski przycinające, style warstw (Cień, Blask, Fazowanie) i obiekty inteligentne',
      'Silnik pędzli z czułością nacisku, stemplowaniem, łatką i pędzlem korygującym',
      'Ponad 3 740 przetłumaczonych komunikatów, filtrów i trybów mieszania po polsku',
    ],
    sampleFileUrl: 'https://photocraft.lmk.one/favicon.png',
    shortcuts: [
      { key: 'V', action: 'Przesunięcie (Move Tool)', category: 'Narzędzia' },
      { key: 'B', action: 'Pędzel (Brush Tool)', category: 'Malowanie' },
      { key: 'E', action: 'Gumka (Eraser)', category: 'Malowanie' },
      { key: 'S', action: 'Stempel (Clone Stamp)', category: 'Retusz' },
      { key: 'J', action: 'Pędzel korygujący / Łatka', category: 'Retusz' },
      { key: 'W', action: 'Różdżka / Szybkie zaznaczanie', category: 'Zaznaczanie' },
      { key: 'C', action: 'Kadrowanie (Crop)', category: 'Obraz' },
      { key: 'Ctrl+J', action: 'Powiel aktywną warstwę', category: 'Warstwy' },
    ],
  },
  {
    id: 'filmcraft',
    name: 'FilmCraft',
    taglinePl: 'Nieliniowy montaż wideo (NLE), korekcja barwna Lumetri, wielościeżkowe audio i efekty',
    replaces: 'Adobe Premiere Pro / DaVinci Resolve',
    version: '0.8.0',
    primaryUrl: 'https://film.lmk.one/',
    altUrls: [
      { label: 'film.lmk.one', url: 'https://film.lmk.one/' },
      { label: 'Tryb WebGL2 (?webgl)', url: 'https://film.lmk.one/?webgl' },
      { label: 'lmk.one/film', url: 'https://lmk.one/film' },
      { label: 'lmk.one/filmcraft', url: 'https://lmk.one/filmcraft' },
    ],
    upstreamRepo: 'storytold/filmcraft',
    plWebRepo: 'lukasz-sklad/film-web',
    accentColor: '#A855F7',
    badgeBg: 'bg-purple-500/15 border-purple-500/40',
    badgeText: 'text-purple-300',
    gradientFrom: 'from-purple-500/20',
    gradientTo: 'to-fuchsia-600/5',
    translatedStrings: 477,
    parityPercent: 86,
    wasmSizeCompressedMb: '11,9 MB (gzip)',
    defaultStateNote: 'Polski interfejs (PL) + Ciemny motyw Darkest + Obsługa ?file= z automatyczną sekwencją',
    urlParams: [
      {
        label: 'Domyślny montażysta FilmCraft PL',
        exampleUrl: 'https://film.lmk.one/',
        description: 'Uruchamia nieliniowy edytor wideo po polsku z osią czasu, mikserem audio i kolorami.',
      },
      {
        label: 'Otwórz klip wideo lub projekt z URL (?file=)',
        exampleUrl: 'https://film.lmk.one/?file=https://twoj-serwer.pl/wideo.mp4',
        description: 'Importuje plik wideo/audio lub projekt .fcproj i od razu tworzy sekwencję na osi czasu!',
      },
      {
        label: 'Wymuś backend WebGL2 (?webgl)',
        exampleUrl: 'https://film.lmk.one/?webgl',
        description: 'Tryb maksymalnej kompatybilności dla przeglądarek bez aktywnego WebGPU.',
      },
    ],
    formats: ['.fcproj', '.mp4 (H.264/AAC)', '.mov', '.webm', '.mkv', '.wav / .mp3 / .flac', '.edl / .fcpxml / .aaf'],
    highlights: [
      'Wielowarstwowa oś czasu (Timeline) z narzędziami Żyletka (C), Zwijanie, Falowanie, Wsuwanie',
      'Korekcja kolorów (Koła barw, Krzywe RGB, Luma, Wektoroskop, Histogram, parada RGB)',
      'Klatki kluczowe (Keyframes), przejścia wideo/audio, napisy (SRT/VTT) i montaż wielokamerowy',
      'Błyskawiczny start w przeglądarce (WebAssembly + WebGPU / WebGL2) z obsługą ?file=',
    ],
    sampleFileUrl: 'https://film.lmk.one/?webgl',
    shortcuts: [
      { key: 'V', action: 'Narzędzie Zaznaczanie (Selection)', category: 'Oś czasu' },
      { key: 'C', action: 'Żyletka (Razor) – cięcie klipów na osi czasu', category: 'Montaż' },
      { key: 'B', action: 'Edycja z falowaniem (Ripple Edit)', category: 'Montaż' },
      { key: 'N', action: 'Edycja z zawijaniem (Roll Edit)', category: 'Montaż' },
      { key: 'Y', action: 'Przesunięcie zawartości (Slip Tool)', category: 'Montaż' },
      { key: 'Spacja', action: 'Odtwórz / Wstrzymaj podgląd sekwencji', category: 'Transport' },
      { key: 'J / K / L', action: 'Przewijanie do tyłu / Stop / Do przodu (Shuttle)', category: 'Transport' },
      { key: 'I / O', action: 'Wyznacz punkt Wejścia (In) oraz Wyjścia (Out)', category: 'Znaczniki' },
    ],
  },
  {
    id: 'wordcraft',
    name: 'WordCraft',
    taglinePl: 'Edytor tekstu i dokumentów biurowych (.docx, .odt, .md) ze stylami i tabelami',
    replaces: 'Microsoft Word / LibreOffice Writer',
    version: '0.7.0',
    primaryUrl: 'https://wordcraft.lmk.one/',
    altUrls: [
      { label: 'wordcraft.lmk.one', url: 'https://wordcraft.lmk.one/' },
      { label: 'lmk.one/wordcraft', url: 'https://lmk.one/wordcraft' },
    ],
    upstreamRepo: 'storytold/wordcraft',
    plWebRepo: 'lukasz-sklad/PL',
    accentColor: '#0EA5E9',
    badgeBg: 'bg-sky-500/15 border-sky-500/40',
    badgeText: 'text-sky-300',
    gradientFrom: 'from-sky-500/20',
    gradientTo: 'to-blue-600/5',
    translatedStrings: 2624,
    parityPercent: 89,
    wasmSizeCompressedMb: '9,4 MB (gzip)',
    defaultStateNote: 'Polski interfejs (PL) + Ciemny motyw + Pełna obsługa polskich znaków i dzielenia wyrazów',
    urlParams: [
      {
        label: 'Otwórz edytor WordCraft PL',
        exampleUrl: 'https://wordcraft.lmk.one/',
        description: 'Uruchamia edytor dokumentów z podglądem stron, linijką, przypisami i tabelami.',
      },
    ],
    formats: ['.docx', '.odt', '.rtf', '.md (Markdown)', '.txt', '.html', '.pdf (eksport)'],
    highlights: [
      'Wierna obsługa formatu .docx: nagłówki, stopki, przypisy dolne i końcowe, spisy treści',
      'Tabele z formułami obliczeniowymi, scalaniem komórek i formatowaniem obramowań',
      'Śledzenie zmian (Track Changes), komentarze na marginesie i korespondencja seryjna',
      'Ponad 2 620 przetłumaczonych pojęć typograficznych i biurowych w języku polskim',
    ],
    sampleFileUrl: 'https://wordcraft.lmk.one/',
    shortcuts: [
      { key: 'Ctrl+B', action: 'Pogrubienie zaznaczonego tekstu', category: 'Formatowanie' },
      { key: 'Ctrl+I', action: 'Kursywa (Italic)', category: 'Formatowanie' },
      { key: 'Ctrl+U', action: 'Podkreślenie tekstu', category: 'Formatowanie' },
      { key: 'Ctrl+Enter', action: 'Wstaw podział strony (Page Break)', category: 'Układ strony' },
      { key: 'Ctrl+K', action: 'Wstaw hiperłącze', category: 'Wstawianie' },
      { key: 'Ctrl+F', action: 'Znajdź i zamień w dokumencie', category: 'Edycja' },
    ],
  },
  {
    id: 'gridcraft',
    name: 'GridCraft',
    taglinePl: 'Arkusze kalkulacyjne (.xlsx, .csv), setki formuł, tabele przestawne i wykresy',
    replaces: 'Microsoft Excel / LibreOffice Calc',
    version: '0.7.0',
    primaryUrl: 'https://excel.lmk.one/',
    altUrls: [
      { label: 'excel.lmk.one (Cloudflare CDN)', url: 'https://excel.lmk.one/' },
      { label: 'gridcraft.lmk.one', url: 'https://gridcraft.lmk.one/' },
      { label: 'lmk.one/excel', url: 'https://lmk.one/excel' },
      { label: 'lmk.one/gridcraft', url: 'https://lmk.one/gridcraft' },
    ],
    upstreamRepo: 'storytold/gridcraft',
    plWebRepo: 'lukasz-sklad/excel-web',
    accentColor: '#10B981',
    badgeBg: 'bg-emerald-500/15 border-emerald-500/40',
    badgeText: 'text-emerald-300',
    gradientFrom: 'from-emerald-500/20',
    gradientTo: 'to-teal-600/5',
    translatedStrings: 541,
    parityPercent: 90,
    wasmSizeCompressedMb: '6,8 MB (gzip)',
    defaultStateNote: 'Polski interfejs (PL) + Ciemny motyw + Wbudowane fonty Hack & Hack Nerd Font',
    urlParams: [
      {
        label: 'Uruchom arkusz GridCraft (excel.lmk.one)',
        exampleUrl: 'https://excel.lmk.one/',
        description: 'Błyskawiczny arkusz kalkulacyjny z obsługą plików Excela (.xlsx) i CSV.',
      },
    ],
    formats: ['.xlsx', '.csv / .tsv', '.ods', '.json', '.parquet'],
    highlights: [
      'Silnik obliczeniowy z obsługą setek funkcji (VLOOKUP/XLOOKUP, SUMIFS, INDEX/MATCH, finanse, statystyka)',
      'Tabele przestawne (Pivot Tables), formatowanie warunkowe, sprawdzanie poprawności danych',
      'Interaktywne wykresy słupkowe, liniowe, kołowe, punktowe oraz mikrowykresy (Sparklines)',
      'Zoptymalizowane fonty Hack Nerd Font wbudowane bezpośrednio w moduł WebAssembly',
    ],
    sampleFileUrl: 'https://excel.lmk.one/',
    shortcuts: [
      { key: 'F2', action: 'Edytuj aktywną komórkę / formułę', category: 'Komórki' },
      { key: 'F4', action: 'Przełącz adresowanie bezwzględne ($A$1)', category: 'Formuły' },
      { key: 'Ctrl+;', action: 'Wstaw bieżącą datę', category: 'Dane' },
      { key: 'Ctrl+Shift+L', action: 'Włącz / wyłącz autofiltr tabeli', category: 'Dane' },
      { key: 'Alt+=', action: 'Autosuma zaznaczonego zakresu', category: 'Formuły' },
      { key: 'Ctrl+PageDown', action: 'Przejdź do następnego arkusza', category: 'Nawigacja' },
    ],
  },
  {
    id: 'deckcraft',
    name: 'DeckCraft',
    taglinePl: 'Prezentacje multimedialne (.pptx), animacje slajdów, wzorce i widok prezentera',
    replaces: 'Microsoft PowerPoint / Keynote',
    version: '0.7.0',
    primaryUrl: 'https://powerpoint.lmk.one/',
    altUrls: [
      { label: 'powerpoint.lmk.one', url: 'https://powerpoint.lmk.one/' },
      { label: 'lmk.one/powerpoint', url: 'https://lmk.one/powerpoint' },
      { label: 'lmk.one/deckcraft', url: 'https://lmk.one/deckcraft' },
    ],
    upstreamRepo: 'storytold/deckcraft',
    plWebRepo: 'lukasz-sklad/deck-web',
    accentColor: '#F97316',
    badgeBg: 'bg-orange-500/15 border-orange-500/40',
    badgeText: 'text-orange-300',
    gradientFrom: 'from-orange-500/20',
    gradientTo: 'to-red-600/5',
    translatedStrings: 251,
    parityPercent: 87,
    wasmSizeCompressedMb: '7,2 MB (gzip)',
    defaultStateNote: 'Polski interfejs (PL) + Ciemny motyw + Poprawiona nawigacja w oknie prezentera',
    urlParams: [
      {
        label: 'Otwórz edytor prezentacji DeckCraft',
        exampleUrl: 'https://powerpoint.lmk.one/',
        description: 'Tworzenie i edycja slajdów .pptx w przeglądarce z trybem pokazu pełnoekranowego.',
      },
    ],
    formats: ['.pptx', '.odp', '.pdf (eksport)', '.png / .svg (eksport slajdów)'],
    highlights: [
      'Import i eksport prezentacji PowerPoint (.pptx) z zachowaniem układów i wzorców slajdów (Slide Masters)',
      'Płynne przejścia między slajdami (Morph, Zanikanie, Przesunięcie) oraz animacje obiektów',
      'Widok prezentera z notatkami prelegenta, zegarem i podglądem kolejnego slajdu',
      'Wstawianie tabel, wykresów, diagramów SmartArt i kształtów wektorowych',
    ],
    sampleFileUrl: 'https://powerpoint.lmk.one/',
    shortcuts: [
      { key: 'F5', action: 'Rozpocznij pokaz slajdów od początku', category: 'Pokaz' },
      { key: 'Shift+F5', action: 'Rozpocznij pokaz od bieżącego slajdu', category: 'Pokaz' },
      { key: 'Ctrl+M', action: 'Wstaw nowy slajd', category: 'Slajdy' },
      { key: 'Ctrl+D', action: 'Duplikuj zaznaczony slajd lub obiekt', category: 'Edycja' },
      { key: 'G', action: 'Widok siatki wszystkich slajdów (Slide Sorter)', category: 'Widok' },
    ],
  },
];

export interface SiblingCraftApp {
  name: string;
  replaces: string;
  version: string;
  descriptionPl: string;
  upstreamRepo: string;
  statusPl: string;
}

export const SIBLING_APPS: SiblingCraftApp[] = [
  {
    name: 'PDFCraft',
    replaces: 'Adobe Acrobat Pro',
    version: '0.4.0',
    descriptionPl: 'Przeglądanie, adnotacje, formularze, łączenie, redakcja i podpisywanie dokumentów PDF.',
    upstreamRepo: 'storytold/pdfcraft',
    statusPl: 'Lokalnie w katalogu /app/pdfcraft (kolejny do spolszczenia!)',
  },
  {
    name: 'CadCraft',
    replaces: 'AutoCAD / FreeCAD',
    version: '0.6.1',
    descriptionPl: 'Projektowanie CAD 2D/3D, rysunek techniczny (.dxf, .dwg), wymiarowanie i warstwy inżynierskie.',
    upstreamRepo: 'storytold/cadcraft',
    statusPl: 'Lokalnie w katalogu /app/cadcraft',
  },
  {
    name: 'DesignCraft',
    replaces: 'Adobe InDesign / QuarkXPress',
    version: '0.4.0',
    descriptionPl: 'Skład wielostronicowych publikacji DTP, książek, czasopism (.idml) i przygotowanie do druku.',
    upstreamRepo: 'storytold/designcraft',
    statusPl: 'Lokalnie w katalogu /app/designcraft',
  },
  {
    name: 'EffectCraft',
    replaces: 'Adobe After Effects',
    version: '0.6.0',
    descriptionPl: 'Motion design, animacja kompozycyjna, efekty wizualne (VFX) i kluczowanie.',
    upstreamRepo: 'storytold/effectcraft',
    statusPl: 'Lokalnie w katalogu /app/effectcraft',
  },
  {
    name: 'LightCraft',
    replaces: 'Adobe Lightroom',
    version: '0.4.0',
    descriptionPl: 'Katalogowanie fotografii i nieniszczące wywoływanie plików RAW oraz korekcja ekspozycji.',
    upstreamRepo: 'storytold/lightcraft',
    statusPl: 'Lokalnie w katalogu /app/lightcraft',
  },
  {
    name: 'SoundCraft',
    replaces: 'Adobe Audition / Reaper',
    version: '0.3.0',
    descriptionPl: 'Edycja fal dźwiękowych, redukcja szumów, spektrogram i mastering wielościeżkowy.',
    upstreamRepo: 'storytold/soundcraft',
    statusPl: 'Lokalnie w katalogu /app/soundcraft',
  },
  {
    name: 'PrintCraft',
    replaces: 'Cura / PrusaSlicer',
    version: '0.2.1',
    descriptionPl: 'Przygotowanie modeli 3D (.stl, .3mf) do druku i generowanie ścieżek G-code.',
    upstreamRepo: 'storytold/printcraft',
    statusPl: 'Lokalnie w katalogu /app/printcraft',
  },
];

export interface CommitEntry {
  sha: string;
  repo: string;
  appName: string;
  author: string;
  date: string;
  message: string;
  categoryPl: string;
  url: string;
  isPolishBuild?: boolean;
}

export const INITIAL_COMMITS: CommitEntry[] = [
  {
    sha: 'fc080pl',
    repo: 'lukasz-sklad/film-web',
    appName: 'FilmCraft',
    author: 'lukasz-sklad',
    date: '2026-10-17',
    message: 'feat(pl): Pełne spolszczenie FilmCraft 0.8.0 (Magenta bez "karmazynu"), ciemny motyw oraz obsługa ?file= z auto-sekwencją',
    categoryPl: 'Polskie Wydanie Web',
    url: 'https://github.com/lukasz-sklad/film-web',
    isPolishBuild: true,
  },
  {
    sha: 'vc011pl',
    repo: 'lukasz-sklad/corel-web',
    appName: 'VectorCraft',
    author: 'lukasz-sklad',
    date: '2026-10-17',
    message: 'feat(web): Domyślne wczytywanie zawiercie_logo.cdr, parametry ?new oraz ?file= z mostkiem CORS dla pCloud (filedn.eu)',
    categoryPl: 'Polskie Wydanie Web',
    url: 'https://github.com/lukasz-sklad/corel-web',
    isPolishBuild: true,
  },
  {
    sha: '09aaf9b',
    repo: 'storytold/filmcraft',
    appName: 'FilmCraft',
    author: 'Dylan M. Taylor',
    date: '2026-10-16',
    message: 'ci: standardize FreeBSD workflow on shared FreeBSD 15.1 action (#2158)',
    categoryPl: 'Upstream CI / Silnik',
    url: 'https://github.com/storytold/filmcraft/commit/09aaf9bf',
  },
  {
    sha: '287f218',
    repo: 'storytold/deckcraft',
    appName: 'DeckCraft',
    author: 'Lucas',
    date: '2026-10-16',
    message: 'Fix wasm compilation and test threading defaults in i18n + Polish UI translation',
    categoryPl: 'Spolszczenie & WASM',
    url: 'https://github.com/lukasz-sklad/deck-web',
    isPolishBuild: true,
  },
  {
    sha: '02fc00c',
    repo: 'storytold/gridcraft',
    appName: 'GridCraft',
    author: 'Lucas',
    date: '2026-10-16',
    message: 'feat(web): embed optimized Hack and Hack Nerd Font for wasm32 + dark theme + PL i18n',
    categoryPl: 'Polskie Wydanie & Fonty',
    url: 'https://github.com/lukasz-sklad/excel-web',
    isPolishBuild: true,
  },
  {
    sha: 'fd0bb2f',
    repo: 'storytold/wordcraft',
    appName: 'WordCraft',
    author: 'Justin John',
    date: '2026-10-15',
    message: '#954: macOS ⌘←/⌘→ go to the line’s start and end (#972)',
    categoryPl: 'Edycja Tekstu',
    url: 'https://github.com/storytold/wordcraft/commit/fd0bb2f',
  },
  {
    sha: '6a2bad8',
    repo: 'storytold/wordcraft',
    appName: 'WordCraft',
    author: 'Izhaan Intellect',
    date: '2026-10-15',
    message: 'Tables: formulas with cell references, functions, number formats and F9 (#907)',
    categoryPl: 'Nowa Funkcja',
    url: 'https://github.com/storytold/wordcraft/commit/6a2bad8',
  },
  {
    sha: '5d00931',
    repo: 'storytold/vectorcraft',
    appName: 'VectorCraft',
    author: 'Lucas',
    date: '2026-10-14',
    message: 'feat(cdr): CorelDRAW .cdr reader with native geometry and preview fallback',
    categoryPl: 'Obsługa CorelDRAW (.cdr)',
    url: 'https://github.com/storytold/vectorcraft/commit/5d00931f',
    isPolishBuild: true,
  },
  {
    sha: 'b8ae1cd',
    repo: 'storytold/photocraft',
    appName: 'PhotoCraft',
    author: 'Nigel Ihza Firdausy',
    date: '2026-10-14',
    message: 'fix(brush): preserve Dual Brush tip spacing and scale its size with the primary brush (#4856)',
    categoryPl: 'Silnik Pędzli',
    url: 'https://github.com/storytold/photocraft/commit/b8ae1cd9',
  },
  {
    sha: '2d5e60a',
    repo: 'storytold/photocraft',
    appName: 'PhotoCraft',
    author: 'Valentin Klein',
    date: '2026-10-14',
    message: 'Compose: build a layer’s effect-map identity once per render, not once per tile (#4437)',
    categoryPl: 'Optymalizacja Renderowania',
    url: 'https://github.com/storytold/photocraft/commit/2d5e60ad',
  },
];
