import { useEffect, useRef } from 'react'

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? Math.min(window.scrollY / docHeight, 1) : 0
      // transform on a ref: no React re-render, no layout per scroll event
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-neutral-200 dark:bg-neutral-800" aria-hidden="true">
      <div ref={barRef} className="h-full origin-left bg-brand/70" style={{ transform: 'scaleX(0)' }} />
    </div>
  )
}
