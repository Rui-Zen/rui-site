import { useState, useEffect } from 'react'

const links = [
  { label: 'About',   href: '#about' },
  { label: 'Work',    href: '#work' },
  { label: 'Skills',  href: '#skills' },
  { label: 'Writing', href: '#writing' },
  { label: 'Contact', href: '#contact' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive]     = useState('')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)
      const ids = ['about','work','skills','writing','contact']
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) { setActive(id); break }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      transition: 'background 0.3s, box-shadow 0.3s',
      background: scrolled ? 'rgba(245,244,237,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      borderBottom: scrolled ? '1px solid #e8e6dc' : '1px solid transparent',
    }}>
      {/* Scroll progress bar */}
      <div
        data-scroll-progress
        style={{
          position: 'absolute', bottom: -1, left: 0, right: 0,
          height: 2, background: '#1B365D',
          transformOrigin: 'left center', scaleX: 0,
        }}
      />
      <nav style={{
        maxWidth: 1100, margin: '0 auto', padding: '0 32px',
        height: 64, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <a data-nav-logo href="#" style={{
          fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 500,
          color: '#141413', textDecoration: 'none', letterSpacing: '-0.01em',
          opacity: 0,
        }}>
          Rui Zen
        </a>

        <ul style={{ display: 'flex', gap: 32, listStyle: 'none', margin: 0, padding: 0 }}>
          {links.map(l => (
            <li key={l.href}>
              <a
                data-nav-link
                href={l.href}
                style={{
                  fontFamily: 'var(--font-sans)', fontSize: '0.82rem', fontWeight: 500,
                  letterSpacing: '0.5px', textDecoration: 'none', opacity: 0,
                  color: active === l.href.slice(1) ? '#1B365D' : '#6b6a64',
                  transition: 'color 0.2s',
                  paddingBottom: 2,
                  borderBottom: active === l.href.slice(1) ? '1.5px solid #1B365D' : '1.5px solid transparent',
                }}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          data-nav-cta
          data-magnetic
          href="#contact"
          style={{
            fontFamily: 'var(--font-sans)', fontSize: '0.78rem', fontWeight: 500,
            letterSpacing: '0.8px', textTransform: 'uppercase',
            color: '#faf9f5', background: '#1B365D',
            padding: '8px 20px', borderRadius: 6, textDecoration: 'none',
            boxShadow: '0 0 0 1px #1B365D', opacity: 0,
            display: 'inline-block',
            transition: 'background 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={e => {
            const a = e.currentTarget as HTMLAnchorElement
            a.style.background = '#2D5A8A'
            a.style.boxShadow = '0 0 0 1px #2D5A8A'
          }}
          onMouseLeave={e => {
            const a = e.currentTarget as HTMLAnchorElement
            a.style.background = '#1B365D'
            a.style.boxShadow = '0 0 0 1px #1B365D'
          }}
        >
          Say Hello
        </a>
      </nav>
    </header>
  )
}
