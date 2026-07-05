import { useEffect } from 'react'
import { ThemeProvider } from './features/theme/ThemeProvider'
import { I18nProvider } from './features/i18n/I18nProvider'
import { LoggingProvider } from './features/logging/LoggingProvider'
import { Layout } from './components/Layout'
import { ClickSpark } from './components/ClickSpark'
import { HeroSection } from './features/hero/HeroSection'
import { AboutSection } from './features/about/AboutSection'
import { SkillsSection } from './features/skills/SkillsSection'
import { ContactSection } from './features/contact/ContactSection'
import { useLogger } from './hooks/useLogger'

function AppContent() {
  const { logger } = useLogger()

  useEffect(() => {
    logger.logPageView('home')
  }, [logger])

  return (
    <ClickSpark
      sparkColor="var(--color-neutral-400, #a3a3a3)"
      sparkSize={8}
      sparkRadius={20}
      sparkCount={10}
      duration={500}
    >
      <Layout>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ContactSection />
      </Layout>
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
