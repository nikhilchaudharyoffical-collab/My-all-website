import { useEffect, useRef } from 'react'
import { Users, Star, Clock, TrendingUp } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { icon: Users, value: 100, suffix: '+', label: 'Happy Students Trained' },
  { icon: Star, value: 5.0, suffix: '', label: 'Star Rating on Justdial', decimal: true },
  { icon: Clock, value: 2021, suffix: '', label: 'Year Established' },
  { icon: TrendingUp, value: 100, suffix: '%', label: 'Success Rate' },
]

export default function StatsBand() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const statRefs = useRef<(HTMLDivElement | null)[]>([])
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stat blocks entrance
      statRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(
          el,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power3.out',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      })

      // Number counter animation
      numberRefs.current.forEach((el, i) => {
        if (!el) return
        const stat = stats[i]
        const target = stat.value
        gsap.fromTo(
          el,
          { textContent: stat.decimal ? '0.0' : '0' },
          {
            textContent: target + (stat.decimal ? '' : ''),
            duration: 1.5,
            ease: 'power2.out',
            snap: { textContent: stat.decimal ? 0.1 : 1 },
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            onUpdate: function () {
              if (el && stat.decimal) {
                el.textContent = parseFloat(el.textContent || '0').toFixed(1)
              }
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={sectionRef}
      className="relative bg-navy-deep -mt-10 rounded-t-[20px] z-10 py-16"
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                ref={(el) => { statRefs.current[i] = el }}
                className="flex flex-col items-center text-center opacity-0"
              >
                <Icon className="w-7 h-7 text-saffron mb-4" strokeWidth={1.5} />
                <span
                  ref={(el) => { numberRefs.current[i] = el }}
                  className="font-display font-bold text-[42px] md:text-[64px] leading-none tracking-[-0.02em] text-saffron"
                >
                  {stat.decimal ? '0.0' : '0'}
                </span>
                <span className="font-body font-medium text-sm uppercase tracking-[0.02em] text-white/70 mt-2">
                  {stat.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
