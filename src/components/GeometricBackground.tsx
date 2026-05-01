import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger)

/**
 * GeometricBackground — fixed SVG geometric shapes (rings, crosses, dots, paper folds)
 * animated via GSAP parallax tied to scroll position. Paper-like and editorial.
 */
export function GeometricBackground() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const els = gsap.utils.toArray<SVGElement>('[data-geo]')

    els.forEach((el, i) => {
      // Each element drifts on scroll with a unique speed
      gsap.to(el, {
        y: `${(i % 2 === 0 ? -1 : 1) * (40 + i * 15)}`,
        rotation: (i % 3 === 0 ? 8 : i % 3 === 1 ? -6 : 4),
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 2,
        }
      })
    })

    // Subtle breathing animation
    els.forEach((el, i) => {
      gsap.to(el, {
        scale: 1 + (i % 2 === 0 ? 0.08 : -0.05),
        duration: 4 + i * 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      })
    })
  }, { scope: ref })

  const color = 'rgba(27,54,93,0.06)'
  const colorLight = 'rgba(27,54,93,0.03)'

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {/* Large ring — top right */}
      <svg data-geo style={{ position: 'absolute', right: '-4%', top: '8%' }} width="220" height="220" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="0.8" />
        <circle cx="50" cy="50" r="30" stroke={colorLight} strokeWidth="0.5" />
      </svg>

      {/* Cross — left mid */}
      <svg data-geo style={{ position: 'absolute', left: '6%', top: '35%' }} width="28" height="28" viewBox="0 0 100 100" fill="none">
        <line x1="50" y1="5" x2="50" y2="95" stroke={color} strokeWidth="3" strokeLinecap="round" />
        <line x1="5" y1="50" x2="95" y2="50" stroke={color} strokeWidth="3" strokeLinecap="round" />
      </svg>

      {/* Diamond — right mid */}
      <svg data-geo style={{ position: 'absolute', right: '12%', top: '48%' }} width="18" height="18" viewBox="0 0 100 100" fill="none">
        <rect x="15" y="15" width="70" height="70" stroke={color} strokeWidth="2" transform="rotate(45 50 50)" />
      </svg>

      {/* Dot cluster — bottom left */}
      <svg data-geo style={{ position: 'absolute', left: '10%', bottom: '20%' }} width="10" height="10" viewBox="0 0 10 10" fill="none">
        <circle cx="5" cy="5" r="4" fill={color} />
      </svg>

      {/* Large triangle — bottom right (paper fold feel) */}
      <svg data-geo style={{ position: 'absolute', right: '5%', bottom: '12%' }} width="160" height="160" viewBox="0 0 100 100" fill="none">
        <polygon points="50,10 90,90 10,90" stroke={colorLight} strokeWidth="0.6" fill="none" />
      </svg>

      {/* Horizontal line — top left */}
      <svg data-geo style={{ position: 'absolute', left: '15%', top: '15%' }} width="120" height="2" viewBox="0 0 120 2" fill="none">
        <line x1="0" y1="1" x2="120" y2="1" stroke={color} strokeWidth="1" />
      </svg>

      {/* Small ring — mid-center */}
      <svg data-geo style={{ position: 'absolute', left: '50%', top: '60%' }} width="60" height="60" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="44" stroke={colorLight} strokeWidth="0.6" />
      </svg>

      {/* Paper corner fold mark — top right area */}
      <svg data-geo style={{ position: 'absolute', right: '20%', top: '25%' }} width="40" height="40" viewBox="0 0 40 40" fill="none">
        <path d="M0 40 L40 0" stroke={color} strokeWidth="0.8" />
        <path d="M30 0 L40 0 L40 10" stroke={color} strokeWidth="0.6" fill="none" />
      </svg>
    </div>
  )
}
