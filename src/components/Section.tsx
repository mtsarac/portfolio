import type { ReactNode } from 'react'
import { AnimatedContent } from './AnimatedContent'

interface SectionProps {
  id: string
  title: string
  children: ReactNode
  className?: string
}

export function Section({ id, title, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`py-20 px-4 ${className}`}>
      <AnimatedContent distance={40} duration={0.7} threshold={0.12}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-heading font-bold mb-12 text-center text-neutral-900 dark:text-neutral-100">
            {title}
            <span className="block mx-auto mt-3 w-16 h-1 rounded-full bg-sky-500/60" />
          </h2>
          {children}
        </div>
      </AnimatedContent>
    </section>
  )
}
