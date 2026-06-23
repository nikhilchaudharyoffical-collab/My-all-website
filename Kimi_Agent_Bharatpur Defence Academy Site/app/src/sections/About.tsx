import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left column elements staggered entrance
      if (leftRef.current) {
        const children = leftRef.current.querySelectorAll('.animate-in')
        gsap.fromTo(
          children,
          { opacity: 0, x: -40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // Image entrance
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.2,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // Image parallax
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current.querySelector('img'),
          { y: -20 },
          {
            y: 20,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          }
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const scrollToContact = () => {
    const el = document.querySelector('#contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-offwhite py-16 md:py-24 lg:py-[120px]"
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16 items-center">
          {/* Left - Text */}
          <div ref={leftRef}>
            <span className="animate-in block font-body font-medium text-sm uppercase tracking-[0.1em] text-saffron opacity-0">
              ABOUT THE ACADEMY
            </span>
            <h2 className="animate-in font-display font-bold text-[40px] md:text-[56px] lg:text-[72px] leading-[1.1] tracking-[-0.01em] text-text-primary mt-4 opacity-0">
              TRAIN WITH THE BEST IN BHARATPUR
            </h2>
            <div className="animate-in mt-6 space-y-4 opacity-0">
              <p className="font-body text-lg leading-[1.7] text-text-secondary">
                Bharatpur Rajasthan Defence Academy, located in the heart of Nai Mandi, Bharatpur, has been the region's premier institute for defence exam preparation since 2021.
              </p>
              <p className="font-body text-lg leading-[1.7] text-text-secondary">
                We provide comprehensive coaching for SSC-GD, BSF, CRPF, CISF, TA-ARMY and Police recruitment exams. Our expert trainers combine rigorous physical training with focused academic preparation.
              </p>
              <p className="font-body text-lg leading-[1.7] text-text-secondary">
                With our rigorous on-ground physical training and expert personal mentorship, we ensure every aspirant receives personalized attention and the elite guidance needed to crack the toughest defense fitness standards and achieve their career dreams.
              </p>
            </div>
            <button
              onClick={scrollToContact}
              className="animate-in mt-8 inline-flex items-center gap-2 font-heading font-semibold text-[15px] uppercase tracking-[0.05em] text-saffron hover:underline opacity-0 group"
            >
              KNOW MORE
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Right - Image */}
          <div ref={imageRef} className="opacity-0">
            <div className="relative -mt-5 rounded-xl overflow-hidden shadow-card">
              <img
                src="/images/images (1).jpeg"
                alt="Students doing physical training at Bharatpur Rajasthan Defence Academy"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
