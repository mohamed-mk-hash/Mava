import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Send,
  Store,
  Truck,
  Warehouse,
} from "lucide-react";
import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  Tooltip,
  ZoomControl,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useLanguage } from "../../i18n/useLanguage";
import { products as productCatalogue } from "../Products/productsData";
import { submitDistributionForm } from "../../services/formsApi";

import "../../styles/FormStatus.css";
import "./DistributionPage.css";

const HERO_IMAGE =
  "https://images.pexels.com/photos/6940962/pexels-photo-6940962.jpeg?auto=compress&cs=tinysrgb&w=1800";

const easing = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
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
    pageTitle: "التوزيع | مياه مافا",
    hero: {
      kicker: "التوزيع",
      titleMain: "من حلب إلى السوق،",
      titleAccent: "توزيع أقرب وأكثر استقرارًا.",
      description:
        "نعمل على توفير مياه مافا لنقاط البيع والعملاء التجاريين، مع شبكة توزيع تبدأ من حلب وتتوسع تدريجيًا نحو المحافظات السورية الأخرى.",
      button: "استكشف خريطة التغطية",
      imageAlt: "شاحنة توزيع تنقل المنتجات إلى نقاط البيع",
      fallback: "شبكة توزيع مافا",
    },
    coverage: {
      kicker: "التغطية",
      title: "شبكة توزيع حقيقية على خريطة سوريا.",
      description:
        "اختر نوع التغطية لعرض المناطق الحالية أو المحافظات الموجودة ضمن خطة التوسع القادمة، ثم مرّر المؤشر فوق أي نقطة لمعرفة اسمها.",
      aria: "تصفية نقاط التغطية",
      filters: {
        all: "عرض الكل",
        active: "تغطية حالية",
        future: "توسع قادم",
      },
      activeStatus: "ضمن شبكة التوزيع الحالية",
      futureStatus: "ضمن خطة التوسع القادمة",
    },
    order: {
      kicker: "طلبات الكميات",
      title: "توزيع المياه وطلبات الكميات.",
      description:
        "نستقبل طلبات المتاجر والمطاعم والفنادق والشركات والموزعين، مع دراسة احتياجات التوزيع حسب المحافظة والكمية المطلوبة.",
      benefits: [
        {
          icon: Store,
          title: "للمتاجر ونقاط البيع",
          description:
            "طلبات دورية أو حسب الحاجة، مع تنسيق واضح لمواعيد التسليم.",
        },
        {
          icon: Building2,
          title: "للمطاعم والمنشآت",
          description:
            "كميات مرنة تناسب الاستهلاك اليومي والاحتياجات التشغيلية.",
        },
        {
          icon: Warehouse,
          title: "للموزعين والشركات",
          description:
            "دراسة التغطية والكميات المطلوبة بحسب المحافظة والمنطقة.",
        },
      ],
      form: {
        fullName: "الاسم الكامل",
        fullNamePlaceholder: "اكتب اسمك",
        phone: "رقم الهاتف",
        phonePlaceholder: "09xxxxxxxx",
        governorate: "المحافظة",
        governoratePlaceholder: "اختر المحافظة",
        area: "المدينة / المنطقة",
        areaPlaceholder: "اكتب المدينة أو المنطقة",
        customerType: "نوع العميل",
        customerTypePlaceholder: "اختر نوع العميل",
        product: "المنتج المطلوب",
        productPlaceholder: "اختر المنتج",
        quantity: "الكمية المطلوبة",
        quantityPlaceholder: "مثال: 50",
        notes: "ملاحظات إضافية",
        notesPlaceholder: "اكتب تفاصيل الطلب أو وقت التسليم المناسب...",
        footer:
          "سيتم إرسال طلبك مباشرة إلى فريق التوزيع عبر خادم البريد الآمن.",
        submit: "إرسال طلب الكمية",
        status: {
          sending: "جارٍ إرسال طلب الكمية...",
          success: "تم إرسال طلبك بنجاح. سيتواصل معك فريق التوزيع قريبًا.",
          error: "تعذّر إرسال الطلب الآن. حاول مرة أخرى بعد قليل.",
          quantityError: "أدخل الكمية بالأرقام فقط، ويجب أن تكون أكبر من صفر.",
        },
      },
      customerTypes: {
        store: "متجر",
        restaurant: "مطعم",
        hotel: "فندق",
        company: "شركة",
        distributor: "موزع",
        event: "فعالية أو مناسبة",
      },
      whatsapp: {
        heading: "طلب كمية جديد من موقع مافا",
        name: "الاسم",
        phone: "رقم الهاتف",
        governorate: "المحافظة",
        area: "المدينة / المنطقة",
        customerType: "نوع العميل",
        product: "المنتج المطلوب",
        quantity: "الكمية",
        notes: "ملاحظات",
      },
    },
  },
  en: {
    pageTitle: "Distribution | MAVA Water",
    hero: {
      kicker: "Distribution",
      titleMain: "From Aleppo to the market,",
      titleAccent: "closer and more reliable delivery.",
      description:
        "We supply MAVA Water to retailers and commercial customers through a distribution network that starts in Aleppo and gradually expands across other Syrian governorates.",
      button: "Explore the Coverage Map",
      imageAlt: "A distribution truck delivering products to retail locations",
      fallback: "MAVA Distribution Network",
    },
    coverage: {
      kicker: "Coverage",
      title: "A real distribution network across Syria.",
      description:
        "Choose a coverage type to view the locations currently served or the governorates included in the next expansion phase. Hover over any marker to see its name.",
      aria: "Filter distribution locations",
      filters: {
        all: "Show All",
        active: "Current Coverage",
        future: "Future Expansion",
      },
      activeStatus: "Currently served by the distribution network",
      futureStatus: "Included in the upcoming expansion plan",
    },
    order: {
      kicker: "Bulk Orders",
      title: "Water distribution and bulk orders.",
      description:
        "We accept orders from retailers, restaurants, hotels, companies and distributors, with distribution requirements assessed according to the governorate and requested quantity.",
      benefits: [
        {
          icon: Store,
          title: "Retailers and Points of Sale",
          description:
            "Recurring or on-demand orders with clearly coordinated delivery dates.",
        },
        {
          icon: Building2,
          title: "Restaurants and Businesses",
          description:
            "Flexible quantities suited to daily consumption and operational needs.",
        },
        {
          icon: Warehouse,
          title: "Distributors and Companies",
          description:
            "Coverage and quantity planning based on the governorate and area.",
        },
      ],
      form: {
        fullName: "Full Name",
        fullNamePlaceholder: "Enter your name",
        phone: "Phone Number",
        phonePlaceholder: "09xxxxxxxx",
        governorate: "Governorate",
        governoratePlaceholder: "Select a governorate",
        area: "City / Area",
        areaPlaceholder: "Enter the city or area",
        customerType: "Customer Type",
        customerTypePlaceholder: "Select customer type",
        product: "Required Product",
        productPlaceholder: "Select a product",
        quantity: "Required Quantity",
        quantityPlaceholder: "Example: 50",
        notes: "Additional Notes",
        notesPlaceholder:
          "Add order details or your preferred delivery time...",
        footer:
          "Your request will be sent directly to the distribution team through our secure mail server.",
        submit: "Send Bulk Order",
        status: {
          sending: "Sending your bulk order...",
          success: "Your order request was sent successfully. The distribution team will contact you soon.",
          error: "We could not send the request right now. Please try again shortly.",
          quantityError: "Enter the quantity using numbers only, and use a value greater than zero.",
        },
      },
      customerTypes: {
        store: "Retail Store",
        restaurant: "Restaurant",
        hotel: "Hotel",
        company: "Company",
        distributor: "Distributor",
        event: "Event or Occasion",
      },
      whatsapp: {
        heading: "New bulk order from the MAVA website",
        name: "Name",
        phone: "Phone number",
        governorate: "Governorate",
        area: "City / Area",
        customerType: "Customer type",
        product: "Required product",
        quantity: "Quantity",
        notes: "Notes",
      },
    },
  },
};

