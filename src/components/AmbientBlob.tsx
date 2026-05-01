import { useEffect, useRef } from 'react'

/**
 * AmbientBlob — a large, blurry color blob that follows the cursor
 * with a spring-like delay. Creates a dreamy "light source" feel.
 */
export function AmbientBlob() {
  const blobRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const blob = blobRef.current
    if (!blob) return

    let cx = window.innerWidth / 2
    let cy = window.innerHeight / 2
    let tx = cx, ty = cy
    let rafId: number

    const onMove = (e: MouseEvent) => {
      tx = e.clientX
      ty = e.clientY
    }
    window.addEventListener('mousemove', onMove)

    const tick = () => {
      // Smooth lerp toward target
      cx += (tx - cx) * 0.06
      cy += (ty - cy) * 0.06
      blob.style.left = `${cx}px`
      blob.style.top  = `${cy}px`
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <div
      ref={blobRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        width: 480,
        height: 480,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(27,54,93,0.07) 0%, transparent 65%)',
        transform: 'translate(-50%, -50%)',
        pointerEvents: 'none',
        zIndex: 0,
        mixBlendMode: 'multiply',
        filter: 'blur(2px)',
        transition: 'none',
        willChange: 'left, top',
      }}
    />
  )
}
