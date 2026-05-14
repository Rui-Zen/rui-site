import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MorphSVGPlugin, SplitText)

type Entry = {
  /** Two-letter post code printed on the stamp */
  code: string
  /** Index — 01, 02… */
  num: string
  period: string
  /** Year shown large on the date stamp */
  year: string
  role: string
  company: string
  status: 'Current' | 'Past'
  description: string
  tags: string[]
  rotate: number
}

const experiences: Entry[] = [
  {
    code: 'DC',
    num: '01',
    period: '2025 — Present',
    year: '2025',
    role: 'Computer Programmer',
    company: 'Data Center College of the Philippines — Baguio City',
    status: 'Current',
    description:
      'Building and maintaining internal systems, database structures, and application logic for institutional workflows and operations.',
    tags: ['Laravel', 'PHP', 'PostgreSQL', 'System Design'],
    rotate: -0.6,
  },
  {
    code: 'FR',
    num: '02',
    period: '2024 — 2025',
    year: '2024',
    role: 'Web Developer & Designer',
    company: 'Freelance — Independent Practice',
    status: 'Past',
    description:
      'Designed and developed full-stack web applications, brand interfaces, and design systems for small businesses and personal projects.',
    tags: ['Vue', 'UI / UX', 'Photography', 'Video Editing'],
    rotate: 0.5,
  },
]

