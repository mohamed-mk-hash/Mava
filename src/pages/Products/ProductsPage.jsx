import { useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Droplets,
  GlassWater,
  Package,
  Sparkles,
} from "lucide-react";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useLanguage } from "../../i18n/useLanguage";
import {
  productCategories,
  products,
} from "./productsData";

import "./ProductsPage.css";

const easing = [0.22, 1, 0.36, 1];

const translations = {
  ar: {
    pageTitle: "منتجاتنا | مياه مافا",
    heroKicker: "التشكيلة",
    heroTitle: "عبوات مصممة لكل مناسبة",
    heroDescription:
      "نصمم تشكيلة مافا حول فكرة واحدة: نفس المياه، بأحجام وخامات تناسب لحظة الاستخدام، من العبوة اليومية الخفيفة إلى الزجاج الفاخر للطاولات الراقية.",
    philosophyTitle: "فلسفة منتجاتنا",
    philosophyText:
      "تبقى التركيبة والجودة ثابتة في كل قياس؛ يختلف فقط الحجم، خامة العبوة وطريقة التقديم.",
    filterAria: "تصفية منتجات مافا",
    categories: {
      all: "كل المنتجات",
      plastic: "البلاستيك",
      glass: "الزجاج",
    },
    result: "منتجات",
    details: "عرض التفاصيل",
    order: "اطلب هذا المنتج",
    plastic: "عبوة بلاستيك",
    glass: "عبوة زجاج",
    footerKicker: "جودة واحدة",
    footerTitle:
      "اختر العبوة المناسبة، ودع فريق مافا يهتم بالتوريد.",
    footerButton: "ناقش طلب التوريد",
    cardAria: "عرض تفاصيل",
  },

  en: {
    pageTitle: "Our Products | MAVA Water",
    heroKicker: "The range",
    heroTitle: "Bottles designed for every occasion",
    heroDescription:
      "The MAVA range is built around one idea: the same water in formats and materials suited to every moment, from lightweight daily bottles to premium glass for refined tables.",
    philosophyTitle: "Our product philosophy",
    philosophyText:
      "The composition and quality remain consistent in every format; only the size, bottle material and serving experience change.",
    filterAria: "Filter MAVA products",
    categories: {
      all: "All products",
      plastic: "Plastic",
      glass: "Glass",
    },
    result: "products",
    details: "View details",
    order: "Order this product",
    plastic: "Plastic bottle",
    glass: "Glass bottle",
    footerKicker: "One quality standard",
    footerTitle:
      "Choose the right bottle and let the MAVA team handle supply.",
    footerButton: "Discuss your supply order",
    cardAria: "View details for",
  },
};

