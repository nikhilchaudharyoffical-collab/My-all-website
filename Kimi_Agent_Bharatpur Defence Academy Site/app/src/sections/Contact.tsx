import { useEffect, useRef, useState } from 'react'
import { MapPin, Phone, Clock, Globe, Instagram, Facebook, Youtube } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const contactInfo = [
  { icon: MapPin, label: 'Address', value: 'C Block C/70, Nai Mandi, Bharatpur-321001, Rajasthan' },
  { icon: Phone, label: 'Phone', value: '+91 79 4710 4878' },
  { icon: Clock, label: 'Timings', value: 'Mon - Sat: 6:00 AM - 8:00 PM' },
  { icon: Globe, label: 'Online Classes', value: 'Available 24/7' },
]

const courseOptions = [
  'Select Course',
  'SSC-GD Coaching',
  'CRPF Preparation',
  'CISF Coaching',
  'BSF Coaching',
  'TA-Army Coaching',
]

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    course: '',
    message: '',
  })

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left column staggered entrance
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
            stagger: 0.1,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        )
      }

      // Form entrance
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setFormData({ name: '', phone: '', course: '', message: '' })
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="bg-navy py-16 md:py-24 lg:py-[120px]"
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-12 lg:gap-16">
          {/* Left - Contact Info */}
          <div ref={leftRef}>
            <span className="animate-in block font-body font-medium text-sm uppercase tracking-[0.1em] text-saffron opacity-0">
              GET IN TOUCH
            </span>
            <h2 className="animate-in font-display font-bold text-[40px] md:text-[56px] lg:text-[72px] leading-[1.1] tracking-[-0.01em] text-white mt-4 opacity-0">
              VISIT US TODAY
            </h2>
            <p className="animate-in font-body text-lg leading-[1.7] text-white/80 mt-4 opacity-0">
              Visit our academy in Nai Mandi, Bharatpur or reach out to us for any enquiries about courses, admissions, and training schedules.
            </p>

            {/* Contact Info Blocks */}
            <div className="animate-in mt-10 space-y-6 opacity-0">
              {contactInfo.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.label} className="flex items-start gap-4">
                    <Icon className="w-6 h-6 text-saffron flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <span className="font-heading font-semibold text-base text-white block">
                        {item.label}
                      </span>
                      <span className="font-body text-base text-white/80">
                        {item.value}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Social Links */}
            <div className="animate-in mt-8 flex gap-3 opacity-0">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-saffron transition-colors duration-200"
                  onClick={(e) => e.preventDefault()}
                  aria-label={`Social link ${i + 1}`}
                >
                  <Icon className="w-5 h-5" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Right - Form */}
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-8 md:p-10 shadow-card opacity-0"
          >
            <h4 className="font-heading font-bold text-2xl md:text-3xl text-text-primary mb-6">
              SEND ENQUIRY
            </h4>

            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Your Full Name *"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-light-gray text-text-primary font-body placeholder:text-text-muted focus:border-saffron focus:outline-none focus:ring-1 focus:ring-saffron/20 transition-colors"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-light-gray text-text-primary font-body placeholder:text-text-muted focus:border-saffron focus:outline-none focus:ring-1 focus:ring-saffron/20 transition-colors"
                />
              </div>
              <div>
                <select
                  value={formData.course}
                  onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-light-gray text-text-primary font-body focus:border-saffron focus:outline-none focus:ring-1 focus:ring-saffron/20 transition-colors appearance-none bg-white"
                >
                  {courseOptions.map((opt) => (
                    <option key={opt} value={opt === 'Select Course' ? '' : opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-light-gray text-text-primary font-body placeholder:text-text-muted focus:border-saffron focus:outline-none focus:ring-1 focus:ring-saffron/20 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full font-heading font-semibold text-[15px] uppercase tracking-[0.05em] bg-saffron text-white py-4 rounded-lg shadow-button hover:bg-saffron-light hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                SUBMIT ENQUIRY
              </button>
            </div>

            {/* Success Toast */}
            {submitted && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="font-body text-sm text-green-700 text-center">
                  Thank you! We will contact you shortly.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
