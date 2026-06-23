import { useEffect, useRef, useState } from 'react'
import { ZoomIn, X } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const galleryImages = [
  { src: '/images/gallery-1.jpg', alt: 'Academy building exterior with Indian flag' },
  { src: '/images/gallery-2.jpg', alt: 'NDA Mathematics study notes and textbook' },
  { src: '/images/gallery-3.jpg', alt: 'Students doing rope climbing training' },
  { src: '/images/gallery-4.jpg', alt: 'Classroom session with smart board' },
  { src: '/images/gallery-5.jpg', alt: 'Morning assembly at the academy' },
  { src: '/images/gallery-6.jpg', alt: 'Mock interview session' },
  { src: '/images/gallery-7.jpg', alt: 'Group discussion among students' },
  { src: '/images/gallery-8.jpg', alt: 'Victory celebration ceremony' },
]

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const imagesRef = useRef<(HTMLDivElement | null)[]>([])
  const [lightbox, setLightbox] = useState<number | null>(null)

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

      // Images staggered entrance
      imagesRef.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(
          el,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: 'power3.out',
            delay: i * 0.08,
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

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (lightbox !== null) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="bg-offwhite py-16 md:py-24 lg:py-[120px]"
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-12 md:mb-16 opacity-0">
          <span className="font-body font-medium text-sm uppercase tracking-[0.1em] text-saffron">
            GALLERY
          </span>
          <h2 className="font-display font-bold text-[40px] md:text-[56px] lg:text-[72px] leading-[1.1] tracking-[-0.01em] text-text-primary mt-3">
            TRAINING IN ACTION
          </h2>
          <p className="font-body text-lg text-text-secondary mt-3">
            Glimpses of our academy life and training sessions
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {galleryImages.map((img, i) => (
            <div
              key={img.src}
              ref={(el) => { imagesRef.current[i] = el }}
              className="break-inside-avoid relative group rounded-xl overflow-hidden cursor-pointer opacity-0"
              onClick={() => setLightbox(i)}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-400"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-navy-deep/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-saffron flex items-center justify-center">
                  <ZoomIn className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <button
            onClick={() => setLightbox(0)}
            className="inline-flex items-center gap-2 font-heading font-semibold text-[15px] uppercase tracking-[0.05em] border-2 border-saffron text-saffron px-9 py-4 rounded-lg hover:bg-saffron hover:text-white transition-all duration-200"
          >
            VIEW ALL PHOTOS
          </button>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[70] bg-navy-deep/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white z-10"
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>

          <div
            className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[lightbox].src}
              alt={galleryImages[lightbox].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
          </div>

          {/* Navigation dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {galleryImages.map((_, i) => (
              <button
                key={i}
                onClick={(e) => {
                  e.stopPropagation()
                  setLightbox(i)
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                  i === lightbox ? 'bg-saffron w-6' : 'bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>

          {/* Prev/Next arrows */}
          {lightbox > 0 && (
            <button
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                setLightbox(lightbox - 1)
              }}
              aria-label="Previous image"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          {lightbox < galleryImages.length - 1 && (
            <button
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                setLightbox(lightbox + 1)
              }}
              aria-label="Next image"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>
      )}
    </section>
  )
}
