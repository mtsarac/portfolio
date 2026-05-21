import { useI18n } from "../../hooks/useI18n";

export function HeroSection() {
  const { t } = useI18n();

  return (
    <section
      id="hero"
      className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center px-4"
    >
      <div className="w-28 h-28 rounded-full overflow-hidden mb-8 shadow-sm">
        <img
          src="/myself.jpg"
          alt="Muhammet Saraç"
          className="w-full h-full object-cover scale-150"
        />
      </div>
      <h1 className="text-5xl sm:text-6xl font-bold mb-4 text-neutral-900 dark:text-neutral-100">
        {t("hero.title")}
      </h1>
      <p className="text-xl text-neutral-600 dark:text-neutral-400 mb-6">
        {t("hero.subtitle")}
      </p>
      <p className="max-w-xl text-neutral-500 dark:text-neutral-400 leading-relaxed">
        {t("hero.description")}
      </p>
      <div className="flex gap-4 mt-10">
        <a
          href="#about"
          className="px-6 py-3 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 font-medium hover:opacity-90 transition-opacity"
        >
          {t("nav.about")}
        </a>
        <a
          href="/cv/CV.pdf"
          download
          data-umami-event="download-cv"
          className="px-6 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          {t("hero.cv")}
        </a>
        <a
          href="#contact"
          className="px-6 py-3 rounded-xl border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          {t("nav.contact")}
        </a>
      </div>
    </section>
  );
}
