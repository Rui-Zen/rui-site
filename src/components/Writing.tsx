const posts = [
  {
    date: 'Apr 2026', tag: 'Design Systems',
    title: 'Ten invariants that make a design system last',
    excerpt: 'Most design systems collapse within 18 months. The ones that survive share a common trait: they are constraint systems, not component libraries. Here is what I\'ve learned from building three.',
    readTime: '8 min',
  },
  {
    date: 'Feb 2026', tag: 'Typography',
    title: 'Why warm grays change everything',
    excerpt: 'The difference between a UI that feels "designed" and one that feels "built" often comes down to a single HSL decision. A deep dive into color temperature, undertone, and the mnemonic that keeps me honest.',
    readTime: '6 min',
  },
  {
    date: 'Nov 2025', tag: 'Engineering',
    title: 'Shipping design tokens without a design token library',
    excerpt: 'Design tokens have become over-engineered. CSS custom properties and a single JSON source of truth is all you need — for most teams. An opinionated workflow from design file to production CSS.',
    readTime: '10 min',
  },
  {
    date: 'Aug 2025', tag: 'Process',
    title: 'The feedback loop that kills good design',
    excerpt: 'Stakeholder review is where taste goes to die. Not because stakeholders have bad taste — but because the format of the review creates the wrong conditions for good decisions.',
    readTime: '5 min',
  },
]

export function Writing() {
  return (
    <section id="writing" style={{ padding: '100px 32px', background: '#141413' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 64, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div data-writing-eyebrow className="eyebrow" style={{ color: '#6b6a64', marginBottom: 18 }}>
              Thinking out loud
            </div>
            <h2
              data-writing-title
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500,
                lineHeight: 1.15, color: '#f5f4ed',
                borderLeft: '3px solid #2D5A8A', paddingLeft: 16, borderRadius: 2,
              }}
            >
              Writing
            </h2>
          </div>
          <a href="#" className="link-underline"
            style={{ fontSize: '0.8rem', color: '#6b6a64', whiteSpace: 'nowrap', marginBottom: 4 }}>
            All posts →
          </a>
        </div>

        {/* Cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {posts.map(post => (
            <article
              key={post.title}
              data-writing-card
              style={{
                background: '#1e1e1c',
                border: '1px solid rgba(232,230,220,0.07)',
                borderRadius: 12, padding: '28px 32px', cursor: 'pointer',
                transition: 'border-color 0.25s, transform 0.25s, box-shadow 0.25s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(45,90,138,0.4)'
                el.style.transform = 'translateY(-3px)'
                el.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'rgba(232,230,220,0.07)'
                el.style.transform = 'translateY(0)'
                el.style.boxShadow = 'none'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <span style={{
                  background: 'rgba(45,90,138,0.2)', color: '#2D5A8A',
                  fontSize: '0.63rem', fontWeight: 600, letterSpacing: '1px',
                  textTransform: 'uppercase', padding: '3px 9px', borderRadius: 3,
                }}>
                  {post.tag}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#504e49' }}>
                  {post.date} · {post.readTime}
                </span>
              </div>
              <h3 style={{
                fontFamily: 'var(--font-serif)', fontSize: '1.2rem', fontWeight: 500,
                color: '#f5f4ed', lineHeight: 1.3, marginBottom: 12,
              }}>
                {post.title}
              </h3>
              <p style={{ fontSize: '0.83rem', color: '#6b6a64', lineHeight: 1.65, margin: 0 }}>
                {post.excerpt}
              </p>
              <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(232,230,220,0.06)' }}>
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: '0.73rem', color: '#2D5A8A', fontWeight: 500 }}>
                  Read →
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