const deliveryLocations = [
  {
    key: "aleppo",
    ar: "حلب",
    en: "Aleppo",
    position: [36.2021, 37.1343],
    status: "active",
  },
  {
    key: "idlib",
    ar: "إدلب",
    en: "Idlib",
    position: [35.9306, 36.6339],
    status: "active",
  },
  {
    key: "latakia",
    ar: "اللاذقية",
    en: "Latakia",
    position: [35.5317, 35.7901],
    status: "active",
  },
  {
    key: "tartous",
    ar: "طرطوس",
    en: "Tartous",
    position: [34.889, 35.8866],
    status: "active",
  },
  {
    key: "hama",
    ar: "حماة",
    en: "Hama",
    position: [35.1318, 36.7578],
    status: "active",
  },
  {
    key: "homs",
    ar: "حمص",
    en: "Homs",
    position: [34.7324, 36.7137],
    status: "active",
  },
  {
    key: "damascus",
    ar: "دمشق",
    en: "Damascus",
    position: [33.5138, 36.2765],
    status: "active",
  },
  {
    key: "ruralDamascus",
    ar: "ريف دمشق",
    en: "Rural Damascus",
    position: [33.5723, 36.402],
    status: "active",
  },
  {
    key: "raqqa",
    ar: "الرقة",
    en: "Raqqa",
    position: [35.9594, 39],
    status: "future",
  },
  {
    key: "deirEzzor",
    ar: "دير الزور",
    en: "Deir ez-Zor",
    position: [35.336, 40.1408],
    status: "future",
  },
  {
    key: "hasakah",
    ar: "الحسكة",
    en: "Al-Hasakah",
    position: [36.5024, 40.7477],
    status: "future",
  },
  {
    key: "daraa",
    ar: "درعا",
    en: "Daraa",
    position: [32.6189, 36.1021],
    status: "future",
  },
];

