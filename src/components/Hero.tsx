import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Badge } from './ui/badge'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)

  useGSAP(() => {
    // Entrance animations triggered when section comes into view
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      }
    })

    // Title entrance — staggered per word
    if (titleRef.current) {
      const words = titleRef.current.querySelectorAll('.word')
      tl.fromTo(words,
        { y: 80, opacity: 0, rotationX: 30 },
        { y: 0, opacity: 1, rotationX: 0, duration: 1, stagger: 0.08, ease: 'power4.out' }
      )
    }

    // Subtitle
    if (subRef.current) {
      tl.fromTo(subRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.5'
      )
    }

    // Metrics
    tl.fromTo('.hero-metric',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'power3.out' },
      '-=0.4'
    )

    // Eyebrow + badge
    tl.fromTo('.hero-eyebrow',
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' },
      0.3
    )

    // Decorative parallax text - moves vertically
    gsap.to('.hero-parallax-text', {
      y: -200, // Move up vertically
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    })

    // Section-level geometric elements - vertical parallax
    gsap.to('.hero-geo', {
      y: -100,
      rotation: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      }
    })
  }, { scope: sectionRef })

  // Split title into word spans
  const titleText = 'Building Digital Experiences with Precision and Purpose.'
  const words = titleText.split(' ')

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="paper-section paper-section--light"
    >
      {/* Section geometric decorations */}
      <div className="geo-layer">
        {/* Paper corner fold */}
        <svg className="hero-geo geo-el" style={{ right: '8%', top: '12%' }} width="180" height="180" viewBox="0 0 180 180" fill="none">
          <polygon points="0,180 180,0 180,40 40,180" fill="rgba(27,54,93,0.03)" />
          <line x1="0" y1="180" x2="180" y2="0" stroke="rgba(27,54,93,0.06)" strokeWidth="0.5" />
        </svg>

        {/* Horizontal rule accent */}
        <svg className="hero-geo geo-el" style={{ left: '5%', bottom: '25%' }} width="200" height="2" viewBox="0 0 200 2" fill="none">
          <line x1="0" y1="1" x2="200" y2="1" stroke="rgba(27,54,93,0.08)" strokeWidth="1" />
        </svg>

        {/* Small diamond */}
        <svg className="hero-geo geo-el" style={{ right: '25%', bottom: '18%' }} width="24" height="24" viewBox="0 0 100 100" fill="none">
          <rect x="15" y="15" width="70" height="70" stroke="rgba(27,54,93,0.07)" strokeWidth="2" transform="rotate(45 50 50)" />
        </svg>
      </div>

      <div className="section-inner" style={{ paddingTop: '160px' }}>
        <div className="hero-eyebrow eyebrow mb-8">
          <span>Designer & Developer</span>
          <Badge variant="outline" className="ml-3 border-[var(--brand)] text-[var(--brand)] text-[0.6rem] tracking-wider uppercase">
            Open to work
          </Badge>
        </div>

        <h1 ref={titleRef} className="display-title mb-12" style={{ maxWidth: '950px', perspective: '600px' }}>
          {words.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.3em]">{word}</span>
          ))}
        </h1>

        <div className="flex gap-20 items-start">
          <p
            ref={subRef}
            className="text-lg leading-relaxed max-w-lg"
            style={{ color: 'var(--olive)', lineHeight: 1.55 }}
          >
            Rui Zen — Crafting thoughtful products and visual systems that bridge the gap between design thinking and production code.
          </p>

          <div className="flex flex-col gap-6 flex-1">
            {[
              { v: '06+', l: 'Years experience' },
              { v: '40+', l: 'Projects shipped' },
            ].map(m => (
              <div key={m.l} className="hero-metric pb-3" style={{ borderBottom: '1px solid var(--border-warm)' }}>
                <div style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '2rem',
                  fontWeight: 500,
                  color: 'var(--brand)',
                  fontVariantNumeric: 'tabular-nums',
                }}>{m.v}</div>
                <div style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.7rem',
                  color: 'var(--stone)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}>{m.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative parallax text */}
      <div
        className="hero-parallax-text"
        style={{
          position: 'absolute',
          bottom: '6%',
          right: '-5%',
          fontSize: 'clamp(8rem, 15vw, 14rem)',
          color: 'var(--neutral-light)',
          zIndex: 0,
          fontFamily: 'var(--font-serif)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          opacity: 0.25,
          fontWeight: 500,
        }}
      >
        CRAFT · PRECISION
      </div>
    </section>
  )
}