export function Writing() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const root = sectionRef.current
    if (!root) return

    // ── Masthead title — SplitText character reveal ──────
    const titleEl = root.querySelector<HTMLElement>('.wh-masthead__title')
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
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      })
    }

    // ── Masthead lede — split words, fade in ────────────
    const ledeEl = root.querySelector<HTMLElement>('.wh-masthead__lede')
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
          start: 'top 84%',
          toggleActions: 'play none none reverse',
        },
      })
    }

    // ── Masthead rules draw in ──────────────────────────
    root.querySelectorAll<SVGPathElement>('.wh-masthead__rule-svg path').forEach((p) => {
      gsap.fromTo(p,
        { drawSVG: '0% 0%' },
        {
          drawSVG: '0% 100%',
          duration: 1.0,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: p, start: 'top 86%', toggleActions: 'play none none reverse' },
        },
      )
    })

    // ── Vertical ledger spine — DrawSVG as you scroll ───
    const spinePath = root.querySelector<SVGPathElement>('.wh-spine path')
    if (spinePath) {
      gsap.fromTo(spinePath,
        { drawSVG: '0% 0%' },
        {
          drawSVG: '0% 100%',
          ease: 'none',
          scrollTrigger: {
            trigger: '.wh-ledger',
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: 0.6,
          },
        },
      )
    }

    // ── Per-entry stamping entrance + SVG morphs ─────────
    gsap.utils.toArray<HTMLElement>('.wh-entry').forEach((entry, idx) => {
      const rot = parseFloat(entry.dataset.rotate ?? '0')
      const sheet = entry.querySelector<HTMLElement>('.wh-entry__sheet')
      const stamp = entry.querySelector<HTMLElement>('.wh-stamp')
      const impact = entry.querySelector<HTMLElement>('.wh-entry__impact')

      if (sheet) {
        gsap.set(sheet, { y: -60, opacity: 0, rotation: rot - 6, scale: 1.08, transformOrigin: '50% 50%', filter: 'blur(2px)' })
      }
      if (stamp) gsap.set(stamp, { opacity: 0, scale: 1.6, rotation: -18 })
      if (impact) gsap.set(impact, { scale: 0.4, opacity: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: entry,
          start: 'top 78%',
          toggleActions: 'play none none reverse',
        },
        delay: idx * 0.12,
      })

      // 1. Sheet floats in & slams
      if (sheet) {
        tl.to(sheet, { opacity: 1, filter: 'blur(0px)', duration: 0.3, ease: 'power2.out' }, 0)
          .to(sheet, { y: 0, scale: 1, rotation: rot, duration: 0.32, ease: 'power4.in' })
          .addLabel('land')
        if (impact) {
          tl.to(impact, { scale: 1.06, opacity: 0.55, duration: 0.08, ease: 'power2.out' }, 'land')
            .to(impact, { scale: 1.35, opacity: 0, duration: 0.55, ease: 'power2.out' }, 'land+=0.08')
        }
        tl.to(sheet, { rotation: rot + 1.0, scale: 1.015, duration: 0.1, ease: 'power2.out' }, 'land')
          .to(sheet, { rotation: rot, scale: 1, duration: 0.65, ease: 'elastic.out(1, 0.4)' }, 'land+=0.1')
      }

      // 2. Stamp slams onto the date
      if (stamp) {
        tl.to(stamp, { opacity: 0.95, scale: 1, rotation: -10, duration: 0.18, ease: 'power3.in' }, 'land+=0.02')
          .to(stamp, { rotation: -10, duration: 0.4, ease: 'elastic.out(1, 0.5)' }, '>-0.05')
      }

      // 3. Spine marker morphs: circle → seal shape
      const spinePath = entry.querySelector<SVGPathElement>('.wh-spine-marker__path')
      const spineTarget = entry.querySelector<SVGPathElement>('.wh-spine-marker__target')
      if (spinePath && spineTarget) {
        gsap.set(spinePath, { scale: 0, opacity: 0, transformOrigin: '50% 50%' })
        tl.to(spinePath, { scale: 1, opacity: 1, duration: 0.32, ease: 'back.out(2.4)' }, 'land+=0.05')
          .to(spinePath, { morphSVG: spineTarget, duration: 0.55, ease: 'power2.inOut' }, 'land+=0.18')
      }

      // 4. Stamp border morphs: rectangle → scalloped postal edge
      const stampBorder = entry.querySelector<SVGPathElement>('.wh-stamp__border')
      const stampBorderTarget = entry.querySelector<SVGPathElement>('.wh-stamp__border-target')
      if (stampBorder && stampBorderTarget) {
        tl.to(stampBorder, { morphSVG: stampBorderTarget, duration: 0.6, ease: 'power2.inOut' }, 'land+=0.12')
      }

      // 5. Status seal morphs: circle → checkmark (current) or dash (past)
      const statusPath = entry.querySelector<SVGPathElement>('.wh-status-seal__path')
      const statusTarget = entry.querySelector<SVGPathElement>('.wh-status-seal__target')
      if (statusPath && statusTarget) {
        gsap.set(statusPath, { drawSVG: '0% 100%', opacity: 0, scale: 0.4, transformOrigin: '50% 50%' })
        tl.to(statusPath, { opacity: 1, scale: 1, duration: 0.22, ease: 'power2.out' }, 'land+=0.1')
          .to(statusPath, { morphSVG: statusTarget, duration: 0.45, ease: 'power2.inOut' }, 'land+=0.28')
      }

      // 6. Underline DrawSVG → wavy morph
      const underlinePath = entry.querySelector<SVGPathElement>('.wh-underline__path')
      const underlineTarget = entry.querySelector<SVGPathElement>('.wh-underline__target')
      if (underlinePath && underlineTarget) {
        gsap.fromTo(underlinePath,
          { drawSVG: '0% 0%' },
          {
            drawSVG: '0% 100%',
            duration: 0.8,
            ease: 'power2.inOut',
            scrollTrigger: { trigger: entry, start: 'top 72%', toggleActions: 'play none none reverse' },
          },
        )
        gsap.to(underlinePath, {
          morphSVG: underlineTarget,
          duration: 0.6,
          ease: 'power2.inOut',
          delay: 0.35,
          scrollTrigger: { trigger: entry, start: 'top 72%', toggleActions: 'play none none reverse' },
        })
      }

      // 7. Tags pop in like ink stamps
      const tags = entry.querySelectorAll<HTMLElement>('.wh-tag')
      if (tags.length) {
        gsap.fromTo(tags,
          { opacity: 0, scale: 0.6, rotation: -6 },
          {
            opacity: 1, scale: 1, rotation: 0,
            duration: 0.45,
            stagger: 0.06,
            ease: 'back.out(2)',
            scrollTrigger: { trigger: entry, start: 'top 70%', toggleActions: 'play none none reverse' },
          },
        )
      }

      // 8. Hover lift
      if (sheet) {
        const hover = gsap.timeline({ paused: true })
        hover.to(sheet, { y: -5, rotation: rot * 0.3, duration: 0.4, ease: 'power2.out' })
        entry.addEventListener('mouseenter', () => hover.play())
        entry.addEventListener('mouseleave', () => hover.reverse())
      }
    })

    // ── Endnote rules ───────────────────────────────────
    root.querySelectorAll<SVGPathElement>('.wh-endnote__rule path').forEach((p) => {
      gsap.fromTo(p,
        { drawSVG: '0% 0%' },
        {
          drawSVG: '0% 100%',
          duration: 1.0,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: p, start: 'top 86%', toggleActions: 'play none none reverse' },
        },
      )
    })
  }, { scope: sectionRef })

  return (
    <section
      id="writing"
      ref={sectionRef}
      className="paper-section paper-section--light wh-desk"
    >
      <div className="section-inner wh-inner">
        {/* Editorial masthead — mirrors Skills (Section II — Catalog) */}
        <header className="wh-masthead">
          <div className="wh-masthead__row">
            <span className="wh-masthead__date">Section III — Ledger</span>
            <h2 className="wh-masthead__title">Work History</h2>
            <span className="wh-masthead__edition">Two Posts</span>
          </div>
          <svg className="wh-masthead__rule-svg" viewBox="0 0 1000 4" preserveAspectRatio="none" aria-hidden="true">
            <path d="M 0,2 L 1000,2" fill="none" stroke="var(--near-black)" strokeWidth="1" />
          </svg>
          <svg className="wh-masthead__rule-svg wh-masthead__rule-svg--thin" viewBox="0 0 1000 4" preserveAspectRatio="none" aria-hidden="true">
            <path d="M 0,2 L 1000,2" fill="none" stroke="var(--near-black)" strokeWidth="0.5" />
          </svg>
          <p className="wh-masthead__lede">
            A bound record of posts held — filed in reverse chronology, marked with the date stamp of each appointment. The roles that have shaped a quiet practice in software, design, and the slow study of craft.
          </p>
        </header>

        {/* The ledger column */}
        <div className="wh-ledger">
          {/* Vertical hand-drawn spine */}
          <svg
            className="wh-spine"
            viewBox="0 0 4 1000"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M 2,0 L 2,1000"
              fill="none"
              stroke="var(--brand)"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeDasharray="6 4"
              opacity="0.55"
            />
          </svg>

          {experiences.map((exp) => (
            <article
              key={exp.company}
              className="wh-entry"
              data-rotate={exp.rotate}
            >
                          {/* Spine marker — morphs from circle to a seal shape */}
              <svg
                className="wh-spine-marker"
                viewBox="0 0 100 100"
                aria-hidden="true"
              >
                <path
                  className="wh-spine-marker__path"
                  d="M 50,30 C 61.046,30 70,38.954 70,50 C 70,61.046 61.046,70 50,70 C 38.954,70 30,61.046 30,50 C 30,38.954 38.954,30 50,30 Z"
                  fill="var(--brand)"
                />
                <path
                  className="wh-spine-marker__target"
                  d={exp.status === 'Current'
                    ? 'M 50,18 L 68,50 L 50,82 L 32,50 Z'
                    : 'M 38,38 L 62,38 L 62,62 L 38,62 Z'
                  }
                  fill="var(--brand)"
                  style={{ visibility: 'hidden' }}
                />
              </svg>

              {/* Date stamp column */}
              <div className="wh-entry__date">
                <div className="wh-stamp" aria-hidden="true">
                  <svg viewBox="0 0 120 120" className="wh-stamp__svg" aria-hidden="true">
                    {/* Start border — plain rectangle */}
                    <path
                      className="wh-stamp__border"
                      d="M 6,6 L 114,6 L 114,114 L 6,114 Z"
                      fill="none"
                      stroke="var(--brand)"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    {/* Morph target — scalloped postal edge */}
                    <path
                      className="wh-stamp__border-target"
                      d="M 6,12 C 6,6 12,6 12,6 L 30,4 L 48,6 L 66,4 L 84,6 L 102,4 L 108,6 C 114,6 114,12 114,12 L 116,30 L 114,48 L 116,66 L 114,84 L 116,102 L 114,108 C 114,114 108,114 108,114 L 90,116 L 72,114 L 54,116 L 36,114 L 18,116 L 12,114 C 6,114 6,108 6,108 L 4,90 L 6,72 L 4,54 L 6,36 L 4,18 L 6,12 Z"
                      fill="none"
                      stroke="var(--brand)"
                      strokeWidth="2"
                      strokeLinejoin="round"
                      style={{ visibility: 'hidden' }}
                    />
                    {/* Inner frame (static) */}
                    <rect x="11" y="11" width="98" height="98" rx="2" ry="2"
                      fill="none" stroke="var(--brand)" strokeWidth="0.6" opacity="0.7" />
                  </svg>
                  <span className="wh-stamp__year">{exp.year}</span>
                  <span className="wh-stamp__code">{exp.code}</span>
                </div>
                <span className="wh-entry__period">{exp.period}</span>
                {/* Status seal — SVG icon that morphs */}
                <span className="wh-entry__status-wrap">
                  <svg className="wh-status-seal" viewBox="0 0 40 40" aria-hidden="true">
                    <path
                      className="wh-status-seal__path"
                      d="M 20,10 C 25.523,10 30,14.477 30,20 C 30,25.523 25.523,30 20,30 C 14.477,30 10,25.523 10,20 C 10,14.477 14.477,10 20,10 Z"
                      fill="none"
                      stroke="var(--brand)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      className="wh-status-seal__target"
                      d={exp.status === 'Current'
                        ? 'M 12,22 L 16,26 L 28,14'
                        : 'M 12,20 L 28,20'
                      }
                      fill="none"
                      stroke="var(--brand)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ visibility: 'hidden' }}
                    />
                  </svg>
                  <span className={`wh-entry__status wh-entry__status--${exp.status.toLowerCase()}`}>
                    {exp.status === 'Current' ? 'In post' : 'Concluded'}
                  </span>
                </span>
              </div>

              {/* Paper sheet */}
              <div
                className="wh-entry__sheet"
                style={{ transform: `rotate(${exp.rotate}deg)` }}
              >
                {/* Tape at top-left */}
                <span className="wh-tape" aria-hidden="true" />

                {/* Ink-impact ring on stamp landing */}
                <span className="wh-entry__impact" aria-hidden="true" />

                <div className="wh-entry__head">
                  <span className="wh-entry__num">No. {exp.num}</span>
                  <h3 className="wh-entry__role">{exp.role}</h3>
                  <svg className="wh-entry__underline" viewBox="0 0 100 4" preserveAspectRatio="none" aria-hidden="true">
                    <path
                      className="wh-underline__path"
                      d="M 0,2 L 100,2"
                      fill="none"
                      stroke="var(--brand)"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                    <path
                      className="wh-underline__target"
                      d="M 0,2 C 12,1 22,3 32,2 C 42,1 52,3 62,2 C 72,1 82,3 100,2"
                      fill="none"
                      stroke="var(--brand)"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      style={{ visibility: 'hidden' }}
                    />
                  </svg>
                  <span className="wh-entry__company">{exp.company}</span>
                </div>

                <p className="wh-entry__desc">{exp.description}</p>

                <div className="wh-entry__tags">
                  {exp.tags.map((t) => (
                    <span key={t} className="wh-tag">{t}</span>
                  ))}
                </div>

                {/* Page corner */}
                <span className="wh-corner" aria-hidden="true" />
              </div>
            </article>
          ))}
        </div>

        {/* Endnote — mirrors Skills' closing */}
        <div className="wh-endnote">
          <svg className="wh-endnote__rule" viewBox="0 0 200 4" preserveAspectRatio="none" aria-hidden="true">
            <path d="M 0,2 L 200,2" fill="none" stroke="var(--brand)" strokeWidth="0.8" strokeLinecap="round" />
          </svg>
          <p>
            The ledger is updated when a new post begins. Older entries remain as they were filed.
          </p>
          <svg className="wh-endnote__rule" viewBox="0 0 200 4" preserveAspectRatio="none" aria-hidden="true">
            <path d="M 0,2 L 200,2" fill="none" stroke="var(--brand)" strokeWidth="0.8" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </section>
  )
}

