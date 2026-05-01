const skillGroups = [
  {
    eyebrow: 'Core discipline',
    title: 'Design',
    items: [
      { name: 'Product Design', level: 95 },
      { name: 'Design Systems', level: 92 },
      { name: 'Typography',     level: 90 },
      { name: 'UX Research',    level: 80 },
      { name: 'Motion Design',  level: 72 },
    ],
  },
  {
    eyebrow: 'Front-end stack',
    title: 'Engineering',
    items: [
      { name: 'React / TypeScript', level: 88 },
      { name: 'CSS / Tailwind',     level: 94 },
      { name: 'Next.js',            level: 82 },
      { name: 'Node.js',            level: 72 },
      { name: 'SQL / Postgres',     level: 65 },
    ],
  },
  {
    eyebrow: 'Tooling & process',
    title: 'Tools',
    items: [
      { name: 'Figma',          level: 97 },
      { name: 'Git / GitHub',   level: 85 },
      { name: 'Storybook',      level: 78 },
      { name: 'Linear / Notion',level: 88 },
      { name: 'Framer',         level: 75 },
    ],
  },
]

const toolTags = [
  'Accessibility', 'A/B Testing', 'Design Tokens', 'Atomic Design',
  'Component APIs', 'Animation', 'Print / PDF', 'CJK Typography', 'Documentation',
]

export function Skills() {
  return (
    <section id="skills" style={{ padding: '100px 32px', background: '#faf9f5' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <div data-skills-eyebrow className="eyebrow" style={{ marginBottom: 18 }}>Capabilities</div>
          <h2 data-skills-title className="section-title">Skills &amp; Expertise</h2>
        </div>

        {/* Skill groups */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginBottom: 56 }}>
          {skillGroups.map((group, gi) => (
            <div
              key={group.title}
              data-skill-group
              style={{
                background: '#f5f4ed',
                border: '1px solid #e8e6dc',
                borderRadius: 12,
                padding: '28px 28px 32px',
              }}
            >
              <div data-group-header>
                <div className="eyebrow" style={{ marginBottom: 12 }}>{group.eyebrow}</div>
                <h3 style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.35rem', fontWeight: 500, color: '#141413',
                  marginBottom: 24, borderBottom: '1px solid #e8e6dc', paddingBottom: 14,
                }}>
                  {group.title}
                </h3>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {group.items.map((item, ii) => (
                  <div key={item.name}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                      <span
                        data-skill-label
                        style={{ fontSize: '0.83rem', color: '#3d3d3a', fontWeight: 500 }}
                      >
                        {item.name}
                      </span>
                      <span
                        data-skill-pct
                        style={{
                          fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
                          color: '#1B365D', fontVariantNumeric: 'tabular-nums',
                        }}
                      >
                        0%
                      </span>
                    </div>
                    {/* Bar track */}
                    <div style={{ position: 'relative', height: 4, background: '#e8e6dc', borderRadius: 2, overflow: 'hidden' }}>
                      <div
                        data-skill-bar-fill
                        data-target={item.level}
                        style={{
                          position: 'absolute', inset: '0 auto 0 0',
                          background: '#1B365D', borderRadius: 2,
                          width: '0%',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tag cloud */}
        <div>
          <div className="eyebrow" style={{ marginBottom: 20 }}>Also versed in</div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {toolTags.map(t => (
              <span
                key={t}
                data-skill-tag
                className="tag-mid"
                style={{ padding: '6px 14px', fontSize: '0.72rem' }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
