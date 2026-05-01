const projects = [
  { id: '01', title: 'Atlas Finance', cat: 'Product Design', year: '2025' },
  { id: '02', title: 'Noto Editor', cat: 'Full-Stack', year: '2024' },
  { id: '03', title: 'Kami System', cat: 'Design Systems', year: '2024' },
]

export function Work() {
  return (
    <section id="work" className="seamless-section" style={{ background: 'var(--bg-parchment)' }}>
      <div className="section-container section-inner">
        <div className="eyebrow" style={{ marginBottom: '40px' }}>Selected Projects</div>
        <h2 className="section-title">A Record of Craft</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '120px', marginTop: '80px' }}>
          {projects.map((p, i) => (
            <div 
              key={p.id} 
              className="tilt-card"
              style={{ 
                display: 'grid', 
                gridTemplateColumns: '1fr 1fr', 
                gap: '60px', 
                alignItems: 'center',
                paddingBottom: '80px',
                borderBottom: '1px solid var(--neutral-light)'
              }}
            >
              <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-blue)', marginBottom: '16px' }}>
                  {p.id} / {p.year}
                </div>
                <h3 style={{ fontSize: '3.5rem', marginBottom: '12px' }}>{p.title}</h3>
                <div className="eyebrow" style={{ marginBottom: '24px' }}>{p.cat}</div>
                <p style={{ color: 'var(--neutral-gray)', maxWidth: '400px', lineHeight: 1.6 }}>
                  Detailed case study exploration into user behavior and technical implementation for high-scale platforms.
                </p>
                <div style={{ marginTop: '32px' }}>
                  <a href="#" className="link-underline" style={{ fontWeight: 600 }}>Explore Project →</a>
                </div>
              </div>

              <div className="reveal-mask" style={{ order: i % 2 === 0 ? 2 : 1, borderRadius: '8px', height: '450px', background: 'var(--neutral-light)' }}>
                <div style={{ width: '100%', height: '100%', background: 'linear-gradient(to bottom right, #e8e6dc, #1b365d)', opacity: 0.2 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
