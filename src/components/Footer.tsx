export function Footer() {
  return (
    <footer style={{ background: '#141413', padding: '60px 40px', color: '#504e49', fontSize: '0.7rem' }}>
      <div className="section-container" style={{ padding: '0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>© 2026 Rui Zen. All rights reserved.</div>
        <div style={{ display: 'flex', gap: '32px' }}>
          <span>Singapore</span>
          <span>Remote-first</span>
          <span>Built with Anime.js</span>
        </div>
      </div>
    </footer>
  )
}
