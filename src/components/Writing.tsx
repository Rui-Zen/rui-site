const posts = [
  { date: '2025', title: 'The Ten Invariants of Design Systems', tag: 'Systems' },
  { date: '2024', title: 'Why Warm Grays Change Everything', tag: 'Design' },
  { date: '2024', title: 'Shipping Design Tokens via CSS', tag: 'Tech' },
]

export function Writing() {
  return (
    <section id="writing" className="seamless-section" style={{ background: 'var(--bg-parchment)' }}>
      <div className="section-container section-inner">
        <div className="eyebrow" style={{ marginBottom: '40px' }}>Thinking</div>
        <h2 className="section-title">Writing</h2>

        <div style={{ marginTop: '80px', borderTop: '1px solid var(--neutral-light)' }}>
          {posts.map(post => (
            <a 
              key={post.title} 
              href="#" 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                padding: '40px 0', 
                borderBottom: '1px solid var(--neutral-light)',
                textDecoration: 'none',
                color: 'inherit',
                transition: 'padding-left 0.4s ease'
              }}
              onMouseEnter={e => (e.currentTarget.style.paddingLeft = '20px')}
              onMouseLeave={e => (e.currentTarget.style.paddingLeft = '0')}
            >
              <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--neutral-gray)' }}>{post.date}</span>
                <h3 style={{ fontSize: '2rem' }}>{post.title}</h3>
              </div>
              <div className="tag">{post.tag}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
