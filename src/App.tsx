import { lazy, Suspense, useEffect } from 'react'
import { ThemeProvider } from './features/theme/ThemeProvider'
import { I18nProvider } from './features/i18n/I18nProvider'
import { LoggingProvider } from './features/logging/LoggingProvider'
import { Layout } from './components/Layout'
import { ClickSpark } from './components/ClickSpark'
import { HeroSection } from './features/hero/HeroSection'
import { AboutSection } from './features/about/AboutSection'
import { SkillsSection } from './features/skills/SkillsSection'
import { ContactSection } from './features/contact/ContactSection'
import { useTheme } from './hooks/useTheme'
import { useLogger } from './hooks/useLogger'

const LightRays = lazy(() => import('./components/LightRays').then((m) => ({ default: m.LightRays })))

function AppContent() {
  const { theme } = useTheme()
  const { logger } = useLogger()

  useEffect(() => {
    logger.logPageView('home')
  }, [logger])

  const sparkColor = theme === 'dark' ? '#d4d4d4' : '#525252'
  const raysColor = theme === 'dark' ? '#c8d8ff' : '#f5ebe6'

  return (
    <ClickSpark
      sparkColor={sparkColor}
      sparkSize={8}
      sparkRadius={20}
      sparkCount={10}
      duration={500}
    >
      <div className="relative">
        <div className="fixed inset-x-0 top-16 bottom-0 -z-10">
          <Suspense fallback={null}>
            <LightRays
              raysOrigin="top-center"
              raysColor={raysColor}
              raysSpeed={0.6}
              lightSpread={0.8}
              rayLength={2.5}
              saturation={0.8}
              mouseInfluence={0.05}
              fadeDistance={0.6}
            />
          </Suspense>
        </div>
        <Layout>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ContactSection />
        </Layout>
      </div>
    </ClickSpark>
  )
}

function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <LoggingProvider>
          <AppContent />
        </LoggingProvider>
      </I18nProvider>
    </ThemeProvider>
  )
}

export default App
