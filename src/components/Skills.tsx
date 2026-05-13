import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'

gsap.registerPlugin(ScrollTrigger)

const skillGroups = [
  { title: 'Backend', items: ['Laravel', 'PHP', 'PostgreSQL', 'Application Logic'] },
  { title: 'Frontend', items: ['Vue', 'UI Interfaces', 'Responsive Layouts', 'Design Systems'] },
  { title: 'Systems', items: ['Database Design', 'System Architecture', 'QML Experience', 'Go CMD Scripts'] },
  { title: 'Creative', items: ['Photography', 'Photo Editing', 'Video Editing', 'Visual Fundamentals'] },
]

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    // Section header
    gsap.fromTo('.skills-header',
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

    // Skill groups — diagonal slide-in
    gsap.fromTo('.skill-group',
      { y: 60, opacity: 0, x: -20 },
      {
        y: 0, opacity: 1, x: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      }
    )

    // Individual skill items — stagger within each group with scale bounce
    gsap.fromTo('.skill-item',
      { y: 20, opacity: 0, scale: 0.95 },
      {
        y: 0, opacity: 1, scale: 1,
        duration: 0.6,
        stagger: 0.08,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 65%',
          toggleActions: 'play none none reverse',
        }
      }
    )

    // Horizontal connecting line draw
    gsap.fromTo('.skills-divider',
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: '.skills-grid',
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        }
      }
    )

    // Background text fade in
    gsap.fromTo('.skills-bg-text',
      { opacity: 0, x: 50 },
      {
        opacity: 1, x: 0,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        }
      }
    )

    // Geometric parallax with rotation
    gsap.to('.skills-geo', {
      y: -120,
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
      id="skills"
      ref={sectionRef}
      className="paper-section paper-section--mid"
    >
      {/* Geometric layer */}
      <div className="geo-layer">
        <svg className="skills-geo geo-el" style={{ right: '6%', top: '20%' }} width="100" height="100" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="44" stroke="rgba(245,244,237,0.04)" strokeWidth="0.6" />
          <circle cx="50" cy="50" r="28" stroke="rgba(245,244,237,0.02)" strokeWidth="0.4" />
        </svg>
        <svg className="skills-geo geo-el" style={{ left: '8%', bottom: '12%' }} width="20" height="20" viewBox="0 0 100 100" fill="none">
          <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(245,244,237,0.06)" strokeWidth="3" strokeLinecap="round" />
          <line x1="5" y1="50" x2="95" y2="50" stroke="rgba(245,244,237,0.06)" strokeWidth="3" strokeLinecap="round" />
        </svg>
        {/* Paper fold */}
        <svg className="skills-geo geo-el" style={{ left: '3%', top: '10%' }} width="140" height="140" viewBox="0 0 140 140" fill="none">
          <polygon points="0,140 140,0 140,30 30,140" fill="rgba(245,244,237,0.015)" />
        </svg>
      </div>

      <div className="section-inner">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_2.2fr] gap-20">
          {/* Header */}
          <div className="skills-header">
            <div className="eyebrow mb-8" style={{ color: 'var(--stone)' }}>Capabilities</div>
            <h2 className="section-title mb-6">Capabilities</h2>
            <Separator className="skills-divider mb-8 bg-[rgba(245,244,237,0.06)] origin-left" />
            <p style={{ color: 'var(--stone)', lineHeight: 1.55, fontSize: '0.95rem' }}>
              A practical web development stack centered on backend logic, database structure, interface systems, and a growing creative practice in photography and editing.
            </p>
          </div>

          {/* Skills grid */}
          <div className="skills-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-10">
            {skillGroups.map(group => (
              <div key={group.title} className="skill-group">
                <Badge variant="outline" className="mb-6 border-[var(--brand-light)] text-[var(--brand-light)] text-[0.6rem] tracking-[0.15em] uppercase">
                  {group.title}
                </Badge>
                <ul className="flex flex-col gap-4">
                  {group.items.map(item => (
                    <li
                      key={item}
                      className="skill-item"
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontSize: '1.2rem',
                        fontWeight: 500,
                        color: 'var(--bg-parchment)',
                        listStyle: 'none',
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Background text */}
      <div
        className="skills-bg-text"
        style={{
          position: 'absolute',
          bottom: '5%',
          right: '-3%',
          fontSize: 'clamp(8rem, 20vw, 18rem)',
          color: 'rgba(245,244,237,0.01)',
          zIndex: 0,
          fontFamily: 'var(--font-serif)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          fontWeight: 500,
        }}
      >
        SKILLSET
      </div>
    </section>
  )
}
