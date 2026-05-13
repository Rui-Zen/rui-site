import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { useGSAP } from '@gsap/react'
import profileImage from '../assets/profile.webp'

gsap.registerPlugin(ScrollTrigger)

type HeroProps = {
  isLoaded?: boolean
}

export function Hero({ isLoaded = true }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)

  // Pre-paint: hide entrance elements before isLoaded flips so there's no flash
  useGSAP(() => {
    gsap.set([
      '.hero-photo-bg',
      '.hero-topline span',
      '.hero-title-line',
      '.hero-eyebrow',
      '.hero-subtitle-block',
      '.hero-cta',
      '.hero-scroll-rule',
    ], { autoAlpha: 0 })
  }, { scope: sectionRef })

  // Entrance — runs once when the loading screen finishes
  useGSAP(() => {
    if (!isLoaded) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      gsap.set([
        '.hero-photo-bg',
        '.hero-topline span',
        '.hero-title-line',
        '.hero-eyebrow',
        '.hero-subtitle-block',
        '.hero-cta',
        '.hero-scroll-rule',
      ], { autoAlpha: 1, y: 0, x: 0, rotationX: 0, scale: 1, clearProps: 'transform' })
      return
    }

    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
    })

    // 1. Photo backdrop slides in with mask reveal
    tl.fromTo('.hero-photo-bg',
      { autoAlpha: 0, scale: 1.08, clipPath: 'inset(0 0 0 100%)' },
      { autoAlpha: 1, scale: 1, clipPath: 'inset(0 0 0 0%)', duration: 1.4, ease: 'expo.out' }
    )
    // 2. Topline meta fades in with letter slide
    .fromTo('.hero-topline span',
      { autoAlpha: 0, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08 },
      '-=1.1'
    )
    // 3. Eyebrow chip
    .fromTo('.hero-eyebrow',
      { autoAlpha: 0, y: 16 },
      { autoAlpha: 1, y: 0, duration: 0.6 },
      '-=0.85'
    )
    // 4. Title — staggered cascading lines with 3D tilt
    .fromTo('.hero-title-line',
      { autoAlpha: 0, y: 110, rotationX: -25, transformOrigin: '50% 100%' },
      { autoAlpha: 1, y: 0, rotationX: 0, duration: 1.1, stagger: 0.14, ease: 'power4.out' },
      '-=0.55'
    )
    // 5. Subtitle reveal
    .fromTo('.hero-subtitle-block',
      { autoAlpha: 0, y: 24, x: -10 },
      { autoAlpha: 1, y: 0, x: 0, duration: 0.8 },
      '-=0.7'
    )
    // 6. Buttons pop in
    .fromTo('.hero-cta > *',
      { autoAlpha: 0, y: 16, scale: 0.95 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.08, ease: 'back.out(1.6)' },
      '-=0.45'
    )
    // 7. Scroll rule extends across
    .fromTo('.hero-scroll-rule',
      { autoAlpha: 1, scaleX: 0, transformOrigin: 'left center' },
      { scaleX: 1, duration: 1, ease: 'power3.inOut' },
      '-=0.5'
    )

    // Make ScrollTrigger aware of any layout settles after entrance
    tl.add(() => ScrollTrigger.refresh())
  }, { scope: sectionRef, dependencies: [isLoaded] })

  // Seamless scrubbed exit -> hands off to the next section
  useGSAP(() => {
    if (!isLoaded || !innerRef.current) return

    // Inner content gently scales down, lifts, blurs and fades while the user scrolls.
    gsap.to(innerRef.current, {
      yPercent: -12,
      scale: 0.94,
      filter: 'blur(6px)',
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom 30%',
        scrub: 1,
      },
    })

    // Background photo parallaxes upward to feel like the page is lifting off
    gsap.to('.hero-photo-bg img', {
      yPercent: -14,
      scale: 1.08,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
      },
    })

    // Title lines drift at slightly different speeds for cinematic depth
    gsap.to('.hero-title-line', {
      yPercent: -22,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5,
      },
    })

    // Scroll progress fills as user moves through the hero
    gsap.to('.hero-scroll-progress', {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    })
  }, { scope: sectionRef, dependencies: [isLoaded] })

  const handleScroll = (id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    const s = ScrollSmoother.get()
    if (s) s.scrollTo(el, true, 'top 80px')
    else el.scrollIntoView({ behavior: 'smooth' })
  }

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

      <div ref={innerRef} className="section-inner hero-minimal-inner" style={{ willChange: 'transform, opacity, filter' }}>
        <div className="hero-topline" aria-label="Portfolio information">
          <span>Software Engineer</span>
          <span>Portfolio / 2026</span>
        </div>

        <div className="hero-content-grid">
          <div className="hero-main-copy">
            <div className="eyebrow hero-eyebrow">Rui-zen — Software Engineer</div>

            <h1 ref={titleRef} className="hero-title" style={{ perspective: '700px' }}>
              <span className="hero-title-line">I build software</span>
              <span className="hero-title-line">where the logic</span>
              <span className="hero-title-line">feels designed.</span>
            </h1>

            <div className="hero-subtitle-block">
              <p className="hero-subtitle">
                A backend-first developer who treats interfaces as part of the architecture — engineering systems that are as considered on the inside as they look on the outside.
              </p>
            </div>

            <div className="hero-cta">
              <button
                onClick={() => handleScroll('work')}
                className="btn-primary hero-cta-btn"
              >
                View Work
              </button>
              <button
                onClick={() => handleScroll('contact')}
                className="btn-secondary hero-cta-btn"
              >
                Get in Touch
              </button>
            </div>
          </div>
        </div>

        <div className="hero-scroll-track" aria-hidden="true">
          <div className="hero-scroll-rule" />
          <div className="hero-scroll-progress" />
        </div>
      </div>
    </section>
  )
}
