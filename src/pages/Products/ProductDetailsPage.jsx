import { useEffect } from "react";
import {
  motion,
  useReducedMotion,
} from "framer-motion";
import {
  Link,
  Navigate,
  useParams,
} from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Droplets,
  GlassWater,
  Package,
  PackageCheck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useLanguage } from "../../i18n/useLanguage";
import {
  getProductBySlug,
  products,
} from "./productsData";

import "./ProductDetailsPage.css";

const easing = [0.22, 1, 0.36, 1];

const translations = {
  ar: {
    pageTitleSuffix: "منتجات مافا",
    back: "العودة إلى المنتجات",
    range: "منتجات مافا",
    material: "الخامة",
    capacity: "السعة",
    serving: "الاستخدام",
    qualityTitle:
      "مواصفات ثابتة في كل عبوة",
    qualityText:
      "تختلف السعة والخامة، لكن معايير المعالجة والسلامة والجودة تبقى واحدة في جميع منتجات مافا.",
    highlights: "أهم المزايا",
    idealFor: "الاستخدامات المناسبة",
    orderTitle:
      "هل هذه العبوة مناسبة لاحتياجك؟",
    orderText:
      "انتقل إلى صفحة التوزيع وأرسل الكمية والموقع ونوع العميل ليقوم فريق مافا بمراجعة الطلب.",
    orderButton: "اطلب هذا المنتج",
    related: "منتجات أخرى من التشكيلة",
    view: "عرض المنتج",
    plastic: "بلاستيك",
    glass: "زجاج",
    guarantees: [
      "مياه محلاة ومعقمة",
      "رقابة جودة مستمرة",
      "تعبئة وفق المعايير الصحية",
    ],
  },

  en: {
    pageTitleSuffix: "MAVA Products",
    back: "Back to products",
    range: "MAVA product range",
    material: "Material",
    capacity: "Capacity",
    serving: "Serving",
    qualityTitle:
      "Consistent standards in every bottle",
    qualityText:
      "The size and material change, but MAVA treatment, safety and quality standards remain consistent across the full range.",
    highlights: "Key benefits",
    idealFor: "Ideal uses",
    orderTitle:
      "Is this the right bottle for your needs?",
    orderText:
      "Continue to the distribution page and submit the quantity, location and customer type for review by the MAVA team.",
    orderButton: "Order this product",
    related:
      "More products from the range",
    view: "View product",
    plastic: "Plastic",
    glass: "Glass",
    guarantees: [
      "Purified and sanitised water",
      "Continuous quality control",
      "Packed to health standards",
    ],
  },
};

