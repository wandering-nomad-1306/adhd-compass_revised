import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { BookOpenText, Compass, Home, Menu, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'wouter';

interface TopicLink {
  id: string;
  label: string;
}

function createSlug(value: string, index: number) {
  const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  return slug || `section-${index + 1}`;
}

export default function PageDock() {
  const [open, setOpen] = useState(false);
  const [topics, setTopics] = useState<TopicLink[]>([]);
  const [activeId, setActiveId] = useState('');
  const [location, setLocation] = useLocation();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const collectTopics = () => {
      const main = document.querySelector('main');
      if (!main) return;

      const explicit = Array.from(main.querySelectorAll<HTMLElement>('section[data-page-label]'));
      const sections = explicit.length
        ? explicit
        : Array.from(main.querySelectorAll<HTMLElement>('section')).filter((section) => {
            const heading = section.querySelector(':scope > div > h2, :scope > h2');
            return Boolean(heading);
          });

      const used = new Set<string>();
      const nextTopics = sections.slice(0, 12).map((section, index) => {
        const heading = section.querySelector<HTMLHeadingElement>('h2');
        const preferred = section.dataset.pageLabel?.trim();
        const label = preferred || heading?.textContent?.trim() || `Section ${index + 1}`;
        let id = section.id || createSlug(label, index);
        let suffix = 2;
        while (used.has(id)) {
          id = `${id}-${suffix}`;
          suffix += 1;
        }
        used.add(id);
        section.id = id;
        section.style.scrollMarginTop = '5.5rem';
        return { id, label };
      });

      setTopics(nextTopics);
      setActiveId((current) => current || nextTopics[0]?.id || '');
    };

    const frame = window.requestAnimationFrame(collectTopics);
    const timer = window.setTimeout(collectTopics, 200);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [location]);

  useEffect(() => {
    if (!topics.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0];
        if (visible?.target.id) setActiveId(visible.target.id);
      },
      { rootMargin: '-18% 0px -68% 0px', threshold: [0, 0.05, 0.2] },
    );
    topics.forEach((topic) => {
      const node = document.getElementById(topic.id);
      if (node) observer.observe(node);
    });
    return () => observer.disconnect();
  }, [topics]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const chapterLabel = useMemo(() => {
    const segment = location.split('/').filter(Boolean).at(-1) || 'chapter';
    return segment.replace(/-/g, ' ');
  }, [location]);

  const goToTopic = (id: string) => {
    setActiveId(id);
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="fixed left-3 top-3 z-[70] flex h-10 items-center gap-2 rounded-full border border-sage-green/15 bg-[#fffdf8]/72 px-3 text-sm font-semibold text-sage-green shadow-[0_8px_24px_rgba(48,55,48,0.10)] backdrop-blur-xl transition hover:bg-[#fffdf8]/92 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sage-green/20 sm:left-5 sm:top-5 sm:h-11 sm:px-4"
        aria-label={open ? 'Close page contents' : 'Open page contents'}
        aria-expanded={open}
      >
        {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        <span className="hidden sm:inline">Contents</span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.aside
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, x: -16 }}
            transition={{ duration: 0.18 }}
            className="fixed bottom-4 left-3 top-16 z-[65] w-[min(86vw,20rem)] overflow-y-auto rounded-3xl border border-white/55 bg-[#fffdf8]/64 p-3 shadow-[0_18px_55px_rgba(36,42,36,0.14)] backdrop-blur-2xl sm:bottom-5 sm:left-5 sm:top-20 sm:p-4"
            aria-label="Page navigation"
          >
            <div className="px-2 pb-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sage-green">ADHD Compass</p>
              <p className="mt-1 font-serif text-xl font-bold capitalize text-foreground">{chapterLabel}</p>
            </div>

            <nav className="grid grid-cols-2 gap-2 border-b border-sage-green/10 pb-4" aria-label="Site navigation">
              <button
                type="button"
                onClick={() => { setOpen(false); setLocation('/'); }}
                className="flex items-center gap-2 rounded-2xl bg-white/70 px-3 py-3 text-left text-sm font-semibold text-foreground transition hover:bg-white"
              >
                <Home className="h-4 w-4 text-sage-green" /> Home
              </button>
              <button
                type="button"
                onClick={() => { setOpen(false); window.dispatchEvent(new CustomEvent('open-chapter-navigator')); }}
                className="flex items-center gap-2 rounded-2xl bg-white/70 px-3 py-3 text-left text-sm font-semibold text-foreground transition hover:bg-white"
              >
                <Compass className="h-4 w-4 text-sage-green" /> Compass
              </button>
            </nav>

            {topics.length > 0 && (
              <div className="pt-4">
                <div className="flex items-center justify-between gap-3 px-2">
                  <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-muted-foreground"><BookOpenText className="h-4 w-4" /> On this page</span>
                  <span className="text-[10px] text-muted-foreground">{topics.length} topics</span>
                </div>
                <nav className="mt-3 space-y-1" aria-label="Topics on this page">
                  {topics.map((topic, index) => {
                    const active = topic.id === activeId;
                    return (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => goToTopic(topic.id)}
                        className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm leading-snug transition ${active ? 'bg-sage-green text-white shadow-sm' : 'text-foreground hover:bg-white/75'}`}
                      >
                        <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${active ? 'bg-white/18 text-white' : 'bg-sage-green/10 text-sage-green'}`}>{index + 1}</span>
                        <span>{topic.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            )}
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
