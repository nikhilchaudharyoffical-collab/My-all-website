import { useEffect, useRef } from 'react'
import { ChevronDown } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const runningItems = [
  'BEST RATED DEFENCE ACADEMY',
  '5.0 STAR RATING',
  "BHARATPUR'S FINEST",
  'DISCIPLINE & DETERMINATION',
  'SSC',
  'CRPF',
  'CISF',
  'ARMY',
]

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const runningRef = useRef<HTMLDivElement>(null)
  const marqueeTweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animations
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.3 }
      )
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 }
      )
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.8 }
      )
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 1.0 }
      )
      gsap.fromTo(
        scrollRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, delay: 1.5 }
      )
      gsap.fromTo(
        runningRef.current,
        { opacity: 0 },
        { opacity: 0.06, duration: 0.8, delay: 0.5 }
      )

      // Continuous marquee animation
      if (runningRef.current) {
        marqueeTweenRef.current = gsap.to(runningRef.current, {
          x: '-50%',
          duration: 40,
          ease: 'none',
          repeat: -1,
        })
      }

      // Scroll-driven running text
      if (heroRef.current && runningRef.current) {
        gsap.fromTo(
          runningRef.current,
          { x: 0 },
          {
            x: '-100%',
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
            },
          }
        )
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const scrollTo = (href: string) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const runningText = [...runningItems, ...runningItems].join(' * ')

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative w-full min-h-[600px] max-h-[1200px] h-screen overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.jpg"
          alt="Athlete running on foggy road at dawn"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark Gradient Overlay */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10, 22, 40, 0.5) 0%, rgba(10, 22, 40, 0.35) 50%, rgba(10, 22, 40, 0.75) 100%)',
        }}
      />

      {/* Subtle fog particles effect */}
      <div className="absolute inset-0 z-[2] opacity-15 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-[80px] animate-pulse" />
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-white/5 rounded-full blur-[60px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-1/2 w-56 h-56 bg-white/5 rounded-full blur-[70px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-[3] flex flex-col items-center justify-center h-full px-5 md:px-8 text-center">
        <h1
          ref={titleRef}
          className="font-display font-bold text-[48px] md:text-[80px] lg:text-[120px] leading-[1.05] tracking-[-0.02em] text-stroke opacity-0"
          style={{ textShadow: '0 4px 40px rgba(0,0,0,0.4)' }}
        >
          <span className="block">DISCIPLINE &amp;</span>
          <span className="block">DETERMINATION</span>
        </h1>

        <p
          ref={subtitleRef}
          className="mt-6 font-body text-lg md:text-xl text-white/90 max-w-2xl opacity-0"
        >
          Your Path to Defence Forces Starts Here
        </p>

        <p
          ref={descRef}
          className="mt-4 font-body text-base text-white/70 opacity-0"
        >
          Nai Mandi, Bharatpur | Est. 2021 | 5.0 Rating | Offline Training
        </p>

        <div ref={ctaRef} className="mt-10 flex flex-col sm:flex-row gap-4 opacity-0">
          <button
            onClick={() => scrollTo('#contact')}
            className="font-heading font-semibold text-[15px] uppercase tracking-[0.05em] bg-saffron text-white px-9 py-4 rounded-lg shadow-button hover:bg-saffron-light hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
          >
            ENQUIRE NOW
          </button>
          <button
            onClick={() => scrollTo('#courses')}
            className="font-heading font-semibold text-[15px] uppercase tracking-[0.05em] bg-transparent text-white border-2 border-white/60 px-9 py-4 rounded-lg hover:bg-white hover:text-navy-deep transition-all duration-200"
          >
            VIEW COURSES
          </button>
        </div>

        {/* Scroll Indicator */}
        <div
          ref={scrollRef}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-subtle opacity-0 hidden md:block"
        >
          <ChevronDown className="w-6 h-6 text-white" />
        </div>
      </div>

      {/* Running Text Marquee */}
      <div
        ref={runningRef}
        className="absolute bottom-0 left-0 right-0 z-[2] overflow-hidden whitespace-nowrap opacity-0 pointer-events-none"
      >
        <div className="flex">
          <span className="font-display font-bold text-[42px] md:text-[80px] uppercase text-white/[0.06] px-4">
            {runningText} *&nbsp;
          </span>
          <span className="font-display font-bold text-[42px] md:text-[80px] uppercase text-white/[0.06] px-4">
            {runningText} *&nbsp;
          </span>
        </div>
      </div>
    </section>
  )
}
