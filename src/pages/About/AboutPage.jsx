import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Droplets,
  Factory,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Sparkles,
  Target,
} from "lucide-react";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useLanguage } from "../../i18n/useLanguage";

import "./AboutPage.css";

const ALEPPO_CITADEL_IMAGE =
  "https://upload.wikimedia.org/wikipedia/commons/5/54/Citadel_of_Aleppo.jpg";

const easing = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 34,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: easing,
    },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
    },
  },
};

const translations = {
  ar: {
    pageTitle: "عن مافا | مياه مافا",
    hero: {
      kicker: "عن مافا",
      titleMain: ["من حلب،", "نبني ثقة"],
      titleAccent: "تُعبّأ كل يوم.",
      description:
        "مافا مشروع صناعي وطني لإنتاج مياه شرب محلاة ومعقمة، صُمم ليمنح مدينة حلب ومحيطها منتجًا محليًا آمنًا، ثابت الجودة، وقريبًا من السوق.",
      action: "اكتشف قصتنا",
      imageAlt: "منظر أمامي لقلعة حلب في مدينة حلب، سوريا",
      location: "قلعة حلب — سوريا",
      credit: "تصوير Memorino — Wikimedia Commons",
      badgeLabel: "مشروع وطني",
      badgeTitle: "ينطلق من حلب",
    },
    story: {
      kicker: "نبذة عن المشروع",
      titleMain: "مشروع بدأ من",
      titleAccent: " حاجة حقيقية.",
      paragraphs: [
        "يشهد سوق حلب طلبًا متزايدًا على مياه الشرب المعبأة، في مقابل اعتماد شبه كامل على التوريد من محافظات أخرى، ما ينعكس على السعر واستقرار توفر المنتج.",
        "يأتي مشروع مافا لتقديم حل محلي موثوق، وترسيخ ثقافة استخدام المياه النظيفة والآمنة، والمساهمة في الحد من الأمراض المرتبطة بمياه الشرب.",
      ],
      statement: "منتج وطني آمن، قريب من المستهلك، وقابل للنمو.",
    },
    purpose: {
      kicker: "اتجاهنا",
      title: "رؤية واضحة، ورسالة قابلة للتنفيذ.",
      vision: {
        label: "رؤيتنا",
        title: "اكتفاء محلي تقوده الجودة.",
        description:
          "أن يكون مافا المصنع الرائد لمياه الشرب المعبأة في حلب، ونموذجًا وطنيًا في الكفاءة والاعتماد على الموارد المحلية.",
      },
      mission: {
        label: "رسالتنا",
        title: "منتج آمن، وأثر يبقى.",
        description:
          "تقديم مياه وطنية عالية الجودة، وتعزيز الوعي الصحي، وخلق فرص عمل، وبناء استثمار صناعي مستدام يخدم المجتمع والاقتصاد.",
      },
    },
    journey: {
      kicker: "من الفكرة إلى الأثر",
      title: "مسار بسيط، وهدف واضح.",
      description:
        "لا نضيف طبقات غير ضرورية إلى الفكرة؛ نركز على الحاجة، والحل، وجودة التنفيذ، ثم بناء أثر يستمر مع نمو المشروع.",
      items: [
        {
          number: "01",
          title: "حاجة واضحة في السوق",
          description:
            "طلب يومي متزايد على مياه الشرب المعبأة، مقابل اعتماد كبير على التوريد من خارج مدينة حلب.",
        },
        {
          number: "02",
          title: "حل صناعي محلي",
          description:
            "إنشاء مصنع متخصص في إنتاج مياه محلاة ومعقمة ومعبأة وفق المعايير الصحية المعتمدة.",
        },
        {
          number: "03",
          title: "توريد أكثر استقرارًا",
          description:
            "تقليل مسافات النقل وتوفير منتج محلي قريب من المستهلك والمؤسسات في حلب ومحيطها.",
        },
        {
          number: "04",
          title: "أثر مستدام",
          description:
            "خلق فرص عمل ودعم الإنتاج الوطني وبناء أساس يسمح بالتوسع إلى أسواق جديدة مستقبلًا.",
        },
      ],
    },
    principles: {
      kicker: "ما نؤمن به",
      title: "مبادئ تقود طريقة عملنا.",
      items: [
        {
          icon: ShieldCheck,
          title: "السلامة أولًا",
          description:
            "تبدأ قراراتنا من جودة المياه وسلامة المستهلك في كل مرحلة من مراحل الإنتاج.",
        },
        {
          icon: Droplets,
          title: "نقاء ثابت",
          description:
            "نلتزم بثبات المعالجة والجودة من المصدر وحتى وصول العبوة إلى المستهلك.",
        },
        {
          icon: Factory,
          title: "صناعة محلية",
          description:
            "نؤمن بمنتج وطني قريب من السوق وقادر على تلبية احتياجاته بكفاءة.",
        },
        {
          icon: HeartHandshake,
          title: "أثر مسؤول",
          description:
            "نوازن بين الجدوى الاقتصادية والفائدة الصحية والاجتماعية طويلة الأمد.",
        },
      ],
    },
    cta: {
      label: "للتوريد أو الشراكة",
      title: "دعنا نبدأ محادثة واضحة.",
      button: "تواصل معنا",
    },
  },
  en: {
    pageTitle: "About MAVA | MAVA Water",
    hero: {
      kicker: "About MAVA",
      titleMain: ["Built in Aleppo,", "made for trust"],
      titleAccent: "every single day.",
      description:
        "MAVA is a national industrial project producing purified and disinfected drinking water, created to give Aleppo and its surrounding communities a safe, consistent and locally available product.",
      action: "Discover Our Story",
      imageAlt: "A front view of the Citadel of Aleppo in Aleppo, Syria",
      location: "Citadel of Aleppo — Syria",
      credit: "Photo by Memorino — Wikimedia Commons",
      badgeLabel: "A national project",
      badgeTitle: "starting in Aleppo",
    },
    story: {
      kicker: "Project Overview",
      titleMain: "A project born from",
      titleAccent: " a real market need.",
      paragraphs: [
        "Aleppo is seeing growing demand for bottled drinking water while relying heavily on supplies brought in from other governorates, affecting both price and product availability.",
        "MAVA provides a reliable local solution, promotes the use of clean and safe water, and contributes to reducing illnesses associated with unsafe drinking water.",
      ],
      statement: "A safe local product, close to consumers and ready to grow.",
    },
    purpose: {
      kicker: "Our Direction",
      title: "A clear vision and an actionable mission.",
      vision: {
        label: "Our Vision",
        title: "Local self-sufficiency led by quality.",
        description:
          "To become Aleppo’s leading bottled drinking-water producer and a national model for efficiency, quality and responsible use of local resources.",
      },
      mission: {
        label: "Our Mission",
        title: "A safe product with lasting impact.",
        description:
          "To deliver high-quality national drinking water, strengthen health awareness, create employment and build a sustainable industrial investment that serves society and the economy.",
      },
    },
    journey: {
      kicker: "From Idea to Impact",
      title: "A simple path with a clear purpose.",
      description:
        "We avoid unnecessary complexity. We focus on the need, the solution and excellent execution, then build an impact that grows with the project.",
      items: [
        {
          number: "01",
          title: "A Clear Market Need",
          description:
            "Daily demand for bottled drinking water continues to grow while Aleppo relies heavily on supplies from outside the city.",
        },
        {
          number: "02",
          title: "A Local Industrial Solution",
          description:
            "A specialised plant producing purified, disinfected and bottled water in line with approved health standards.",
        },
        {
          number: "03",
          title: "More Reliable Supply",
          description:
            "Shorter transport distances and a local product closer to consumers and institutions across Aleppo and nearby areas.",
        },
        {
          number: "04",
          title: "Sustainable Impact",
          description:
            "Job creation, support for national production and a strong base for future expansion into new markets.",
        },
      ],
    },
    principles: {
      kicker: "What We Believe",
      title: "Principles that guide how we work.",
      items: [
        {
          icon: ShieldCheck,
          title: "Safety First",
          description:
            "Every decision starts with water quality and consumer safety throughout the production process.",
        },
        {
          icon: Droplets,
          title: "Consistent Purity",
          description:
            "We maintain consistent treatment and quality from the source until every bottle reaches the customer.",
        },
        {
          icon: Factory,
          title: "Local Industry",
          description:
            "We believe in a national product that is close to the market and able to meet its needs efficiently.",
        },
        {
          icon: HeartHandshake,
          title: "Responsible Impact",
          description:
            "We balance commercial viability with long-term health, social and economic value.",
        },
      ],
    },
    cta: {
      label: "For Supply or Partnership",
      title: "Let’s start a clear conversation.",
      button: "Contact Us",
    },
  },
};

