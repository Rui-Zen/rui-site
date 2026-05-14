import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * A lightweight Animate-On-Scroll system powered by GSAP + ScrollTrigger.
 *
 * Usage in JSX:
 *   <div data-aos="fade-up">…</div>
 *   <div data-aos="fade-left" data-aos-delay="0.2">…</div>
 *   <div data-aos="zoom-in" data-aos-duration="1.2">…</div>
 *
 * Supported variants: fade-up, fade-down, fade-left, fade-right,
 *                     fade-in, zoom-in, zoom-out, blur-in, slide-up
 *
 * Optional attributes:
 *   data-aos-delay      number (seconds)        default 0
 *   data-aos-duration   number (seconds)        default 0.9
 *   data-aos-stagger    selector for children   default none
 *   data-aos-start      ScrollTrigger start     default "top 85%"
 *   data-aos-once       "true" | "false"        default "false"
 */
export function useScrollReveal(deps: unknown[] = []) {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-aos]'))
    const triggers: ScrollTrigger[] = []

    if (reduceMotion) {
      els.forEach(el => { el.style.opacity = '1' })
      return
    }

    els.forEach(el => {
      const variant = el.dataset.aos || 'fade-up'
      const delay = parseFloat(el.dataset.aosDelay || '0')
      const duration = parseFloat(el.dataset.aosDuration || '0.9')
      const start = el.dataset.aosStart || 'top 85%'
      const once = el.dataset.aosOnce === 'true'
      const staggerSel = el.dataset.aosStagger

      const fromMap: Record<string, gsap.TweenVars> = {
        'fade-up':    { y: 40, opacity: 0 },
        'fade-down':  { y: -40, opacity: 0 },
        'fade-left':  { x: -40, opacity: 0 },
        'fade-right': { x: 40, opacity: 0 },
        'fade-in':    { opacity: 0 },
        'zoom-in':    { scale: 0.92, opacity: 0 },
        'zoom-out':   { scale: 1.08, opacity: 0 },
        'blur-in':    { opacity: 0, filter: 'blur(10px)', y: 20 },
        'slide-up':   { y: 80, opacity: 0 },
      }

      const fromVars = fromMap[variant] ?? fromMap['fade-up']
      const toVars: gsap.TweenVars = {
        x: 0, y: 0, opacity: 1, scale: 1, filter: 'blur(0px)',
        duration,
        delay,
        ease: variant === 'zoom-in' || variant === 'zoom-out' ? 'back.out(1.4)' : 'power3.out',
      }

      const targets: gsap.DOMTarget = staggerSel
        ? Array.from(el.querySelectorAll<HTMLElement>(staggerSel))
        : el

      // Skip if stagger selector returns nothing — avoids "GSAP target not found"
      if (Array.isArray(targets) && targets.length === 0) return

      const tween = gsap.fromTo(targets, fromVars, {
        ...toVars,
        stagger: staggerSel ? 0.1 : 0,
        scrollTrigger: {
          trigger: el,
          start,
          toggleActions: once ? 'play none none none' : 'play none none reverse',
        },
      })

      const st = tween.scrollTrigger
      if (st) triggers.push(st)
    })

    // Refresh after layout/images settle
    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 250)

    return () => {
      window.clearTimeout(refreshId)
      triggers.forEach(t => t.kill())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
