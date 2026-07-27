import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Beaker,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Droplets,
  Factory,
  FlaskConical,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Truck,
} from "lucide-react";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useLanguage } from "../../i18n/useLanguage";

import "./QualityPage.css";

const HERO_IMAGE =
  "https://images.pexels.com/photos/18631424/pexels-photo-18631424.jpeg?auto=compress&cs=tinysrgb&w=1800";

const LAB_IMAGE =
  "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=1400&q=85";

const WATER_IMAGE =
  "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=1400&q=85";

const easing = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: easing,
    },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
    },
  },
};

const translations = {
  ar: {
    pageTitle: "الجودة والسلامة | مياه مافا",

    hero: {
      kicker: "الجودة والسلامة",
      titleMain: "من المصدر إلى العبوة،",
      titleAccent: "جودة تحت الرقابة.",
      description:
        "نراجع جودة المياه في كل خطوة، من المعالجة والتعقيم إلى الفحص والتعبئة، لضمان منتج آمن وثابت الجودة.",
      button: "استكشف منظومة الجودة",
      imageAlt: "خط إنتاج وتعبئة مياه داخل مصنع حديث",
      fallback: "منظومة إنتاج متكاملة",
      captionLabel: "خط إنتاج المياه",
      captionTitle: "رقابة دقيقة من التعبئة حتى الإغلاق",
    },

    commitment: {
      kicker: "التزامنا",
      titleMain: "الثقة لا تُكتب على العبوة،",
      titleAccent: "بل تُبنى داخل المصنع.",
      description:
        "ندمج الجودة في كل قرار تشغيلي، من معالجة المياه ونظافة المعدات وفحص العينات، وصولًا إلى التخزين والنقل.",
      pillars: [
        {
          icon: ShieldCheck,
          value: "8",
          label: "مراحل رقابة",
          description:
            "ثماني مراحل مترابطة من المعالجة حتى السلامة المهنية.",
        },
        {
          icon: FlaskConical,
          value: "24/7",
          label: "متابعة مستمرة",
          description:
            "متابعة التشغيل والنظافة وجودة المنتج دون انقطاع.",
        },
        {
          icon: BadgeCheck,
          value: "100%",
          label: "التزام بالجودة",
          description:
            "رقابة تبدأ باستلام المياه وتستمر حتى وصول العبوة.",
        },
      ],
    },

    system: {
      kicker: "من المصدر إلى السوق",
      title: "ثماني مراحل مترابطة تحمي جودة كل عبوة.",
      description:
        "بدل التعامل مع الجودة كاختبار أخير، تتوزع الرقابة على كامل العملية الإنتاجية، بحيث تُراجع كل مرحلة قبل الانتقال إلى التالية.",
      steps: [
        {
          number: "01",
          icon: Droplets,
          title: "مراحل معالجة المياه وتنقيتها",
          description:
            "تمر المياه بمراحل متعددة من الترشيح والمعالجة لضمان نقائها وثبات تركيبتها المعدنية قبل التعبئة.",
          label: "المعالجة",
        },
        {
          number: "02",
          icon: Sparkles,
          title: "أنظمة التعقيم المستخدمة",
          description:
            "تُستخدم أنظمة تعقيم لخطوط الإنتاج والعبوات لتوفير بيئة تعبئة آمنة والحد من مصادر التلوث.",
          label: "التعقيم",
        },
        {
          number: "03",
          icon: Beaker,
          title: "الرقابة المخبرية وفحص العينات",
          description:
            "تخضع العينات لفحوص دورية لمتابعة الخصائص الفيزيائية والكيميائية والصحية للمياه.",
          label: "المختبر",
        },
        {
          number: "04",
          icon: Factory,
          title: "نظافة خطوط الإنتاج والتعبئة",
          description:
            "تخضع خطوط الإنتاج والتعبئة لبرامج تنظيف ومتابعة منتظمة تحافظ على مستوى مرتفع من النظافة الصناعية.",
          label: "الإنتاج",
        },
        {
          number: "05",
          icon: Truck,
          title: "سلامة التخزين والنقل",
          description:
            "تُخزن المنتجات وتُنقل ضمن ظروف تحافظ على سلامة العبوات وجودتها حتى وصولها إلى نقاط البيع.",
          label: "التوزيع",
        },
        {
          number: "06",
          icon: ClipboardCheck,
          title: "ممارسات التصنيع الجيد (GMP)",
          description:
            "تُنظم ممارسات التصنيع الجيد إجراءات التشغيل والنظافة وتدفق المواد وتوثيق مراحل العمل.",
          label: "GMP",
        },
        {
          number: "07",
          icon: Activity,
          title: "تحليل المخاطر ونقاط التحكم الحرجة (HACCP)",
          description:
            "تُحدد المخاطر المحتملة ونقاط التحكم المهمة والإجراءات الوقائية والتصحيحية داخل العملية الإنتاجية.",
          label: "HACCP",
        },
        {
          number: "08",
          icon: PackageCheck,
          title: "سلامة الغذاء والصحة المهنية",
          description:
            "يلتزم المصنع بمتطلبات سلامة الغذاء والصحة المهنية لحماية المنتج والعاملين وبيئة العمل.",
          label: "السلامة",
        },
      ],
    },

    laboratory: {
      fallback: "رقابة مخبرية مستمرة",
      imageAlt: "مختبر لفحص جودة المياه",
      overlayLabel: "فحص وتحليل",
      overlayTitle: "القرارات التشغيلية تبدأ من نتائج واضحة.",
      kicker: "الرقابة المخبرية",
      title: "التحليل جزء من الإنتاج، وليس خطوة منفصلة.",
      description:
        "تُستخدم الفحوص لمتابعة خصائص المياه، والتحقق من استقرار المعالجة، ودعم القرارات المتعلقة بالتشغيل والنظافة والتعبئة.",
      checks: [
        "فحص الخصائص الفيزيائية",
        "متابعة التركيبة الكيميائية",
        "مراجعة سلامة المنتج",
      ],
    },

    composition: {
      kicker: "التركيبة المعدنية",
      title: "توازن معدني واضح لكل عبوة.",
      description:
        "عرض مبسط لأهم عناصر التركيبة المعدنية ودرجة الحموضة الخاصة بمياه مافا.",
      imageAlt: "مياه شرب نقية معبأة",
      fallback: "مياه مافا",
      sealSmall: "تركيبة متوازنة",
      sealStrong: "جودة ثابتة",
      minerals: [
        {
          name: "الكالسيوم",
          value: "45",
          numericValue: 45,
          unit: "mg/L",
        },
        {
          name: "المغنيسيوم",
          value: "18",
          numericValue: 18,
          unit: "mg/L",
        },
        {
          name: "الصوديوم",
          value: "12",
          numericValue: 12,
          unit: "mg/L",
        },
        {
          name: "البوتاسيوم",
          value: "2",
          numericValue: 2,
          unit: "mg/L",
        },
        {
          name: "البيكربونات",
          value: "180",
          numericValue: 180,
          unit: "mg/L",
        },
        {
          name: "السلفات",
          value: "35",
          numericValue: 35,
          unit: "mg/L",
        },
        {
          name: "الكلوريد",
          value: "25",
          numericValue: 25,
          unit: "mg/L",
        },
        {
          name: "النترات",
          value: "< 2",
          numericValue: 2,
          unit: "mg/L",
        },
        {
          name: "الأملاح الذائبة",
          value: "220",
          numericValue: 220,
          unit: "mg/L",
        },
        {
          name: "درجة الحموضة",
          value: "7.4",
          numericValue: 74,
          unit: "pH",
        },
      ],
      guarantees: [
        "مطابقة للمواصفات المعتمدة",
        "عبوات مناسبة للاستخدام",
        "متابعة منتظمة للإنتاج",
        "تخزين ونقل مدروس",
      ],
    },

    cta: {
      label: "هل لديك سؤال عن الجودة؟",
      title: "فريق مافا جاهز للإجابة عن استفساراتك.",
      button: "تواصل معنا",
    },
  },

  en: {
    pageTitle: "Quality & Safety | MAVA Water",

    hero: {
      kicker: "Quality & Safety",
      titleMain: "From the source to the bottle,",
      titleAccent: "quality stays under control.",
      description:
        "We review water quality at every step, from treatment and sanitisation to testing and packaging, to deliver a safe and consistently reliable product.",
      button: "Explore the quality system",
      imageAlt: "Modern water production and bottling line",
      fallback: "Integrated production system",
      captionLabel: "Water production line",
      captionTitle: "Precise control from filling to final sealing",
    },

    commitment: {
      kicker: "Our commitment",
      titleMain: "Trust is not printed on the bottle,",
      titleAccent: "it is built inside the plant.",
      description:
        "Quality is embedded in every operating decision, from water treatment and equipment hygiene to sample testing, storage and transport.",
      pillars: [
        {
          icon: ShieldCheck,
          value: "8",
          label: "Control stages",
          description:
            "Eight connected stages covering treatment through occupational safety.",
        },
        {
          icon: FlaskConical,
          value: "24/7",
          label: "Continuous monitoring",
          description:
            "Ongoing oversight of operations, hygiene and product quality.",
        },
        {
          icon: BadgeCheck,
          value: "100%",
          label: "Quality commitment",
          description:
            "Control begins with incoming water and continues until delivery.",
        },
      ],
    },

    system: {
      kicker: "From source to market",
      title: "Eight connected stages protect the quality of every bottle.",
      description:
        "Instead of treating quality as a final test, control is distributed across the entire production process, with every stage reviewed before the next one begins.",
      steps: [
        {
          number: "01",
          icon: Droplets,
          title: "Water treatment and purification",
          description:
            "Water passes through multiple filtration and treatment stages to ensure purity and a stable mineral profile before bottling.",
          label: "Treatment",
        },
        {
          number: "02",
          icon: Sparkles,
          title: "Sanitisation systems",
          description:
            "Production lines and containers are sanitised to maintain a safe filling environment and reduce contamination risks.",
          label: "Sanitisation",
        },
        {
          number: "03",
          icon: Beaker,
          title: "Laboratory control and sample testing",
          description:
            "Samples are tested regularly to monitor the physical, chemical and health-related properties of the water.",
          label: "Laboratory",
        },
        {
          number: "04",
          icon: Factory,
          title: "Production and filling-line hygiene",
          description:
            "Production and filling lines follow scheduled cleaning and monitoring programmes that maintain high industrial hygiene standards.",
          label: "Production",
        },
        {
          number: "05",
          icon: Truck,
          title: "Safe storage and transport",
          description:
            "Products are stored and transported under conditions that preserve bottle safety and product quality until they reach the point of sale.",
          label: "Distribution",
        },
        {
          number: "06",
          icon: ClipboardCheck,
          title: "Good Manufacturing Practices (GMP)",
          description:
            "GMP procedures organise operations, hygiene, material flow and the documentation of every working stage.",
          label: "GMP",
        },
        {
          number: "07",
          icon: Activity,
          title: "Hazard Analysis and Critical Control Points (HACCP)",
          description:
            "Potential risks, critical control points and preventive and corrective actions are identified throughout production.",
          label: "HACCP",
        },
        {
          number: "08",
          icon: PackageCheck,
          title: "Food safety and occupational health",
          description:
            "The plant follows food-safety and occupational-health requirements to protect the product, employees and working environment.",
          label: "Safety",
        },
      ],
    },

    laboratory: {
      fallback: "Continuous laboratory control",
      imageAlt: "Laboratory testing drinking water quality",
      overlayLabel: "Testing and analysis",
      overlayTitle: "Operational decisions begin with clear results.",
      kicker: "Laboratory control",
      title: "Analysis is part of production, not a separate step.",
      description:
        "Testing is used to monitor water characteristics, confirm treatment stability and support decisions related to operations, hygiene and packaging.",
      checks: [
        "Physical property testing",
        "Chemical profile monitoring",
        "Product safety review",
      ],
    },

    composition: {
      kicker: "Mineral composition",
      title: "A clear mineral balance in every bottle.",
      description:
        "A simplified view of the main mineral components and pH level of MAVA water.",
      imageAlt: "Pure packaged drinking water",
      fallback: "MAVA Water",
      sealSmall: "Balanced composition",
      sealStrong: "Consistent quality",
      minerals: [
        {
          name: "Calcium",
          value: "45",
          numericValue: 45,
          unit: "mg/L",
        },
        {
          name: "Magnesium",
          value: "18",
          numericValue: 18,
          unit: "mg/L",
        },
        {
          name: "Sodium",
          value: "12",
          numericValue: 12,
          unit: "mg/L",
        },
        {
          name: "Potassium",
          value: "2",
          numericValue: 2,
          unit: "mg/L",
        },
        {
          name: "Bicarbonates",
          value: "180",
          numericValue: 180,
          unit: "mg/L",
        },
        {
          name: "Sulphates",
          value: "35",
          numericValue: 35,
          unit: "mg/L",
        },
        {
          name: "Chloride",
          value: "25",
          numericValue: 25,
          unit: "mg/L",
        },
        {
          name: "Nitrates",
          value: "< 2",
          numericValue: 2,
          unit: "mg/L",
        },
        {
          name: "Total dissolved solids",
          value: "220",
          numericValue: 220,
          unit: "mg/L",
        },
        {
          name: "pH level",
          value: "7.4",
          numericValue: 74,
          unit: "pH",
        },
      ],
      guarantees: [
        "Aligned with approved specifications",
        "Fit-for-purpose packaging",
        "Regular production monitoring",
        "Controlled storage and transport",
      ],
    },

    cta: {
      label: "Have a question about quality?",
      title: "The MAVA team is ready to answer your questions.",
      button: "Contact us",
    },
  },
};

