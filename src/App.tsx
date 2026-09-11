import { About } from './components/About'
import { Contact } from './components/Contact'
import { Hero } from './components/Hero'
import { Services } from './components/Services'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { DrawdownApp } from './drawdown/DrawdownApp'

function MarketingSite() {
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

function App() {
  const isDrawdownRoute = window.location.pathname === '/drawdown'
  if (isDrawdownRoute) {
    return <DrawdownApp />
  }
  return <MarketingSite />
}

export default App
