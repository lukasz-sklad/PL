import React, { useState, useEffect } from 'react';
import {
  GitCommit,
  RefreshCw,
  ExternalLink,
  Activity,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { CRAFT_APPS, INITIAL_COMMITS, CommitEntry } from '../data/craftData';

function classifyCommitMessagePl(msg: string): string {
  const lower = msg.toLowerCase();
  if (
    /\b(i18n|l10n|polish|polski|polska|spolszczenie|spolszcz)\b/i.test(msg) ||
    /\bpl\b/i.test(msg) ||
    lower.includes('pl.json') ||
    lower.includes('pl.tsv') ||
    lower.includes('pl.po')
  ) {
    return 'Spolszczenie';
  }
  if (lower.startsWith('feat') || lower.includes('add ') || lower.includes('nowa funkcja')) {
    return 'Nowa funkcja';
  }
  if (lower.startsWith('fix') || lower.includes('bug') || lower.includes('poprawka')) {
    return 'Poprawka błędu';
  }
  if (lower.startsWith('perf') || lower.includes('optim') || lower.includes('optymalizac')) {
    return 'Optymalizacja';
  }
  if (lower.startsWith('ci') || lower.includes('workflow') || lower.includes('action')) {
    return 'CI / Automatyzacja';
  }
  if (lower.startsWith('docs') || lower.includes('readme')) {
    return 'Dokumentacja';
  }
  return 'Aktualizacja kodu';
}

interface GithubPulseProps {
  activeAppName?: string;
}

export const GithubPulse: React.FC<GithubPulseProps> = ({ activeAppName = 'SolidCraft' }) => {
  const [commits, setCommits] = useState<CommitEntry[]>(INITIAL_COMMITS);
  const [filterApp, setFilterApp] = useState<string>(activeAppName);
  const [showAllFourteen, setShowAllFourteen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [lastFetched, setLastFetched] = useState<string>('Dane wbudowane + Live API');

  useEffect(() => {
    if (activeAppName) {
      setFilterApp(activeAppName);
      setShowAllFourteen(false);
    }
  }, [activeAppName]);

  const fetchLiveCommits = async () => {
    setLoading(true);
    try {
      const targets = [
        { repo: 'lukasz-sklad/solid-web', appName: 'SolidCraft', isPl: true },
        { repo: 'lukasz-sklad/corel-web', appName: 'VectorCraft', isPl: true },
        { repo: 'lukasz-sklad/film-web', appName: 'FilmCraft', isPl: true },
        { repo: 'lukasz-sklad/sound-web', appName: 'SoundCraft', isPl: true },
        { repo: 'lukasz-sklad/fig-web', appName: 'FigCraft', isPl: true },
        { repo: 'lukasz-sklad/pdf-web', appName: 'PDFCraft', isPl: true },
        { repo: 'lukasz-sklad/light-web', appName: 'LightCraft', isPl: true },
        { repo: 'lukasz-sklad/deck-web', appName: 'DeckCraft', isPl: true },
        { repo: 'lukasz-sklad/excel-web', appName: 'GridCraft', isPl: true },
        { repo: 'lukasz-sklad/PL', appName: 'Portal PL', isPl: true },
        { repo: 'storytold/vectorcraft', appName: 'VectorCraft', isPl: false },
        { repo: 'storytold/photocraft', appName: 'PhotoCraft', isPl: false },
        { repo: 'storytold/filmcraft', appName: 'FilmCraft', isPl: false },
        { repo: 'storytold/wordcraft', appName: 'WordCraft', isPl: false },
        { repo: 'storytold/gridcraft', appName: 'GridCraft', isPl: false },
        { repo: 'storytold/deckcraft', appName: 'DeckCraft', isPl: false },
        { repo: 'storytold/figcraft', appName: 'FigCraft', isPl: false },
        { repo: 'storytold/solidcraft', appName: 'SolidCraft', isPl: false },
      ];

      const results = await Promise.allSettled(
        targets.map(async (t) => {
          const res = await fetch(`https://api.github.com/repos/${t.repo}/commits?per_page=2`);
          if (!res.ok) return [];
          const data = await res.json();
          if (!Array.isArray(data)) return [];
          return data.map((item: any): CommitEntry => {
            const firstLine = (item.commit?.message || '').split('\n')[0];
            const fullSha = item.sha || '';
            const shortSha = fullSha.slice(0, 7);
            let authorName = item.commit?.author?.name || item.author?.login || 'Developer';
            if (firstLine.includes('from lukasz-sklad')) {
              authorName = `Lucas (Zatwierdził: ${authorName})`;
            }
            const isPolish = t.isPl || classifyCommitMessagePl(firstLine) === 'Spolszczenie';
            return {
              sha: shortSha,
              repo: t.repo,
              appName: t.appName,
              author: authorName,
              date: (item.commit?.author?.date || '').slice(0, 10),
              message: firstLine,
              categoryPl: t.isPl ? 'Wydanie Web' : classifyCommitMessagePl(firstLine),
              url: item.html_url || `https://github.com/${t.repo}/commit/${fullSha || shortSha}`,
              isPolishBuild: isPolish,
            };
          });
        })
      );

      const liveItems: CommitEntry[] = [];
      for (const r of results) {
        if (r.status === 'fulfilled' && r.value.length > 0) {
          liveItems.push(...r.value);
        }
      }

      if (liveItems.length > 0) {
        // Merge live commits with initial highlights, deduplicating by sha
        const seen = new Set<string>();
        const merged: CommitEntry[] = [];
        for (const c of [...liveItems, ...INITIAL_COMMITS]) {
          if (!seen.has(c.sha)) {
            seen.add(c.sha);
            merged.push(c);
          }
        }
        merged.sort((a, b) => (b.date > a.date ? 1 : -1));
        setCommits(merged);
        setLastFetched(`Pobrano na żywo z GitHub API (${new Date().toLocaleTimeString('pl-PL')})`);
      } else {
        setLastFetched('Zestaw zsynchronizowany z lokalnymi repozytoriami git');
      }
    } catch {
      setLastFetched('Zestaw zsynchronizowany z lokalnymi repozytoriami git');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLiveCommits();
  }, []);

  const allFourteen = commits.slice(0, 14);
  const filteredCommits =
    filterApp === 'ALL'
      ? showAllFourteen
        ? allFourteen
        : allFourteen.slice(0, 10)
      : commits.filter((c) => c.appName.toLowerCase() === filterApp.toLowerCase());

  return (
    <section id="puls-githuba" className="py-16 border-t border-white/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400">
              <Activity className="h-4 w-4" /> Puls Rozwoju &amp; Newsy z GitHuba
            </div>
            <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-4xl">
              Co nowego w oryginalnych silnikach *Craft i naszych wydaniach
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-zinc-400">
              Strumień ostatnich commitów prosto z oficjalnych repozytoriów{' '}
              <code className="text-zinc-200">storytold/*</code> oraz naszych wdrożeń.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-400">{lastFetched}</span>
            <button
              type="button"
              onClick={fetchLiveCommits}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-white/10 disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? 'animate-spin text-amber-400' : ''}`} />
              <span>Odśwież z GitHuba</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-6 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setFilterApp('ALL');
              setShowAllFourteen(false);
            }}
            className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition ${
              filterApp === 'ALL'
                ? 'bg-amber-500 text-zinc-950 font-extrabold shadow-sm'
                : 'border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10'
            }`}
          >
            Aplikacje ({commits.length})
          </button>
          {CRAFT_APPS.map((app) => {
            const count = commits.filter((c) => c.appName.toLowerCase() === app.name.toLowerCase()).length;
            const isSelected = filterApp.toLowerCase() === app.name.toLowerCase();
            return (
              <button
                key={app.id}
                type="button"
                onClick={() => {
                  setFilterApp(app.name);
                  setShowAllFourteen(false);
                }}
                className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                  isSelected
                    ? 'bg-white/25 text-white border border-white/40 shadow-sm'
                    : 'border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/10'
                }`}
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: app.accentColor }}
                />
                <span>{app.name}</span>
                {count > 0 && <span className="text-[10px] opacity-60">({count})</span>}
              </button>
            );
          })}
        </div>

        {/* Commits Feed Grid */}
        {filteredCommits.length === 0 ? (
          <div className="mt-6 rounded-2xl border border-white/10 bg-[#1a1b1f] p-8 text-center text-zinc-400">
            Brak zarejestrowanych commitów dla programu {filterApp}.
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
            {filteredCommits.map((commit) => {
              const appMeta = CRAFT_APPS.find((a) => a.name === commit.appName) || CRAFT_APPS[0];
              return (
                <a
                  key={`${commit.repo}-${commit.sha}`}
                  href={
                    commit.url.includes('/commit/')
                      ? commit.url
                      : `${commit.url.replace(/\/$/, '')}/commit/${commit.sha}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-[#1a1b1f] p-4 transition hover:border-white/25 hover:bg-[#202227]"
                >
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ backgroundColor: appMeta.accentColor }}
                        />
                        <span className="text-xs font-bold text-white">{commit.appName}</span>
                        <span className="font-mono text-[11px] text-zinc-400">({commit.repo})</span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {commit.isPolishBuild ? (
                          <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/15 px-2 py-0.5 text-[10px] font-bold text-amber-300">
                            <Sparkles className="h-3 w-3" /> {commit.categoryPl}
                          </span>
                        ) : (
                          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-medium text-zinc-300">
                            {commit.categoryPl}
                          </span>
                        )}
                        <span className="rounded bg-black/50 px-1.5 py-0.5 font-mono text-[11px] text-emerald-400">
                          {commit.sha}
                        </span>
                      </div>
                    </div>

                    <p className="mt-2.5 text-sm font-medium text-zinc-200 group-hover:text-white">
                      {commit.message}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-2.5 text-[11px] text-zinc-400">
                    <span>
                      Autor: <strong className="text-zinc-300">{commit.author}</strong> • {commit.date}
                    </span>
                    <span className="inline-flex items-center gap-1 text-zinc-300 group-hover:text-amber-300">
                      Zobacz commit <ExternalLink className="h-3 w-3" />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        )}

        {/* Minimalist reveal toggle for remaining 4 commits in ALL view */}
        {filterApp === 'ALL' && allFourteen.length > 10 && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllFourteen((prev) => !prev)}
              className="group inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#1a1b1f] px-3.5 py-1.5 text-xs text-zinc-400 transition hover:border-amber-400/40 hover:bg-[#22242a] hover:text-white"
              title={showAllFourteen ? 'Zwiń do 10 commitów' : 'Wyświetl pozostałe 4 commity (razem 14)'}
              aria-label={showAllFourteen ? 'Zwiń do 10 commitów' : 'Wyświetl pozostałe 4 commity (razem 14)'}
            >
              <span className="font-mono text-[11px] font-semibold">
                {showAllFourteen ? 'Zwiń' : '+4'}
              </span>
              {showAllFourteen ? (
                <ChevronUp className="h-3.5 w-3.5 transition group-hover:text-amber-400" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5 transition group-hover:text-amber-400" />
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
