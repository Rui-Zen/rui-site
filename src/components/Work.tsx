import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { SplitText } from 'gsap/SplitText'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, SplitText, MotionPathPlugin)

type Project = {
  id: string
  year: string
  category: string
  title: string
  tagline: string
  description: string
  problem: string
  challenge: string
  solution: string
  stack: string[]
  liveUrl?: string
  repoUrl: string
  repoSlug: string
  /** Decorative slight rotation applied to the sheet so the desk feels organic. */
  rotate: number
}

const projects: Project[] = [
  {
    id: '01',
    year: '2026',
    category: 'Government / Education Platform',
    title: 'KoaScholarships',
    tagline: 'A modern scholarship management platform for students and administrators.',
    description:
      'A full-stack web application that streamlines the lifecycle of educational scholarships — letting students discover and apply for programs while giving administrators tools to review applications, verify documents, and process disbursements.',
    problem:
      'Scholarship workflows are typically buried in paper forms, scattered emails, and ad-hoc spreadsheets, making it hard for students to track applications and for staff to audit decisions.',
    challenge:
      'Modeling many overlapping entities — programs, applicants, documents, reviewers, and disbursements — without making the UI feel bureaucratic to applicants.',
    solution:
      'Designed a normalized PostgreSQL schema with clear state machines for applications, then layered an Inertia + Vue UI on top so each role only sees the surface that matters to them.',
    stack: ['Laravel 12', 'Vue 3', 'Inertia.js', 'TypeScript', 'PostgreSQL', 'Tailwind CSS'],
    liveUrl: 'https://philexscholar.koamishin.org',
    repoUrl: 'https://github.com/koamishin/KoaScholarships',
    repoSlug: 'koamishin/KoaScholarships',
    rotate: -0.6,
  },
  {
    id: '02',
    year: '2026',
    category: 'E-Commerce / Storefront',
    title: 'Coamifee Shop',
    tagline: 'A specialty coffee storefront with cart, checkout, and admin tooling.',
    description:
      'An end-to-end coffee e-commerce experience covering catalog browsing, cart and checkout, customer accounts, and an admin panel for product, inventory, and order management.',
    problem:
      'Small specialty roasters need a storefront that feels considered — but most off-the-shelf platforms either over-charge for basics or look generic and untrustworthy.',
    challenge:
      'Balancing a richly typed product catalog (variants, weights, grinds, stock) with a checkout flow that stays fast and predictable across slow networks.',
    solution:
      'Built the data layer in Laravel with explicit Eloquent relationships and form requests for every mutation, then kept the storefront server-rendered for speed.',
    stack: ['Laravel', 'PHP', 'Blade', 'MySQL', 'Tailwind CSS', 'Alpine.js'],
    repoUrl: 'https://github.com/koamishin/coamifee-shop',
    repoSlug: 'koamishin/coamifee-shop',
    rotate: 0.7,
  },
  {
    id: '03',
    year: '2026',
    category: 'Developer Tooling / Open Source',
    title: 'Koami Starter Kit',
    tagline: 'An opinionated Laravel 12 + Vue 3 starter kit, production-ready out of the box.',
    description:
      'A modern Laravel starter kit pairing Vue 3, Inertia.js, Tailwind, Fortify, and Wayfinder. It ships with Octane, a full Pest test suite, and automated CI/CD workflows.',
    problem:
      'Bootstrapping a Laravel + Vue app from scratch eats days that should be spent on product — every team rebuilds the same auth, testing, and deployment scaffolding.',
    challenge:
      'Choosing defaults that are opinionated enough to save time but not so rigid that real applications outgrow them, while keeping CI green across PHP and Node toolchains.',
    solution:
      'Picked a tight stack and wrote it as a single coherent template with TypeScript-aware routes, plus GitHub Actions that run Pest, type-check the front-end, and verify formatting on every PR.',
    stack: ['Laravel 12', 'Vue 3', 'Inertia.js', 'Fortify', 'Octane', 'Pest', 'Tailwind CSS', 'TypeScript'],
    repoUrl: 'https://github.com/koamishin/KoamiStarterKit',
    repoSlug: 'koamishin/KoamiStarterKit',
    rotate: -0.4,
  },
]

