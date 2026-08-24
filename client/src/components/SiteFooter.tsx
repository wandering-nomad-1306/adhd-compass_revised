import { Link } from 'wouter';

export default function SiteFooter() {
  return (
    <footer className="border-t border-[#4f7659]/10 bg-[#fbf8f0] px-6 py-9 text-[#5f554d] sm:py-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-[1.25fr_.9fr] md:items-start">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#231d17]">ADHD Compass</h2>
            <p className="mt-2 text-sm font-semibold text-[#4f7659]">
              Free forever · Evidence-based · No account needed
            </p>
            <p className="mt-3 max-w-xl text-sm leading-relaxed">
              Independent educational information about ADHD. Not medical advice or a diagnostic service.
            </p>
          </div>

          <nav aria-label="Website information" className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm md:justify-self-end">
            <Link href="/about" className="transition-colors hover:text-[#231d17] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f7659]/35">
              About ADHD Compass
            </Link>
            <a href="/about#sources" className="transition-colors hover:text-[#231d17] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f7659]/35">
              How evidence is used
            </a>
            <a href="/about#privacy" className="transition-colors hover:text-[#231d17] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f7659]/35">
              Privacy
            </a>
            <a href="/about#contact" className="transition-colors hover:text-[#231d17] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f7659]/35">
              Contact / corrections
            </a>
          </nav>
        </div>

        <div className="mt-7 flex flex-col gap-3 border-t border-[#4f7659]/10 pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 ADHD Compass. Independent educational project.</p>
          <a
            href="mailto:myadhdcompass@gmail.com"
            className="transition-colors hover:text-[#231d17] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f7659]/35"
          >
            myadhdcompass@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
