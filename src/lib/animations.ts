/**
 * animations.ts — Robust Anime.js v4 scroll engine for Rui Zen
 */
import {
  animate,
  stagger,
  utils,
} from 'animejs'

// ─── Easing ───────────────────────────────────────────────────────────────

const easings = {
  outExpo: 'easeOutExpo',
  outQuart: 'easeOutQuart',
  outBack: 'easeOutBack(1.4)',
}

// ─── Text Splitting ────────────────────────────────────────────────────────

export function splitText(el: HTMLElement) {
  const text = el.textContent ?? ''
  el.textContent = ''
  return text.split('').map(char => {
    const span = document.createElement('span')
    span.textContent = char === ' ' ? '\u00A0' : char
    span.style.display = 'inline-block'
    el.appendChild(span)
    return span
  })
}

// ─── Intersection Observer ───────────────────────────────────────────────

function observeSections() {
  const options = {
    threshold: 0.15,
    rootMargin: '0px 0px -10% 0px'
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target as HTMLElement
        triggerSectionAnimation(el)
        observer.unobserve(el)
      }
    })
  }, options)

  document.querySelectorAll('.seamless-section').forEach(section => {
    observer.observe(section)
  })
}

function triggerSectionAnimation(section: HTMLElement) {
  const title = section.querySelector('.section-title')
  const inner = section.querySelector('.section-inner')
  const reveals = section.querySelectorAll('.reveal-mask')

  if (inner) {
    animate(inner, {
      translateY: [40, 0],
      opacity: [0, 1],
      duration: 800,
      ease: easings.outExpo
    })
  }

  if (title) {
    const chars = splitText(title as HTMLElement)
    animate(chars, {
      opacity: [0, 1],
      translateX: [-20, 0],
      duration: 600,
      delay: stagger(30),
      ease: easings.outExpo
    })
  }

  if (reveals.length) {
    animate(reveals, {
      clipPath: ['inset(100% 0 0 0)', 'inset(0% 0 0 0)'],
      duration: 1000,
      delay: stagger(100),
      ease: easings.outQuart
    })
  }
}

// ─── Specific Intros ─────────────────────────────────────────────────────

function initHeroIntro() {
  const h1 = document.querySelector('.hero-h1')
  const sub = document.querySelector('.hero-sub')
  const metrics = document.querySelectorAll('.metric-value')

  if (h1) {
    const chars = splitText(h1 as HTMLElement)
    animate(chars, {
      translateY: [60, 0],
      opacity: [0, 1],
      rotateX: [45, 0],
      duration: 1000,
      delay: stagger(25, { start: 200 }),
      ease: easings.outBack
    })
  }

  if (sub) {
    animate(sub, {
      opacity: [0, 1],
      translateY: [20, 0],
      duration: 800,
      delay: 700,
      ease: easings.outQuart
    })
  }

  if (metrics.length) {
    animate(metrics, {
      opacity: [0, 1],
      translateY: [10, 0],
      duration: 600,
      delay: stagger(100, { start: 1000 }),
      ease: easings.outExpo
    })
  }
}

// ─── Interactive Effects ──────────────────────────────────────────────────

function initCursor() {
  const cursor = document.querySelector<HTMLElement>('[data-cursor]')
  const dot    = document.querySelector<HTMLElement>('[data-cursor-dot]')
  if (!cursor || !dot) return

  let mx = -100, my = -100
  let cx = -100, cy = -100

  let scale = 1

  const onMouseMove = (e: MouseEvent) => {
    mx = e.clientX
    my = e.clientY
    dot.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`
  }

  const onMouseEnter = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.closest('a, button, .tilt-card, [data-magnetic]')) {
      scale = 1.5
      cursor.style.opacity = '0.5'
    }
  }

  const onMouseLeave = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (target.closest('a, button, .tilt-card, [data-magnetic]')) {
      scale = 1
      cursor.style.opacity = '1'
    }
  }

  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseover', onMouseEnter)
  window.addEventListener('mouseout',  onMouseLeave)

  const tick = () => {
    if (mx !== -100) {
      cursor.style.opacity = scale === 1 ? '1' : '0.5'
      cx += (mx - cx) * 0.15
      cy += (my - cy) * 0.15
      cursor.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) scale(${scale})`
    }
    requestAnimationFrame(tick)
  }
  tick()
}

function initTilt() {
  const cards = document.querySelectorAll<HTMLElement>('.tilt-card')
  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      utils.set(card, {
        rotateX: -y * 12,
        rotateY: x * 12,
        scale: 1.01
      })
    })
    card.addEventListener('mouseleave', () => {
      animate(card, {
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 800,
        ease: 'easeOutBack(1.2)'
      })
    })
  })
}

function initParallax() {
  const parallaxEls = document.querySelectorAll('.big-title-parallax')
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY
    parallaxEls.forEach((el) => {
      const speed = 0.15
      const yPos = -(scrolled * speed)
      utils.set(el as HTMLElement, { translateY: yPos })
    })
  }, { passive: true })
}

// ─── Master Init ──────────────────────────────────────────────────────────

export function initAllAnimations() {
  // Reset initial opacities
  document.querySelectorAll('.seamless-section .section-inner').forEach(el => {
    (el as HTMLElement).style.opacity = '0'
  })

  initHeroIntro()
  observeSections()
  initCursor()
  initTilt()
  initParallax()
}
