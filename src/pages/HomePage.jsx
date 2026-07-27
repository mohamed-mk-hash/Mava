import { useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpLeft,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Check,
  ChevronDown,
  Droplets,
  Factory,
  GraduationCap,
  HeartPulse,
  Hospital,
  MapPin,
  Quote,
  ShieldCheck,
  Store,
  Target,
  Truck,
  Users,
  Utensils,
  Zap,
} from 'lucide-react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Link } from 'react-router-dom';

import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { useLanguage } from '../i18n/useLanguage';

const translations = {
  ar: {
    pageTitle: 'مياه مافا | مشروع مياه شرب معبأة في حلب',
    hero: {
      imageAlt: 'جبال مغطاة بالثلوج في سوريا',
      brand: 'MAVA WATER',
      location: 'حلب، سوريا',
      title: 'مشروع مصنع مياه شرب معبأة',
      titleAccent: '– حلب، سوريا',
      lead: 'استثمار صناعي حيوي بعائد مستدام وأثر اجتماعي',
      primaryButton: 'اكتشف المشروع',
      secondaryButton: 'فرصة الاستثمار',
      trustLabel: 'مزايا المنتج',
      trust: ['مياه محلاة', 'معقمة وآمنة', 'إنتاج محلي'],
      sideLabel: 'من المصدر إلى المستهلك',
      sideTitle: ['نقاء محلي.', 'أثر مستدام.'],
      scrollLabel: 'اكتشف أكثر',
    },
    marquee: [
      'مياه نظيفة',
      'جودة وطنية',
      'صحة المجتمع',
      'توريد مستقر',
      'صناعة من حلب',
    ],
    project: {
      eyebrow: 'نبذة عن المشروع',
      title: 'حل محلي لحاجة يومية لا يمكن تأجيلها',
      text:
        'ينطلق مشروع مافا من حاجة حقيقية في سوق حلب: طلب متزايد على مياه الشرب المعبأة، مقابل اعتماد شبه كامل على التوريد من محافظات أخرى.',
      problem: {
        kicker: 'المشكلة',
        title: 'فجوة واضحة بين الطلب والتوفر المحلي',
        points: [
          'نقص في توفر مياه الشرب المعبأة محليًا.',
          'اعتماد السوق على التوريد من محافظات أخرى.',
          'ارتفاع التكلفة النهائية على المستهلك.',
          'مخاطر صحية من استخدام مياه غير آمنة.',
        ],
      },
      solution: {
        kicker: 'الحل',
        title: 'مصنع محلي بمواصفات صحية وتوريد مستقر',
        points: [
          'إنتاج مياه محلاة، معقمة ومعبأة بعناية.',
          'منتج وطني عالي الجودة يلبي الطلب المحلي.',
          'سعر منافس وتقليل تكلفة النقل والتوريد.',
          'كميات مرنة للاستهلاك الفردي والمؤسسي.',
        ],
      },
    },
    vision: {
      eyebrow: 'رؤية ورسالة',
      title: 'أكثر من عبوة مياه',
      text: 'مشروع صناعي يحمل أثرًا صحيًا واقتصاديًا واجتماعيًا واضحًا.',
      cards: [
        {
          label: 'الرؤية',
          title: 'الريادة في حلب، ونموذج وطني في الجودة والكفاءة.',
          text:
            'أن يكون مافا المصنع الرائد لإنتاج مياه الشرب المعبأة في مدينة حلب، ويسهم في تحقيق الاكتفاء المحلي وتقليل الاعتماد على الاستجرار من المحافظات المجاورة.',
        },
        {
          label: 'الرسالة',
          title: 'مياه آمنة، وظائف محلية، واقتصاد أكثر قوة.',
          text:
            'تقديم منتج وطني عالي الجودة، يرفع الوعي الصحي، يخلق فرص عمل للشباب، ويدعم الاقتصاد السوري من خلال استثمار صناعي مستدام.',
        },
      ],
      values: [
        ['منتج وطني', 'يُصنع في حلب'],
        ['طلب مستمر', 'فردي ومؤسسي'],
        ['توريد أسرع', 'قرب من السوق'],
        ['أثر مباشر', 'صحي واقتصادي'],
      ],
    },
    product: {
      imageAlt: 'منتج مياه مافا',
      badge: 'علامة وطنية موثوقة',
      eyebrow: 'المنتج',
      title: 'نفس النقاء، لكل لحظة ولكل احتياج',
      text:
        'مياه شرب محلاة ومعقمة، معبأة بأحجام متعددة للاستهلاك الفردي والمؤسسي، وبجودة ثابتة من خط الإنتاج حتى نقطة البيع.',
      features: [
        ['معالجة موثوقة', 'تحلية وتعقيم وفق المعايير الصحية المعتمدة.'],
        ['أحجام متعددة', 'خيارات مرنة للاستخدام اليومي والمؤسسي.'],
        ['جودة ثابتة', 'نفس معايير السلامة في كل عبوة.'],
        ['سعر منافس', 'ميزة محلية تقلل كلفة التوريد والنقل.'],
      ],
      button: 'ناقش احتياج التوريد',
    },
    clients: {
      eyebrow: 'العملاء المستهدفون',
      title: 'مياه مافا لكل بيت، مؤسسة ومساحة عامة',
      text:
        'نغطي طيفًا واسعًا من الاحتياجات بكميات مرنة وتوريد منتظم يناسب الاستخدام الفردي والمؤسسي.',
      cardLabel: 'تواصل بشأن',
      items: [
        {
          icon: Utensils,
          title: 'المطاعم والمقاهي',
          text: 'توريد مرن يناسب الاستهلاك اليومي.',
        },
        {
          icon: Hospital,
          title: 'المستشفيات والمراكز الصحية',
          text: 'مياه آمنة للبيئات الحساسة.',
        },
        {
          icon: GraduationCap,
          title: 'المدارس والجامعات',
          text: 'حل موثوق للاستهلاك المؤسسي.',
        },
        {
          icon: Building2,
          title: 'الجهات الحكومية',
          text: 'عقود توريد مستقرة ومنتظمة.',
        },
        {
          icon: Factory,
          title: 'الشركات والمنشآت',
          text: 'كميات مخصصة لاحتياجات فرق العمل.',
        },
        {
          icon: Store,
          title: 'الأسواق والمتاجر',
          text: 'منتج وطني جاهز للبيع والتوزيع.',
        },
        {
          icon: Users,
          title: 'الأسر والأفراد',
          text: 'جودة يومية بسعر تنافسي.',
        },
        {
          icon: MapPin,
          title: 'حلب وريفها',
          text: 'تغطية محلية أقرب وأسرع.',
        },
      ],
    },
    advantages: {
      eyebrow: 'الميزة التنافسية',
      title: 'فرصة دخول مبكر إلى سوق غير مشبع',
      text:
        'يجمع المشروع بين حاجة يومية واضحة، قرب جغرافي من المستهلك، وبنية تشغيلية قابلة للنمو.',
      button: 'ناقش فرصة الاستثمار',
      items: [
        'سوق محلي نشط مع طلب يومي متزايد.',
        'غياب منافس مباشر في الموقع الجغرافي المستهدف.',
        'توفر المادة الخام الأساسية بجودة عالية.',
        'سرعة التنفيذ والتشغيل عند توفر الدعم المالي والفني.',
        'رأس مال منخفض نسبيًا مقارنة بمشاريع صناعية أخرى.',
        'فرص واضحة للتوسع ورفع الطاقة الإنتاجية مستقبلًا.',
      ],
    },
    quality: {
      imageAlt: 'خط إنتاج ومراقبة جودة المياه',
      eyebrow: 'الجودة والسلامة',
      title: 'العناية تبدأ من خط الإنتاج، ولا تنتهي عند العبوة.',
      text:
        'يركز المشروع على إنتاج مياه نظيفة، محلاة ومعقمة، مع الاهتمام بالسلامة والجودة في كل مرحلة من مراحل الإنتاج والتعبئة والتوزيع.',
      checks: ['معايير صحية', 'نقاء ثابت', 'رقابة جودة'],
      button: 'اكتشف منظومة الجودة',
    },
    impact: {
      eyebrow: 'الأثر الاقتصادي والاجتماعي',
      title: 'استثمار يعود أثره إلى المجتمع',
      text:
        'القيمة الحقيقية لمافا لا تُقاس بالمبيعات فقط، بل بما يضيفه للصحة العامة، فرص العمل والإنتاج المحلي.',
      items: [
        {
          icon: HeartPulse,
          title: 'صحة أفضل',
          text: 'المساهمة في الحد من الأمراض المرتبطة بمياه الشرب غير الآمنة.',
        },
        {
          icon: Users,
          title: 'فرص عمل',
          text: 'خلق وظائف مستدامة للعمالة المحلية مع التركيز على فئة الشباب.',
        },
        {
          icon: Factory,
          title: 'إنتاج محلي',
          text: 'تقليل الاعتماد على التوريد من المحافظات الأخرى ودعم الصناعة الوطنية.',
        },
        {
          icon: Zap,
          title: 'استثمار مستدام',
          text: 'نموذج متوازن يجمع بين الربحية والمسؤولية الاجتماعية.',
        },
      ],
    },
    distribution: {
      eyebrow: 'التوزيع',
      title: 'من حلب، إلى الأسواق والمؤسسات والبيوت',
      text:
        'يعتمد نموذج الإيرادات على البيع المباشر، عقود التوريد للمؤسسات، والتوزيع بالجملة للمطاعم والمقاهي والمتاجر.',
      points: [
        'بيع مباشر للأسواق والمتاجر',
        'عقود توريد للمؤسسات B2B',
        'توزيع بالجملة',
        'طلب متكرر ومستدام',
      ],
      button: 'استكشف شبكة التوزيع',
      imageAlt: 'شاحنة توزيع مافا',
      startLabel: 'نقطة الانطلاق',
      startValue: 'حلب، سوريا',
    },
    contactCta: {
      eyebrow: 'هل لديك سؤال عن الجودة؟',
      title: 'فريق مافا جاهز للإجابة عن استفساراتك.',
      button: 'تواصل معنا',
    },
  },

  en: {
    pageTitle: 'MAVA Water | Packaged Drinking Water Project in Aleppo',
    hero: {
      imageAlt: 'Snow-covered mountains in Syria',
      brand: 'MAVA WATER',
      location: 'Aleppo, Syria',
      title: 'Packaged drinking water plant',
      titleAccent: '— Aleppo, Syria',
      lead: 'A vital industrial investment with sustainable returns and social impact',
      primaryButton: 'Explore the project',
      secondaryButton: 'Investment opportunity',
      trustLabel: 'Product advantages',
      trust: ['Purified water', 'Sanitised and safe', 'Locally produced'],
      sideLabel: 'From source to consumer',
      sideTitle: ['Local purity.', 'Sustainable impact.'],
      scrollLabel: 'Discover more',
    },
    marquee: [
      'Clean water',
      'National quality',
      'Community health',
      'Reliable supply',
      'Made in Aleppo',
    ],
    project: {
      eyebrow: 'Project overview',
      title: 'A local solution to a daily need that cannot wait',
      text:
        'MAVA begins with a real need in Aleppo: growing demand for packaged drinking water and a heavy reliance on supplies brought in from other governorates.',
      problem: {
        kicker: 'The challenge',
        title: 'A clear gap between demand and local availability',
        points: [
          'Limited local availability of packaged drinking water.',
          'Dependence on supplies from other governorates.',
          'Higher final costs for consumers.',
          'Health risks associated with unsafe drinking water.',
        ],
      },
      solution: {
        kicker: 'The solution',
        title: 'A local plant with health-focused standards and reliable supply',
        points: [
          'Carefully purified, sanitised and packaged drinking water.',
          'A high-quality national product serving local demand.',
          'Competitive pricing with lower transport and supply costs.',
          'Flexible volumes for individual and institutional use.',
        ],
      },
    },
    vision: {
      eyebrow: 'Vision and mission',
      title: 'More than a bottle of water',
      text: 'An industrial project with a clear health, economic and social impact.',
      cards: [
        {
          label: 'Vision',
          title: 'Leadership in Aleppo and a national model for quality and efficiency.',
          text:
            'To establish MAVA as Aleppo’s leading packaged drinking water plant, supporting local self-sufficiency and reducing reliance on supplies from neighbouring governorates.',
        },
        {
          label: 'Mission',
          title: 'Safe water, local jobs and a stronger economy.',
          text:
            'To provide a high-quality national product, strengthen health awareness, create jobs for young people and support the Syrian economy through sustainable industrial investment.',
        },
      ],
      values: [
        ['National product', 'Made in Aleppo'],
        ['Continuous demand', 'Consumer and institutional'],
        ['Faster supply', 'Closer to the market'],
        ['Direct impact', 'Health and economic'],
      ],
    },
    product: {
      imageAlt: 'MAVA drinking water product',
      badge: 'A trusted national brand',
      eyebrow: 'The product',
      title: 'The same purity for every moment and every need',
      text:
        'Purified and sanitised drinking water in multiple formats for individual and institutional consumption, with consistent quality from the production line to the point of sale.',
      features: [
        ['Reliable treatment', 'Purification and sanitisation to approved health standards.'],
        ['Multiple formats', 'Flexible options for daily and institutional use.'],
        ['Consistent quality', 'The same safety standards in every bottle.'],
        ['Competitive pricing', 'Local production reduces transport and supply costs.'],
      ],
      button: 'Discuss your supply needs',
    },
    clients: {
      eyebrow: 'Target customers',
      title: 'MAVA water for every home, institution and public space',
      text:
        'We serve a broad range of needs through flexible volumes and reliable delivery for consumers and institutions.',
      cardLabel: 'Contact us about',
      items: [
        {
          icon: Utensils,
          title: 'Restaurants and cafés',
          text: 'Flexible supply suited to daily consumption.',
        },
        {
          icon: Hospital,
          title: 'Hospitals and health centres',
          text: 'Safe water for sensitive environments.',
        },
        {
          icon: GraduationCap,
          title: 'Schools and universities',
          text: 'A dependable solution for institutional use.',
        },
        {
          icon: Building2,
          title: 'Government entities',
          text: 'Stable and regularly scheduled supply contracts.',
        },
        {
          icon: Factory,
          title: 'Companies and facilities',
          text: 'Custom volumes for workforce needs.',
        },
        {
          icon: Store,
          title: 'Markets and retailers',
          text: 'A national product ready for sale and distribution.',
        },
        {
          icon: Users,
          title: 'Families and individuals',
          text: 'Everyday quality at a competitive price.',
        },
        {
          icon: MapPin,
          title: 'Aleppo and its countryside',
          text: 'Closer, faster local coverage.',
        },
      ],
    },
    advantages: {
      eyebrow: 'Competitive advantage',
      title: 'An early entry opportunity in an underserved market',
      text:
        'The project combines a clear everyday need, proximity to consumers and an operating model designed to grow.',
      button: 'Discuss the investment opportunity',
      items: [
        'An active local market with growing daily demand.',
        'No direct competitor in the target geographic area.',
        'High-quality access to the essential raw material.',
        'Fast implementation and operation once financial and technical support is available.',
        'Relatively low capital needs compared with other industrial projects.',
        'Clear opportunities to expand and increase future production capacity.',
      ],
    },
    quality: {
      imageAlt: 'Water production line and quality control',
      eyebrow: 'Quality and safety',
      title: 'Care begins on the production line and continues beyond the bottle.',
      text:
        'The project focuses on clean, purified and sanitised water, with safety and quality embedded in every stage of production, packaging and distribution.',
      checks: ['Health standards', 'Consistent purity', 'Quality control'],
      button: 'Explore our quality system',
    },
    impact: {
      eyebrow: 'Economic and social impact',
      title: 'An investment whose value returns to the community',
      text:
        'MAVA’s real value is measured not only in sales, but also in its contribution to public health, employment and local production.',
      items: [
        {
          icon: HeartPulse,
          title: 'Better health',
          text: 'Helping reduce illnesses linked to unsafe drinking water.',
        },
        {
          icon: Users,
          title: 'Employment',
          text: 'Creating sustainable local jobs with an emphasis on young people.',
        },
        {
          icon: Factory,
          title: 'Local production',
          text: 'Reducing reliance on supplies from other governorates and supporting national industry.',
        },
        {
          icon: Zap,
          title: 'Sustainable investment',
          text: 'A balanced model combining commercial viability and social responsibility.',
        },
      ],
    },
    distribution: {
      eyebrow: 'Distribution',
      title: 'From Aleppo to markets, institutions and homes',
      text:
        'The revenue model combines direct sales, institutional supply contracts and wholesale distribution to restaurants, cafés and retailers.',
      points: [
        'Direct sales to markets and retailers',
        'B2B institutional supply contracts',
        'Wholesale distribution',
        'Reliable recurring demand',
      ],
      button: 'Explore the distribution network',
      imageAlt: 'MAVA distribution truck',
      startLabel: 'Starting point',
      startValue: 'Aleppo, Syria',
    },
    contactCta: {
      eyebrow: 'Have a question about quality?',
      title: 'The MAVA team is ready to answer your questions.',
      button: 'Contact us',
    },
  },
};

