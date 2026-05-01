import { useState } from 'react'

export function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('hello@ruizen.design').then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const links = [
    { label: 'GitHub',   href: 'https://github.com',  icon: 'GH' },
    { label: 'Twitter',  href: 'https://twitter.com',  icon: 'TW' },
    { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'LI' },
    { label: 'Dribbble', href: 'https://dribbble.com', icon: 'DR' },
  ]

  return (
    <section id="contact" style={{ padding: '100px 32px 80px', background: '#f5f4ed' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 64, textAlign: 'center' }}>
          <div data-contact-eyebrow className="eyebrow" style={{ justifyContent: 'center', marginBottom: 20 }}>
            Let's talk
          </div>
          <h2
            data-contact-h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
              fontWeight: 500, lineHeight: 1.1,
              color: '#141413', marginBottom: 20, letterSpacing: '-0.02em',
            }}
          >
            Have a project in mind?
          </h2>
          <p
            data-contact-sub
            style={{
              fontFamily: 'var(--font-sans)', fontSize: '1rem', color: '#504e49',
              maxWidth: 480, margin: '0 auto 40px', lineHeight: 1.65,
            }}
          >
            I take on a small number of projects each quarter to ensure each one gets the depth it deserves. Let's see if we're a fit.
          </p>
        </div>

        {/* Email block */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 48 }}>
          <div
            data-contact-email
            style={{
              display: 'flex', alignItems: 'center', gap: 0,
              background: '#faf9f5', border: '1px solid #e8e6dc',
              borderRadius: 10, overflow: 'hidden',
              boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            }}
          >
            <div style={{
              padding: '16px 28px',
              fontFamily: 'var(--font-mono)', fontSize: '0.95rem', color: '#141413',
              borderRight: '1px solid #e8e6dc',
            }}>
              hello@ruizen.design
            </div>
            <button
              onClick={copyEmail}
              data-magnetic
              style={{
                padding: '16px 24px', background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'var(--font-sans)', fontSize: '0.75rem', fontWeight: 600,
                letterSpacing: '1px', textTransform: 'uppercase',
                color: copied ? '#1B365D' : '#6b6a64', transition: 'color 0.2s',
              }}
            >
              {copied ? '✓ Copied!' : 'Copy'}
            </button>
          </div>
        </div>

        {/* Divider */}
        <div data-contact-divider style={{ display: 'flex', alignItems: 'center', gap: 20, maxWidth: 400, margin: '0 auto 40px' }}>
          <div style={{ flex: 1, height: 1, background: '#e8e6dc' }} />
          <span style={{ fontSize: '0.7rem', color: '#6b6a64', letterSpacing: 1, textTransform: 'uppercase' }}>or find me on</span>
          <div style={{ flex: 1, height: 1, background: '#e8e6dc' }} />
        </div>

        {/* Social links */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 80 }}>
          {links.map(l => (
            <a
              key={l.label}
              data-contact-social
              data-magnetic
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 20px',
                background: '#faf9f5', border: '1px solid #e8e6dc',
                borderRadius: 8, textDecoration: 'none',
                fontFamily: 'var(--font-sans)', fontSize: '0.8rem', fontWeight: 500, color: '#3d3d3a',
                transition: 'border-color 0.2s, color 0.2s, transform 0.2s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.borderColor = '#1B365D'; el.style.color = '#1B365D'; el.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement
                el.style.borderColor = '#e8e6dc'; el.style.color = '#3d3d3a'; el.style.transform = 'translateY(0)'
              }}
            >
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                background: '#EEF2F7', color: '#1B365D', padding: '2px 6px', borderRadius: 3,
              }}>
                {l.icon}
              </span>
              {l.label}
            </a>
          ))}
        </div>

        {/* Availability banner */}
        <div data-contact-avail style={{ maxWidth: 560, margin: '0 auto' }}>
          <div style={{
            background: '#faf9f5', border: '1px solid #e8e6dc',
            borderLeft: '3px solid #1B365D', borderRadius: '0 8px 8px 0',
            padding: '18px 24px', display: 'flex', alignItems: 'center', gap: 16,
          }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#4caf50', flexShrink: 0, boxShadow: '0 0 0 3px rgba(76,175,80,0.2)' }} />
            <div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.78rem', fontWeight: 600, color: '#141413', letterSpacing: '0.3px' }}>
                Available for Q3 2026 projects
              </div>
              <div style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', color: '#6b6a64', marginTop: 2 }}>
                Currently accepting design + development engagements
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
