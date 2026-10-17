import { useRef, useState, type ReactNode } from 'react'
import { useTheme } from '../hooks/useTheme'

interface SpotlightCardProps {
  children: ReactNode
  className?: string
  spotlightColor?: string
}

export default function SpotlightCard({
  children,
  className = '',
  spotlightColor,
}: SpotlightCardProps) {
  const { resolved } = useTheme()
  const glow = spotlightColor ?? (resolved === 'dark' ? 'rgba(255, 255, 255, 0.25)' : 'rgba(0, 61, 165, 0.12)')
  const divRef = useRef<HTMLDivElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [opacity, setOpacity] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return
    const rect = divRef.current.getBoundingClientRect()
    // CSS vars via ref: moving the pointer must not re-render the card subtree
    divRef.current.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
    divRef.current.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
  }

  const handleFocus = () => {
    setIsFocused(true)
    setOpacity(0.6)
  }

  const handleBlur = () => {
    setIsFocused(false)
    setOpacity(0)
  }

  const handleMouseEnter = () => setOpacity(0.6)
  const handleMouseLeave = () => setOpacity(0)

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl border border-neutral-200 bg-white overflow-hidden p-8 dark:border-neutral-800 dark:bg-neutral-900 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ease-in-out"
        style={{
          opacity,
          background: `radial-gradient(circle at var(--spot-x, 0px) var(--spot-y, 0px), ${glow}, transparent 80%)`,
        }}
      />
      {children}
    </div>
  )
}
