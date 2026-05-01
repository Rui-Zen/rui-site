import { useEffect, useRef } from 'react'

/**
 * FloatingShapes — SVG geometric shapes that drift slowly in the background.
 * Painted on a fixed canvas behind all content.
 */
export function FloatingShapes() {
  const ref = useRef<HTMLDivElement>(null)

  const shapes = [
    // Hero region
    { type: 'ring',   x: 88, y: 14,  size: 180, speed: 0.0006, phase: 0 },
    { type: 'dot',    x: 12, y: 28,  size: 8,   speed: 0.0009, phase: 1.2 },
    { type: 'cross',  x: 92, y: 42,  size: 22,  speed: 0.0007, phase: 2.1 },
    // About (dark) region
    { type: 'ring',   x: 5,  y: 56,  size: 120, speed: 0.0005, phase: 0.7 },
    { type: 'dot',    x: 95, y: 62,  size: 6,   speed: 0.001,  phase: 3.0 },
    // Skills
    { type: 'cross',  x: 8,  y: 75,  size: 18,  speed: 0.0008, phase: 1.5 },
    { type: 'ring',   x: 93, y: 80,  size: 90,  speed: 0.0006, phase: 2.5 },
    // Contact
    { type: 'dot',    x: 15, y: 92,  size: 10,  speed: 0.0007, phase: 0.3 },
    { type: 'cross',  x: 88, y: 95,  size: 26,  speed: 0.0009, phase: 1.8 },
  ]

  useEffect(() => {
    const container = ref.current
    if (!container) return
    let rafId: number
    let t = 0

    const svgEls = container.querySelectorAll<SVGElement>('[data-shape]')

    const tick = () => {
      t += 1
      svgEls.forEach((el, i) => {
        const s = shapes[i]
        if (!s) return
        const floatY = Math.sin(t * s.speed * 1000 + s.phase) * 12
        const floatX = Math.cos(t * s.speed * 700 + s.phase) * 6
        const rot    = Math.sin(t * s.speed * 500 + s.phase) * 8
        el.style.transform = `translate(${floatX}px, ${floatY}px) rotate(${rot}deg)`
      })
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      {shapes.map((s, i) => {
        const color = 'rgba(27,54,93,0.09)'
        const style: React.CSSProperties = {
          position: 'absolute',
          left: `${s.x}%`,
          top: `${s.y}%`,
          transition: 'none',
          willChange: 'transform',
        }

        if (s.type === 'ring') return (
          <svg key={i} data-shape width={s.size} height={s.size} style={style} viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="1.5" />
            <circle cx="50" cy="50" r="32" stroke={color} strokeWidth="0.8" />
          </svg>
        )

        if (s.type === 'cross') return (
          <svg key={i} data-shape width={s.size} height={s.size} style={style} viewBox="0 0 100 100" fill="none">
            <line x1="50" y1="5" x2="50" y2="95" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <line x1="5" y1="50" x2="95" y2="50" stroke={color} strokeWidth="2" strokeLinecap="round" />
          </svg>
        )

        // dot
        return (
          <svg key={i} data-shape width={s.size} height={s.size} style={style} viewBox="0 0 10 10" fill="none">
            <circle cx="5" cy="5" r="4" fill={color} />
          </svg>
        )
      })}
    </div>
  )
}
