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
import { initAllAnimations } from './lib/animations'

function App() {
  useEffect(() => {
    // Small rAF delay ensures DOM is fully painted before anime reads positions
    const raf = requestAnimationFrame(() => {
      setTimeout(() => initAllAnimations(), 80)
    })
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <>
      {/* Custom cursor (hidden on touch devices via CSS) */}
      <div
        data-cursor
        style={{
          position: 'fixed',
          width: 32, height: 32,
          borderRadius: '50%',
          border: '1.5px solid rgba(27,54,93,0.6)',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          transition: 'opacity 0.3s',
          mixBlendMode: 'multiply',
        }}
      />
      <div
        data-cursor-dot
        style={{
          position: 'fixed',
          width: 5, height: 5,
          borderRadius: '50%',
          background: '#1B365D',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
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
    </>
  )
}

export default App
