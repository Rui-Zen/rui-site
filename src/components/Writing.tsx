import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Badge } from './ui/badge'
import { Separator } from './ui/separator'

gsap.registerPlugin(ScrollTrigger)

const posts = [
  { date: '2026', title: 'How I Build Motion Without Making the Interface Loud', tag: 'Development' },
  { date: '2025', title: 'Designing With Warm Neutrals, Serif Rhythm, and Fewer Decisions', tag: 'Design' },
  { date: '2025', title: 'A Contact Sheet Is a Thinking Tool', tag: 'Photography' },
  { date: '2024', title: 'Writing Case Studies That Explain the Judgment Behind the Work', tag: 'Writing' },
]

export function Writing() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    // Header
    gsap.fromTo('.writing-header',
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

    // Stagger post rows
    gsap.fromTo('.writing-row',
      { y: 30, opacity: 0, x: 20 },
      {
        y: 0, opacity: 1, x: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.writing-list',
          start: 'top 75%',
          toggleActions: 'play none none reverse',
        }
      }
    )

    // Geometric parallax
    gsap.to('.writing-geo', {
      y: -80,
      rotation: -8,
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
        <svg className="writing-geo geo-el" style={{ left: '5%', top: '15%' }} width="120" height="120" viewBox="0 0 100 100" fill="none">
          <polygon points="50,5 95,95 5,95" stroke="rgba(27,54,93,0.05)" strokeWidth="0.6" fill="none" />
        </svg>
        <svg className="writing-geo geo-el" style={{ right: '8%', bottom: '20%' }} width="16" height="16" viewBox="0 0 100 100" fill="none">
          <rect x="15" y="15" width="70" height="70" stroke="rgba(27,54,93,0.07)" strokeWidth="3" transform="rotate(45 50 50)" />
        </svg>
      </div>

      <div className="section-inner">
        <div className="writing-header mb-16">
          <div className="eyebrow mb-8">Notes & Essays</div>
          <h2 className="section-title mb-4">The Written Layer</h2>
          <Separator className="bg-[var(--border-warm)]" />
          <p className="mt-8 max-w-2xl" style={{ color: 'var(--olive)', lineHeight: 1.55 }}>
            Writing gives the portfolio its reasoning layer: short essays, case-study notes, image reflections, and technical explanations.
          </p>
        </div>

        <div className="writing-list">
          {posts.map((post, i) => (
            <div key={post.title}>
              <a
                href="#"
                className="writing-row group flex items-center justify-between gap-8 py-8 no-underline transition-all duration-300 hover:pl-5"
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                <div className="flex items-center gap-10">
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--stone)',
                    fontVariantNumeric: 'tabular-nums',
                    minWidth: '40px',
                  }}>
                    {post.date}
                  </span>
                  <h3
                    className="transition-colors duration-300 group-hover:text-[var(--brand)]"
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 'clamp(1.3rem, 2.5vw, 2rem)',
                      fontWeight: 500,
                      lineHeight: 1.2,
                    }}
                  >
                    {post.title}
                  </h3>
                </div>
                <Badge variant="outline" className="border-[var(--border-warm)] text-[var(--stone)] text-[0.6rem] tracking-wider uppercase shrink-0">
                  {post.tag}
                </Badge>
              </a>
              {i < posts.length - 1 && (
                <Separator className="bg-[var(--border-warm)]" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
