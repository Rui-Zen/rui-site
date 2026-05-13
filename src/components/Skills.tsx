import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, SplitText)

type SkillCard = {
  tab: string
  label: string
  rotate: number
  items: string[]
  /** Two-character section code printed on the card spine */
  code: string
}

const cards: SkillCard[] = [
  {
    tab: 'A',
    label: 'Backend',
    code: 'BE',
    rotate: -1.2,
    items: ['Laravel', 'PHP', 'PostgreSQL', 'Application Logic'],
  },
  {
    tab: 'B',
    label: 'Frontend',
    code: 'FE',
    rotate: 0.8,
    items: ['Vue', 'UI Interfaces', 'Responsive Layouts', 'Design Systems'],
  },
  {
    tab: 'C',
    label: 'Systems',
    code: 'SY',
    rotate: -0.6,
    items: ['Database Design', 'System Architecture', 'QML Experience', 'Go CMD Scripts'],
  },
  {
    tab: 'D',
    label: 'Creative',
    code: 'CR',
    rotate: 1.0,
    items: ['Photography', 'Photo Editing', 'Video Editing', 'Visual Fundamentals'],
  },
]

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    // ── Masthead title — SplitText character reveal ──
    const titleEl = sectionRef.current?.querySelector<HTMLElement>('.cap-masthead__title')
    if (titleEl) {
      const split = new SplitText(titleEl, { type: 'chars,words' })
      gsap.set(split.chars, { opacity: 0, y: 30 })
      gsap.to(split.chars, {
        opacity: 1, y: 0,
        stagger: 0.025,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: titleEl,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
      })
    }

    // ── Masthead lede — split words, fade in ──
    const ledeEl = sectionRef.current?.querySelector<HTMLElement>('.cap-masthead__lede')
    if (ledeEl) {
      const splitLede = new SplitText(ledeEl, { type: 'words' })
      gsap.set(splitLede.words, { opacity: 0, y: 12 })
      gsap.to(splitLede.words, {
        opacity: 1, y: 0,
        stagger: 0.025,
        duration: 0.5,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: ledeEl,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
      })
    }

    // ── Masthead rules draw in ──
    sectionRef.current?.querySelectorAll<SVGPathElement>('.cap-masthead__rule-svg path').forEach((p) => {
      gsap.fromTo(p,
        { drawSVG: '0% 0%' },
        {
          drawSVG: '0% 100%',
          duration: 1.0,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: p,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })

    // ── Each index card — STAMPING entrance ─────────
    gsap.utils.toArray<HTMLElement>('.cap-card').forEach((card, idx) => {
      const rot = parseFloat(card.dataset.rotate ?? '0')
      const impact = card.querySelector<HTMLElement>('.cap-card__impact')

      // Initial state — floating high above, oversized & extra-tilted
      gsap.set(card, {
        y: -90,
        opacity: 0,
        rotation: rot - 14,
        scale: 1.55,
        transformOrigin: '50% 50%',
        filter: 'blur(2px)',
      })
      if (impact) gsap.set(impact, { scale: 0.3, opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 82%',
          toggleActions: 'play none none reverse',
        },
        delay: idx * 0.18,
      })

      // 1. Float-in: fade up and de-blur while still oversized
      tl.to(card, {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.32,
        ease: 'power2.out',
      })
      // 2. SLAM — fast drop into final pose
      .to(card, {
        y: 0,
        scale: 1,
        rotation: rot,
        duration: 0.28,
        ease: 'power4.in',
      })
      // 3. INK IMPACT — ring snaps out from the moment of contact
      .addLabel('land')
      .to(impact, {
        scale: 1.08,
        opacity: 0.6,
        duration: 0.08,
        ease: 'power2.out',
      }, 'land')
      .to(impact, {
        scale: 1.4,
        opacity: 0,
        duration: 0.55,
        ease: 'power2.out',
      }, 'land+=0.08')
      // 4. Recoil — quick over-rotate, then elastic settle
      .to(card, {
        rotation: rot + 1.4,
        scale: 1.02,
        duration: 0.1,
        ease: 'power2.out',
      }, 'land')
      .to(card, {
        rotation: rot,
        scale: 1,
        duration: 0.7,
        ease: 'elastic.out(1, 0.35)',
      }, 'land+=0.1')

      // Per-item checkmark draw (DrawSVG) — like ticking items off a list
      card.querySelectorAll<HTMLElement>('.cap-item').forEach((item, i) => {
        const check = item.querySelector<SVGPathElement>('.cap-check path')
        const line = item.querySelector<HTMLElement>('.cap-item__text')

        if (check) {
          gsap.fromTo(check,
            { drawSVG: '0% 0%' },
            {
              drawSVG: '0% 100%',
              duration: 0.5,
              ease: 'power2.inOut',
              delay: 0.4 + i * 0.12,
              scrollTrigger: {
                trigger: card,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        }

        if (line) {
          gsap.fromTo(line,
            { opacity: 0, x: -8 },
            {
              opacity: 1, x: 0,
              duration: 0.45,
              ease: 'power3.out',
              delay: 0.5 + i * 0.12,
              scrollTrigger: {
                trigger: card,
                start: 'top 75%',
                toggleActions: 'play none none reverse',
              },
            }
          )
        }
      })

      // Tab underline draw
      const tabRule = card.querySelector<SVGPathElement>('.cap-tab__rule path')
      if (tabRule) {
        gsap.fromTo(tabRule,
          { drawSVG: '0% 0%' },
          {
            drawSVG: '0% 100%',
            duration: 0.8,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: card,
              start: 'top 78%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // ── Hover delight: card lifts + check marks wobble ──
      const hoverTl = gsap.timeline({ paused: true })
      hoverTl.to(card, { y: -6, rotation: rot * 0.4, duration: 0.4, ease: 'power2.out' })
      card.addEventListener('mouseenter', () => hoverTl.play())
      card.addEventListener('mouseleave', () => hoverTl.reverse())
    })

    // ── Endnote ornament rules ──
    sectionRef.current?.querySelectorAll<SVGPathElement>('.cap-endnote__rule path').forEach((p) => {
      gsap.fromTo(p,
        { drawSVG: '0% 0%' },
        {
          drawSVG: '0% 100%',
          duration: 1.0,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: p,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      )
    })
  }, { scope: sectionRef })

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="paper-section paper-section--light cap-desk"
    >
      <div className="section-inner cap-inner">
        {/* Editorial masthead — matches Work section's voice */}
        <header className="cap-masthead">
          <div className="cap-masthead__row">
            <span className="cap-masthead__date">Section II — Catalog</span>
            <h2 className="cap-masthead__title">Capabilities</h2>
            <span className="cap-masthead__edition">Four Drawers</span>
          </div>
          <svg className="cap-masthead__rule-svg" viewBox="0 0 1000 4" preserveAspectRatio="none" aria-hidden="true">
            <path d="M 0,2 L 1000,2" fill="none" stroke="var(--near-black)" strokeWidth="1" />
          </svg>
          <svg className="cap-masthead__rule-svg cap-masthead__rule-svg--thin" viewBox="0 0 1000 4" preserveAspectRatio="none" aria-hidden="true">
            <path d="M 0,2 L 1000,2" fill="none" stroke="var(--near-black)" strokeWidth="0.5" />
          </svg>
          <p className="cap-masthead__lede">
            A working catalog of disciplines — filed by drawer, indexed by tab. The system that keeps a small studio honest about what it can do, and what is still being learned.
          </p>
        </header>

        {/* The catalog grid */}
        <div className="cap-grid">
          {cards.map((c) => (
            <article
              key={c.label}
              className="cap-card"
              data-rotate={c.rotate}
              style={{ transform: `rotate(${c.rotate}deg)` }}
            >
              {/* Tape at top */}
              <span className="cap-tape" aria-hidden="true" />

              {/* Ink-impact ring — pulses out when the stamp lands */}
              <span className="cap-card__impact" aria-hidden="true" />

              {/* Tab — like a folder tab */}
              <div className="cap-tab">
                <span className="cap-tab__letter">{c.tab}</span>
                <div className="cap-tab__meta">
                  <span className="cap-tab__code">{c.code}</span>
                  <span className="cap-tab__name">{c.label}</span>
                </div>
                <svg className="cap-tab__rule" viewBox="0 0 100 4" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M 0,2 L 100,2" fill="none" stroke="var(--brand)" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>

              {/* Items list */}
              <ul className="cap-list">
                {c.items.map((item, i) => (
                  <li key={item} className="cap-item">
                    <span className="cap-item__num">0{i + 1}</span>
                    <svg className="cap-check" viewBox="0 0 16 16" aria-hidden="true">
                      <path
                        d="M 2,8 L 6.5,12 L 14,3"
                        fill="none"
                        stroke="var(--brand)"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="cap-item__text">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Card footer — paper signature */}
              <div className="cap-card__footer">
                <span className="cap-card__sig">— filed under {c.label.toLowerCase()} —</span>
              </div>

              {/* Page corner */}
              <span className="cap-corner" aria-hidden="true" />
            </article>
          ))}
        </div>

        {/* Endnote */}
        <div className="cap-endnote">
          <svg className="cap-endnote__rule" viewBox="0 0 200 4" preserveAspectRatio="none" aria-hidden="true">
            <path d="M 0,2 L 200,2" fill="none" stroke="var(--brand)" strokeWidth="0.8" strokeLinecap="round" />
          </svg>
          <p>
            The catalog is reviewed monthly. New entries are added when proven on real work.
          </p>
          <svg className="cap-endnote__rule" viewBox="0 0 200 4" preserveAspectRatio="none" aria-hidden="true">
            <path d="M 0,2 L 200,2" fill="none" stroke="var(--brand)" strokeWidth="0.8" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </section>
  )
}
