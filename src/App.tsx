import { useCallback, useEffect, useRef, useState } from 'react'
import './index.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Work } from './components/Work'
import { Skills } from './components/Skills'
import { Writing } from './components/Writing'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { GeometricBackground } from './components/GeometricBackground'
import { LoadingScreen } from './components/LoadingScreen'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const mainRef = useRef<HTMLDivElement>(null)
  const shellRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  useEffect(() => {
    // ── Custom cursor ──────────────────────────────────
    const cursor = document.querySelector<HTMLElement>('[data-cursor]')
    const dot = document.querySelector<HTMLElement>('[data-cursor-dot]')
    if (cursor && dot) {
      let mx = -100, my = -100, cx = -100, cy = -100, scale = 1

      const onMove = (e: MouseEvent) => {
        mx = e.clientX; my = e.clientY
        dot.style.transform = `translate3d(${mx}px,${my}px,0) translate(-50%,-50%)`
        cursor.style.opacity = '1'
        dot.style.opacity = '1'
      }

      window.addEventListener('mousemove', onMove)
      window.addEventListener('mouseover', (e) => {
        if ((e.target as HTMLElement).closest('a, button, .tilt-card, [data-magnetic]')) {
          scale = 1.5; cursor.style.opacity = '0.5'
        }
      })
      window.addEventListener('mouseout', (e) => {
        if ((e.target as HTMLElement).closest('a, button, .tilt-card, [data-magnetic]')) {
          scale = 1; cursor.style.opacity = '1'
        }
      })

      const tick = () => {
        if (mx !== -100) {
          cx += (mx - cx) * 0.15
          cy += (my - cy) * 0.15
          cursor.style.transform = `translate3d(${cx}px,${cy}px,0) translate(-50%,-50%) scale(${scale})`
        }
        requestAnimationFrame(tick)
      }
      tick()
    }

    // ── Vertical Depth/Zoom Effects ────────────────────
    const sections = gsap.utils.toArray<HTMLElement>('.paper-section')

    sections.forEach((section) => {
      // Don't apply this to the hero section so it loads normally
      if (section.id === 'hero' || section.id === 'work') return

      const inner = section.querySelector('.section-inner')
      
      if (inner) {
        // Zoom in as it enters from the bottom
        gsap.fromTo(inner,
          { scale: 0.85, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              end: 'top 30%',
              scrub: 1,
            }
          }
        )

        // Zoom out as it leaves at the top
        gsap.fromTo(inner,
          { scale: 1, opacity: 1 },
          {
            scale: 0.9,
            opacity: 0,
            ease: 'power2.in',
            scrollTrigger: {
              trigger: section,
              start: 'bottom 50%',
              end: 'bottom 0%',
              scrub: 1,
            }
          }
        )
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div style={{ backgroundColor: 'var(--bg-parchment)', minHeight: '100vh', overflowX: 'hidden' }}>
      <div id="bg-layer" />
      <div className="noise-overlay" />
      <GeometricBackground />

      {/* Custom cursor */}
      <div
        data-cursor
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 40, height: 40,
          borderRadius: '50%',
          border: '1px solid var(--brand)',
          pointerEvents: 'none', zIndex: 10000,
          willChange: 'transform',
          opacity: 0,
          transition: 'opacity 0.3s'
        }}
      />
      <div
        data-cursor-dot
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 4, height: 4,
          borderRadius: '50%',
          background: 'var(--brand)',
          pointerEvents: 'none', zIndex: 10001,
          willChange: 'transform',
          opacity: 0,
          transition: 'opacity 0.3s'
        }}
      />

      <div ref={shellRef} className={`site-shell${isLoading ? ' site-shell--loading' : ''}`}>
        <Nav />

        <main ref={mainRef}>
          <Hero />
          <About />
          <Work />
          <Skills />
          <Writing />
          <Contact />
          <Footer />
        </main>
      </div>

      {isLoading && <LoadingScreen shellRef={shellRef} onComplete={handleLoadingComplete} />}
    </div>
  )
}

export default App
