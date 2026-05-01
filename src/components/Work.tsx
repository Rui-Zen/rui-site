import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  { id: '01', title: 'Atlas Finance', cat: 'Product Design', year: '2025', desc: 'End-to-end product design for a next-gen fintech platform serving enterprise clients.' },
  { id: '02', title: 'Noto Editor', cat: 'Full-Stack', year: '2024', desc: 'A typography-first writing tool built for CJK creators and multilingual publishing.' },
  { id: '03', title: 'Kami System', cat: 'Design Systems', year: '2024', desc: 'A comprehensive design system bridging print and screen across three languages.' },
]

export function Work() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    // Stagger project cards in
    gsap.fromTo('.work-card',
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.work-grid',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      }
    )

    // Section title
    gsap.fromTo('.work-title',
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none reverse',
        }
      }
    )

    // Geometric parallax
    gsap.to('.work-geo', {
      y: -70,
      rotation: -10,
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
      id="work"
      ref={sectionRef}
      className="paper-section paper-section--light"
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

      <div className="section-inner">
        <div className="work-title">
          <div className="eyebrow mb-8">Selected Projects</div>
          <h2 className="section-title mb-4">A Record of Craft</h2>
          <Separator className="mb-16 bg-[var(--border-warm)]" />
        </div>

        <div className="work-grid flex flex-col gap-0">
          {projects.map((p, i) => (
            <div key={p.id}>
              <Card
                className="work-card group/work border-none bg-transparent ring-0 shadow-none rounded-none py-10 transition-all duration-300 hover:bg-[var(--ivory)]"
              >
                <CardContent className="px-0">
                  <div className="grid grid-cols-[auto_1fr_auto] gap-8 items-center">
                    {/* Project number */}
                    <span style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      color: 'var(--brand)',
                      fontVariantNumeric: 'tabular-nums',
                    }}>
                      {p.id}
                    </span>

                    {/* Project info */}
                    <div>
                      <div className="flex items-center gap-4 mb-2">
                        <h3 style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
                          fontWeight: 500,
                          lineHeight: 1.1,
                          transition: 'color 0.3s',
                        }}
                          className="group-hover/work:text-[var(--brand)]"
                        >
                          {p.title}
                        </h3>
                        <Badge variant="outline" className="border-[var(--border-warm)] text-[var(--stone)] text-[0.6rem] tracking-wider uppercase shrink-0">
                          {p.year}
                        </Badge>
                      </div>
                      <p style={{ fontSize: '0.9rem', color: 'var(--olive)', lineHeight: 1.5, maxWidth: '500px' }}>
                        {p.desc}
                      </p>
                    </div>

                    {/* Category tag */}
                    <Badge variant="secondary" className="bg-[#EEF2F7] text-[var(--brand)] text-[0.65rem] tracking-wider uppercase shrink-0">
                      {p.cat}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              {i < projects.length - 1 && (
                <Separator className="bg-[var(--border-warm)]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
