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
              {site.company} is an independent Australian music company that believes a
              great record should feel as good as it sounds. We blend analogue warmth with
              modern production — channeling a little 70s soul into every session.
            </p>
            <p className="mt-4 leading-relaxed text-funk-brown/80">
              Part record label, part production house, part artist services crew. From the
              first take to the final master — and every stream after — we help artists build
              careers that last.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { stat: '50+', label: 'Releases', detail: 'and counting' },
              { stat: '∞', label: 'Groove factor', detail: 'non-negotiable' },
              { stat: '24/7', label: 'Studio time', detail: 'always open' },
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
