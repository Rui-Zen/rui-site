import { useState, useEffect } from 'react'

const sections = [
  { id: 'hero',    label: 'Home' },
  { id: 'about',   label: 'About' },
  { id: 'work',    label: 'Work' },
  { id: 'skills',  label: 'Skills' },
  { id: 'writing', label: 'Writing' },
  { id: 'contact', label: 'Contact' },
]

export function SideNav() {
  const [active, setActive] = useState('hero')
  const [hovered, setHovered] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 100)
      for (const s of [...sections].reverse()) {
        const el = document.getElementById(s.id)
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActive(s.id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      aria-label="Page sections"
      style={{
        position: 'fixed',
        right: 28,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 90,
        display: 'flex',
        flexDirection: 'column',
        gap: 14,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.4s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      {sections.map(s => {
        const isActive = active === s.id
        const isHovered = hovered === s.id
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-label={s.label}
            onMouseEnter={() => setHovered(s.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              justifyContent: 'flex-end',
              textDecoration: 'none',
            }}
          >
            {/* Label */}
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.63rem',
              fontWeight: 500,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              color: isActive ? '#1B365D' : '#6b6a64',
              opacity: isHovered || isActive ? 1 : 0,
              transform: isHovered || isActive ? 'translateX(0)' : 'translateX(6px)',
              transition: 'opacity 0.25s ease, transform 0.25s ease, color 0.25s ease',
              whiteSpace: 'nowrap',
            }}>
              {s.label}
            </span>

            {/* Dot */}
            <div style={{
              width: isActive ? 10 : isHovered ? 7 : 5,
              height: isActive ? 10 : isHovered ? 7 : 5,
              borderRadius: '50%',
              background: isActive ? '#1B365D' : isHovered ? '#2D5A8A' : '#e8e6dc',
              border: isActive ? '2px solid #1B365D' : isHovered ? '1.5px solid #2D5A8A' : '1.5px solid #c8c6bc',
              boxShadow: isActive ? '0 0 0 3px rgba(27,54,93,0.15)' : 'none',
              transition: 'width 0.25s ease, height 0.25s ease, background 0.25s ease, box-shadow 0.25s ease',
              flexShrink: 0,
            }} />
          </a>
        )
      })}
    </nav>
  )
}
