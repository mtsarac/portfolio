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
} from "react-icons/si";
import { FaAws } from "react-icons/fa";
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
      ".NET Web API",
      "MS SQL Server",
      "PostgreSQL",
    ],
  },
  {
    title: "skills.tools",
    items: ["Git/GitHub", "AWS", "Docker", "Linux"],
  },
];

const skillIcons: Record<string, IconType> = {
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
  ".NET Web API": SiDotnet,
  "MS SQL Server": SiDotnet,
  PostgreSQL: SiPostgresql,
  "Git/GitHub": SiGithub,
  AWS: FaAws,
  Docker: SiDocker,
  Linux: SiLinux,
};

function SkillBadge({ name }: { name: string }) {
  const Icon = skillIcons[name];
  return (
    <span className="inline-flex items-center gap-2.5 px-5 py-2.5 text-base font-medium rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 whitespace-nowrap ring-1 ring-sky-500/20">
      {Icon && <Icon className="shrink-0" size={20} />}
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
