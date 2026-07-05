import { useRef, useEffect, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface FadeContentProps {
  children: ReactNode
  blur?: boolean
  duration?: number
  delay?: number
  threshold?: number
  initialOpacity?: number
  className?: string
}

export function FadeContent({
  children,
  blur = false,
  duration = 1,
  delay = 0,
  threshold = 0.1,
  initialOpacity = 0,
  className = '',
}: FadeContentProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const startPct = (1 - threshold) * 100

    gsap.set(el, {
      autoAlpha: initialOpacity,
      filter: blur ? 'blur(10px)' : 'blur(0px)',
      willChange: 'opacity, filter, transform',
    })

    const tl = gsap.timeline({ paused: true })

    tl.to(el, {
      autoAlpha: 1,
      filter: 'blur(0px)',
      duration,
      ease: 'power2.out',
      delay,
    })

    const st = ScrollTrigger.create({
      trigger: el,
      start: `top ${startPct}%`,
      once: true,
      onEnter: () => tl.play(),
    })

    return () => {
      st.kill()
      tl.kill()
      gsap.killTweensOf(el)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
