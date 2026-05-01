export function Hero() {
  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        maxWidth: 1100,
        margin: '0 auto',
        padding: '120px 32px 80px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Parallax orb */}
      <div
        data-hero-orb
        style={{
          position: 'absolute',
          top: '8%', right: '-8%',
          width: 500, height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle at 40% 40%, #D6E1EE 0%, #EEF2F7 40%, transparent 70%)',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        {/* Eyebrow */}
        <div
          data-hero-eyebrow
          className="eyebrow"
          style={{ marginBottom: 28, opacity: 0 }}
        >
          Portfolio · 2026
        </div>

        {/* H1 — chars will be split by anime */}
        <h1
          data-hero-h1
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(3.2rem, 8vw, 6.5rem)',
            fontWeight: 500,
            lineHeight: 1.08,
            color: '#141413',
            maxWidth: 820,
            marginBottom: 28,
            letterSpacing: '-0.02em',
          }}
        >
          Design thinking, craft precision.
        </h1>

        {/* Sub */}
        <p
          data-hero-sub
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(1rem, 2vw, 1.2rem)',
            color: '#504e49',
            maxWidth: 560,
            lineHeight: 1.65,
            marginBottom: 48,
          }}
        >
          I'm Rui Zen — a product designer and front-end developer who bridges the gap between thoughtful visual systems and production-ready interfaces.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 80 }}>
          <a
            data-hero-cta
            data-magnetic
            href="#work"
            style={{
              fontFamily: 'var(--font-sans)', fontSize: '0.82rem', fontWeight: 500,
              letterSpacing: '0.8px', textTransform: 'uppercase',
              color: '#faf9f5', background: '#1B365D',
              padding: '12px 28px', borderRadius: 7, textDecoration: 'none',
              boxShadow: '0 0 0 1.5px #1B365D', opacity: 0,
              display: 'inline-block',
              transition: 'background 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={e => {
              const a = e.currentTarget as HTMLAnchorElement
              a.style.background = '#2D5A8A'; a.style.boxShadow = '0 0 0 1.5px #2D5A8A'
            }}
            onMouseLeave={e => {
              const a = e.currentTarget as HTMLAnchorElement
              a.style.background = '#1B365D'; a.style.boxShadow = '0 0 0 1.5px #1B365D'
            }}
          >
            View Work
          </a>
          <a
            data-hero-cta
            data-magnetic
            href="#about"
            style={{
              fontFamily: 'var(--font-sans)', fontSize: '0.82rem', fontWeight: 500,
              letterSpacing: '0.8px', textTransform: 'uppercase',
              color: '#1B365D', background: '#e8e6dc',
              padding: '12px 28px', borderRadius: 7, textDecoration: 'none',
              boxShadow: '0 0 0 1px #e8e6dc', opacity: 0,
              display: 'inline-block',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#dddbd0' }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = '#e8e6dc' }}
          >
            About Me
          </a>
        </div>

        {/* Metrics */}
        <div style={{
          display: 'flex', gap: 48,
          paddingTop: 32, borderTop: '1px solid #e8e6dc',
          maxWidth: 520,
        }}>
          {[
            { raw: '6', suffix: '+', label: 'Years experience' },
            { raw: '40', suffix: '+', label: 'Projects shipped' },
            { raw: '12', suffix: '+', label: 'Happy clients' },
          ].map(m => (
            <div key={m.label}>
              <div
                data-metric-value
                data-metric-raw={m.raw}
                data-metric-suffix={m.suffix}
                className="metric-value"
              >
                0{m.suffix}
              </div>
              <div className="metric-label" style={{ marginTop: 4 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div style={{
        position: 'absolute', bottom: 40, left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, opacity: 0.4,
      }}>
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.65rem', letterSpacing: 2, textTransform: 'uppercase', color: '#6b6a64' }}>Scroll</span>
        <div style={{ width: 1, height: 36, background: '#1B365D', opacity: 0.5 }} />
      </div>
    </section>
  )
}
