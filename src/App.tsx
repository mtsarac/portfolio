import { lazy, Suspense, useEffect, useState } from 'react'
import { I18nProvider } from './features/i18n/I18nProvider'
import { LoggingProvider } from './features/logging/LoggingProvider'
import { Layout } from './components/Layout'
import ClickSpark from './components/ClickSpark'
import { HeroSection } from './features/hero/HeroSection'
import { AboutSection } from './features/about/AboutSection'
import { ProjectsSection } from './features/projects/ProjectsSection'
import { SkillsSection } from './features/skills/SkillsSection'
import { ContactSection } from './features/contact/ContactSection'
import { useLogger } from './hooks/useLogger'
import { useScrollDepth } from './hooks/useScrollDepth'
import { useTimeOnPage } from './hooks/useTimeOnPage'

const LightRays = lazy(() => import('./components/LightRays'))

function AppContent() {
  const { logger } = useLogger()
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    logger.logPageView('home')
  }, [logger])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    setIsDesktop(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useScrollDepth(logger)
  useTimeOnPage(logger)

  return (
    <ClickSpark
      sparkColor="#d4d4d4"
      sparkSize={8}
      sparkRadius={20}
      sparkCount={10}
      duration={500}
    >
      <div className="relative">
        {isDesktop && (
          <div className="fixed inset-x-0 top-16 bottom-0 -z-10">
            <Suspense fallback={null}>
              <LightRays
                raysOrigin="top-center"
                raysColor="#c8d8ff"
                raysSpeed={0.6}
                lightSpread={0.8}
                rayLength={2.5}
                saturation={0.8}
                mouseInfluence={0.05}
                fadeDistance={0.6}
              />
            </Suspense>
          </div>
        )}
        <Layout>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <ContactSection />
        </Layout>
      </div>
    </ClickSpark>
  )
}

function App() {
  return (
    <I18nProvider>
      <LoggingProvider>
        <AppContent />
      </LoggingProvider>
    </I18nProvider>
  )
}

export default App
