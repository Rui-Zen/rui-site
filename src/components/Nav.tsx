import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const navItems = ['About', 'Work', 'Skills', 'Writing', 'Contact']

export function Nav() {
  const navRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLAnchorElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Staggered entrance: logo first, then links slide in, then the bottom line draws
    const tl = gsap.timeline({ delay: 0.2 })

    if (logoRef.current) {
      tl.fromTo(logoRef.current,
        { y: -15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }
      )
    }

    if (linksRef.current) {
      const links = linksRef.current.querySelectorAll('a')
      tl.fromTo(links,
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.06, ease: 'power3.out' },
        '-=0.3'
      )
    }

    if (lineRef.current) {
      tl.fromTo(lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'power2.inOut' },
        '-=0.2'
      )
    }
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault()
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav
      ref={navRef}
      className="site-nav absolute top-0 left-0 right-0 z-50 pt-8 pb-4 px-12"
    >
      <div className="mx-auto max-w-[1200px]">
        {/* Main row */}
        <div className="flex items-center justify-between">
          {/* Logo — serif, same as hero typography */}
          <a
            ref={logoRef}
            href="#"
            className="group"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.2rem',
              fontWeight: 500,
              color: 'var(--near-black)',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
              opacity: 0,
            }}
          >
            <span style={{ color: 'var(--brand)' }}>R</span>
            <span style={{ color: 'var(--near-black)' }}>.</span>
            <span className="ml-1.5" style={{ 
              fontFamily: 'var(--font-sans)',
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--stone)',
              verticalAlign: 'middle',
            }}>
              ZEN
            </span>
          </a>

          {/* Navigation links */}
          <div ref={linksRef} className="site-nav-links flex items-center gap-0">
            {navItems.map((item, i) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={(e) => handleNavClick(e, item.toLowerCase())}
                className="relative px-5 py-2 group"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.68rem',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: 'var(--stone)',
                  textDecoration: 'none',
                  opacity: 0,
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--brand)'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.color = 'var(--stone)'
                }}
              >
                {/* Number prefix */}
                <span style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.55rem',
                  color: 'var(--brand)',
                  marginRight: '6px',
                  opacity: 0.5,
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                {item}
                {/* Underline indicator */}
                <span
                  className="absolute bottom-0 left-5 right-5 h-px origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                  style={{ background: 'var(--brand)' }}
                />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom separator line — draws in on load */}
        <div
          ref={lineRef}
          className="mt-3"
          style={{
            height: '1px',
            background: 'linear-gradient(to right, transparent, var(--border-warm) 20%, var(--border-warm) 80%, transparent)',
            transformOrigin: 'left center',
            opacity: 0.6,
          }}
        />
      </div>
    </nav>
  )
}
