export function Hero() {
  return (
    <section className="section-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="eyebrow" style={{ marginBottom: '24px' }}>Designer & Developer</div>
      
      <h1 className="hero-h1 big-title" style={{ maxWidth: '900px', marginBottom: '40px' }}>
        Building Digital Experiences with Precision and Purpose.
      </h1>

      <div style={{ display: 'flex', gap: '80px', alignItems: 'flex-start' }}>
        <p className="hero-sub" style={{
          fontSize: '1.25rem',
          lineHeight: 1.6,
          color: 'var(--neutral-gray)',
          maxWidth: '500px'
        }}>
          Rui Zen — Crafting thoughtful products and visual systems that bridge the gap between design thinking and production code.
        </p>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {[
            { v: '06+', l: 'Years experience' },
            { v: '40+', l: 'Projects shipped' }
          ].map(m => (
            <div key={m.l} style={{ borderBottom: '1px solid var(--neutral-light)', paddingBottom: '12px' }}>
              <div className="metric-value" style={{ fontSize: '2rem' }}>{m.v}</div>
              <div className="metric-label">{m.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative Parallax Text */}
      <div 
        className="big-title-parallax"
        style={{
          position: 'absolute',
          bottom: '10%',
          right: '-5%',
          fontSize: '15rem',
          color: 'var(--neutral-light)',
          zIndex: -1,
          fontFamily: 'var(--font-serif)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          opacity: 0.3
        }}
      >
        CRAFT · PRECISION · CRAFT · PRECISION
      </div>
    </section>
  )
}