function Reveal({
  children,
  className = "",
  delay = 0,
  amount = 0.2,
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              y: 32,
            }
      }
      whileInView={
        reduceMotion
          ? undefined
          : {
              opacity: 1,
              y: 0,
            }
      }
      viewport={{
        once: true,
        amount,
      }}
      transition={{
        duration: 0.72,
        delay,
        ease: easing,
      }}
    >
      {children}
    </motion.div>
  );
}

function QualityPage() {
  const reduceMotion = useReducedMotion();

  const {
    language,
    isArabic,
    direction,
  } = useLanguage();

  const copy = translations[language];
  const DirectionArrow = isArabic
    ? ArrowLeft
    : ArrowRight;

  useEffect(() => {
    document.title = copy.pageTitle;
  }, [copy.pageTitle]);

  const handleImageError = (event) => {
    event.currentTarget.style.display = "none";
    event.currentTarget.parentElement?.classList.add(
      "is-fallback",
    );
  };

  return (
    <div
      className={`quality-page quality-page--${language}`}
      dir={direction}
    >
      <Navbar variant="light" />

      <main>
        <section className="quality-hero">
          <div className="quality-hero__glow quality-hero__glow--one" />
          <div className="quality-hero__glow quality-hero__glow--two" />

          <div className="container quality-hero__grid">
            <motion.div
              className="quality-hero__content"
              variants={stagger}
              initial={
                reduceMotion
                  ? false
                  : "hidden"
              }
              animate={
                reduceMotion
                  ? undefined
                  : "visible"
              }
            >
              <motion.div
                className="quality-kicker quality-kicker--light"
                variants={fadeUp}
              >
                <span>{copy.hero.kicker}</span>
                <span className="quality-kicker__line" />
              </motion.div>

              <motion.h1
                className="quality-hero__title"
                variants={fadeUp}
              >
                <span className="quality-hero__title-main">
                  {copy.hero.titleMain}
                </span>

                <span className="quality-hero__title-accent">
                  {copy.hero.titleAccent}
                </span>
              </motion.h1>

              <motion.p
                className="quality-hero__description"
                variants={fadeUp}
              >
                {copy.hero.description}
              </motion.p>

              <motion.a
                className="quality-button quality-button--primary"
                href="#quality-system"
                variants={fadeUp}
              >
                <span>{copy.hero.button}</span>
                <DirectionArrow size={18} />
              </motion.a>
            </motion.div>

            <motion.div
              className="quality-hero__visual"
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: isArabic
                        ? -42
                        : 42,
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
              transition={{
                duration: 0.9,
                delay: 0.16,
                ease: easing,
              }}
            >
              <div className="quality-hero__image-wrapper">
                <div className="quality-image-fallback">
                  <Factory size={58} />
                  <span>
                    {copy.hero.fallback}
                  </span>
                </div>

                <img
                  src={HERO_IMAGE}
                  alt={copy.hero.imageAlt}
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={handleImageError}
                />

                <div className="quality-hero__image-overlay" />

                <div className="quality-hero__image-caption">
                  <span>
                    {copy.hero.captionLabel}
                  </span>

                  <strong>
                    {copy.hero.captionTitle}
                  </strong>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="quality-commitment">
          <div className="container">
            <Reveal className="quality-commitment__header">
              <div className="quality-kicker">
                <span>
                  {copy.commitment.kicker}
                </span>
                <span className="quality-kicker__line" />
              </div>

              <h2>
                {copy.commitment.titleMain}
                <span>
                  {" "}
                  {copy.commitment.titleAccent}
                </span>
              </h2>

              <p>
                {copy.commitment.description}
              </p>
            </Reveal>

            <motion.div
              className="quality-commitment__pillars"
              variants={stagger}
              initial={
                reduceMotion
                  ? false
                  : "hidden"
              }
              whileInView={
                reduceMotion
                  ? undefined
                  : "visible"
              }
              viewport={{
                once: true,
                amount: 0.2,
              }}
            >
              {copy.commitment.pillars.map(
                (pillar) => {
                  const Icon = pillar.icon;

                  return (
                    <motion.article
                      className="quality-pillar"
                      key={pillar.value}
                      variants={fadeUp}
                      whileHover={
                        reduceMotion
                          ? undefined
                          : {
                              y: -7,
                            }
                      }
                    >
                      <div className="quality-pillar__top">
                        <span className="quality-pillar__icon">
                          <Icon size={24} />
                        </span>

                        <strong>
                          {pillar.value}
                        </strong>
                      </div>

                      <h3>
                        {pillar.label}
                      </h3>

                      <p>
                        {pillar.description}
                      </p>
                    </motion.article>
                  );
                },
              )}
            </motion.div>
          </div>
        </section>

        <section
          className="quality-system"
          id="quality-system"
        >
          <div className="container">
            <Reveal className="quality-system__header">
              <div className="quality-kicker quality-kicker--light">
                <span>
                  {copy.system.kicker}
                </span>
                <span className="quality-kicker__line" />
              </div>

              <h2>
                {copy.system.title}
              </h2>

              <p>
                {copy.system.description}
              </p>
            </Reveal>

            <motion.div
              className="quality-system__cards"
              variants={stagger}
              initial={
                reduceMotion
                  ? false
                  : "hidden"
              }
              whileInView={
                reduceMotion
                  ? undefined
                  : "visible"
              }
              viewport={{
                once: true,
                amount: 0.06,
              }}
            >
              {copy.system.steps.map(
                (step) => {
                  const Icon = step.icon;

                  return (
                    <motion.article
                      className="quality-step-card"
                      key={step.number}
                      variants={fadeUp}
                      whileHover={
                        reduceMotion
                          ? undefined
                          : {
                              y: -7,
                            }
                      }
                    >
                      <div className="quality-step-card__header">
                        <span className="quality-step-card__number">
                          {step.number}
                        </span>

                        <span className="quality-step-card__icon">
                          <Icon size={24} />
                        </span>
                      </div>

                      <span className="quality-step-card__label">
                        {step.label}
                      </span>

                      <h3>
                        {step.title}
                      </h3>

                      <p>
                        {step.description}
                      </p>

                      <span className="quality-step-card__line" />
                    </motion.article>
                  );
                },
              )}
            </motion.div>
          </div>
        </section>

        <section className="quality-lab">
          <div className="container quality-lab__grid">
            <motion.div
              className="quality-lab__media"
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: isArabic
                        ? -40
                        : 40,
                    }
              }
              whileInView={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      x: 0,
                    }
              }
              viewport={{
                once: true,
                amount: 0.25,
              }}
              transition={{
                duration: 0.85,
                ease: easing,
              }}
            >
              <div className="quality-image-fallback">
                <FlaskConical size={60} />
                <span>
                  {copy.laboratory.fallback}
                </span>
              </div>

              <img
                src={LAB_IMAGE}
                alt={copy.laboratory.imageAlt}
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
                onError={handleImageError}
              />

              <div className="quality-lab__media-overlay">
                <span>
                  <FlaskConical size={22} />
                  {copy.laboratory.overlayLabel}
                </span>

                <strong>
                  {copy.laboratory.overlayTitle}
                </strong>
              </div>
            </motion.div>

            <Reveal
              className="quality-lab__content"
              delay={0.1}
            >
              <div className="quality-kicker">
                <span>
                  {copy.laboratory.kicker}
                </span>
                <span className="quality-kicker__line" />
              </div>

              <h2>
                {copy.laboratory.title}
              </h2>

              <p>
                {copy.laboratory.description}
              </p>

              <div className="quality-lab__checks">
                {copy.laboratory.checks.map(
                  (item, index) => (
                    <span key={index}>
                      <CheckCircle2 size={20} />
                      {item}
                    </span>
                  ),
                )}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="quality-composition">
          <div className="container quality-composition__grid">
            <Reveal className="quality-composition__content">
              <div className="quality-kicker">
                <span>
                  {copy.composition.kicker}
                </span>
                <span className="quality-kicker__line" />
              </div>

              <h2>
                {copy.composition.title}
              </h2>

              <p>
                {copy.composition.description}
              </p>

              <div className="quality-minerals">
                {copy.composition.minerals.map(
                  (mineral, index) => {
                    const width = Math.max(
                      6,
                      Math.min(
                        100,
                        (mineral.numericValue /
                          220) *
                          100,
                      ),
                    );

                    return (
                      <div
                        className="quality-mineral"
                        key={index}
                      >
                        <div className="quality-mineral__header">
                          <span>
                            {mineral.name}
                          </span>

                          <strong>
                            {mineral.value}
                            <small>
                              {mineral.unit}
                            </small>
                          </strong>
                        </div>

                        <span className="quality-mineral__track">
                          <motion.span
                            initial={
                              reduceMotion
                                ? false
                                : {
                                    width: 0,
                                  }
                            }
                            whileInView={
                              reduceMotion
                                ? undefined
                                : {
                                    width: `${width}%`,
                                  }
                            }
                            viewport={{
                              once: true,
                              amount: 0.6,
                            }}
                            transition={{
                              duration: 0.8,
                              delay:
                                index * 0.04,
                              ease: easing,
                            }}
                          />
                        </span>
                      </div>
                    );
                  },
                )}
              </div>
            </Reveal>

            <motion.div
              className="quality-composition__visual"
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: isArabic
                        ? -40
                        : 40,
                    }
              }
              whileInView={
                reduceMotion
                  ? undefined
                  : {
                      opacity: 1,
                      x: 0,
                    }
              }
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                duration: 0.85,
                ease: easing,
              }}
            >
              <div className="quality-composition__image">
                <div className="quality-image-fallback">
                  <Droplets size={62} />
                  <span>
                    {copy.composition.fallback}
                  </span>
                </div>

                <img
                  src={WATER_IMAGE}
                  alt={copy.composition.imageAlt}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  onError={handleImageError}
                />

                <div className="quality-composition__image-overlay" />
              </div>

              <div className="quality-composition__seal">
                <ShieldCheck size={25} />

                <span>
                  <small>
                    {copy.composition.sealSmall}
                  </small>

                  <strong>
                    {copy.composition.sealStrong}
                  </strong>
                </span>
              </div>

              <div className="quality-composition__guarantees">
                {copy.composition.guarantees.map(
                  (guarantee, index) => (
                    <span key={index}>
                      <Check size={15} />
                      {guarantee}
                    </span>
                  ),
                )}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="quality-cta">
          <div className="container quality-cta__inner">
            <Reveal className="quality-cta__content">
              <span>
                {copy.cta.label}
              </span>

              <h2>
                {copy.cta.title}
              </h2>
            </Reveal>

            <Reveal delay={0.12}>
              <Link
                className="quality-cta__button"
                to="/contact"
              >
                <span>
                  {copy.cta.button}
                </span>
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

export default QualityPage;
