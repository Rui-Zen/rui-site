import { useEffect } from 'react'
import './index.css'
import { Nav }     from './components/Nav'
import { Hero }    from './components/Hero'
import { About }   from './components/About'
import { Work }    from './components/Work'
import { Skills }  from './components/Skills'
import { Writing } from './components/Writing'
import { Contact } from './components/Contact'
import { Footer }  from './components/Footer'
import { AmbientBlob } from './components/AmbientBlob'
import { initAllAnimations } from './lib/animations'

function App() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        initAllAnimations()
      } catch (e) {
        console.error("Animation init failed:", e)
      }
    }, 200)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div style={{ backgroundColor: 'var(--bg-parchment)', minHeight: '100vh' }}>
      <div id="bg-layer" />
      <div className="noise-overlay" />
      <AmbientBlob />
      
      <div
        data-cursor
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 40, height: 40,
          borderRadius: '50%',
          border: '1px solid var(--accent-blue)',
          pointerEvents: 'none', zIndex: 10000,
          willChange: 'transform',
          opacity: 0, // Hide until moved
          transition: 'opacity 0.3s'
        }}
      />
      <div
        data-cursor-dot
        style={{
          position: 'fixed', top: 0, left: 0,
          width: 4, height: 4,
          borderRadius: '50%',
          background: 'var(--accent-blue)',
          pointerEvents: 'none', zIndex: 10001,
          willChange: 'transform',
          opacity: 0, // Hide until moved
          transition: 'opacity 0.3s'
        }}
      />

      <Nav />
      
      <main>
        <Hero />
        <About />
        <Work />
        <Skills />
        <Writing />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App
