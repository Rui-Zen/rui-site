import { useState, useEffect } from 'react'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      zIndex: 1000,
      padding: '24px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'background 0.4s, padding 0.4s',
      background: scrolled ? 'rgba(245,244,237,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
    }}>
      <a href="#" className="link-underline" style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.5rem',
        fontWeight: 500,
      }}>
        R. Zen
      </a>

      <div style={{ display: 'flex', gap: '32px' }}>
        {['Work', 'About', 'Writing', 'Contact'].map(item => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="link-underline"
            style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'var(--neutral-gray)',
            }}
          >
            {item}
          </a>
        ))}
      </div>
    </nav>
  )
}
