import { useI18n } from "../../hooks/useI18n";
import { Section } from "../../components/Section";
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

export function SkillsSection() {
  const { t } = useI18n();

  return (
    <Section id="skills" title={t("skills.title")}>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {skillData.map((cat) => (
          <div
            key={cat.title}
            className="p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900"
          >
            <h3 className="font-semibold mb-3 text-neutral-900 dark:text-neutral-100">
              {t(cat.title)}
            </h3>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-sm rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
