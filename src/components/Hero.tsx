import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import profileImage from '../assets/profile.webp'

gsap.registerPlugin(ScrollTrigger)

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
      }
    })

    if (titleRef.current) {
      const lines = titleRef.current.querySelectorAll('.hero-title-line')
      tl.fromTo(lines,
        { y: 96, opacity: 0, rotationX: 16 },
        { y: 0, opacity: 1, rotationX: 0, duration: 1, stagger: 0.1, ease: 'power4.out' }
      )
    }

    tl.fromTo('.hero-photo-bg',
      { scale: 1.08, opacity: 0, clipPath: 'inset(0 0 0 24%)' },
      { scale: 1, opacity: 1, clipPath: 'inset(0 0 0 0%)', duration: 1.25, ease: 'power3.out' },
      0
    )
    .fromTo('.hero-topline span, .hero-kicker',
      { y: 16, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.56, stagger: 0.06, ease: 'power3.out' },
      '-=0.8'
    )
    .fromTo('.hero-lede, .hero-meta-item',
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.64, stagger: 0.08, ease: 'power3.out' },
      '-=0.45'
    )
    .fromTo('.hero-scroll-rule',
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: 'power3.inOut' },
      '-=0.5'
    )

    gsap.to('.hero-photo-bg img', {
      scale: 1.08,
      yPercent: -6,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.1,
      }
    })

    gsap.to('.hero-title-line', {
      yPercent: -18,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.4,
      }
    })

    gsap.to('.hero-scroll-progress', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      }
    })
  }, { scope: sectionRef })

  const metadata = [
    { n: '01', t: 'Build', d: 'React / TypeScript / GSAP' },
    { n: '02', t: 'Design', d: 'Systems / typography / direction' },
    { n: '03', t: 'Frame', d: 'Photography / sequencing' },
    { n: '04', t: 'Write', d: 'Essays / case studies' },
  ]

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="paper-section paper-section--light hero-minimal"
    >
      <div className="hero-photo-bg" aria-hidden="true">
        <img src={profileImage} alt="" />
        <div className="hero-photo-wash" />
      </div>

      <div className="section-inner hero-minimal-inner">
        <div className="hero-topline" aria-label="Portfolio information">
          <span>Rui Zen</span>
          <span>Portfolio / 2026</span>
        </div>

        <div className="hero-minimal-grid">
          <div className="hero-kicker">Web developer / Designer / Photographer / Writer</div>

          <h1 ref={titleRef} className="hero-minimal-title" style={{ perspective: '700px' }}>
            <span className="hero-title-line">Quiet digital</span>
            <span className="hero-title-line">work with a</span>
            <span className="hero-title-line">photographic eye.</span>
          </h1>

          <p className="hero-lede">
            I design and build portfolio websites that read like edited publications: restrained typography, warm paper texture, deliberate motion, and images that carry atmosphere instead of decoration.
          </p>
        </div>

        <div className="hero-meta-grid" aria-label="Portfolio disciplines">
          {metadata.map(item => (
            <div key={item.n} className="hero-meta-item">
              <span>{item.n}</span>
              <strong>{item.t}</strong>
              <small>{item.d}</small>
            </div>
          ))}
        </div>

        <div className="hero-scroll-track" aria-hidden="true">
          <div className="hero-scroll-rule" />
          <div className="hero-scroll-progress" />
        </div>
      </div>
    </section>
  )
}
