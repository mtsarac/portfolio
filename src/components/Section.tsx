import type { ReactNode } from 'react'
import { FadeContent } from './FadeContent'

interface SectionProps {
  id: string
  title: string
  children: ReactNode
  className?: string
}

export function Section({ id, title, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`py-20 px-4 ${className}`}>
      <FadeContent>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-neutral-900 dark:text-neutral-100">
            {title}
          </h2>
          {children}
        </div>
      </FadeContent>
    </section>
  )
}
