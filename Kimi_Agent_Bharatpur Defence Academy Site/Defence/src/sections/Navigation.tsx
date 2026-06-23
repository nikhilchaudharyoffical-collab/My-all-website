import { useState, useEffect, useCallback } from 'react'
import { Menu, X, Shield } from 'lucide-react'

const navLinks = [
  { label: 'HOME', href: '#hero' },
  { label: 'COURSES', href: '#courses' },
  { label: 'ABOUT', href: '#about' },
  { label: 'GALLERY', href: '#gallery' },
  { label: 'REVIEWS', href: '#testimonials' },
  { label: 'CONTACT', href: '#contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = useCallback((href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(10,22,40,0.95)] backdrop-blur-[12px] shadow-nav-bar mx-0 md:mx-4 rounded-none md:rounded-b-[12px]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-[1280px] mx-auto w-full px-5 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo('#hero')}
            className="flex items-center gap-3 text-left"
          >
            <Shield className="w-8 h-8 text-saffron flex-shrink-0" strokeWidth={2} />
            <div className="hidden sm:block">
              <div className="font-display font-bold text-white text-sm md:text-base uppercase leading-tight tracking-wide">
                BHARATPUR RAJASTHAN
              </div>
              <div className="font-display font-bold text-white text-sm md:text-base uppercase leading-tight tracking-wide">
                DEFENCE ACADEMY
              </div>
            </div>
            <div className="sm:hidden font-display font-bold text-white text-sm uppercase leading-tight tracking-wide">
              BR DEFENCE
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="font-heading font-semibold text-[15px] uppercase tracking-[0.04em] text-white/80 hover:text-saffron transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('#contact')}
              className="font-heading font-semibold text-[15px] uppercase tracking-[0.05em] bg-saffron text-white px-7 py-3 rounded-lg shadow-button hover:bg-saffron-light hover:scale-[1.03] transition-all duration-200"
            >
              ENQUIRE NOW
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-saffron"
            aria-label="Open menu"
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-navy-deep/[0.98] backdrop-blur-[20px] transition-all duration-300 lg:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col h-full px-8 py-6">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-saffron" strokeWidth={2} />
              <span className="font-display font-bold text-white text-sm uppercase tracking-wide">
                BR DEFENCE ACADEMY
              </span>
            </div>
            <button onClick={() => setMobileOpen(false)} className="text-white" aria-label="Close menu">
              <X className="w-7 h-7" />
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {navLinks.map((link, i) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="font-heading font-semibold text-2xl uppercase tracking-[0.04em] text-white/90 hover:text-saffron transition-colors duration-200 text-left"
                style={{
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.5s ease ${i * 80}ms`,
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="mt-auto">
            <button
              onClick={() => scrollTo('#contact')}
              className="w-full font-heading font-semibold text-lg uppercase tracking-[0.05em] bg-saffron text-white px-7 py-4 rounded-lg shadow-button hover:bg-saffron-light transition-all duration-200"
            >
              ENQUIRE NOW
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
