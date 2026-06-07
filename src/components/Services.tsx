import { services } from '../data/site'

export function Services() {
  return (
    <section id="services" className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="font-display text-4xl text-funk-brown sm:text-5xl">What we do</h2>
          <p className="mx-auto mt-4 max-w-2xl text-funk-rust">
            From first sketch to production deploy — we build software that moves.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="funk-card p-6 transition hover:-translate-y-1"
              style={{
                boxShadow: `8px 8px 0 ${
                  ['#C23B7A', '#1B6B6B', '#E8622C'][index % 3]
                }`,
              }}
            >
              <span className="text-4xl" aria-hidden>
                {service.icon}
              </span>
              <h3 className="mt-4 font-display text-2xl text-funk-brown">{service.title}</h3>
              <p className="mt-3 leading-relaxed text-funk-brown/80">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
