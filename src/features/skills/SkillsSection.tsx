import { useI18n } from "../../hooks/useI18n";
import { Section } from "../../components/Section";
import { LogoLoop } from "../../components/LogoLoop";
import type { LogoItem } from "../../components/LogoLoop";
import type { SkillCategory } from "../../types";

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

function SkillBadge({ name }: { name: string }) {
  return (
    <span className="px-4 py-2 text-sm font-medium rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 whitespace-nowrap">
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
          logoHeight={36}
          gap={16}
          fadeOut
          pauseOnHover
        />
        <LogoLoop
          logos={logos}
          speed={60}
          direction="right"
          logoHeight={36}
          gap={16}
          fadeOut
          pauseOnHover
        />
      </div>
    </Section>
  );
}
