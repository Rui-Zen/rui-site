export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer style={{ background: '#141413', borderTop: '1px solid rgba(232,230,220,0.06)', padding: '40px 32px' }}>
      <div style={{
        maxWidth: 1100, margin: '0 auto',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div data-footer-item>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontWeight: 500, color: '#f5f4ed', marginBottom: 4 }}>
            Rui Zen
          </div>
          <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.72rem', color: '#504e49', letterSpacing: '0.3px' }}>
            Design · Engineering · Singapore
          </div>
        </div>

        <div data-footer-item style={{ display: 'flex', gap: 32 }}>
          {['About', 'Work', 'Skills', 'Writing', 'Contact'].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{
              fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: '#504e49',
              textDecoration: 'none', transition: 'color 0.2s', letterSpacing: '0.3px',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = '#f5f4ed'}
            onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = '#504e49'}>
              {l}
            </a>
          ))}
        </div>

        <div data-footer-item style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#3d3d3a' }}>
          © {year} Rui Zen. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
