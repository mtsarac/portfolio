import { useI18n } from "../../hooks/useI18n";
import { Section } from "../../components/Section";
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
  SiSupabase,
  SiNestjs,
  SiExpo,
} from "react-icons/si";
import { FaAws, FaDatabase } from "react-icons/fa6";
import type { IconType } from "react-icons";

const skillData: SkillCategory[] = [
  {
    title: "skills.languages",
    // Python and C++ hidden from site for now, icons kept below
    items: ["Java", "C#", "TypeScript", "SQL", "HTML", "CSS"],
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
      "Expo",
    ],
  },
  {
    title: "skills.tools",
    // AWS and Supabase hidden from site for now, icons kept below
    items: ["Git/GitHub", "Docker", "Linux"],
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
  Expo: SiExpo,
  TypeORM: FaDatabase,
  "Git/GitHub": SiGithub,
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
  Expo: '#000020',
  TypeORM: '#E05C2E',
  'Git/GitHub': '#666',
  Supabase: '#3ECF8E',
  AWS: '#FF9900',
  Docker: '#2496ED',
  Linux: '#898A5C',
};

function SkillBadge({ name }: { name: string }) {
  const Icon = skillIcons[name];
  return (
    <span className="inline-flex items-center gap-2.5 px-5 py-2.5 text-base font-medium rounded-lg dark:bg-neutral-800 dark:text-neutral-200 whitespace-nowrap border dark:border-neutral-700 shadow-sm">
      {Icon && <Icon className="shrink-0" size={20} color={skillColors[name]} />}
      {name}
    </span>
  );
}

function SkillGroup({ items, titleKey }: { items: string[]; titleKey: string }) {
  const { t } = useI18n();

  return (
    <div>
      <h3 className="text-base font-semibold dark:text-neutral-100 mb-4">
        {t(titleKey)}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((skill) => (
          <SkillBadge key={skill} name={skill} />
        ))}
      </div>
    </div>
  );
}

export function SkillsSection() {
  const { t } = useI18n();

  return (
    <Section id="skills" title={t("skills.title")} align="left" width="wide">
      <div className="space-y-10">
        {skillData.map((category) => (
          <SkillGroup key={category.title} items={category.items} titleKey={category.title} />
        ))}
      </div>
    </Section>
  );
}
