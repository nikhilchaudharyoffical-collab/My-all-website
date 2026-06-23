import { useEffect, useRef } from 'react'
import { Star, Quote } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote: 'The discipline and training at this academy completely transformed me. The trainers push you beyond your limits while ensuring you understand every concept. I cleared my BSF written exam in my first attempt!',
    name: 'Rahul Singh',
    designation: 'BSF Aspirant',
  },
  {
    quote: "Best defence coaching centre in Bharatpur! The offline tutorials are excellent and the physical training sessions are rigorous. The personal attention each student gets here is unmatched.",
    name: 'Vikram Yadav',
    designation: 'CRPF Candidate',
  },
  {
    quote: 'Joined for SSC-GD coaching and the experience has been incredible. The mock tests and study material are top-notch. Highly recommended for anyone serious about defence careers.',
    name: 'Manish Sharma',
    designation: 'SSC Aspirant',
  },
]

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header entrance
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // Cards staggered entrance
      cardsRef.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            delay: i * 0.15,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="bg-white py-16 md:py-24 lg:py-[120px]"
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16 opacity-0">
          <span className="font-body font-medium text-sm uppercase tracking-[0.1em] text-saffron">
            TESTIMONIALS
          </span>
          <h2 className="font-display font-bold text-[40px] md:text-[56px] lg:text-[72px] leading-[1.1] tracking-[-0.01em] text-text-primary mt-3">
            WHAT OUR STUDENTS SAY
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className="w-6 h-6 fill-star-yellow text-star-yellow"
                strokeWidth={0}
              />
            ))}
            <span className="font-heading font-semibold text-lg text-text-primary ml-2">
              5.0 out of 5
            </span>
          </div>
          <p className="font-body text-sm text-text-secondary mt-2">
            Based on 31 Justdial reviews
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              ref={(el) => { cardsRef.current[i] = el }}
              className="bg-offwhite rounded-2xl p-8 border-l-4 border-saffron opacity-0"
            >
              <Quote className="w-8 h-8 text-saffron-muted" strokeWidth={1.5} />
              <p className="font-body text-lg leading-relaxed text-text-primary italic mt-4">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="h-px bg-light-gray my-5" />
              <h5 className="font-heading font-semibold text-xl text-text-primary">
                {t.name}
              </h5>
              <p className="font-body text-sm text-text-secondary mt-1">
                {t.designation}
              </p>
              <div className="flex gap-1 mt-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-4 h-4 fill-star-yellow text-star-yellow"
                    strokeWidth={0}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
