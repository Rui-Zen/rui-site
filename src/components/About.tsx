export function About() {
  return (
    <section
      id="about"
      style={{ background: '#141413', padding: '100px 32px', color: '#f5f4ed' }}
    >
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <div
            data-about-eyebrow
            className="eyebrow"
            style={{ color: '#6b6a64', marginBottom: 20 }}
          >
            Who I am
          </div>
          <h2
            data-about-title
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2rem, 4vw, 3.2rem)',
              fontWeight: 500, lineHeight: 1.15,
              color: '#f5f4ed',
              borderLeft: '3px solid #2D5A8A',
              paddingLeft: 16, borderRadius: 2,
              maxWidth: 700,
            }}
          >
            A craftsman at the intersection of design and engineering
          </h2>
        </div>

        {/* Two-column */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
          {/* Left */}
          <div>
            <blockquote
              data-about-quote
              className="kami-quote"
              style={{ color: '#e8e6dc', borderLeftColor: '#2D5A8A', marginBottom: 32 }}
            >
              "Great interfaces are not designed — they are discovered through deep listening to users and materials."
            </blockquote>

            <p data-about-para style={{ color: '#a8a49c', lineHeight: 1.7, marginBottom: 20, fontSize: '0.97rem' }}>
              I've spent the past six years building digital products across fintech, creative tools,
              and enterprise SaaS. My work lives at the seam between visual craft and technical execution —
              I both design systems and implement them in code.
            </p>
            <p data-about-para style={{ color: '#a8a49c', lineHeight: 1.7, fontSize: '0.97rem', marginBottom: 32 }}>
              Before going independent, I led design at two early-stage startups, shipping products
              used by hundreds of thousands of people. I believe in restraint: every element on a page
              should earn its place.
            </p>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {['Singapore', 'Remote-first', 'EN · ZH', 'Open to projects'].map(t => (
                <span key={t} data-about-chip style={{
                  background: '#30302e', color: '#a8a49c',
                  fontSize: '0.68rem', fontWeight: 500, letterSpacing: 1, textTransform: 'uppercase',
                  padding: '4px 10px', borderRadius: 4, border: '1px solid rgba(232,230,220,0.08)',
                  display: 'inline-block',
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right: value cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            {[
              { letter: 'R', title: 'Restraint', body: 'Complexity is easy. Simplicity is hard. Every design decision I make asks: what can we remove and still communicate everything?' },
              { letter: 'P', title: 'Precision', body: 'Typography, spacing, motion — the 1px decisions compound. I obsess over the details because users feel them, even when they can\'t name them.' },
              { letter: 'S', title: 'Shipping', body: 'Design that doesn\'t reach users doesn\'t exist. I work closely with engineering, write production code, and treat deployment as part of the craft.' },
            ].map(v => (
              <div
                key={v.letter}
                data-about-card
                style={{
                  background: '#1e1e1c',
                  border: '1px solid rgba(232,230,220,0.07)',
                  borderRadius: 10, padding: '20px 24px',
                  display: 'flex', gap: 18,
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-serif)', fontSize: '1.8rem', fontWeight: 500,
                  color: '#2D5A8A', lineHeight: 1, minWidth: 28, marginTop: 2,
                }}>
                  {v.letter}
                </div>
                <div>
                  <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 500, color: '#f5f4ed', marginBottom: 6 }}>{v.title}</div>
                  <p style={{ fontSize: '0.85rem', color: '#6b6a64', lineHeight: 1.6, margin: 0 }}>{v.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
