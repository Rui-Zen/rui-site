import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Separator } from './ui/separator'
import profileImage from '../assets/profile.webp'

gsap.registerPlugin(ScrollTrigger)

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  useGSAP(() => {
    // Paper shapes parallax (vertical)
    const papers = gsap.utils.toArray<SVGElement>('.about-paper')
    papers.forEach((paper, i) => {
      gsap.fromTo(paper,
        { y: 40 + i * 20, rotation: (i % 2 === 0 ? -5 : 5) },
        {
          y: -(30 + i * 15),
          rotation: (i % 2 === 0 ? 8 : -8),
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          }
        }
      )
    })

    // Image reveal — scale + clip
    if (imageRef.current) {
      gsap.fromTo(imageRef.current,
        { scale: 1.2, filter: 'blur(6px)' },
        {
          scale: 1,
          filter: 'blur(0px)',
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-image-mask',
            start: 'top bottom',
            end: 'center center',
            scrub: 1,
          }
        }
      )
    }

    // Image container clip-path reveal
    gsap.fromTo('.about-image-mask',
      { clipPath: 'inset(100% 0 0 0)' },
      {
        clipPath: 'inset(0% 0 0 0)',
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: '.about-image-mask',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    )

    // Text content stagger
    gsap.fromTo('.about-text-item',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.about-text-content',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    )

    // Geometric decorations
    gsap.to('.about-geo', {
      y: -50,
      rotation: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2,
      }
    })
  }, { scope: sectionRef })

  return (
    <section
      id="about"
      ref={sectionRef}
      className="paper-section paper-section--dark"
    >
      {/* Geometric decoration layer */}
      <div className="geo-layer">
        {/* Paper fold triangles */}
        <svg className="about-geo geo-el" style={{ left: '-3%', top: '10%' }} width="200" height="200" viewBox="0 0 200 200" fill="none">
          <polygon points="0,200 200,0 200,50 50,200" fill="rgba(245,244,237,0.02)" />
          <line x1="0" y1="200" x2="200" y2="0" stroke="rgba(245,244,237,0.04)" strokeWidth="0.5" />
        </svg>

        {/* Ring */}
        <svg className="about-geo geo-el" style={{ right: '5%', bottom: '15%' }} width="140" height="140" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="44" stroke="rgba(245,244,237,0.04)" strokeWidth="0.6" />
          <circle cx="50" cy="50" r="28" stroke="rgba(245,244,237,0.02)" strokeWidth="0.4" />
        </svg>

        {/* Cross */}
        <svg className="about-geo geo-el" style={{ right: '20%', top: '20%' }} width="22" height="22" viewBox="0 0 100 100" fill="none">
          <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(245,244,237,0.06)" strokeWidth="3" strokeLinecap="round" />
          <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(245,244,237,0.06)" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      <div className="section-inner">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Image side with paper SVG backdrop */}
          <div className="relative flex items-center justify-center" style={{ height: '550px' }}>
            {/* Animated paper sheets behind the photo */}
            <svg
              viewBox="0 0 400 550"
              className="absolute"
              style={{ width: '130%', height: '130%', top: '-15%', left: '-15%', zIndex: 0, overflow: 'visible' }}
            >
              {/* Back paper */}
              <polygon
                className="about-paper"
                points="50,60 370,20 360,520 40,540"
                fill="var(--stone)"
                opacity="0.15"
              />
              {/* Mid paper */}
              <polygon
                className="about-paper"
                points="30,100 360,70 380,480 60,510"
                fill="var(--neutral-light)"
                opacity="0.08"
              />
              {/* Front paper — lightest */}
              <polygon
                className="about-paper"
                points="60,40 380,90 340,530 80,460"
                fill="var(--bg-parchment)"
                opacity="0.05"
              />
            </svg>

            {/* Profile image */}
            <div
              className="about-image-mask relative z-10 overflow-hidden"
              style={{
                width: '80%',
                height: '85%',
                borderRadius: '4px',
                boxShadow: '0 4pt 24pt rgba(0,0,0,0.18)',
              }}
            >
              <img
                ref={imageRef}
                src={profileImage}
                alt="Rui Zen — Profile"
                className="w-full h-full object-cover"
                style={{ transformOrigin: 'center' }}
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0" style={{
                background: 'linear-gradient(160deg, rgba(20,20,19,0.2), rgba(27,54,93,0.08))',
                pointerEvents: 'none',
              }} />
            </div>
          </div>

          {/* Text side */}
          <div className="about-text-content relative z-10">
            <div className="about-text-item eyebrow mb-8" style={{ color: 'var(--stone)' }}>
              Studio Method
            </div>

            <h2 className="about-text-item section-title mb-10">
              One Practice,<br />Four Mediums
            </h2>

            <Separator className="about-text-item mb-10 bg-[rgba(245,244,237,0.08)]" />

            <p className="about-text-item mb-6" style={{ fontSize: '1.05rem', lineHeight: 1.55, color: 'var(--stone)' }}>
              The work moves between code, layout, image, and language. Each medium has a different output, but the process stays consistent: observe carefully, reduce the noise, then build the clearest version.
            </p>
            <p className="about-text-item mb-12" style={{ fontSize: '1.05rem', lineHeight: 1.55, color: 'var(--stone)' }}>
              I use the discipline of design systems, the precision of front-end engineering, the patience of photography, and the cadence of writing to make portfolio work that feels considered rather than decorated.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="about-text-item method-card-dark">
                <h4 className="mb-2" style={{ color: 'var(--bg-parchment)', fontSize: '1.1rem' }}>Build</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--stone)', lineHeight: 1.5 }}>
                  Production interfaces with motion, accessibility, and maintainable structure.
                </p>
              </div>
              <div className="about-text-item method-card-dark">
                <h4 className="mb-2" style={{ color: 'var(--bg-parchment)', fontSize: '1.1rem' }}>Compose</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--stone)', lineHeight: 1.5 }}>
                  Typography, grids, and art direction that create quiet authority.
                </p>
              </div>
              <div className="about-text-item method-card-dark">
                <h4 className="mb-2" style={{ color: 'var(--bg-parchment)', fontSize: '1.1rem' }}>Frame</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--stone)', lineHeight: 1.5 }}>
                  Photography that captures atmosphere, sequence, and visual memory.
                </p>
              </div>
              <div className="about-text-item method-card-dark">
                <h4 className="mb-2" style={{ color: 'var(--bg-parchment)', fontSize: '1.1rem' }}>Write</h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--stone)', lineHeight: 1.5 }}>
                  Essays and product narratives that clarify what the work means.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Large background text */}
      <div
        className="about-parallax-text"
        style={{
          position: 'absolute',
          top: '50%',
          left: '-8%',
          transform: 'translateY(-50%)',
          fontSize: 'clamp(8rem, 18vw, 16rem)',
          color: 'rgba(245,244,237,0.015)',
          zIndex: 0,
          fontFamily: 'var(--font-serif)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          fontWeight: 500,
        }}
      >
        METHOD
      </div>
    </section>
  )
}
