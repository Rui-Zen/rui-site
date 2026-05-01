import { useState } from 'react'

const projects = [
  {
    id: 'atlas',
    eyebrow: 'Product Design · 2025',
    title: 'Atlas Finance',
    subtitle: 'Redesigning wealth management for the modern investor',
    tags: ['Figma', 'React', 'TypeScript', 'Design System'],
    description: 'Led end-to-end redesign of a wealth management platform serving 80,000+ retail investors. Reduced onboarding drop-off by 34% and raised NPS from 42 to 71 through a new information architecture and unified design system.',
    metrics: [
      { v: '34', suffix: '%', prefix: '−', l: 'Drop-off' },
      { v: '29', suffix: 'pt', prefix: '+', l: 'NPS lift' },
      { v: '80', suffix: 'k+', prefix: '', l: 'Users' },
    ],
  },
  {
    id: 'noto',
    eyebrow: 'Full-Stack · 2024',
    title: 'Noto Editor',
    subtitle: 'A distraction-free writing environment with AI-assisted structure',
    tags: ['Next.js', 'Tiptap', 'OpenAI', 'Postgres'],
    description: 'Designed and built an AI-integrated writing tool from zero to 4,000 active monthly users. Features include block-level AI suggestions, real-time collaboration, and a publishing pipeline to Notion, Ghost, and Substack.',
    metrics: [
      { v: '4', suffix: 'k+', prefix: '', l: 'Monthly users' },
      { v: '0', suffix: '→1', prefix: '', l: 'Solo built' },
      { v: '3', suffix: '', prefix: '', l: 'Integrations' },
    ],
  },
  {
    id: 'kami',
    eyebrow: 'Design Systems · 2024',
    title: 'Kami Design System',
    subtitle: 'A warm, print-inspired constraint system for long-form digital documents',
    tags: ['CSS', 'Typography', 'Documentation', 'WeasyPrint'],
    description: 'Authored a comprehensive design system blending editorial restraint with CJK typography conventions. Used across 6 client engagements to produce consistent, print-ready documents and web interfaces.',
    metrics: [
      { v: '6', suffix: '', prefix: '', l: 'Deployments' },
      { v: '10', suffix: '', prefix: '', l: 'Core invariants' },
      { v: '3', suffix: '', prefix: '', l: 'Languages' },
    ],
  },
  {
    id: 'loop',
    eyebrow: 'UX Research · 2023',
    title: 'Loop Feedback',
    subtitle: 'Closing the feedback loop between designers and their stakeholders',
    tags: ['UX Research', 'Prototyping', 'Vue.js', 'Firebase'],
    description: 'Researched and designed a stakeholder-feedback tool for design agencies. Replaced lengthy Zoom calls with structured, async visual annotation — cutting feedback cycles from days to hours for 12 agency clients.',
    metrics: [
      { v: '12', suffix: '', prefix: '', l: 'Agency clients' },
      { v: '70', suffix: '%', prefix: '−', l: 'Review time' },
      { v: '2', suffix: 'wks', prefix: '', l: 'Ship cycle' },
    ],
  },
]

export function Work() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section id="work" style={{ padding: '100px 32px', background: '#f5f4ed' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <div data-work-eyebrow className="eyebrow" style={{ marginBottom: 18 }}>Selected work</div>
          <h2 data-work-title className="section-title">Projects &amp; Case Studies</h2>
        </div>

        {/* Project cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {projects.map(p => (
            <div
              key={p.id}
              data-work-card
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                background: '#faf9f5',
                border: '1px solid #e8e6dc',
                borderRadius: 10,
                padding: '36px 40px',
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: 32,
                alignItems: 'start',
                borderLeft: hovered === p.id ? '3px solid #1B365D' : '3px solid transparent',
                transition: 'border-left 0.25s, box-shadow 0.25s',
                cursor: 'default',
              }}
            >
              {/* Left */}
              <div>
                <div className="eyebrow" style={{ marginBottom: 12 }}>{p.eyebrow}</div>
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
                  fontWeight: 500, color: '#141413',
                  marginBottom: 6, lineHeight: 1.2,
                }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#504e49', marginBottom: 16, lineHeight: 1.45 }}>
                  {p.subtitle}
                </p>
                <p style={{ fontSize: '0.85rem', color: '#6b6a64', lineHeight: 1.65, maxWidth: 580, marginBottom: 20 }}>
                  {p.description}
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {p.tags.map(t => <span key={t} data-tag className="tag">{t}</span>)}
                </div>
              </div>

              {/* Right: metrics */}
              <div style={{
                display: 'flex', flexDirection: 'column', gap: 24,
                minWidth: 140, paddingLeft: 32, borderLeft: '1px solid #e8e6dc',
              }}>
                {p.metrics.map(m => (
                  <div key={m.l}>
                    <div
                      data-metric-value
                      data-metric-raw={m.v}
                      data-metric-suffix={m.suffix}
                      data-metric-prefix={m.prefix}
                      className="metric-value"
                      style={{ fontSize: '1.8rem' }}
                    >
                      {m.prefix}0{m.suffix}
                    </div>
                    <div className="metric-label" style={{ marginTop: 2 }}>{m.l}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div data-work-note style={{ marginTop: 48, textAlign: 'center' }}>
          <p style={{ fontSize: '0.82rem', color: '#6b6a64' }}>
            More work available on request —&nbsp;
            <a href="#contact" className="link-underline" style={{ fontSize: '0.82rem' }}>get in touch</a>
          </p>
        </div>
      </div>
    </section>
  )
}
