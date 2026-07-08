import { useEffect, useRef, type ReactNode } from 'react'
import AnimatedContent from './AnimatedContent'
import { useLogger } from '../hooks/useLogger'

interface SectionProps {
  id: string
  title: string
  children: ReactNode
  className?: string
}

export function Section({ id, title, children, className = '' }: SectionProps) {
  const { logger } = useLogger()
  const viewed = useRef(false)

  useEffect(() => {
    const el = document.getElementById(id)
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !viewed.current) {
          viewed.current = true
          logger.logEvent('section_view', { section: id })
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [id, logger])

  return (
    <section id={id} className={`py-20 px-4 ${className}`}>
      <AnimatedContent distance={40} duration={0.7} threshold={0.12}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-heading font-bold mb-12 text-center text-slate-900 dark:text-neutral-100">
            {title}
            <span className="block mx-auto mt-3 w-12 h-1 rounded-full bg-slate-900/20" />
          </h2>
          {children}
        </div>
      </AnimatedContent>
    </section>
  )
}
