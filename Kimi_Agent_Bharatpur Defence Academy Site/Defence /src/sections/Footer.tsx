const quickLinks = ['Home', 'Courses', 'About', 'Gallery', 'Reviews', 'Contact']
const courseLinks = [
  'NDA Coaching',
  'CDS Preparation',
  'Air Force Coaching',
  'Navy Coaching',
  'Army Coaching',
  'Police Exams',
]

export default function Footer() {
  const scrollTo = (label: string) => {
    const id = label.toLowerCase()
    const el = document.querySelector(`#${id}`)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-navy-deep border-t border-white/[0.08]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-display font-bold text-lg text-white uppercase tracking-wide">
              BHARATPUR RAJASTHAN DEFENCE ACADEMY
            </h3>
            <p className="font-body text-sm text-white/60 mt-4 max-w-[280px] leading-relaxed">
              Premier defence coaching institute in Bharatpur since 2021. Training the nation's future defenders with discipline and dedication.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body font-medium text-sm uppercase tracking-[0.1em] text-white mb-5">
              QUICK LINKS
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollTo(link)}
                    className="font-body text-sm text-white/60 hover:text-saffron transition-colors duration-200"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="font-body font-medium text-sm uppercase tracking-[0.1em] text-white mb-5">
              COURSES
            </h4>
            <ul className="space-y-3">
              {courseLinks.map((link) => (
                <li key={link}>
                  <button
                    onClick={() => scrollTo('courses')}
                    className="font-body text-sm text-white/60 hover:text-saffron transition-colors duration-200"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body font-medium text-sm uppercase tracking-[0.1em] text-white mb-5">
              CONTACT
            </h4>
            <div className="space-y-2">
              <p className="font-body text-sm text-white/60">
                Nai Mandi, Bharatpur, Rajasthan
              </p>
              <p className="font-body text-sm text-white/60">
                +91 98XXX XXXXX
              </p>
              <p className="font-body text-sm text-white/60">
                Mon-Sat: 6AM - 8PM
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-body text-xs text-white/40">
            2025 Bharatpur Rajasthan Defence Academy. All rights reserved.
          </p>
          <p className="font-body text-xs text-white/40">
            Powered by Defence Aspirants
          </p>
        </div>
      </div>
    </footer>
  )
}
