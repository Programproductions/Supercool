import { About } from './components/About'
import { Contact } from './components/Contact'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'

function App() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Services />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}

export default App
