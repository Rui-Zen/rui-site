/**
 * animations.ts — Anime.js v4 scroll animation engine for Rui Zen portfolio
 * Uses: animate, createTimeline, stagger, scroll, onScroll, spring, utils
 */
import {
  animate,
  createTimeline,
  stagger,
  onScroll,
  spring,
  utils,
} from 'animejs'

// ─── Text Splitting ───────────────────────────────────────────────────────────

export function splitWords(el: HTMLElement): HTMLElement[] {
  const text = el.textContent ?? ''
  el.textContent = ''
  return text.split(/(\s+)/).map(part => {
    const span = document.createElement('span')
    span.textContent = part
    if (part.trim()) {
      span.style.display = 'inline-block'
      span.style.overflow = 'hidden'
    } else {
      span.style.display = 'inline'
    }
    el.appendChild(span)
    return span
  }).filter(s => s.textContent?.trim())
}

export function splitChars(el: HTMLElement): HTMLElement[] {
  const text = el.textContent ?? ''
  el.textContent = ''
  const chars: HTMLElement[] = []

  // Split into words, wrap each word's chars in a nowrap container
  text.split(' ').forEach((word, wi, arr) => {
    const wordWrap = document.createElement('span')
    wordWrap.style.display = 'inline-block'
    wordWrap.style.whiteSpace = 'nowrap'

    word.split('').forEach(char => {
      const span = document.createElement('span')
      span.textContent = char
      span.style.display = 'inline-block'
      wordWrap.appendChild(span)
      chars.push(span)
    })

    el.appendChild(wordWrap)

    // Add space between words (except last)
    if (wi < arr.length - 1) {
      const space = document.createElement('span')
      space.textContent = '\u00A0'
      space.style.display = 'inline-block'
      el.appendChild(space)
    }
  })

  return chars
}

// ─── Easing presets ──────────────────────────────────────────────────────────

export const easings = {
  outExpo:    'easeOutExpo',
  outQuart:   'easeOutQuart',
  outCubic:   'easeOutCubic',
  inOutQuart: 'easeInOutQuart',
  outBack:    'easeOutBack(1.7)',
  outElastic: 'easeOutElastic(1, 0.5)',
  spring:     spring({ mass: 1, stiffness: 80, damping: 14, velocity: 0 }),
  springBouncy: spring({ mass: 0.8, stiffness: 120, damping: 10, velocity: 2 }),
  springSnappy: spring({ mass: 1, stiffness: 200, damping: 20, velocity: 0 }),
}

// ─── Intersection helpers ────────────────────────────────────────────────────

type ScrollEntry = { target: Element; enter: () => void }

const scrollCallbacks: ScrollEntry[] = []
const io = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cb = scrollCallbacks.find(s => s.target === entry.target)
        if (cb) { cb.enter(); io.unobserve(entry.target) }
      }
    })
  },
  { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
)

export function onEnter(el: Element | null, cb: () => void) {
  if (!el) return
  scrollCallbacks.push({ target: el, enter: cb })
  io.observe(el)
}

// ─── Section: Nav ────────────────────────────────────────────────────────────

export function animateNav() {
  const links = document.querySelectorAll<HTMLElement>('[data-nav-link]')
  const logo  = document.querySelector<HTMLElement>('[data-nav-logo]')
  const cta   = document.querySelector<HTMLElement>('[data-nav-cta]')

  if (logo) animate(logo, { translateY: [-24, 0], opacity: [0, 1], duration: 700, ease: easings.outExpo, delay: 100 })
  if (links.length) {
    animate(links, {
      translateY: [-20, 0], opacity: [0, 1],
      duration: 600,
      delay: stagger(80, { start: 200 }),
      ease: easings.outExpo,
    })
  }
  if (cta) animate(cta, { scale: [0.8, 1], opacity: [0, 1], duration: 600, ease: easings.spring, delay: 600 })
}

// ─── Section: Hero ───────────────────────────────────────────────────────────

