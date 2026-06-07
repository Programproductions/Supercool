import { site } from '../data/site'

export function Contact() {
  return (
    <section id="contact" className="px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="funk-card overflow-hidden p-8 text-center sm:p-12">
          <h2 className="font-display text-4xl text-funk-brown sm:text-5xl">
            Ready to build something supercool?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-funk-rust">
            Drop us a line. We&apos;ll bring the funk and the architecture diagram.
          </p>
          <a
            href={`mailto:${site.email}`}
            className="groovy-border mt-8 inline-block rounded-full bg-funk-teal px-8 py-3 font-bold text-funk-cream transition hover:-translate-y-1 hover:bg-funk-magenta"
          >
            {site.email}
          </a>
        </div>
      </div>
    </section>
  )
}
