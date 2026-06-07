import { site } from '../data/site'

export function Hero() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 sm:py-24">
      <div
        aria-hidden
        className="starburst pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border-4 border-dashed border-funk-magenta/40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-funk-avocado/20 blur-2xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="mb-4 inline-block rounded-full border-2 border-funk-brown bg-funk-mustard/60 px-4 py-1 text-xs font-bold tracking-[0.2em] uppercase">
            Est. with groove
          </p>
          <h1 className="font-display text-5xl leading-tight text-funk-brown sm:text-6xl lg:text-7xl">
            {site.company}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-funk-rust sm:text-xl">
            {site.tagline}
          </p>
          <p className="mt-4 max-w-xl text-base text-funk-brown/80">{site.description}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#services"
              className="groovy-border rounded-full bg-funk-orange px-6 py-3 font-bold text-funk-cream transition hover:-translate-y-1 hover:bg-funk-magenta"
            >
              See what we do
            </a>
            <a
              href="#contact"
              className="rounded-full border-3 border-funk-brown bg-funk-cream px-6 py-3 font-bold text-funk-brown transition hover:-translate-y-1 hover:bg-funk-teal hover:text-funk-cream"
            >
              Get in touch
            </a>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="relative max-w-md">
            <img
              src="/logo.svg"
              alt="Supercool Software logo"
              className="w-full funk-float drop-shadow-[8px_8px_0_#2b160e]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
