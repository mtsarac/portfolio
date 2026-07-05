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
import { useTheme } from './hooks/useTheme'
import { useLogger } from './hooks/useLogger'

function AppContent() {
  const { theme } = useTheme()
  const { logger } = useLogger()

  useEffect(() => {
    logger.logPageView('home')
  }, [logger])

  const sparkColor = theme === 'dark' ? '#d4d4d4' : '#525252'

  return (
    <ClickSpark
      sparkColor={sparkColor}
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
