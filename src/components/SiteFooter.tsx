import { site } from '../data/site'

export function SiteFooter() {
  return (
    <footer className="border-t-4 border-funk-brown bg-funk-brown px-4 py-10 text-funk-cream sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <div className="flex items-center gap-3">
          <img src="/logo.svg" alt="" className="h-12 w-auto max-w-[160px]" />
        </div>
        <p className="text-sm text-funk-cream/70">
          © {new Date().getFullYear()} {site.shortName}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