const reveal = {
  hidden: { opacity: 0, y: 34 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function Reveal({
  children,
  className = '',
  delay = 0,
}) {
  return (
    <motion.div
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{
        once: true,
        amount: 0.18,
      }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  text,
  light = false,
  align = 'center',
}) {
  return (
    <div
      className={[
        'section-title',
        `section-title--${align}`,
        light ? 'section-title--light' : '',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span className="eyebrow">
        <span className="eyebrow__line" />
        {eyebrow}
      </span>

      <h2>{title}</h2>

      {text && <p>{text}</p>}
    </div>
  );
}

function HomePage() {
  const {
    language,
    isArabic,
    direction,
  } = useLanguage();

  const copy = translations[language];
  const DirectionArrow = isArabic
    ? ArrowLeft
    : ArrowRight;
  const ExternalArrow = isArabic
    ? ArrowUpLeft
    : ArrowUpRight;
  const sideAlignment = isArabic
    ? 'right'
    : 'left';

  const {
    scrollYProgress,
    scrollY,
  } = useScroll();

  const heroY = useTransform(
    scrollY,
    [0, 900],
    [0, 140],
  );

  const heroScale = useTransform(
    scrollY,
    [0, 900],
    [1, 1.08],
  );

  const progressScale = useSpring(
    scrollYProgress,
    {
      stiffness: 120,
      damping: 28,
      restDelta: 0.001,
    },
  );

  useEffect(() => {
    document.title = copy.pageTitle;
  }, [copy.pageTitle]);

  return (
    <div
      className={`app app--${language}`}
      dir={direction}
    >
      <motion.div
        className="scroll-progress"
        style={{ scaleX: progressScale }}
      />

      <Navbar variant="overlay" />

      <main>
        {/* Hero */}
        <section
          id="top"
          className="hero"
        >
          <motion.div
            className="hero__background"
            style={{
              y: heroY,
              scale: heroScale,
            }}
          >
            <img
              src="/assets/hero-mountain.webp"
              alt={copy.hero.imageAlt}
            />
          </motion.div>

          <div className="hero__overlay" />
          <div className="hero__grid" />
          <div
            className="hero__glow"
            aria-hidden="true"
          />

          <div
            className="hero__rings"
            aria-hidden="true"
          >
            <span />
            <span />
            <span />
          </div>

          <div className="container hero__content">
            <motion.div
              className="hero__copy"
              initial={{
                opacity: 0,
                y: 42,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.95,
                delay: 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.div
                className="hero__eyebrow"
                initial={{
                  opacity: 0,
                  x: isArabic ? 24 : -24,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.75,
                  delay: 0.28,
                }}
              >
                <span className="hero__eyebrow-line" />
                <span>{copy.hero.brand}</span>
                <small>{copy.hero.location}</small>
              </motion.div>

              <h1>
                {copy.hero.title}
                <span>{copy.hero.titleAccent}</span>
              </h1>

              <p className="hero__lead">
                {copy.hero.lead}
              </p>

              <div className="hero__actions">
                <a
                  className="button button--primary button--large"
                  href="#project"
                >
                  {copy.hero.primaryButton}
                  <DirectionArrow size={18} />
                </a>

                <Link
                  className="button button--ghost button--large"
                  to="/contact"
                >
                  {copy.hero.secondaryButton}
                  <ExternalArrow size={18} />
                </Link>
              </div>

              <div
                className="hero__trust"
                aria-label={copy.hero.trustLabel}
              >
                {copy.hero.trust.map((item) => (
                  <span key={item}>
                    <Check />
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.aside
              className="hero__side-note"
              initial={{
                opacity: 0,
                y: 24,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.85,
                delay: 0.65,
              }}
            >
              <span>01</span>

              <div>
                <small>{copy.hero.sideLabel}</small>
                <strong>
                  {copy.hero.sideTitle[0]}
                  <br />
                  {copy.hero.sideTitle[1]}
                </strong>
              </div>
            </motion.aside>
          </div>

          <a
            href="#project"
            className="scroll-cue"
            aria-label={copy.hero.scrollLabel}
          >
            <span>{copy.hero.scrollLabel}</span>
            <ChevronDown />
          </a>
        </section>

        {/* Moving values */}
        <section
          className="marquee"
          aria-label={copy.hero.trustLabel}
        >
          <motion.div
            className="marquee__track"
            animate={{
              x: ['0%', '-50%'],
            }}
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {[...Array(2)].flatMap((_, group) =>
              copy.marquee.map((item, index) => (
                <span key={`${group}-${index}`}>
                  {item}
                  <Droplets />
                </span>
              )),
            )}
          </motion.div>
        </section>

        {/* Project */}
        <section
          id="project"
          className="section section--soft project-section"
        >
          <div className="container">
            <Reveal>
              <SectionTitle
                eyebrow={copy.project.eyebrow}
                title={copy.project.title}
                text={copy.project.text}
              />
            </Reveal>

            <div className="problem-solution">
              <Reveal className="story-card story-card--problem">
                <div className="story-card__number">
                  01
                </div>

                <div className="story-card__icon">
                  <Target />
                </div>

                <span className="story-card__kicker">
                  {copy.project.problem.kicker}
                </span>

                <h3>
                  {copy.project.problem.title}
                </h3>

                <ul>
                  {copy.project.problem.points.map(
                    (item) => (
                      <li key={item}>{item}</li>
                    ),
                  )}
                </ul>
              </Reveal>

              <div
                className="flow-line"
                aria-hidden="true"
              >
                <motion.span
                  animate={{
                    y: ['-10%', '110%'],
                  }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              </div>

              <Reveal
                className="story-card story-card--solution"
                delay={0.12}
              >
                <div className="story-card__number">
                  02
                </div>

                <div className="story-card__icon">
                  <Droplets />
                </div>

                <span className="story-card__kicker">
                  {copy.project.solution.kicker}
                </span>

                <h3>
                  {copy.project.solution.title}
                </h3>

                <ul>
                  {copy.project.solution.points.map(
                    (item) => (
                      <li key={item}>{item}</li>
                    ),
                  )}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Vision */}
        <section
          id="vision"
          className="section vision-section"
        >
          <div className="vision-glow vision-glow--one" />
          <div className="vision-glow vision-glow--two" />

          <div className="container">
            <Reveal>
              <SectionTitle
                eyebrow={copy.vision.eyebrow}
                title={copy.vision.title}
                text={copy.vision.text}
                light
              />
            </Reveal>

            <div className="vision-grid">
              {copy.vision.cards.map(
                (card, index) => (
                  <Reveal
                    className={[
                      'vision-card',
                      index === 1
                        ? 'vision-card--accent'
                        : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    delay={index * 0.12}
                    key={card.label}
                  >
                    <Quote className="vision-card__quote" />
                    <span>{card.label}</span>
                    <h3>{card.title}</h3>
                    <p>{card.text}</p>
                  </Reveal>
                ),
              )}
            </div>

            <div className="value-strip">
              {copy.vision.values.map(
                ([title, text], index) => (
                  <Reveal
                    className="value-strip__item"
                    key={title}
                    delay={index * 0.06}
                  >
                    <span>
                      {String(index + 1).padStart(
                        2,
                        '0',
                      )}
                    </span>
                    <strong>{title}</strong>
                    <small>{text}</small>
                  </Reveal>
                ),
              )}
            </div>
          </div>
        </section>

        {/* Product */}
        <section
          id="product"
          className="section product-section"
        >
          <div className="container product-layout">
            <Reveal className="product-visual">
              <div className="product-visual__ring" />
              <div className="product-visual__dots" />

              <motion.img
                src="/assets/product-bottle.webp"
                alt={copy.product.imageAlt}
                whileHover={{
                  scale: 1.035,
                  rotate: isArabic ? 0.7 : -0.7,
                }}
                transition={{ duration: 0.5 }}
              />

              <div className="product-visual__badge">
                <BadgeCheck />
                {copy.product.badge}
              </div>
            </Reveal>

            <Reveal
              className="product-copy"
              delay={0.12}
            >
              <SectionTitle
                eyebrow={copy.product.eyebrow}
                title={copy.product.title}
                text={copy.product.text}
                align={sideAlignment}
              />

              <div className="feature-list">
                {copy.product.features.map(
                  ([title, text], index) => (
                    <motion.div
                      className="feature-item"
                      key={title}
                      initial={{
                        opacity: 0,
                        x: isArabic ? 25 : -25,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{ once: true }}
                      transition={{
                        delay: index * 0.08,
                        duration: 0.55,
                      }}
                    >
                      <span>
                        <Check />
                      </span>

                      <div>
                        <h4>{title}</h4>
                        <p>{text}</p>
                      </div>
                    </motion.div>
                  ),
                )}
              </div>

              <Link
                to="/contact"
                className="text-link"
              >
                {copy.product.button}
                <DirectionArrow />
              </Link>
            </Reveal>
          </div>
        </section>

        {/* Clients */}
        <section className="section clients-section">
          <div className="container">
            <Reveal>
              <SectionTitle
                eyebrow={copy.clients.eyebrow}
                title={copy.clients.title}
                text={copy.clients.text}
              />
            </Reveal>

            <div className="clients-grid">
              {copy.clients.items.map(
                (client, index) => {
                  const Icon = client.icon;

                  return (
                    <Link
                      className="client-card-link"
                      to="/contact"
                      aria-label={`${copy.clients.cardLabel} ${client.title}`}
                      key={client.title}
                    >
                      <motion.article
                        className="client-card"
                        initial={{
                          opacity: 0,
                          y: 28,
                        }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        viewport={{
                          once: true,
                          amount: 0.2,
                        }}
                        transition={{
                          delay:
                            (index % 4) * 0.06,
                          duration: 0.55,
                        }}
                        whileHover={{ y: -8 }}
                      >
                        <div className="client-card__icon">
                          <Icon />
                        </div>

                        <h3>{client.title}</h3>
                        <p>{client.text}</p>

                        <span className="client-card__arrow">
                          <ExternalArrow />
                        </span>
                      </motion.article>
                    </Link>
                  );
                },
              )}
            </div>
          </div>
        </section>

        {/* Advantages */}
        <section
          id="advantages"
          className="section advantages-section"
        >
          <div className="container advantages-layout">
            <Reveal className="advantages-copy">
              <SectionTitle
                eyebrow={copy.advantages.eyebrow}
                title={copy.advantages.title}
                text={copy.advantages.text}
                light
                align={sideAlignment}
              />

              <Link
                className="button button--light"
                to="/contact"
              >
                {copy.advantages.button}
                <DirectionArrow />
              </Link>
            </Reveal>

            <div className="advantages-list">
              {copy.advantages.items.map(
                (item, index) => (
                  <motion.div
                    className="advantage-row"
                    key={item}
                    initial={{
                      opacity: 0,
                      x: isArabic ? -30 : 30,
                    }}
                    whileInView={{
                      opacity: 1,
                      x: 0,
                    }}
                    viewport={{
                      once: true,
                      amount: 0.4,
                    }}
                    transition={{
                      delay: index * 0.07,
                      duration: 0.55,
                    }}
                  >
                    <span>
                      {String(index + 1).padStart(
                        2,
                        '0',
                      )}
                    </span>

                    <p>{item}</p>
                    <ExternalArrow />
                  </motion.div>
                ),
              )}
            </div>
          </div>
        </section>

        {/* Quality */}
        <section className="quality-section">
          <div className="quality-section__image">
            <motion.img
              src="/assets/factory-quality.webp"
              alt={copy.quality.imageAlt}
              initial={{ scale: 1.08 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          </div>

          <div className="quality-section__overlay" />

          <div className="container quality-section__content">
            <Reveal className="quality-card">
              <span className="eyebrow eyebrow--light">
                <span className="eyebrow__line" />
                {copy.quality.eyebrow}
              </span>

              <h2>{copy.quality.title}</h2>
              <p>{copy.quality.text}</p>

              <div className="quality-card__checks">
                <span>
                  <ShieldCheck />
                  {copy.quality.checks[0]}
                </span>

                <span>
                  <Droplets />
                  {copy.quality.checks[1]}
                </span>

                <span>
                  <BadgeCheck />
                  {copy.quality.checks[2]}
                </span>
              </div>

              <Link
                className="button button--primary quality-card__action"
                to="/quality"
              >
                {copy.quality.button}
                <DirectionArrow />
              </Link>
            </Reveal>
          </div>
        </section>

        {/* Impact */}
        <section className="section impact-section">
          <div className="container">
            <Reveal>
              <SectionTitle
                eyebrow={copy.impact.eyebrow}
                title={copy.impact.title}
                text={copy.impact.text}
              />
            </Reveal>

            <div className="impact-grid">
              {copy.impact.items.map(
                (item, index) => {
                  const Icon = item.icon;

                  return (
                    <Reveal
                      className="impact-card"
                      key={item.title}
                      delay={index * 0.07}
                    >
                      <div className="impact-card__top">
                        <Icon />
                        <span>
                          {String(
                            index + 1,
                          ).padStart(2, '0')}
                        </span>
                      </div>

                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </Reveal>
                  );
                },
              )}
            </div>
          </div>
        </section>

        {/* Distribution */}
        <section
          id="distribution"
          className="section distribution-section"
        >
          <div className="container distribution-layout">
            <Reveal className="distribution-copy">
              <SectionTitle
                eyebrow={copy.distribution.eyebrow}
                title={copy.distribution.title}
                text={copy.distribution.text}
                align={sideAlignment}
              />

              <div className="distribution-points">
                {copy.distribution.points.map(
                  (item) => (
                    <span key={item}>
                      <Check />
                      {item}
                    </span>
                  ),
                )}
              </div>

              <Link
                className="button button--dark"
                to="/distribution"
              >
                {copy.distribution.button}
                <Truck />
              </Link>
            </Reveal>

            <Reveal
              className="distribution-visual"
              delay={0.1}
            >
              <div className="distribution-visual__image">
                <img
                  src="/assets/distribution-truck.webp"
                  alt={copy.distribution.imageAlt}
                />
              </div>

              <div className="distribution-visual__card">
                <MapPin />

                <div>
                  <span>
                    {copy.distribution.startLabel}
                  </span>
                  <strong>
                    {copy.distribution.startValue}
                  </strong>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Contact CTA — replaces the previous investment block */}
        <section
          id="investment"
          className="home-contact-cta"
        >
          <div className="container home-contact-cta__inner">
            <Reveal className="home-contact-cta__content">
              <span className="eyebrow">
                <span className="eyebrow__line" />
                {copy.contactCta.eyebrow}
              </span>

              <h2>{copy.contactCta.title}</h2>
            </Reveal>

            <Reveal
              className="home-contact-cta__action"
              delay={0.12}
            >
              <Link
                className="button button--primary button--large"
                to="/contact"
              >
                {copy.contactCta.button}
                <DirectionArrow />
              </Link>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;
