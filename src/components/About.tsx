export function About() {
  return (
    <section id="about" className="seamless-section" style={{ background: 'var(--neutral-dark)', color: 'var(--bg-parchment)', overflow: 'hidden' }}>
      <div className="section-container section-inner">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          
          <div className="reveal-mask" style={{ borderRadius: '12px', background: 'var(--neutral-gray)', height: '600px' }}>
            {/* Image Placeholder would go here */}
            <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, #1e1e1c, #2d5a8a)', opacity: 0.8 }} />
          </div>

          <div>
            <div className="eyebrow" style={{ color: 'var(--neutral-gray)', marginBottom: '32px' }}>The Philosophy</div>
            <h2 className="section-title">Design as a Dialogue</h2>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#a8a49c', marginBottom: '32px' }}>
              I believe that great interfaces are not just seen—they are felt. My work is rooted in the CJK typography tradition, where negative space is as important as the stroke. 
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.7, color: '#a8a49c', marginBottom: '48px' }}>
              By merging editorial restraint with technical precision, I build systems that scale without losing their human touch.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
              <div>
                <h4 style={{ color: 'var(--bg-parchment)', marginBottom: '8px' }}>Restraint</h4>
                <p style={{ fontSize: '0.85rem', color: '#6b6a64' }}>Removing the non-essential to let the core message shine through.</p>
              </div>
              <div>
                <h4 style={{ color: 'var(--bg-parchment)', marginBottom: '8px' }}>Execution</h4>
                <p style={{ fontSize: '0.85rem', color: '#6b6a64' }}>Bridging the final 1% gap between design and production code.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Element */}
      <div className="big-title-parallax" style={{
        position: 'absolute',
        top: '20%',
        left: '-10%',
        fontSize: '20rem',
        color: 'rgba(255,255,255,0.02)',
        zIndex: 0,
        fontFamily: 'var(--font-serif)',
        whiteSpace: 'nowrap',
        pointerEvents: 'none'
      }}>
        DIALOGUE · DIALOGUE
      </div>
    </section>
  )
}
