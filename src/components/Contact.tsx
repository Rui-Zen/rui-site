import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Button } from './ui/button'
import { Separator } from './ui/separator'

gsap.registerPlugin(ScrollTrigger)

const socials = [
  { name: 'GitHub', url: 'https://github.com/Rui-Zen' },
  { name: 'Instagram', url: 'https://instagram.com/ruizen' },
]
export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 65%',
        toggleActions: 'play none none reverse',
      }
    })

    tl.fromTo('.contact-eyebrow',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
    )
    .fromTo('.contact-title .word',
      { y: 60, opacity: 0, rotationX: 25 },
      { y: 0, opacity: 1, rotationX: 0, duration: 0.9, stagger: 0.08, ease: 'power4.out' },
      '-=0.3'
    )
    .fromTo('.contact-email',
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
      '-=0.4'
    )
    .fromTo('.contact-social',
      { y: 15, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' },
      '-=0.3'
    )

    // Geometric parallax
    gsap.to('.contact-geo', {
      y: -60,
      rotation: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      }
    })
  }, { scope: sectionRef })

  const titleWords = ['Build', 'The', 'System', 'Well.']

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="paper-section paper-section--dark"
    >
      {/* Geometric layer */}
      <div className="geo-layer">
        <svg className="contact-geo geo-el" style={{ right: '10%', top: '15%' }} width="180" height="180" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="44" stroke="rgba(245,244,237,0.03)" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="30" stroke="rgba(245,244,237,0.02)" strokeWidth="0.4" />
          <circle cx="50" cy="50" r="16" stroke="rgba(245,244,237,0.015)" strokeWidth="0.3" />
        </svg>
        <svg className="contact-geo geo-el" style={{ left: '5%', bottom: '20%' }} width="24" height="24" viewBox="0 0 100 100" fill="none">
          <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(245,244,237,0.05)" strokeWidth="3" strokeLinecap="round" />
          <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(245,244,237,0.05)" strokeWidth="3" strokeLinecap="round" />
        </svg>
        {/* Paper fold */}
        <svg className="contact-geo geo-el" style={{ right: '3%', bottom: '5%' }} width="200" height="200" viewBox="0 0 200 200" fill="none">
          <polygon points="200,0 200,200 0,200" fill="rgba(245,244,237,0.01)" />
          <line x1="200" y1="0" x2="0" y2="200" stroke="rgba(245,244,237,0.03)" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="section-inner" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div className="contact-eyebrow eyebrow mb-10 justify-center" style={{ color: 'var(--stone)' }}>
          Collaboration / Rui-zen
        </div>

        <h2
          className="contact-title display-title mb-16"
          style={{ color: 'var(--bg-parchment)', perspective: '600px' }}
        >
          {titleWords.map((word, i) => (
            <span key={i} className="word inline-block mr-[0.3em]">
              {word}
              {i === 1 && <br />}
            </span>
          ))}
        </h2>

        <div className="contact-email mb-12">
          <p className="mx-auto mb-8 max-w-xl" style={{ color: 'var(--stone)', fontSize: '1rem', lineHeight: 1.55 }}>
            Reach out for web applications, backend systems, database logic, Laravel and Vue work, interface systems, or brand-focused UI design. You can call me Ruiz, Louis, or Rui-zen.
          </p>
          <Button
            asChild
            variant="ghost"
            className="h-auto p-0 text-[var(--brand-light)] hover:text-[var(--bg-parchment)] hover:bg-transparent"
          >
            <a
              href="mailto:hello@ruizen.design"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.3rem, 2.5vw, 2rem)',
                fontWeight: 500,
                textDecoration: 'none',
              }}
            >
              ruizen@koamishin.com
            </a>
          </Button>
        </div>

        <Separator className="mb-12 max-w-xs mx-auto bg-[rgba(245,244,237,0.06)]" />

        <div className="flex gap-8">
          {socials.map(social => (
            <a
              key={social.name}
              href={social.url}
              className="contact-social link-underline"
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.72rem',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--stone)',
              }}
            >
              {social.name}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
