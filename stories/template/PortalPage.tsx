import { useEffect, useRef, useState } from "react";
import { JSDELIVR_UMD, loadUmdScript, type CarouselOption } from "../umd";
import "./portal.css";

type Locale = "ar" | "en";

const COPY = {
  ar: {
    disclaimer:
      "مثال مستقل مستوحى من قوالب كود المنصات. غير تابع لهيئة الحكومة الرقمية. استُبدل قسم البطل بمكوّن اليوم الوطني.",
    lang: "English",
    brand: "منصة اليوم الوطني",
    brandMeta: "قالب الصفحة الرئيسية",
    nav: ["عن المنصة", "الخدمات", "الأخبار", "شركاؤنا"],
    about: "عن المنصة",
    cards: [
      { title: "رؤيتنا", body: "قسم تعريفي كما في قالب الصفحة الرئيسية." },
      { title: "خدماتنا", body: "بطاقات الخدمات تبقى من القالب؛ البطل فقط هو مكوّننا." },
      { title: "شراكاتنا", body: "بدّل النصوص والصور لتناسب بوابتك." },
    ],
    footer: "آخر تحديث: مثال توضيحي · مستقل وغير تابع للهيئة",
  },
  en: {
    disclaimer:
      "Independent example inspired by the Platforms Code home template. Not affiliated with the DGA. The hero is replaced by the National Day carousel.",
    lang: "العربية",
    brand: "National Day portal",
    brandMeta: "Home page template",
    nav: ["About", "Services", "News", "Partners"],
    about: "About the platform",
    cards: [
      { title: "Our vision", body: "An about block in the same place as the home template." },
      { title: "Our services", body: "Service cards stay as page chrome; only the hero is ours." },
      { title: "Our partners", body: "Swap the copy and images to match your portal." },
    ],
    footer: "Last updated: sample · independent, not affiliated with the DGA",
  },
} as const;

export type PortalPageProps = {
  option: CarouselOption;
  bundle?: string;
};

export function PortalPage({ option, bundle = JSDELIVR_UMD }: PortalPageProps) {
  const [locale, setLocale] = useState<Locale>("ar");
  const hostRef = useRef<HTMLDivElement>(null);
  const copy = COPY[locale];

  useEffect(() => {
    const el = hostRef.current;
    if (!el) {
      return;
    }

    let mounted = true;
    let handle: { unmount: () => void } | undefined;

    loadUmdScript(bundle)
      .then((api) => {
        if (!mounted || !hostRef.current) {
          return;
        }
        handle = api.mount(hostRef.current, {
          option,
          autoplayMs: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      mounted = false;
      handle?.unmount();
      el.replaceChildren();
    };
  }, [bundle, option, locale]);

  return (
    <div className="hp-template" lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <p className="hp-disclaimer">
        {copy.disclaimer}{" "}
        <a href="https://github.com/DevDhaif/dev-dga-templates" target="_blank" rel="noreferrer">
          DevDhaif/dev-dga-templates
        </a>
      </p>
      <div className="hp-util">
        <button
          type="button"
          className="hp-util__btn"
          aria-pressed="true"
          onClick={() => setLocale(locale === "ar" ? "en" : "ar")}
        >
          {copy.lang}
        </button>
      </div>
      <header className="hp-header">
        <div className="hp-brand">
          <strong>{copy.brand}</strong>
          <span>{copy.brandMeta}</span>
        </div>
        <nav className="hp-nav" aria-label={locale === "ar" ? "التنقل" : "Navigation"}>
          {copy.nav.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </nav>
      </header>
      <section className="hp-hero" aria-label={locale === "ar" ? "القسم الرئيسي" : "Hero"}>
        <div className="hp-hero__mount" ref={hostRef} />
      </section>
      <section className="hp-section">
        <h2>{copy.about}</h2>
        <div className="hp-cards">
          {copy.cards.map((card) => (
            <article className="hp-card" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </article>
          ))}
        </div>
      </section>
      <footer className="hp-footer">
        <p>{copy.footer}</p>
      </footer>
    </div>
  );
}