export function animateHero() {
  const eyebrow = document.querySelector<HTMLElement>('[data-hero-eyebrow]')
  const h1      = document.querySelector<HTMLElement>('[data-hero-h1]')
  const sub     = document.querySelector<HTMLElement>('[data-hero-sub]')
  const ctaEl   = document.querySelectorAll<HTMLElement>('[data-hero-cta]')
  const metrics = document.querySelectorAll<HTMLElement>('[data-metric-value]')
  const orb     = document.querySelector<HTMLElement>('[data-hero-orb]')

  const tl = createTimeline({ defaults: { ease: easings.outExpo } })

  // Orb scales in from nothing
  if (orb) {
    animate(orb, { scale: [0, 1], opacity: [0, 0.7], duration: 1200, ease: easings.outCubic, delay: 200 })
  }

  // Eyebrow slides up
  if (eyebrow) {
    tl.add(eyebrow, { translateY: [30, 0], opacity: [0, 1], duration: 600 }, 0)
  }

  // H1 chars cascade in
  if (h1) {
    const chars = splitChars(h1)
    tl.add(chars, {
      translateY: [60, 0],
      opacity: [0, 1],
      duration: 700,
      delay: stagger(28, { from: 'first' }),
      ease: easings.outBack,
    }, 150)
  }

  // Sub words
  if (sub) {
    const words = splitWords(sub)
    tl.add(words, {
      translateY: [20, 0],
      opacity: [0, 1],
      duration: 500,
      delay: stagger(45),
    }, 700)
  }

  // CTAs
  if (ctaEl.length) {
    tl.add(ctaEl, {
      translateY: [20, 0],
      scale: [0.92, 1],
      opacity: [0, 1],
      duration: 500,
      delay: stagger(100),
      ease: easings.spring,
    }, 1000)
  }

  // Metric count-up
  if (metrics.length) {
    metrics.forEach((el, idx) => {
      const raw = el.getAttribute('data-metric-raw') ?? '0'
      const num = parseFloat(raw)
      const suffix = el.getAttribute('data-metric-suffix') ?? ''
      const prefix = el.getAttribute('data-metric-prefix') ?? ''
      tl.add({ value: 0 }, {
        value: num,
        duration: 1400,
        delay: idx * 120,
        ease: easings.outExpo,
        onUpdate: (a) => {
          const v = (a.targets as { value: number }[])[0].value
          el.textContent = prefix + (Number.isInteger(num) ? Math.round(v) : v.toFixed(1)) + suffix
        },
      }, 1100)
    })
  }
}

// ─── Section: About ──────────────────────────────────────────────────────────

export function animateAbout() {
  const section = document.querySelector('#about')
  if (!section) return

  onEnter(section, () => {
    const eyebrow = section.querySelector<HTMLElement>('[data-about-eyebrow]')
    const title   = section.querySelector<HTMLElement>('[data-about-title]')
    const quote   = section.querySelector<HTMLElement>('[data-about-quote]')
    const paras   = section.querySelectorAll<HTMLElement>('[data-about-para]')
    const chips   = section.querySelectorAll<HTMLElement>('[data-about-chip]')
    const cards   = section.querySelectorAll<HTMLElement>('[data-about-card]')

    const tl = createTimeline({ defaults: { ease: easings.outExpo } })

    if (eyebrow) tl.add(eyebrow, { translateX: [-40, 0], opacity: [0, 1], duration: 600 }, 0)

    if (title) {
      const words = splitWords(title)
      tl.add(words, {
        translateX: [-30, 0],
        opacity: [0, 1],
        duration: 600,
        delay: stagger(60),
      }, 100)
    }

    if (quote) {
      const words = splitWords(quote)
      tl.add(words, {
        translateY: [16, 0],
        opacity: [0, 1],
        duration: 400,
        delay: stagger(40),
      }, 400)
    }

    if (paras.length) {
      tl.add(paras, {
        translateY: [24, 0],
        opacity: [0, 1],
        duration: 600,
        delay: stagger(120),
      }, 600)
    }

    if (chips.length) {
      tl.add(chips, {
        scale: [0.7, 1],
        opacity: [0, 1],
        duration: 400,
        delay: stagger(60),
        ease: easings.springBouncy,
      }, 800)
    }

    if (cards.length) {
      tl.add(cards, {
        translateX: [60, 0],
        opacity: [0, 1],
        duration: 600,
        delay: stagger(120),
        ease: easings.outBack,
      }, 200)
    }
  })
}

