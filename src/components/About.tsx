import { site } from '../data/site'

export function About() {
  return (
    <section id="about" className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="wavy-divider mb-10 rounded-full" />
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-4xl text-funk-brown sm:text-5xl">About us</h2>
            <p className="mt-6 text-lg leading-relaxed text-funk-rust">
              {site.company} is an Australian software studio that believes great products
              should feel as good as they function. We blend modern engineering with
              bold design — channeling a little 70s soul into every sprint.
            </p>
            <p className="mt-4 leading-relaxed text-funk-brown/80">
              Frontend on Vercel. Backend on GCP project{' '}
              <code className="rounded bg-funk-teal/15 px-2 py-0.5 text-sm">
                {site.gcpProject}
              </code>
              . Three environments — dev, staging, production — so you ship with confidence.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { stat: '3', label: 'Environments', detail: 'dev · staging · prod' },
              { stat: '∞', label: 'Groove factor', detail: 'non-negotiable' },
              { stat: 'GCP', label: 'Cloud backend', detail: site.gcpProject },
              { stat: 'AU', label: 'Based in', detail: site.location },
            ].map((item) => (
              <div key={item.label} className="funk-card p-5">
                <p className="font-display text-3xl text-funk-orange">{item.stat}</p>
                <p className="mt-1 font-bold text-funk-brown">{item.label}</p>
                <p className="text-sm text-funk-brown/70">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
