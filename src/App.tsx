import { useEffect, useRef } from 'react'
import { ThemeProvider } from './features/theme/ThemeProvider'
import { I18nProvider } from './features/i18n/I18nProvider'
import { Layout } from './components/Layout'
import { HeroSection } from './features/hero/HeroSection'
import { AboutSection } from './features/about/AboutSection'
import { SkillsSection } from './features/skills/SkillsSection'
import { ContactSection } from './features/contact/ContactSection'
import { LocalStorageLogger } from './features/logging/LocalStorageLogger'
import { UmamiLogger } from './features/logging/UmamiLogger'
import type { LoggingService } from './features/logging/LoggingService'

function createLogger(): LoggingService {
  const siteId = import.meta.env.VITE_UMAMI_SITE_ID
  const umamiUrl = import.meta.env.VITE_UMAMI_URL

  if (siteId && umamiUrl) {
    console.info('[Portfolio] UmamiLogger active', { siteId, umamiUrl })
    return new UmamiLogger(siteId, umamiUrl)
  }

  console.info('[Portfolio] Umami not configured (VITE_UMAMI_SITE_ID missing), using LocalStorageLogger')
  return new LocalStorageLogger()
}

function AppContent() {
  const loggerRef = useRef(createLogger())

  useEffect(() => {
    loggerRef.current.logPageView('home')
  }, [])

  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ContactSection />
    </Layout>
  )
}

function App() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AppContent />
      </I18nProvider>
    </ThemeProvider>
  )
}

export default App