// ─── Section: Work ───────────────────────────────────────────────────────────

export function animateWork() {
  const section = document.querySelector('#work')
  if (!section) return

  onEnter(section, () => {
    const eyebrow = section.querySelector<HTMLElement>('[data-work-eyebrow]')
    const title   = section.querySelector<HTMLElement>('[data-work-title]')
    const cards   = section.querySelectorAll<HTMLElement>('[data-work-card]')
    const note    = section.querySelector<HTMLElement>('[data-work-note]')

    const tl = createTimeline({ defaults: { ease: easings.outExpo } })

    if (eyebrow) tl.add(eyebrow, { translateY: [-20, 0], opacity: [0, 1], duration: 500 }, 0)
    if (title)   tl.add(title,   { translateX: [-30, 0], opacity: [0, 1], duration: 600 }, 100)

    cards.forEach((card, i) => {
      onEnter(card, () => {
        const tags = card.querySelectorAll<HTMLElement>('[data-tag]')
        const metricVals = card.querySelectorAll<HTMLElement>('[data-metric-value]')

        createTimeline({ defaults: { ease: easings.outExpo } })
          .add(card,  { translateY: [50, 0], opacity: [0, 1], duration: 700, delay: i * 40 })
          .add(tags,  { scale: [0.6, 1], opacity: [0, 1], duration: 300, delay: stagger(50), ease: easings.springBouncy }, '+=50')

        metricVals.forEach((el, idx) => {
          const raw    = el.getAttribute('data-metric-raw') ?? '0'
          const num    = parseFloat(raw)
          const suffix = el.getAttribute('data-metric-suffix') ?? ''
          const prefix = el.getAttribute('data-metric-prefix') ?? ''
          animate({ value: 0 }, {
            value: num,
            duration: 1200,
            delay: 400 + idx * 150,
            ease: easings.outExpo,
            onUpdate: (a) => {
              const v = (a.targets as { value: number }[])[0].value
              el.textContent = prefix + (Number.isInteger(num) ? Math.round(v) : v.toFixed(0)) + suffix
            },
          })
        })
      })
    })

    if (note) tl.add(note, { translateY: [20, 0], opacity: [0, 1], duration: 500 }, '+=100')
  })
}

// ─── Section: Skills ─────────────────────────────────────────────────────────

export function animateSkills() {
  const section = document.querySelector('#skills')
  if (!section) return

  onEnter(section, () => {
    const eyebrow = section.querySelector<HTMLElement>('[data-skills-eyebrow]')
    const title   = section.querySelector<HTMLElement>('[data-skills-title]')
    const groups  = section.querySelectorAll<HTMLElement>('[data-skill-group]')
    const tags    = section.querySelectorAll<HTMLElement>('[data-skill-tag]')

    const tl = createTimeline({ defaults: { ease: easings.outExpo } })
    if (eyebrow) tl.add(eyebrow, { translateY: [-20, 0], opacity: [0, 1], duration: 500 }, 0)
    if (title)   tl.add(title,   { translateX: [-30, 0], opacity: [0, 1], duration: 600 }, 100)

    groups.forEach((group, gi) => {
      onEnter(group, () => {
        const bars     = group.querySelectorAll<HTMLElement>('[data-skill-bar-fill]')
        const labels   = group.querySelectorAll<HTMLElement>('[data-skill-label]')
        const percents = group.querySelectorAll<HTMLElement>('[data-skill-pct]')
        const header   = group.querySelector<HTMLElement>('[data-group-header]')

        const gtl = createTimeline({ defaults: { ease: easings.outExpo } })

        if (header) gtl.add(header, { translateY: [20, 0], opacity: [0, 1], duration: 500, delay: gi * 80 })
        if (labels.length) gtl.add(labels, { translateX: [-16, 0], opacity: [0, 1], duration: 400, delay: stagger(60) }, 100)

        // Animate bars + percent together
        bars.forEach((bar, bi) => {
          const target = parseFloat(bar.getAttribute('data-target') ?? '0')
          const pctEl  = percents[bi]
          gtl.add(bar, {
            width: [`0%`, `${target}%`],
            duration: 900,
            delay: 200 + bi * 80,
            ease: easings.spring,
          }, 200)
          if (pctEl) {
            gtl.add({ value: 0 }, {
              value: target,
              duration: 900,
              delay: 200 + bi * 80,
              ease: easings.outExpo,
              onUpdate: (a) => {
                const v = (a.targets as { value: number }[])[0].value
                pctEl.textContent = Math.round(v) + '%'
              },
            }, 200)
          }
        })
      })
    })

    if (tags.length) {
      onEnter(tags[0], () => {
        animate(tags, {
          scale: [0, 1],
          opacity: [0, 1],
          rotate: [() => utils.random(-8, 8), 0],
          duration: 500,
          delay: stagger(40, { from: 'center' }),
          ease: easings.springBouncy,
        })
      })
    }
  })
}

