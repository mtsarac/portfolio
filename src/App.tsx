import { I18nProvider } from './features/i18n/I18nProvider'
import { LoggingProvider } from './features/logging/LoggingProvider'
import { Layout } from './components/Layout'
import ClickSpark from './components/ClickSpark'
import { HeroSection } from './features/hero/HeroSection'
import { AboutSection } from './features/about/AboutSection'
import { ExperienceSection } from './features/experience/ExperienceSection'
import { ProjectsSection } from './features/projects/ProjectsSection'
import { SkillsSection } from './features/skills/SkillsSection'
import { ContactSection } from './features/contact/ContactSection'
import { useLogger } from './hooks/useLogger'
import { useScrollDepth } from './hooks/useScrollDepth'
import { useEngagementTime } from './hooks/useEngagementTime'

function AppContent() {
  const { logger } = useLogger()

  useScrollDepth(logger)
  useEngagementTime(logger)

  return (
    <ClickSpark
      sparkColor="#d4d4d4"
      sparkSize={8}
      sparkRadius={20}
      sparkCount={10}
      duration={500}
    >
      <div className="relative">
        <Layout>
          <HeroSection />
          <AboutSection />
          <ExperienceSection />
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