function ProductDetailsPage() {
  const { slug } = useParams();
  const reduceMotion =
    useReducedMotion();

  const product =
    getProductBySlug(slug);

  const {
    language,
    isArabic,
    direction,
  } = useLanguage();

  const copy = translations[language];

  const DirectionArrow = isArabic
    ? ArrowLeft
    : ArrowRight;

  const BackArrow = isArabic
    ? ArrowRight
    : ArrowLeft;

  useEffect(() => {
    if (!product) {
      return;
    }

    document.title = `${product[language].name} | ${copy.pageTitleSuffix}`;
  }, [
    copy.pageTitleSuffix,
    language,
    product,
  ]);

  if (!product) {
    return (
      <Navigate
        to="/products"
        replace
      />
    );
  }

  const content = product[language];

  const relatedProducts = products
    .filter(
      (item) =>
        item.slug !== product.slug,
    )
    .slice(0, 3);

  const ProductIcon =
    product.category === "plastic"
      ? Package
      : GlassWater;

  return (
    <div
      className={`product-details-page product-details-page--${language}`}
      dir={direction}
    >
      <Navbar variant="light" />

      <main>
        <section className="product-detail-hero">
          <div className="product-detail-hero__glow" />

          <div className="container">
            <Link
              className="product-detail-back"
              to="/products"
            >
              <BackArrow size={18} />
              {copy.back}
            </Link>

            <div className="product-detail-hero__grid">
              <motion.div
                className="product-detail-visual"
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
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 1,
                        x: 0,
                      }
                }
                transition={{
                  duration: 0.82,
                  ease: easing,
                }}
              >
                <div className="product-detail-visual__frame">
                  <div className="product-detail-visual__rings">
                    <span />
                    <span />
                    <span />
                  </div>

                  <img
                    src={product.image}
                    alt={content.name}
                  />

                  <span className="product-detail-visual__capacity">
                    {isArabic
                      ? product.capacityAr
                      : product.capacity}
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="product-detail-copy"
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 34,
                      }
                }
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        opacity: 1,
                        y: 0,
                      }
                }
                transition={{
                  duration: 0.8,
                  delay: 0.08,
                  ease: easing,
                }}
              >
                <span className="product-detail-kicker">
                  <span />
                  {copy.range}
                </span>

                <div className="product-detail-category">
                  <ProductIcon
                    size={18}
                  />

                  {product.category ===
                  "plastic"
                    ? copy.plastic
                    : copy.glass}
                </div>

                <h1>{content.name}</h1>

                <p className="product-detail-description">
                  {
                    content.detailDescription
                  }
                </p>

                <div className="product-detail-specs">
                  <div>
                    <span>
                      {copy.material}
                    </span>

                    <strong>
                      {content.material}
                    </strong>
                  </div>

                  <div>
                    <span>
                      {copy.capacity}
                    </span>

                    <strong>
                      {isArabic
                        ? product.capacityAr
                        : product.capacity}
                    </strong>
                  </div>

                  <div>
                    <span>
                      {copy.serving}
                    </span>

                    <strong>
                      {content.serving}
                    </strong>
                  </div>
                </div>

                <div className="product-detail-guarantees">
                  {copy.guarantees.map(
                    (item, index) => {
                      const icons = [
                        Droplets,
                        ShieldCheck,
                        PackageCheck,
                      ];

                      const Icon =
                        icons[index];

                      return (
                        <span key={item}>
                          <Icon
                            size={18}
                          />
                          {item}
                        </span>
                      );
                    },
                  )}
                </div>

                <Link
                  className="product-detail-order-button"
                  to={`/distribution?product=${product.slug}#bulk-order`}
                >
                  {copy.orderButton}
                  <DirectionArrow />
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="product-detail-information">
          <div className="container product-detail-information__grid">
            <motion.article
              className="product-detail-information__intro"
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 28,
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
                amount: 0.25,
              }}
              transition={{
                duration: 0.7,
                ease: easing,
              }}
            >
              <Sparkles />

              <h2>
                {copy.qualityTitle}
              </h2>

              <p>
                {copy.qualityText}
              </p>
            </motion.article>

            <div className="product-detail-lists">
              <motion.article
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 28,
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
                  amount: 0.25,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.08,
                  ease: easing,
                }}
              >
                <h3>
                  {copy.highlights}
                </h3>

                <ul>
                  {content.highlights.map(
                    (item) => (
                      <li key={item}>
                        <Check />
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </motion.article>

              <motion.article
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 28,
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
                  amount: 0.25,
                }}
                transition={{
                  duration: 0.7,
                  delay: 0.14,
                  ease: easing,
                }}
              >
                <h3>
                  {copy.idealFor}
                </h3>

                <ul>
                  {content.idealFor.map(
                    (item) => (
                      <li key={item}>
                        <Check />
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </motion.article>
            </div>
          </div>
        </section>

        <section className="product-detail-order">
          <div className="container product-detail-order__inner">
            <div>
              <span>
                {copy.orderTitle}
              </span>

              <p>
                {copy.orderText}
              </p>
            </div>

            <Link
              className="product-detail-order__button"
              to={`/distribution?product=${product.slug}#bulk-order`}
            >
              {copy.orderButton}
              <DirectionArrow />
            </Link>
          </div>
        </section>

        <section className="product-related">
          <div className="container">
            <div className="product-related__header">
              <h2>{copy.related}</h2>

              <Link to="/products">
                {copy.back}
                <DirectionArrow />
              </Link>
            </div>

            <div className="product-related__grid">
              {relatedProducts.map(
                (
                  related,
                  index,
                ) => (
                  <motion.article
                    key={
                      related.slug
                    }
                    initial={
                      reduceMotion
                        ? false
                        : {
                            opacity: 0,
                            y: 24,
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
                      amount: 0.2,
                    }}
                    transition={{
                      duration: 0.55,
                      delay:
                        index * 0.07,
                      ease: easing,
                    }}
                  >
                    <Link
                      className="product-related__image"
                      to={`/products/${related.slug}`}
                    >
                      <img
                        src={
                          related.image
                        }
                        alt={
                          related[
                            language
                          ].name
                        }
                      />
                    </Link>

                    <div>
                      <span>
                        {isArabic
                          ? related.capacityAr
                          : related.capacity}
                      </span>

                      <h3>
                        {
                          related[
                            language
                          ].name
                        }
                      </h3>

                      <Link
                        to={`/products/${related.slug}`}
                      >
                        {copy.view}

                        <DirectionArrow
                          size={16}
                        />
                      </Link>
                    </div>
                  </motion.article>
                ),
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ProductDetailsPage;