// ─── Section: Writing ────────────────────────────────────────────────────────

export function animateWriting() {
  const section = document.querySelector('#writing')
  if (!section) return

  onEnter(section, () => {
    const eyebrow = section.querySelector<HTMLElement>('[data-writing-eyebrow]')
    const title   = section.querySelector<HTMLElement>('[data-writing-title]')
    const cards   = section.querySelectorAll<HTMLElement>('[data-writing-card]')

    const tl = createTimeline({ defaults: { ease: easings.outExpo } })

    if (eyebrow) tl.add(eyebrow, { translateY: [-16, 0], opacity: [0, 1], duration: 500 }, 0)
    if (title) {
      const words = splitWords(title)
      tl.add(words, {
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 500,
        delay: stagger(55),
      }, 100)
    }

    if (cards.length) {
      tl.add(cards, {
        translateY: [60, 0],
        rotateX: [12, 0],
        opacity: [0, 1],
        scale: [0.94, 1],
        duration: 700,
        delay: stagger(100),
        ease: easings.outBack,
      }, 300)
    }
  })
}

// ─── Section: Contact ────────────────────────────────────────────────────────

export function animateContact() {
  const section = document.querySelector('#contact')
  if (!section) return

  onEnter(section, () => {
    const eyebrow  = section.querySelector<HTMLElement>('[data-contact-eyebrow]')
    const h2       = section.querySelector<HTMLElement>('[data-contact-h2]')
    const sub      = section.querySelector<HTMLElement>('[data-contact-sub]')
    const emailBox = section.querySelector<HTMLElement>('[data-contact-email]')
    const divider  = section.querySelector<HTMLElement>('[data-contact-divider]')
    const socials  = section.querySelectorAll<HTMLElement>('[data-contact-social]')
    const avail    = section.querySelector<HTMLElement>('[data-contact-avail]')

    const tl = createTimeline({ defaults: { ease: easings.outExpo } })

    if (eyebrow) tl.add(eyebrow, { translateY: [-16, 0], opacity: [0, 1], duration: 500 }, 0)

    if (h2) {
      const chars = splitChars(h2)
      tl.add(chars, {
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 600,
        delay: stagger(22, { from: 'first' }),
        ease: easings.outBack,
      }, 150)
    }

    if (sub) {
      const words = splitWords(sub)
      tl.add(words, {
        translateY: [16, 0],
        opacity: [0, 1],
        duration: 400,
        delay: stagger(35),
      }, 550)
    }

    if (emailBox) tl.add(emailBox, { translateY: [24, 0], scale: [0.96, 1], opacity: [0, 1], duration: 600, ease: easings.spring }, 750)
    if (divider)  tl.add(divider,  { scaleX: [0, 1], opacity: [0, 1], duration: 500 }, 950)
    if (socials.length) {
      tl.add(socials, {
        translateY: [20, 0],
        scale: [0.85, 1],
        opacity: [0, 1],
        duration: 450,
        delay: stagger(80),
        ease: easings.springBouncy,
      }, 1050)
    }
    if (avail) tl.add(avail, { translateX: [-30, 0], opacity: [0, 1], duration: 600, ease: easings.outBack }, 1300)
  })
}

