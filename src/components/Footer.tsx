import { Separator } from './ui/separator'

export function Footer() {
  return (
    <footer style={{ background: 'var(--deep-dark)', padding: '48px 48px', color: 'var(--stone)', fontSize: '0.7rem' }}>
      <Separator className="mb-10 bg-[rgba(245,244,237,0.04)]" />
      <div className="mx-auto flex max-w-[1200px] items-center justify-between">
        <div style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.05em' }}>
          © 2026 Rui Zen. All rights reserved.
        </div>
        <div className="flex gap-8">
          <span>Singapore</span>
          <span>Remote-first</span>
          <span style={{ color: 'var(--brand-light)' }}>Built with GSAP</span>
        </div>
      </div>
    </footer>
  )
}