export function Work() {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    // ── Per-sheet entrance ────────────────────────────
    gsap.utils.toArray<HTMLElement>('.paper-sheet').forEach((sheet) => {
      const rot = parseFloat(sheet.dataset.rotate ?? '0')
      gsap.fromTo(sheet,
        { opacity: 0, y: 80, rotation: rot - 4, scale: 0.96 },
        {
          opacity: 1, y: 0, rotation: rot, scale: 1,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sheet,
            start: 'top 78%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // ── Title SplitText reveal ─────────────────────
      const titleEl = sheet.querySelector<HTMLElement>('.paper-sheet__title')
      if (titleEl) {
        const split = new SplitText(titleEl, { type: 'chars,words' })
        gsap.set(split.chars, { opacity: 0, y: 24 })
        gsap.to(split.chars, {
          opacity: 1, y: 0,
          duration: 0.7,
          stagger: 0.02,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleEl,
            start: 'top 72%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      // ── Hand-drawn title underline (DrawSVG) ──────
      const underline = sheet.querySelector<SVGPathElement>('.paper-sheet__underline path')
      if (underline) {
        gsap.fromTo(underline,
          { drawSVG: '0% 0%' },
          {
            drawSVG: '0% 100%',
            duration: 1.4,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: titleEl ?? sheet,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      }

      // ── Section underline strokes for body headings
      sheet.querySelectorAll<SVGPathElement>('.paper-mini-rule path').forEach((rule) => {
        gsap.fromTo(rule,
          { drawSVG: '0% 0%' },
          {
            drawSVG: '0% 100%',
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: rule.parentElement?.parentElement ?? rule,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        )
      })

      // ── Thumbnail parallax (mild)
      const thumb = sheet.querySelector<HTMLElement>('.paper-figure img')
      if (thumb) {
        gsap.to(thumb, {
          yPercent: -6,
          ease: 'none',
          scrollTrigger: {
            trigger: sheet,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        })
      }
    })

    // ── Paper plane that flies between sheets (MotionPath) ──
    const plane = sectionRef.current?.querySelector<SVGGElement>('.paper-plane')
    const planePath = sectionRef.current?.querySelector<SVGPathElement>('.paper-plane-path')
    const planeTrail = sectionRef.current?.querySelector<SVGPathElement>('.paper-plane-trail')
    if (plane && planePath && planeTrail) {
      gsap.set(plane, { opacity: 0 })

      gsap.to(plane, {
        opacity: 1,
        duration: 0.4,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.to(plane, {
        motionPath: {
          path: planePath,
          align: planePath,
          alignOrigin: [0.5, 0.5],
          autoRotate: true,
        },
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 40%',
          end: 'bottom 80%',
          scrub: 1.2,
        },
      })

      gsap.fromTo(planeTrail,
        { drawSVG: '0% 0%' },
        {
          drawSVG: '0% 100%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 40%',
            end: 'bottom 80%',
            scrub: 1.2,
          },
        }
      )
    }
  }, { scope: sectionRef })

  return (
    <section
      id="work"
      ref={sectionRef}
      className="paper-section paper-section--light paper-desk"
    >
      {/* Desk SVG overlay — paper plane and its trail */}
      <svg
        className="paper-plane-svg"
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* The trail (drawn progressively) */}
        <path
          className="paper-plane-trail"
          d="M 12,80 C 40,180 90,260 60,360 C 30,460 80,560 50,680 C 20,800 70,880 88,940"
          fill="none"
          stroke="var(--brand)"
          strokeWidth="0.6"
          strokeDasharray="2 3"
          opacity="0.45"
        />
        {/* The invisible motion path (same as trail) */}
        <path
          className="paper-plane-path"
          d="M 12,80 C 40,180 90,260 60,360 C 30,460 80,560 50,680 C 20,800 70,880 88,940"
          fill="none"
          stroke="none"
        />
        {/* The plane glyph */}
        <g className="paper-plane">
          <path
            d="M -8,-6 L 8,0 L -8,6 L -4,0 Z"
            fill="var(--brand)"
            stroke="var(--brand)"
            strokeLinejoin="round"
            strokeWidth="0.6"
          />
        </g>
      </svg>

      <div className="section-inner paper-inner">
        {/* Editorial masthead */}
        <header className="paper-masthead">
          <div className="paper-masthead__rule paper-masthead__rule--top" />
          <div className="paper-masthead__row">
            <span className="paper-masthead__date">Vol. III — MMXXVI</span>
            <h2 className="paper-masthead__title">Selected Case Files</h2>
            <span className="paper-masthead__edition">Three Editions</span>
          </div>
          <div className="paper-masthead__rule paper-masthead__rule--double" />
          <p className="paper-masthead__lede">
            A field journal of recent work. Each file documents the problem, the technical challenge,
            the chosen stack, and the resolution — collected here for the curious reader.
          </p>
        </header>

        {/* Paper sheets */}
        <div className="paper-stack">
          {projects.map((p) => (
            <article
              key={p.id}
              className="paper-sheet"
              data-rotate={p.rotate}
              style={{ transform: `rotate(${p.rotate}deg)` }}
            >
              {/* Tape pieces at the corners */}
              <span className="paper-tape paper-tape--tl" aria-hidden="true" />
              <span className="paper-tape paper-tape--tr" aria-hidden="true" />

              {/* Ink stamp */}
              <div className="paper-stamp" aria-hidden="true">
                <span className="paper-stamp__num">No. {p.id}</span>
                <span className="paper-stamp__year">{p.year}</span>
                <span className="paper-stamp__cat">{p.category}</span>
              </div>

              {/* Dateline */}
              <div className="paper-dateline">
                <span className="paper-dateline__sep" />
                <span>Case File {p.id} — Field Report — {p.year}</span>
                <span className="paper-dateline__sep" />
              </div>

              {/* Title + hand-drawn underline */}
              <h3 className="paper-sheet__title">{p.title}</h3>
              <svg
                className="paper-sheet__underline"
                viewBox="0 0 400 12"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path
                  d="M 4,6 C 80,2 160,10 240,5 C 300,2 360,8 396,6"
                  fill="none"
                  stroke="var(--brand)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>

              <p className="paper-sheet__tagline">{p.tagline}</p>

              {/* Figure + intro */}
              <div className="paper-sheet__lead">
                <figure className="paper-figure">
                  <a
                    href={p.repoUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="paper-figure__link"
                    aria-label={`Open ${p.title} on GitHub`}
                  >
                    <img
                      src={`https://opengraph.githubassets.com/1/${p.repoSlug}`}
                      alt={`${p.title} — GitHub repository preview`}
                      loading="lazy"
                    />
                  </a>
                  <figcaption>
                    <span className="paper-figure__num">Fig. {p.id}</span>
                    <span className="paper-figure__cap">Repository preview — {p.repoSlug}</span>
                  </figcaption>
                </figure>

                <p className="paper-sheet__intro">
                  <span className="paper-dropcap">{p.description.charAt(0)}</span>
                  {p.description.slice(1)}
                </p>
              </div>

              {/* Body — three sections in a three-column layout */}
              <div className="paper-sheet__body">
                {[
                  { label: 'The Problem', text: p.problem },
                  { label: 'The Challenge', text: p.challenge },
                  { label: 'The Solution', text: p.solution, accent: true },
                ].map((sec) => (
                  <section key={sec.label} className={`paper-col${sec.accent ? ' paper-col--accent' : ''}`}>
                    <h4 className="paper-col__heading">{sec.label}</h4>
                    <svg
                      className="paper-mini-rule"
                      viewBox="0 0 100 4"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M 0,2 L 100,2"
                        fill="none"
                        stroke="var(--brand)"
                        strokeWidth="1.2"
                        strokeLinecap="round"
                      />
                    </svg>
                    <p>{sec.text}</p>
                  </section>
                ))}
              </div>

              {/* Footer */}
              <footer className="paper-sheet__footer">
                <div className="paper-stackchips">
                  <span className="paper-stackchips__label">Stack ·</span>
                  {p.stack.map(tech => (
                    <span key={tech} className="paper-chip">{tech}</span>
                  ))}
                </div>

                <div className="paper-actions">
                  {p.liveUrl && (
                    <a href={p.liveUrl} target="_blank" rel="noreferrer noopener" className="paper-btn paper-btn--primary">
                      <span>Read Live</span>
                      <span aria-hidden="true">→</span>
                    </a>
                  )}
                  <a href={p.repoUrl} target="_blank" rel="noreferrer noopener" className="paper-btn">
                    <span>Source</span>
                    <span aria-hidden="true">→</span>
                  </a>
                </div>
              </footer>

              {/* Page-corner curl decoration */}
              <span className="paper-corner" aria-hidden="true" />

              {/* Folio mark */}
              <div className="paper-folio">— {p.id} —</div>
            </article>
          ))}
        </div>

        {/* End note */}
        <div className="paper-endnote">
          <span className="paper-endnote__star">✦</span>
          <p>
            End of field reports. Further dispatches, drafts, and experiments are filed at{' '}
            <a href="https://github.com/koamishin" target="_blank" rel="noreferrer noopener">github.com/koamishin</a>.
          </p>
          <span className="paper-endnote__star">✦</span>
        </div>
      </div>
    </section>
  )
}
