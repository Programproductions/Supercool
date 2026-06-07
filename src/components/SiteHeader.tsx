import { appEnvironment, envLabels, site } from '../data/site'

export function SiteHeader() {
  const env = envLabels[appEnvironment]

  return (
    <header className="sticky top-0 z-50 border-b-4 border-funk-brown bg-funk-cream/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <a href="#" className="flex items-center gap-3">
          <img src="/logo.png" alt={site.company} className="h-14 w-auto max-w-[180px] sm:h-16" />
        </a>

        <nav className="hidden items-center gap-6 text-sm font-semibold md:flex">
          <a href="#about" className="hover:text-funk-magenta transition-colors">
            About
          </a>
          <a href="#services" className="hover:text-funk-magenta transition-colors">
            Services
          </a>
          <a href="#contact" className="hover:text-funk-magenta transition-colors">
            Contact
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {env.label ? (
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-bold tracking-wider ${env.className}`}
            >
              {env.label}
            </span>
          ) : null}
          <a
            href="#contact"
            className="groovy-border rounded-full bg-funk-mustard px-4 py-2 text-sm font-bold text-funk-brown transition hover:-translate-y-0.5 hover:bg-funk-orange hover:text-funk-cream"
          >
            Let&apos;s talk
          </a>
        </div>
      </div>
    </header>
  )
}
