import AnimatedContent from "../../components/AnimatedContent";
import { useI18n } from "../../hooks/useI18n";

export function HeroSection() {
  const { t, lang } = useI18n();
  const cvHref = lang === "en" ? "/cv/CV_English.pdf" : "/cv/CV.pdf";

  return (
    <section
      id="hero"
      className="min-h-[calc(100vh-4rem)] px-4"
    >
      <AnimatedContent distance={40} duration={0.7} threshold={0.12} className="flex flex-col items-center justify-center text-center min-h-[calc(100vh-4rem)]">
        <div className="w-56 h-56 rounded-full overflow-hidden mb-8 shadow-sm isolate">
          <picture>
            <source srcSet="/myself-400w.webp 400w, /myself-800w.webp 800w, /myself.webp 1008w" type="image/webp" sizes="224px" />
            <img
              src="/myself.jpg"
              srcSet="/myself-400w.jpg 400w, /myself-800w.jpg 800w, /myself.jpg 1008w"
              sizes="224px"
              alt="Muhammet Saraç"
              width={1008}
              height={1008}
              className="w-full h-full object-cover scale-150"
              fetchPriority="high"
            />
          </picture>
        </div>
      <h1 className="text-5xl sm:text-6xl font-bold mb-4 text-slate-900 dark:text-neutral-100">
        {t("hero.title")}
      </h1>
      <p className="text-xl text-slate-500 dark:text-neutral-400 mb-6">
        {t("hero.subtitle")}
      </p>
      <p className="max-w-xl text-slate-500 dark:text-neutral-400 leading-relaxed">
        {t("hero.description")}
      </p>
      <div className="flex gap-4 mt-10">
        <a
          href="#about"
          className="px-6 py-3 rounded-lg bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors"
        >
          {t("nav.about")}
        </a>
        <a
          href={cvHref}
          download
          data-umami-event="download-cv"
          data-umami-event-cv-lang={lang}
          className="px-6 py-3 rounded-lg border border-slate-200 text-slate-700 dark:text-neutral-100 font-medium hover:bg-slate-50 dark:hover:bg-neutral-800 transition-colors"
        >
          {t("hero.cv")}
        </a>
        <a
          href="#contact"
          className="px-6 py-3 rounded-lg border border-slate-200 text-slate-700 dark:text-neutral-100 font-medium hover:bg-slate-50 dark:hover:bg-neutral-800 transition-colors"
        >
          {t("nav.contact")}
        </a>
      </div>
      </AnimatedContent>
    </section>
  );
}
