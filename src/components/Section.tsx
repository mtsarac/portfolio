import type { ReactNode } from 'react'
import { motion } from 'framer-motion'

interface SectionProps {
  id: string
  title: string
  children: ReactNode
  className?: string
}

export function Section({ id, title, children, className = '' }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`py-20 px-4 ${className}`}
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-neutral-900 dark:text-neutral-100">
          {title}
        </h2>
        {children}
      </div>
    </motion.section>
  )
}