// ─── Parallax scroll ────────────────────────────────────────────────────────

export function initParallax() {
  const orb = document.querySelector<HTMLElement>('[data-hero-orb]')
  if (!orb) return

  onScroll({
    target: document.querySelector('#hero') ?? document.body,
    enter: 'top top',
    leave: 'bottom top',
    onUpdate: ({ progress }) => {
      utils.set(orb, { translateY: progress * 120 })
    },
  })

  // Subtle text parallax on hero heading
  const h1 = document.querySelector<HTMLElement>('[data-hero-h1]')
  if (h1) {
    onScroll({
      target: document.querySelector('#hero') ?? document.body,
      enter: 'top top',
      leave: 'bottom top',
      onUpdate: ({ progress }) => {
        utils.set(h1, { translateY: progress * 40 })
      },
    })
  }
}

// ─── Scroll-linked progress bar on top of page ───────────────────────────────

export function initScrollProgressBar() {
  const bar = document.querySelector<HTMLElement>('[data-scroll-progress]')
  if (!bar) return

  onScroll({
    enter: 'top top',
    leave: 'bottom bottom',
    onUpdate: ({ progress }) => {
      utils.set(bar, { scaleX: progress, transformOrigin: 'left center' })
    },
  })
}

// ─── Hover magnetic effect on buttons ────────────────────────────────────────

export function initMagneticButtons() {
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top  + rect.height / 2
      const dx = (e.clientX - cx) * 0.35
      const dy = (e.clientY - cy) * 0.35
      animate(btn, { translateX: dx, translateY: dy, duration: 300, ease: easings.outCubic })
    })
    btn.addEventListener('mouseleave', () => {
      animate(btn, { translateX: 0, translateY: 0, duration: 500, ease: easings.spring })
    })
  })
}

// ─── Cursor follower ─────────────────────────────────────────────────────────

export function initCursor() {
  const cursor = document.querySelector<HTMLElement>('[data-cursor]')
  const dot    = document.querySelector<HTMLElement>('[data-cursor-dot]')
  if (!cursor || !dot) return

  let mx = 0, my = 0

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY
    animate(dot, { left: mx, top: my, duration: 80, ease: 'linear' })
    animate(cursor, { left: mx, top: my, duration: 400, ease: easings.outExpo })
  })

  document.querySelectorAll('a, button, [data-magnetic]').forEach(el => {
    el.addEventListener('mouseenter', () => {
      animate(cursor, { scale: 2.2, opacity: 0.4, duration: 300, ease: easings.outCubic })
    })
    el.addEventListener('mouseleave', () => {
      animate(cursor, { scale: 1, opacity: 1, duration: 300, ease: easings.outCubic })
    })
  })
}

// ─── Footer ──────────────────────────────────────────────────────────────────

export function animateFooter() {
  const footer = document.querySelector('footer')
  if (!footer) return

  onEnter(footer, () => {
    const items = footer.querySelectorAll<HTMLElement>('[data-footer-item]')
    if (items.length) {
      animate(items, {
        translateY: [20, 0],
        opacity: [0, 1],
        duration: 500,
        delay: stagger(80),
        ease: easings.outExpo,
      })
    }
  })
}

// ─── Master init ─────────────────────────────────────────────────────────────

export function initAllAnimations() {
  // Set initial invisible states before animating in
  const hideTargets = [
    '[data-nav-link]', '[data-nav-logo]', '[data-nav-cta]',
    '[data-work-card]', '[data-writing-card]',
    '[data-about-card]', '[data-about-para]', '[data-about-chip]',
    '[data-skill-group]', '[data-skill-tag]',
    '[data-contact-email]', '[data-contact-social]', '[data-contact-avail]',
    '[data-footer-item]',
  ]
  hideTargets.forEach(sel => {
    document.querySelectorAll<HTMLElement>(sel).forEach(el => {
      el.style.opacity = '0'
    })
  })

  animateNav()
  animateHero()
  animateAbout()
  animateWork()
  animateSkills()
  animateWriting()
  animateContact()
  animateFooter()
  initParallax()
  initScrollProgressBar()
  initMagneticButtons()
  initCursor()
}