const governorates = deliveryLocations.filter(
  (location) => location.status === "active",
);

function RevealBlock({ children, className = "", delay = 0, amount = 0.18 }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.72, delay, ease: easing }}
    >
      {children}
    </motion.div>
  );
}

function FitSyriaBounds({ filter }) {
  const map = useMap();

  useEffect(() => {
    map.fitBounds(
      [
        [32.05, 35.25],
        [37.35, 42.35],
      ],
      {
        padding: [30, 30],
        animate: true,
        duration: 0.7,
      },
    );
  }, [map, filter]);

  return null;
}

function DistributionMap({ filter, language, copy, direction }) {
  const visibleLocations = useMemo(() => {
    if (filter === "all") {
      return deliveryLocations;
    }

    return deliveryLocations.filter((location) => location.status === filter);
  }, [filter]);

  return (
    <div className="distribution-real-map-wrapper">
      <MapContainer
        className="distribution-real-map"
        center={[35.15, 38.05]}
        zoom={6}
        minZoom={5}
        maxZoom={10}
        maxBounds={[
          [31.6, 34.8],
          [37.7, 42.6],
        ]}
        maxBoundsViscosity={1}
        zoomControl={false}
        scrollWheelZoom={false}
      >
        <FitSyriaBounds filter={filter} />

        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ZoomControl position={language === "ar" ? "bottomleft" : "bottomright"} />

        {visibleLocations.map((location) => {
          const isActive = location.status === "active";
          const locationName = location[language];

          return (
            <CircleMarker
              key={location.key}
              center={location.position}
              radius={isActive ? 9 : 6}
              pathOptions={{
                color: isActive ? "#087fc4" : "#98a9b8",
                fillColor: isActive ? "#159be2" : "#bbc6cf",
                fillOpacity: isActive ? 0.96 : 0.78,
                opacity: 1,
                weight: isActive ? 3 : 2,
              }}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                {locationName}
              </Tooltip>

              <Popup>
                <div className="distribution-map-popup" dir={direction}>
                  <strong>{locationName}</strong>
                  <span>
                    {isActive ? copy.activeStatus : copy.futureStatus}
                  </span>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MapContainer>
    </div>
  );
}

function DistributionPage() {
  const reduceMotion = useReducedMotion();
  const [searchParams] = useSearchParams();
  const [mapFilter, setMapFilter] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [formStatus, setFormStatus] = useState({
    type: "idle",
    message: "",
  });
  const { language, isArabic, direction } = useLanguage();

  const copy = translations[language];
  const DirectionArrow = isArabic ? ArrowLeft : ArrowRight;

  const requestedProduct = searchParams.get("product") || "";
  const initialProduct = productCatalogue.some(
    (product) => product.slug === requestedProduct,
  )
    ? requestedProduct
    : "";

  useEffect(() => {
    setSelectedProduct(initialProduct);
  }, [initialProduct]);

  useEffect(() => {
    document.title = copy.pageTitle;
  }, [copy.pageTitle]);

  const handleImageError = (event) => {
    event.currentTarget.style.display = "none";
    event.currentTarget.parentElement?.classList.add("is-fallback");
  };

  const handleOrderSubmit = async (event) => {
    event.preventDefault();

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);
    const quantity = formData.get("quantity")?.toString().trim() || "";

    if (!/^[1-9]\d*$/.test(quantity)) {
      setFormStatus({
        type: "error",
        message: copy.order.form.status.quantityError,
      });
      return;
    }

    setFormStatus({
      type: "loading",
      message: copy.order.form.status.sending,
    });

    try {
      await submitDistributionForm({
        name: formData.get("name")?.toString().trim() || "",
        phone: formData.get("phone")?.toString().trim() || "",
        governorate: formData.get("governorate")?.toString() || "",
        area: formData.get("area")?.toString().trim() || "",
        customerType: formData.get("customerType")?.toString() || "",
        product: formData.get("product")?.toString() || "",
        quantity,
        notes: formData.get("notes")?.toString().trim() || "",
        website: formData.get("website")?.toString() || "",
        language,
      });

      formElement.reset();
      setSelectedProduct(initialProduct);

      setFormStatus({
        type: "success",
        message: copy.order.form.status.success,
      });
    } catch (error) {
      setFormStatus({
        type: "error",
        message: error.message || copy.order.form.status.error,
      });
    }
  };

  return (
    <div
      className={`distribution-page distribution-page--${language}`}
      dir={direction}
    >
      <Navbar variant="light" />

      <main>
        <section className="distribution-hero">
          <div className="distribution-hero__glow distribution-hero__glow--one" />
          <div className="distribution-hero__glow distribution-hero__glow--two" />

          <div className="container distribution-hero__grid">
            <motion.div
              className="distribution-hero__content"
              variants={stagger}
              initial={reduceMotion ? false : "hidden"}
              animate={reduceMotion ? undefined : "visible"}
            >
              <motion.div className="distribution-kicker" variants={fadeUp}>
                <span>{copy.hero.kicker}</span>
                <span className="distribution-kicker__line" />
              </motion.div>

              <motion.h1 className="distribution-hero__title" variants={fadeUp}>
                <span className="distribution-hero__title-main">
                  {copy.hero.titleMain}
                </span>

                <span className="distribution-hero__title-accent">
                  {copy.hero.titleAccent}
                </span>
              </motion.h1>

              <motion.p
                className="distribution-hero__description"
                variants={fadeUp}
              >
                {copy.hero.description}
              </motion.p>

              <motion.div
                className="distribution-hero__actions"
                variants={fadeUp}
              >
                <a
                  className="distribution-button distribution-button--primary"
                  href="#coverage"
                >
                  <span>{copy.hero.button}</span>
                  <DirectionArrow size={18} />
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              className="distribution-hero__visual"
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: isArabic ? -38 : 38,
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
                duration: 0.85,
                delay: 0.12,
                ease: easing,
              }}
            >
              <div className="distribution-hero__image">
                <div className="distribution-hero__fallback">
                  <Truck size={58} />
                  <span>{copy.hero.fallback}</span>
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

                <div className="distribution-hero__overlay" />
              </div>
            </motion.div>
          </div>
        </section>

        <section className="distribution-coverage" id="coverage">
          <div className="container">
            <RevealBlock>
              <div className="distribution-coverage__header">
                <div className="distribution-kicker distribution-kicker--dark distribution-kicker--centered">
                  <span>{copy.coverage.kicker}</span>
                  <span className="distribution-kicker__line" />
                </div>

                <h2>{copy.coverage.title}</h2>
                <p>{copy.coverage.description}</p>

                <div
                  className="distribution-map-filter"
                  role="radiogroup"
                  aria-label={copy.coverage.aria}
                >
                  {[
                    { value: "all", label: copy.coverage.filters.all },
                    { value: "active", label: copy.coverage.filters.active },
                    { value: "future", label: copy.coverage.filters.future },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className={`distribution-map-filter__option ${
                        mapFilter === option.value ? "is-selected" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="coverage-filter"
                        value={option.value}
                        checked={mapFilter === option.value}
                        onChange={(event) => setMapFilter(event.target.value)}
                      />

                      <span
                        className={`distribution-map-filter__radio ${
                          option.value === "active"
                            ? "distribution-map-filter__radio--active"
                            : ""
                        } ${
                          option.value === "future"
                            ? "distribution-map-filter__radio--future"
                            : ""
                        }`}
                      />

                      <span>{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </RevealBlock>

            <RevealBlock delay={0.08}>
              <DistributionMap
                filter={mapFilter}
                language={language}
                copy={copy.coverage}
                direction={direction}
              />
            </RevealBlock>
          </div>
        </section>

        <section className="distribution-order" id="bulk-order">
          <div className="container">
            <RevealBlock>
              <div className="distribution-order__heading">
                <div className="distribution-kicker distribution-kicker--dark distribution-kicker--centered">
                  <span>{copy.order.kicker}</span>
                  <span className="distribution-kicker__line" />
                </div>

                <h2>{copy.order.title}</h2>
                <p>{copy.order.description}</p>
              </div>
            </RevealBlock>

            <div className="distribution-order__layout">
              <RevealBlock
                className="distribution-order__benefits"
                delay={0.04}
              >
                {copy.order.benefits.map((benefit) => {
                  const Icon = benefit.icon;

                  return (
                    <article
                      className="distribution-benefit-card"
                      key={benefit.title}
                    >
                      <span className="distribution-benefit-card__icon">
                        <Icon size={21} />
                      </span>

                      <h3>{benefit.title}</h3>
                      <p>{benefit.description}</p>
                    </article>
                  );
                })}
              </RevealBlock>

              <RevealBlock delay={0.09}>
                <form className="distribution-form" onSubmit={handleOrderSubmit}>
                  <div className="form-honeypot" aria-hidden="true">
                    <label>
                      Website
                      <input
                        type="text"
                        name="website"
                        tabIndex="-1"
                        autoComplete="off"
                      />
                    </label>
                  </div>
                  <div className="distribution-form__grid">
                    <label className="distribution-field">
                      <span>{copy.order.form.fullName}</span>
                      <input
                        type="text"
                        name="name"
                        placeholder={copy.order.form.fullNamePlaceholder}
                        autoComplete="name"
                        required
                      />
                    </label>

                    <label className="distribution-field">
                      <span>{copy.order.form.phone}</span>
                      <input
                        type="tel"
                        name="phone"
                        placeholder={copy.order.form.phonePlaceholder}
                        autoComplete="tel"
                        required
                      />
                    </label>

                    <label className="distribution-field">
                      <span>{copy.order.form.governorate}</span>
                      <select name="governorate" defaultValue="" required>
                        <option value="" disabled>
                          {copy.order.form.governoratePlaceholder}
                        </option>

                        {governorates.map((governorate) => (
                          <option key={governorate.key} value={governorate.key}>
                            {governorate[language]}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="distribution-field">
                      <span>{copy.order.form.area}</span>
                      <input
                        type="text"
                        name="area"
                        placeholder={copy.order.form.areaPlaceholder}
                        required
                      />
                    </label>

                    <label className="distribution-field">
                      <span>{copy.order.form.customerType}</span>
                      <select name="customerType" defaultValue="" required>
                        <option value="" disabled>
                          {copy.order.form.customerTypePlaceholder}
                        </option>

                        {Object.entries(copy.order.customerTypes).map(
                          ([value, label]) => (
                            <option key={value} value={value}>
                              {label}
                            </option>
                          ),
                        )}
                      </select>
                    </label>

                    <label className="distribution-field">
                      <span>{copy.order.form.product}</span>
                      <select
                        name="product"
                        value={selectedProduct}
                        onChange={(event) =>
                          setSelectedProduct(event.target.value)
                        }
                        required
                      >
                        <option value="" disabled>
                          {copy.order.form.productPlaceholder}
                        </option>

                        {productCatalogue.map((product) => (
                          <option key={product.slug} value={product.slug}>
                            {product[language].name}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="distribution-field distribution-field--full">
                      <span>{copy.order.form.quantity}</span>
                      <input
                        type="text"
                        name="quantity"
                        inputMode="numeric"
                        pattern="[0-9]+"
                        maxLength={9}
                        placeholder={copy.order.form.quantityPlaceholder}
                        onInput={(event) => {
                          event.currentTarget.value =
                            event.currentTarget.value.replace(/\D/g, "");
                        }}
                        required
                      />
                    </label>

                    <label className="distribution-field distribution-field--full">
                      <span>{copy.order.form.notes}</span>
                      <textarea
                        name="notes"
                        maxLength={5000}
                        placeholder={copy.order.form.notesPlaceholder}
                        rows="6"
                      />
                    </label>
                  </div>

                  {formStatus.type !== "idle" && (
                    <div
                      className={`form-status form-status--${formStatus.type}`}
                      role="status"
                      aria-live="polite"
                    >
                      {formStatus.message}
                    </div>
                  )}

                  <div className="distribution-form__footer">
                    <p>{copy.order.form.footer}</p>

                    <button
                      className="distribution-submit"
                      type="submit"
                      disabled={formStatus.type === "loading"}
                      aria-busy={formStatus.type === "loading"}
                    >
                      <Send size={18} />
                      <span>
                        {formStatus.type === "loading"
                          ? copy.order.form.status.sending
                          : copy.order.form.submit}
                      </span>
                    </button>
                  </div>
                </form>
              </RevealBlock>
            </div>
          </div>
        </section>
      </main>

      <Footer language={language} />
    </div>
  );
}

export default DistributionPage;