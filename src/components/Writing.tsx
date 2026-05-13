import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Separator } from './ui/separator'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    period: '2025 – Present',
    role: 'Computer Programmer',
    company: 'Data Center College Of The Philippines of Baguio City, Inc.',
    description: 'Building and maintaining internal systems, database structures, and application logic for institutional workflows and operations.',
    tags: ['Laravel', 'PHP', 'PostgreSQL', 'System Design'],
  },
  {
    period: '2024 – 2025',
    role: 'Web Developer & Designer',
    company: 'Freelance',
    description: 'Designed and developed full-stack web applications, brand interfaces, and design systems for small businesses and personal projects.',
    tags: ['Vue', 'UI/UX', 'Photography', 'Video Editing'],
  },
]

export function Writing() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    // Section header reveal
    gsap.fromTo('.work-header',
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        }
      }
    )

    // Timeline line draw
    gsap.fromTo('.timeline-line',
      { scaleY: 0 },
      {
        scaleY: 1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.work-list',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    )

    // Stagger experience cards
    gsap.fromTo('.experience-card',
      { y: 50, opacity: 0, x: -30 },
      {
        y: 0, opacity: 1, x: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.work-list',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      }
    )

    // Tag badges pop in
    gsap.fromTo('.exp-tag',
      { scale: 0.8, opacity: 0 },
      {
        scale: 1, opacity: 1,
        duration: 0.4,
        stagger: 0.05,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: '.work-list',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        }
      }
    )

    // Geometric parallax
    gsap.to('.work-geo', {
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

  return (
    <section
      id="writing"
      ref={sectionRef}
      className="paper-section paper-section--light"
    >
      {/* Geometric layer */}
      <div className="geo-layer">
        <svg className="work-geo geo-el" style={{ left: '8%', top: '10%' }} width="100" height="100" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="45" stroke="rgba(27,54,93,0.04)" strokeWidth="0.5" />
        </svg>
        <svg className="work-geo geo-el" style={{ right: '6%', bottom: '15%' }} width="24" height="24" viewBox="0 0 100 100" fill="none">
          <polygon points="50,5 95,50 50,95 5,50" stroke="rgba(27,54,93,0.06)" strokeWidth="1" fill="none" />
        </svg>
      </div>

      <div className="section-inner">
        <div className="work-header mb-16">
          <div className="eyebrow mb-8">Experience</div>
          <h2 className="section-title mb-4">Work History</h2>
          <Separator className="bg-[var(--border-warm)]" />
          <p className="mt-8 max-w-2xl" style={{ color: 'var(--olive)', lineHeight: 1.55 }}>
            A record of roles and projects that have shaped my approach to building reliable software, clear interfaces, and thoughtful systems.
          </p>
        </div>

        {/* Timeline container */}
        <div className="work-list relative">
          {/* Vertical timeline line */}
          <div
            className="timeline-line hidden md:block"
            style={{
              position: 'absolute',
              left: '24px',
              top: '0',
              bottom: '0',
              width: '2px',
              background: 'var(--border-warm)',
              transformOrigin: 'top center',
            }}
          />

          <div className="flex flex-col gap-12">
            {experiences.map((exp) => (
              <div
                key={exp.company}
                className="experience-card relative flex flex-col md:flex-row md:items-start gap-6 md:gap-12 md:pl-16"
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-0 top-2 hidden md:block"
                  style={{
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background: 'var(--brand)',
                    border: '3px solid var(--bg-parchment)',
                    boxShadow: '0 0 0 2px var(--brand)',
                    transform: 'translateX(-6px)',
                  }}
                />

                {/* Period */}
                <div
                  className="shrink-0"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--stone)',
                    fontVariantNumeric: 'tabular-nums',
                    letterSpacing: '0.08em',
                    minWidth: '120px',
                    paddingTop: '4px',
                  }}
                >
                  {exp.period}
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-4">
                    <h3
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: 'clamp(1.4rem, 2.2vw, 1.8rem)',
                        fontWeight: 500,
                        lineHeight: 1.2,
                        color: 'var(--near-black)',
                      }}
                    >
                      {exp.role}
                    </h3>
                    <span
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.82rem',
                        color: 'var(--brand)',
                        fontWeight: 500,
                      }}
                    >
                      {exp.company}
                    </span>
                  </div>

                  <p
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '0.98rem',
                      color: 'var(--olive)',
                      lineHeight: 1.6,
                      maxWidth: '560px',
                    }}
                  >
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {exp.tags.map(tag => (
                      <span
                        key={tag}
                        className="exp-tag"
                        style={{
                          display: 'inline-flex',
                          padding: '4px 10px',
                          borderRadius: '4px',
                          background: '#EEF2F7',
                          color: 'var(--brand)',
                          fontFamily: 'var(--font-sans)',
                          fontSize: '0.62rem',
                          fontWeight: 600,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

