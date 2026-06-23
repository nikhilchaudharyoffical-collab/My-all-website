import { useEffect, useRef } from 'react'
import { CheckCircle } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const features = [
  'Expert Ex-Servicemen Trainers',
  'Standard Obstacle Course',
  'Daily Endurance & Stamina Drilling',
  'Regular Medical Fitness Mock Tests',
]

export default function OnlineLearning() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image entrance from left
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // Text elements staggered from right
      if (textRef.current) {
        const children = textRef.current.querySelectorAll('.animate-in')
        gsap.fromTo(
          children,
          { opacity: 0, x: 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.12,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
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
      ref={sectionRef}
      className="bg-navy-deep py-16 md:py-24 lg:py-[120px]"
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Image */}
          <div ref={imageRef} className="order-2 lg:order-1 opacity-0">
            <div className="rounded-xl overflow-hidden shadow-card">
              <img
                src="/images/about-section.jpg"
                alt="Student attending online defence coaching class"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right - Text */}
          <div ref={textRef} className="order-1 lg:order-2">
            <span className="animate-in block font-body font-medium text-sm uppercase tracking-[0.1em] text-saffron opacity-0">
              CHAMPIONS ARE MADE ON THE GROUND
            </span>
            <h2 className="animate-in font-display font-bold text-[40px] md:text-[56px] lg:text-[72px] leading-[1.1] tracking-[-0.01em] text-white mt-4 opacity-0">
              RIGOROUS PHYSICAL TRAINING FOR GUARANTEED SUCCESS
            </h2>
            <p className="animate-in font-body text-lg leading-[1.7] text-white/80 mt-5 opacity-0">
              Our comprehensive physical curriculum is engineered to transform defense aspirants into elite candidates. At BR Defence Academy in Bharatpur, Rajasthan, we provide rigorous, exam-aligned physical training on a state-of-the-art ground. Led by expert ex-servicemen instructors, our daily schedule focuses on stamina building, obstacle courses, and medical fitness checkups—ensuring you crack the physical efficiency test (PET) with flying colors.
            </p>

            <div className="animate-in mt-6 space-y-3 opacity-0">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-saffron flex-shrink-0" strokeWidth={2} />
                  <span className="font-body text-base text-white/90">{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={scrollToContact}
              className="animate-in mt-8 font-heading font-semibold text-[15px] uppercase tracking-[0.05em] bg-saffron text-white px-9 py-4 rounded-lg shadow-button hover:bg-saffron-light hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 opacity-0"
            >
              JOIN PHYSICAL BATCH NOW
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
