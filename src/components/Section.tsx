import { useEffect, useRef, type ReactNode } from 'react'
import AnimatedContent from './AnimatedContent'
import { useLogger } from '../hooks/useLogger'

interface SectionProps {
  id: string
  title: string
  children: ReactNode
  className?: string
  align?: 'center' | 'left'
  width?: 'narrow' | 'wide'
}

export function Section({ id, title, children, className = '', align = 'center', width = 'narrow' }: SectionProps) {
  const { logger } = useLogger()
  const viewed = useRef(false)

  useEffect(() => {
    const el = document.getElementById(id)
    if (!el) return

    let timer: number | undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (viewed.current) return
        if (!entry.isIntersecting) {
          window.clearTimeout(timer)
          return
        }
        timer = window.setTimeout(() => {
          viewed.current = true
          logger.logEvent('section_view', { section: id })
          observer.disconnect()
        }, 1000)
      },
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => {
      window.clearTimeout(timer)
      observer.disconnect()
    }
  }, [id, logger])

  return (
    <section id={id} className={`py-20 px-4 ${className}`}>
      <AnimatedContent distance={40} duration={0.7} threshold={0.12}>
        <div className={`${width === 'wide' ? 'max-w-5xl' : 'max-w-3xl'} mx-auto`}>
          <h2 className={`text-3xl font-heading font-bold mb-12 text-neutral-900 dark:text-neutral-100 ${align === 'left' ? 'text-left' : 'text-center'}`}>
            {title}
          </h2>
          {children}
        </div>
      </AnimatedContent>
    </section>
  )
}
