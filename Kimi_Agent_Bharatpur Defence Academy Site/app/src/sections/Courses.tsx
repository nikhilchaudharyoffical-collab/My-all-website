import { useEffect, useRef } from 'react'
import { BookOpen, Award, Plane, Anchor, Shield, Scale, ChevronRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const courses = [
  {
    icon: BookOpen,
    title: 'SSC-GD Written Exam Coaching',
    description: 'Complete preparation for Staff Selection Commission written examination covering Mathematics, General Ability and English.',
  },
  {
    icon: Award,
    title: 'CRPF Exam Preparation',
    description: 'Focused coaching for Central Reserve Police Force exam with specialised study material and regular mock tests.',
  },
  {
    icon: Plane,
    title: 'Agniveer Coaching',
    description: 'Tailored training for Agniveer examinations with physical fitness modules.',
  },
  {
    icon: Shield,
    title: 'Army GD & TA Coaching',
    description: 'Comprehensive training for Army General Duty, TA, and Technical branch recruitments.',
  },
  {
    icon: Scale,
    title: 'Police & Paramilitary Exams',
    description: 'Preparation for Rajasthan Police, CRPF, BSF, and other state and central paramilitary force examinations.',
  },
]

export default function Courses() {
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
            duration: 0.6,
            ease: 'power3.out',
            delay: i * 0.1,
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

  const scrollToContact = () => {
    const el = document.querySelector('#contact')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="courses"
      ref={sectionRef}
      className="bg-white py-16 md:py-24 lg:py-[120px]"
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16 opacity-0">
          <span className="font-body font-medium text-sm uppercase tracking-[0.1em] text-saffron">
            WHAT WE OFFER
          </span>
          <h2 className="font-display font-bold text-[40px] md:text-[56px] lg:text-[72px] leading-[1.1] tracking-[-0.01em] text-text-primary mt-3">
            OUR TRAINING PROGRAMS
          </h2>
          <p className="font-body text-lg text-text-secondary mt-4 max-w-[600px] mx-auto">
            Comprehensive preparation for all defence examinations
          </p>
        </div>

        {/* Course Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {courses.map((course, i) => {
            const Icon = course.icon
            return (
              <div
                key={course.title}
                ref={(el) => { cardsRef.current[i] = el }}
                className="group bg-white border border-light-gray rounded-2xl p-8 shadow-card hover:shadow-card-hover hover:-translate-y-1 hover:border-saffron/30 transition-all duration-300 opacity-0"
              >
                <div className="w-14 h-14 rounded-full bg-saffron-muted flex items-center justify-center">
                  <Icon className="w-6 h-6 text-saffron" strokeWidth={1.5} />
                </div>
                <h5 className="font-heading font-semibold text-xl md:text-2xl text-text-primary mt-5 leading-tight">
                  {course.title}
                </h5>
                <p className="font-body text-base text-text-secondary mt-3 leading-relaxed">
                  {course.description}
                </p>
                <button
                  onClick={scrollToContact}
                  className="mt-5 inline-flex items-center gap-1 font-body font-medium text-sm uppercase tracking-[0.02em] text-saffron hover:underline"
                >
                  LEARN MORE
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
