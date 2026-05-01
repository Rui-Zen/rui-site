interface MarqueeProps {
  dark?: boolean
  reverse?: boolean
  items?: string[]
}

const defaultItems = [
  'Design Thinking',
  '✦',
  'Craft Precision',
  '✦',
  'Typography Systems',
  '✦',
  'Front-End Engineering',
  '✦',
  'Design Tokens',
  '✦',
  'Singapore',
  '✦',
  'Open to Projects',
  '✦',
  'CJK Typography',
  '✦',
  'Print & Screen',
  '✦',
]

export function Marquee({ dark = false, reverse = false, items = defaultItems }: MarqueeProps) {
  const doubled = [...items, ...items, ...items]

  return (
    <div
      style={{
        overflow: 'hidden',
        background: dark ? '#141413' : '#1B365D',
        borderTop: dark ? '1px solid rgba(232,230,220,0.06)' : 'none',
        borderBottom: dark ? '1px solid rgba(232,230,220,0.06)' : 'none',
        padding: '14px 0',
        userSelect: 'none',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: 'max-content',
          animation: `marquee-scroll ${reverse ? 'reverse' : 'normal'} 40s linear infinite`,
          gap: 0,
        }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            style={{
              fontFamily: item === '✦' ? 'serif' : 'var(--font-sans)',
              fontSize: item === '✦' ? '0.7rem' : '0.68rem',
              fontWeight: item === '✦' ? 400 : 500,
              letterSpacing: item === '✦' ? 0 : '1.5px',
              textTransform: 'uppercase',
              color: dark ? '#504e49' : 'rgba(245,244,237,0.7)',
              padding: '0 24px',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