function ProductsPage() {
  const reduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] =
    useState("all");

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

  const visibleProducts = useMemo(() => {
    if (activeCategory === "all") {
      return products;
    }

    return products.filter(
      (product) =>
        product.category === activeCategory,
    );
  }, [activeCategory]);

  return (
    <div
      className={`products-page products-page--${language}`}
      dir={direction}
    >
      <Navbar variant="light" />

      <main>
        <section className="products-hero">
          <div className="products-hero__orb products-hero__orb--one" />
          <div className="products-hero__orb products-hero__orb--two" />

          <div className="container products-hero__inner">
            <motion.div
              className="products-hero__copy"
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      y: 32,
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
                ease: easing,
              }}
            >
              <span className="products-eyebrow">
                <span />
                {copy.heroKicker}
              </span>

              <h1>{copy.heroTitle}</h1>

              <p>{copy.heroDescription}</p>
            </motion.div>

            <motion.div
              className="products-hero__philosophy"
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: isArabic ? -34 : 34,
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
                delay: 0.12,
                ease: easing,
              }}
            >
              <div className="products-hero__philosophy-icon">
                <Droplets />
              </div>

              <div>
                <h2>
                  {copy.philosophyTitle}
                </h2>

                <p>
                  {copy.philosophyText}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="products-catalogue">
          <div className="container">
            <div className="products-toolbar">
              <div
                className="products-filters"
                role="radiogroup"
                aria-label={copy.filterAria}
              >
                {productCategories.map(
                  (category) => (
                    <button
                      type="button"
                      role="radio"
                      aria-checked={
                        activeCategory ===
                        category
                      }
                      className={
                        activeCategory ===
                        category
                          ? "is-active"
                          : ""
                      }
                      key={category}
                      onClick={() =>
                        setActiveCategory(
                          category,
                        )
                      }
                    >
                      {category ===
                        "plastic" && (
                        <Package size={17} />
                      )}

                      {category ===
                        "glass" && (
                        <GlassWater
                          size={17}
                        />
                      )}

                      {category ===
                        "all" && (
                        <Package size={17} />
                      )}

                      {
                        copy.categories[
                          category
                        ]
                      }
                    </button>
                  ),
                )}
              </div>

              <span className="products-count">
                <strong>
                  {visibleProducts.length}
                </strong>

                {copy.result}
              </span>
            </div>

            <motion.div
              layout
              className="products-grid"
            >
              <AnimatePresence mode="popLayout">
                {visibleProducts.map(
                  (product, index) => {
                    const content =
                      product[language];

                    return (
                      <motion.article
                        layout
                        className={`product-card product-card--${product.category}`}
                        key={product.slug}
                        initial={
                          reduceMotion
                            ? false
                            : {
                                opacity: 0,
                                y: 28,
                                scale: 0.97,
                              }
                        }
                        animate={
                          reduceMotion
                            ? undefined
                            : {
                                opacity: 1,
                                y: 0,
                                scale: 1,
                              }
                        }
                        exit={
                          reduceMotion
                            ? undefined
                            : {
                                opacity: 0,
                                y: 18,
                                scale: 0.97,
                              }
                        }
                        transition={{
                          duration: 0.5,
                          delay:
                            index * 0.045,
                          ease: easing,
                        }}
                        whileHover={
                          reduceMotion
                            ? undefined
                            : {
                                y: -8,
                              }
                        }
                      >
                        <Link
                          className="product-card__image-link"
                          to={`/products/${product.slug}`}
                          aria-label={`${copy.cardAria} ${content.name}`}
                        >
                          <div className="product-card__image">
                            <img
                              src={
                                product.image
                              }
                              alt={content.name}
                            />

                            <span className="product-card__material">
                              {product.category ===
                              "plastic"
                                ? copy.plastic
                                : copy.glass}
                            </span>

                            {product.premium && (
                              <span className="product-card__premium">
                                <Sparkles
                                  size={15}
                                />
                                Premium
                              </span>
                            )}
                          </div>
                        </Link>

                        <div className="product-card__body">
                          <div className="product-card__capacity">
                            {isArabic
                              ? product.capacityAr
                              : product.capacity}
                          </div>

                          <h2>
                            <Link
                              to={`/products/${product.slug}`}
                            >
                              {content.name}
                            </Link>
                          </h2>

                          <p>
                            {
                              content.shortDescription
                            }
                          </p>

                          <div className="product-card__actions">
                            <Link
                              className="product-card__details"
                              to={`/products/${product.slug}`}
                            >
                              {copy.details}
                              <DirectionArrow
                                size={17}
                              />
                            </Link>

                            <Link
                              className="product-card__order"
                              to={`/distribution?product=${product.slug}#bulk-order`}
                            >
                              {copy.order}
                            </Link>
                          </div>
                        </div>
                      </motion.article>
                    );
                  },
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        <section className="products-supply-cta">
          <div className="products-supply-cta__pattern" />

          <div className="container products-supply-cta__inner">
            <div>
              <span className="products-eyebrow products-eyebrow--light">
                <span />
                {copy.footerKicker}
              </span>

              <h2>
                {copy.footerTitle}
              </h2>

              <div className="products-supply-cta__checks">
                <span>
                  <Check />
                  {
                    copy.categories
                      .plastic
                  }
                </span>

                <span>
                  <Check />
                  {copy.categories.glass}
                </span>
              </div>
            </div>

            <Link
              className="products-primary-button"
              to="/distribution#bulk-order"
            >
              {copy.footerButton}
              <DirectionArrow />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ProductsPage;