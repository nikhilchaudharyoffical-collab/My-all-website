import { useLenis } from './hooks/useLenis'
import Navigation from './sections/Navigation'
import Hero from './sections/Hero'
import StatsBand from './sections/StatsBand'
import About from './sections/About'
import Courses from './sections/Courses'
import OnlineLearning from './sections/OnlineLearning'
import Gallery from './sections/Gallery'
import Testimonials from './sections/Testimonials'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

export default function App() {
  useLenis()

  return (
    <div className="relative">
      <Navigation />
      <Hero />
      <StatsBand />
      <About />
      <Courses />
      <OnlineLearning />
      <Gallery />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  )
}
