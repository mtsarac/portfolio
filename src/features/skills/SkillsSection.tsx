import { useI18n } from "../../hooks/useI18n";
import { Section } from "../../components/Section";
import { LogoLoop } from "../../components/LogoLoop";
import type { LogoItem } from "../../components/LogoLoop";
import type { SkillCategory } from "../../types";
import {
  SiTypescript,
  SiPython,
  SiCplusplus,
  SiHtml5,
  SiCss,
  SiOpenjdk,
  SiDotnet,
  SiReact,
  SiNextdotjs,
  SiPostgresql,
  SiGithub,
  SiDocker,
  SiLinux,
  SiSqlite,
  SiGit,
  SiSupabase,
  SiNestjs,
} from "react-icons/si";
import { FaAws, FaDatabase } from "react-icons/fa";
import type { IconType } from "react-icons";

const skillData: SkillCategory[] = [
  {
    title: "skills.languages",
    items: ["Java", "C#", "Python", "TypeScript", "SQL", "C++", "HTML", "CSS"],
  },
  {
    title: "skills.frameworks",
    items: [
      "React",
      "Next.js",
      "React Native",
      "NestJS",
      "REST API",
      ".NET Web API",
      "MS SQL Server",
      "PostgreSQL",
    ],
  },
  {
    title: "skills.tools",
    items: ["Git/GitHub", "Git", "Supabase", "AWS", "Docker", "Linux"],
  },
];

const skillIcons: Record<string, IconType | undefined> = {
  Java: SiOpenjdk,
  "C#": SiDotnet,
  Python: SiPython,
  TypeScript: SiTypescript,
  SQL: SiSqlite,
  "C++": SiCplusplus,
  HTML: SiHtml5,
  CSS: SiCss,
  React: SiReact,
  "Next.js": SiNextdotjs,
  "React Native": SiReact,
  NestJS: SiNestjs,
  "REST API": undefined,
  ".NET Web API": SiDotnet,
  "MS SQL Server": FaDatabase,
  PostgreSQL: SiPostgresql,
  "Git/GitHub": SiGithub,
  Git: SiGit,
  Supabase: SiSupabase,
  AWS: FaAws,
  Docker: SiDocker,
  Linux: SiLinux,
};

const skillColors: Record<string, string | undefined> = {
  Java: '#ED8B00',
  'C#': '#512BD4',
  Python: '#3776AB',
  TypeScript: '#3178C6',
  SQL: '#003B57',
  'C++': '#00599C',
  HTML: '#E34F26',
  CSS: '#1572B6',
  React: '#61DAFB',
  'Next.js': '#666',
  'React Native': '#61DAFB',
  NestJS: '#E0234E',
  'REST API': undefined,
  '.NET Web API': '#512BD4',
  'MS SQL Server': '#CC2927',
  PostgreSQL: '#4169E1',
  'Git/GitHub': '#666',
  Git: '#F05032',
  Supabase: '#3ECF8E',
  AWS: '#FF9900',
  Docker: '#2496ED',
  Linux: '#898A5C',
};

function SkillBadge({ name }: { name: string }) {
  const Icon = skillIcons[name];
  return (
    <span className="inline-flex items-center gap-2.5 px-5 py-2.5 text-base font-medium rounded-full bg-white dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 whitespace-nowrap ring-1 ring-sky-500/20 border border-neutral-200 dark:border-neutral-700 shadow-sm">
      {Icon && <Icon className="shrink-0" size={20} color={skillColors[name]} />}
      {name}
    </span>
  );
}

export function SkillsSection() {
  const { t } = useI18n();

  const logos = skillData.flatMap((cat) =>
    cat.items.map(
      (skill): LogoItem => ({
        node: <SkillBadge name={skill} />,
        title: skill,
      }),
    ),
  );

  return (
    <Section id="skills" title={t("skills.title")}>
      <div className="space-y-8">
        <LogoLoop
          logos={logos}
          speed={80}
          direction="left"
          logoHeight={48}
          gap={20}
          fadeOut
          pauseOnHover
        />
        <LogoLoop
          logos={logos}
          speed={60}
          direction="right"
          logoHeight={48}
          gap={20}
          fadeOut
          pauseOnHover
        />
      </div>
    </Section>
  );
}