function Reveal({ children, className = "", delay = 0, amount = 0.2 }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.72, delay, ease: easing }}
    >
      {children}
    </motion.div>
  );
}

function AboutPage() {
  const reduceMotion = useReducedMotion();
  const { language, isArabic, direction } = useLanguage();
  const copy = translations[language];
  const DirectionArrow = isArabic ? ArrowLeft : ArrowRight;

  useEffect(() => {
    document.title = copy.pageTitle;
  }, [copy.pageTitle]);

  return (
    <div
      className={`about-page about-page--${language}`}
      dir={direction}
    >
      <Navbar variant="light" />

      <main>
        <section className="about-hero">
          <div className="about-hero__decoration about-hero__decoration--one" />
          <div className="about-hero__decoration about-hero__decoration--two" />

          <div className="container about-hero__grid">
            <motion.div
              className="about-hero__content"
              variants={staggerContainer}
              initial={reduceMotion ? false : "hidden"}
              animate={reduceMotion ? undefined : "visible"}
            >
              <motion.div className="about-kicker" variants={fadeUp}>
                <span>{copy.hero.kicker}</span>
                <span className="about-kicker__line" />
              </motion.div>

              <motion.h1 className="about-hero__title" variants={fadeUp}>
                <span className="about-hero__title-main">
                  {copy.hero.titleMain.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </span>

                <span className="about-hero__title-accent">
                  {copy.hero.titleAccent}
                </span>
              </motion.h1>

              <motion.p className="about-hero__description" variants={fadeUp}>
                {copy.hero.description}
              </motion.p>

              <motion.div className="about-hero__actions" variants={fadeUp}>
                <a className="about-text-link" href="#our-story">
                  <span>{copy.hero.action}</span>
                  <DirectionArrow size={18} />
                </a>
              </motion.div>
            </motion.div>

            <motion.figure
              className="about-hero__media"
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: isArabic ? -45 : 45,
                    }
              }
              animate={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      x: 0,
                    }
              }
              transition={{ duration: 0.95, delay: 0.15, ease: easing }}
            >
              <div className="about-hero__image-frame">
                <img
                  className="about-hero__image"
                  src={ALEPPO_CITADEL_IMAGE}
                  alt={copy.hero.imageAlt}
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  referrerPolicy="no-referrer"
                />

                <div className="about-hero__image-overlay" />

                <figcaption className="about-hero__caption">
                  <span className="about-hero__location">
                    <MapPin size={16} />
                    {copy.hero.location}
                  </span>

                  <a
                    className="about-hero__credit"
                    href="https://commons.wikimedia.org/wiki/File:Citadel_of_Aleppo.jpg"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {copy.hero.credit}
                  </a>
                </figcaption>
              </div>

              <motion.div
                className="about-hero__media-badge"
                animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles size={19} />
                <div>
                  <small>{copy.hero.badgeLabel}</small>
                  <strong>{copy.hero.badgeTitle}</strong>
                </div>
              </motion.div>
            </motion.figure>
          </div>
        </section>

        <section className="about-story" id="our-story">
          <div className="container about-story__grid">
            <Reveal className="about-story__heading">
              <div className="about-kicker">
                <span>{copy.story.kicker}</span>
                <span className="about-kicker__line" />
              </div>

              <h2>
                {copy.story.titleMain}
                <span>{copy.story.titleAccent}</span>
              </h2>
            </Reveal>

            <Reveal className="about-story__content" delay={0.1}>
              {copy.story.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              <div className="about-story__statement">
                <CheckCircle2 size={22} />
                <span>{copy.story.statement}</span>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="about-purpose">
          <div className="about-purpose__glow about-purpose__glow--one" />
          <div className="about-purpose__glow about-purpose__glow--two" />

          <div className="container">
            <Reveal className="about-purpose__header">
              <div className="about-kicker about-kicker--light">
                <span>{copy.purpose.kicker}</span>
                <span className="about-kicker__line" />
              </div>

              <h2>{copy.purpose.title}</h2>
            </Reveal>

            <div className="about-purpose__grid">
              <Reveal className="about-purpose__card" delay={0.05}>
                <span className="about-purpose__number">01</span>

                <div className="about-purpose__icon">
                  <Target size={25} />
                </div>

                <span className="about-purpose__label">
                  {copy.purpose.vision.label}
                </span>

                <h3>{copy.purpose.vision.title}</h3>
                <p>{copy.purpose.vision.description}</p>
              </Reveal>

              <Reveal className="about-purpose__card" delay={0.14}>
                <span className="about-purpose__number">02</span>

                <div className="about-purpose__icon">
                  <Droplets size={25} />
                </div>

                <span className="about-purpose__label">
                  {copy.purpose.mission.label}
                </span>

                <h3>{copy.purpose.mission.title}</h3>
                <p>{copy.purpose.mission.description}</p>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="about-journey">
          <div className="container about-journey__grid">
            <Reveal className="about-journey__intro">
              <div className="about-kicker">
                <span>{copy.journey.kicker}</span>
                <span className="about-kicker__line" />
              </div>

              <h2>{copy.journey.title}</h2>
              <p>{copy.journey.description}</p>
            </Reveal>

            <motion.div
              className="about-journey__list"
              variants={staggerContainer}
              initial={reduceMotion ? false : "hidden"}
              whileInView={reduceMotion ? undefined : "visible"}
              viewport={{ once: true, amount: 0.2 }}
            >
              {copy.journey.items.map((item) => (
                <motion.article
                  className="about-journey__item"
                  key={item.number}
                  variants={fadeUp}
                >
                  <span className="about-journey__number">{item.number}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="about-principles">
          <div className="container">
            <Reveal className="about-principles__header">
              <div className="about-kicker">
                <span>{copy.principles.kicker}</span>
                <span className="about-kicker__line" />
              </div>

              <h2>{copy.principles.title}</h2>
            </Reveal>

            <motion.div
              className="about-principles__grid"
              variants={staggerContainer}
              initial={reduceMotion ? false : "hidden"}
              whileInView={reduceMotion ? undefined : "visible"}
              viewport={{ once: true, amount: 0.15 }}
            >
              {copy.principles.items.map((principle) => {
                const Icon = principle.icon;

                return (
                  <motion.article
                    className="about-principle-card"
                    key={principle.title}
                    variants={fadeUp}
                    whileHover={reduceMotion ? undefined : { y: -8 }}
                  >
                    <div className="about-principle-card__icon">
                      <Icon size={24} />
                    </div>

                    <h3>{principle.title}</h3>
                    <p>{principle.description}</p>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </section>

        <section className="about-cta">
          <div className="container about-cta__inner">
            <Reveal className="about-cta__content">
              <span>{copy.cta.label}</span>
              <h2>{copy.cta.title}</h2>
            </Reveal>

            <Reveal delay={0.12}>
              <Link className="about-cta__button" to="/contact">
                <span>{copy.cta.button}</span>
                <DirectionArrow size={19} />
              </Link>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default AboutPage;
