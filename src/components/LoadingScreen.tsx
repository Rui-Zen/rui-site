import type { RefObject } from 'react'
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import profileImage from '../assets/profile.webp'

gsap.registerPlugin(ScrollTrigger)

type LoadingScreenProps = {
  shellRef: RefObject<HTMLDivElement | null>
  onComplete: () => void
}

export function LoadingScreen({ shellRef, onComplete }: LoadingScreenProps) {
  const loaderRef = useRef<HTMLDivElement>(null)
  const numberRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const shell = shellRef.current
    if (!shell) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    gsap.set(shell, { autoAlpha: 0, y: 14 })
    gsap.set('.loader-progress-fill', { scaleX: 0 })
    gsap.set('.loader-wipe-panel', { yPercent: 100 })
    gsap.set('.loader-reveal-slit', { scaleX: 0 })

    if (reduceMotion) {
      gsap.set(shell, { autoAlpha: 1, y: 0 })
      const tween = gsap.to(loaderRef.current, {
        autoAlpha: 0,
        duration: 0.2,
        onComplete: () => {
          document.body.style.overflow = previousOverflow
          ScrollTrigger.refresh()
          onComplete()
        },
      })

      return () => {
        document.body.style.overflow = previousOverflow
        tween.kill()
      }
    }

    const counter = { value: 0 }
    const tl = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        document.body.style.overflow = previousOverflow
        ScrollTrigger.refresh()
        onComplete()
      },
    })

    tl.fromTo('.loader-frame-line',
      { scaleX: 0 },
      { scaleX: 1, duration: 0.42, stagger: 0.08, transformOrigin: 'left center' }
    )
    .fromTo('.loader-photo-stamp',
      { y: 14, opacity: 0, clipPath: 'inset(18% 0 0 0)' },
      { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 0.48 },
      '-=0.28'
    )
    .fromTo('.loader-caption',
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.36, stagger: 0.06 },
      '-=0.32'
    )
    .to(counter,
      {
        value: 100,
        duration: 1,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (numberRef.current) {
            numberRef.current.textContent = String(Math.round(counter.value)).padStart(2, '0')
          }
        },
      },
      '-=0.15'
    )
    .to('.loader-progress-fill',
      { scaleX: 1, duration: 1, ease: 'power2.inOut' },
      '<'
    )
    .to('.loader-reveal-slit',
      { scaleX: 1, duration: 0.48, ease: 'power3.inOut' },
      '-=0.12'
    )
    .to('.loader-wipe-panel',
      { yPercent: 0, duration: 0.52, stagger: 0.055, ease: 'power3.inOut' },
      '-=0.2'
    )
    .to(shell,
      { autoAlpha: 1, y: 0, duration: 0.62, ease: 'power3.out' },
      '-=0.34'
    )
    .to('.loader-paper-stage',
      { y: -18, opacity: 0, duration: 0.36, ease: 'power2.inOut' },
      '<'
    )
    .to(loaderRef.current,
      { clipPath: 'inset(0 0 0 100%)', duration: 0.72, ease: 'power4.inOut' },
      '-=0.08'
    )

    return () => {
      document.body.style.overflow = previousOverflow
      tl.kill()
    }
  }, { scope: loaderRef, dependencies: [onComplete, shellRef] })

  return (
    <div ref={loaderRef} className="loading-screen" aria-label="Loading portfolio">
      <div className="loader-paper-stage">
        <div className="loader-frame-line loader-frame-line-top" />
        <div className="loader-frame-line loader-frame-line-bottom" />

        <div className="loader-paper-number" ref={numberRef}>00</div>

        <div className="loader-photo-stamp">
          <img src={profileImage} alt="Rui Zen" />
        </div>

        <div className="loader-caption loader-caption-left">
          <span>Rui Zen</span>
          <span>Portfolio Archive</span>
        </div>

        <div className="loader-caption loader-caption-right">
          <span>Warm paper</span>
          <span>Ink blue / 2026</span>
        </div>

        <div className="loader-progress" aria-hidden="true">
          <div className="loader-progress-fill" />
        </div>
      </div>

      <div className="loader-reveal-slit" aria-hidden="true" />
      <div className="loader-wipe" aria-hidden="true">
        <div className="loader-wipe-panel" />
        <div className="loader-wipe-panel" />
        <div className="loader-wipe-panel" />
        <div className="loader-wipe-panel" />
      </div>
    </div>
  )
}
