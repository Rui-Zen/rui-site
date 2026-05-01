const skillGroups = [
  { title: 'Design', items: ['Product Strategy', 'Design Systems', 'Typography', 'Motion'] },
  { title: 'Technical', items: ['React / TS', 'Tailwind CSS', 'Anime.js', 'Node.js'] },
  { title: 'Process', items: ['User Research', 'Accessibility', 'Atomic Design', 'CI/CD'] },
]

export function Skills() {
  return (
    <section id="skills" className="seamless-section" style={{ background: 'var(--neutral-dark)', color: 'var(--bg-parchment)' }}>
      <div className="section-container section-inner">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '80px' }}>
          <div>
            <div className="eyebrow" style={{ color: 'var(--neutral-gray)', marginBottom: '32px' }}>Capabilites</div>
            <h2 className="section-title">The Toolkit</h2>
            <p style={{ color: '#a8a49c', lineHeight: 1.7 }}>
              A hybrid approach to digital creation, balancing visual excellence with robust technical foundations.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            {skillGroups.map(group => (
              <div key={group.title}>
                <h4 style={{ color: 'var(--accent-blue-light)', marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.8rem' }}>
                  {group.title}
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {group.items.map(item => (
                    <li key={item} style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)' }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Parallax Background Text */}
      <div className="big-title-parallax" style={{
        position: 'absolute',
        bottom: '0',
        right: '0',
        fontSize: '25rem',
        color: 'rgba(255,255,255,0.01)',
        zIndex: 0,
        fontFamily: 'var(--font-serif)',
        whiteSpace: 'nowrap',
        pointerEvents: 'none'
      }}>
        SYSTEMS · SYSTEMS
      </div>
    </section>
  )
}
