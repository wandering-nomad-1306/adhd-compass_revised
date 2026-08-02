import { ExternalLink, Library } from 'lucide-react';

export interface SourceItem {
  title: string;
  organization: string;
  url: string;
  note?: string;
}

export default function SourceList({ sources }: { sources: SourceItem[] }) {
  return (
    <details className="group rounded-xl border border-sage-green/15 bg-white/80 p-5 shadow-sm">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-foreground">
        <span className="flex items-center gap-2">
          <Library className="h-5 w-5 text-sage-green" />
          Sources used for this page
        </span>
        <span className="text-sm font-normal text-muted-foreground group-open:hidden">Open</span>
        <span className="hidden text-sm font-normal text-muted-foreground group-open:inline">Close</span>
      </summary>
      <div className="mt-5 space-y-3 border-t border-sage-green/10 pt-5">
        {sources.map((source) => (
          <a
            key={source.url}
            href={source.url}
            target="_blank"
            rel="noreferrer"
            className="block rounded-lg border border-transparent p-3 transition-colors hover:border-sage-green/20 hover:bg-warm-cream"
          >
            <span className="flex items-start justify-between gap-3">
              <span>
                <span className="block font-semibold text-foreground">{source.title}</span>
                <span className="mt-0.5 block text-sm text-muted-foreground">{source.organization}</span>
                {source.note && <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{source.note}</span>}
              </span>
              <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-sage-green" />
            </span>
          </a>
        ))}
      </div>
    </details>
  );
}
