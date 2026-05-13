import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { id: '01', title: 'Database-Led Web Apps', cat: 'Backend Development', year: '2026', desc: 'Web application work shaped around database structure, backend logic, authentication flows, and maintainable Laravel architecture.', outputs: ['Laravel / PHP', 'PostgreSQL', 'Application logic'] },
  { id: '02', title: 'Brand Interface Systems', cat: 'UI Design', year: '2026', desc: 'Interface systems and visual components tailored to a brand identity, balancing usability, layout rhythm, and a clear product story.', outputs: ['Vue interfaces', 'Design systems', 'Responsive UI'] },
  { id: '03', title: 'System Scripts & Tools', cat: 'Systems', year: '2025', desc: 'Utility work for personal systems, including QML experience and Go command scripts for repeatable workflows and small automations.', outputs: ['QML', 'Go scripts', 'Workflow tools'] },
  { id: '04', title: 'Visual Learning Archive', cat: 'Photography / Editing', year: '2025', desc: 'An ongoing creative practice in photography, photo editing, and video editing while studying composition, color, pacing, and fundamentals.', outputs: ['Photography', 'Photo editing', 'Video editing'] },
]

export function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const track = trackRef.current
    const section = sectionRef.current
    if (!track || !section) return

    const isMobile = window.matchMedia('(max-width: 767px)').matches

    // Calculate how far to move the track
    const getScrollAmount = () => {
      const trackWidth = track.scrollWidth
      return -(trackWidth - window.innerWidth)
    }

    if (!isMobile) {
      // Pin the work section and scroll horizontally on larger screens.
      gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          id: 'work-pin',
          trigger: section,
          pin: true,
          start: 'top top',
          end: () => `+=${getScrollAmount() * -1}`,
          scrub: 1,
          invalidateOnRefresh: true
        }
      })
    }

    // Stagger cards entrance as they come into view during horizontal scroll
    gsap.fromTo('.work-card-wrapper',
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
        }
      }
    )

    // Geometric parallax (moves based on vertical scroll before pin)
    gsap.to('.work-geo', {
      y: -100,
      rotation: -10,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    })

    return () => {
       ScrollTrigger.getById('work-pin')?.kill()
    }
  }, { scope: sectionRef })

  return (
    <section
      id="work"
      ref={sectionRef}
      className="paper-section paper-section--light"
      style={{ overflow: 'hidden' }}
    >
      {/* Geometric layer */}
      <div className="geo-layer">
        <svg className="work-geo geo-el" style={{ right: '3%', top: '15%' }} width="160" height="160" viewBox="0 0 100 100" fill="none">
          <circle cx="50" cy="50" r="44" stroke="rgba(27,54,93,0.05)" strokeWidth="0.6" />
        </svg>
        <svg className="work-geo geo-el" style={{ left: '5%', bottom: '10%' }} width="30" height="30" viewBox="0 0 100 100" fill="none">
          <rect x="15" y="15" width="70" height="70" stroke="rgba(27,54,93,0.06)" strokeWidth="2" transform="rotate(45 50 50)" />
        </svg>
        {/* Paper fold line */}
        <svg className="work-geo geo-el" style={{ left: '8%', top: '30%' }} width="150" height="2" viewBox="0 0 150 2" fill="none">
          <line x1="0" y1="1" x2="150" y2="1" stroke="rgba(27,54,93,0.06)" strokeWidth="0.8" />
        </svg>
      </div>

      {/* The horizontal track */}
      <div ref={trackRef} className="work-track flex items-center h-full pt-16" style={{ width: 'max-content', paddingLeft: '5vw', paddingRight: '15vw' }}>
        
        {/* Title panel (pins essentially since it's at the start of the horizontal scroll) */}
        <div className="work-title shrink-0 w-[40vw] min-w-[300px] pr-20 relative z-10" style={{ paddingLeft: 'clamp(2rem, 5vw, 48px)' }}>
          <div className="eyebrow mb-8">Selected Portfolio</div>
          <h2 className="section-title mb-4">Four Ways of Making</h2>
          <Separator className="bg-[var(--border-warm)] mb-6" />
          <p style={{ color: 'var(--stone)', lineHeight: 1.6 }}>
            A portfolio system for digital products, brand and interface design, photographic studies, and written thinking. Each card uses the same restraint, but speaks in a different medium.
          </p>
        </div>

        {/* Project cards spread horizontally */}
        <div className="work-cards flex gap-12 shrink-0 items-center">
          {projects.map((p) => (
            <div key={p.id} className="work-card-wrapper w-[45vw] min-w-[320px] max-w-[600px]">
              <Card
                className="group border border-[var(--border-soft)] bg-[var(--ivory)] transition-all duration-500 hover:-translate-y-2 rounded-sm h-[440px] flex flex-col relative overflow-hidden portfolio-card"
              >
                {/* Decorative background number */}
                <div style={{
                  position: 'absolute', right: '-5%', bottom: '-10%',
                  fontSize: '12rem', fontFamily: 'var(--font-serif)', color: 'rgba(27,54,93,0.03)',
                  pointerEvents: 'none', lineHeight: 1
                }}>
                  {p.id}
                </div>

                <CardContent className="p-10 flex flex-col h-full relative z-10">
                  <div className="flex justify-between items-start mb-12">
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      color: 'var(--brand)',
                      fontVariantNumeric: 'tabular-nums',
                    }}>
                      {p.id}
                    </span>
                    <Badge variant="outline" className="border-[var(--border-warm)] text-[var(--stone)] text-[0.6rem] tracking-wider uppercase shrink-0 bg-[var(--ivory)]">
                      {p.year}
                    </Badge>
                  </div>

                  <div className="flex-1">
                    <h3 style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                      fontWeight: 500,
                      lineHeight: 1.1,
                      marginBottom: '1rem',
                      color: 'var(--near-black)',
                    }}>
                      {p.title}
                    </h3>
                    <p style={{ fontSize: '0.95rem', color: 'var(--olive)', lineHeight: 1.5 }}>
                      {p.desc}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <div className="mb-5 flex flex-wrap gap-2">
                      {p.outputs.map(output => (
                        <span key={output} className="portfolio-tag">
                          {output}
                        </span>
                      ))}
                    </div>
                    <Badge variant="secondary" className="bg-[#EEF2F7] text-[var(--brand)] text-[0.65rem] tracking-wider uppercase">
                      {p.cat}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
