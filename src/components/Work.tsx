import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { id: '01', title: 'Interactive Portfolio', cat: 'Web Development', year: '2026', desc: 'A fast React portfolio with measured motion, responsive sections, reusable UI primitives, and a paper-like visual system.', outputs: ['React / TypeScript', 'GSAP motion', 'Responsive UI'] },
  { id: '02', title: 'Editorial Identity System', cat: 'Design', year: '2025', desc: 'A restrained identity and interface language built around serif hierarchy, warm neutrals, and precise content modules.', outputs: ['Art direction', 'Design tokens', 'Layout system'] },
  { id: '03', title: 'Quiet City Studies', cat: 'Photography', year: '2025', desc: 'A documentary photo sequence focused on architecture, negative space, street texture, and the rhythm between frames.', outputs: ['Photo editing', 'Sequencing', 'Look development'] },
  { id: '04', title: 'Field Notes Archive', cat: 'Writing', year: '2024', desc: 'Essays and observations on craft, digital products, typography, image-making, and the discipline of noticing.', outputs: ['Essays', 'Case studies', 'Product narratives'] },
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
