export function Contact() {
  return (
    <section id="contact" className="seamless-section" style={{ background: 'var(--neutral-dark)', color: 'var(--bg-parchment)', paddingBottom: '0' }}>
      <div className="section-container section-inner" style={{ textAlign: 'center', minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="eyebrow" style={{ color: 'var(--neutral-gray)', justifyContent: 'center', marginBottom: '40px' }}>Connection</div>
        <h2 className="big-title" style={{ color: 'var(--bg-parchment)', marginBottom: '60px' }}>
          Let's Design <br /> The Future.
        </h2>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
          <a 
            href="mailto:hello@ruizen.design" 
            className="link-underline"
            style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--accent-blue-light)' }}
          >
            hello@ruizen.design
          </a>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', marginTop: '80px' }}>
          {['LinkedIn', 'Twitter', 'GitHub', 'Read.cv'].map(social => (
            <a 
              key={social} 
              href="#" 
              className="link-underline"
              style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--neutral-gray)' }}
            >
              {social}
            </a>
          ))}
        </div>
      </div>
      
      {/* Visual Transition to Footer */}
      <div style={{ height: '200px', background: 'linear-gradient(to bottom, var(--neutral-dark), #141413)' }} />
    </section>
  )
}
