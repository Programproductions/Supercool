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
              {site.company} is an Australian studio focused on the music industry. We
              speak catalog, splits, and statements — and we build software that helps
              teams move faster from sign-off to statement.
            </p>
            <p className="mt-4 leading-relaxed text-funk-brown/80">
              Whether you run a label, manage a publishing roster, or coordinate
              distribution, we design platforms that fit how music business actually
              works — with secure cloud infrastructure on GCP project{' '}
              <code className="rounded bg-funk-teal/15 px-2 py-0.5 text-sm">
                {site.gcpProject}
              </code>
              .
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { stat: 'ISRC', label: 'Catalog ready', detail: 'metadata & identifiers' },
              { stat: '100%', label: 'Split accuracy', detail: 'writers · artists · partners' },
              { stat: 'DSP', label: 'Distribution', detail: 'streaming & download partners' },
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
