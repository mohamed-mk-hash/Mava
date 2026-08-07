import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpLeft,
  ArrowUpRight,
  Menu,
  MessageCircle,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { useLanguage } from "../../i18n/useLanguage";
import "./NavbarLanguage.css";

const navigationItems = [
  {
    key: "home",
    href: "/",
    type: "route",
  },
  {
    key: "about",
    href: "/about",
    type: "route",
  },
  {
    key: "product",
    href: "/products",
    type: "route",
  },
  {
    key: "quality",
    href: "/quality",
    type: "route",
  },
  {
    key: "distribution",
    href: "/distribution",
    type: "route",
  },
];

const translations = {
  ar: {
    navigation: {
      home: "الرئيسية",
      about: "عن مافا",
      product: "المنتجات",
      quality: "الجودة والسلامة",
      distribution: "التوزيع",
    },
    contact: "تواصل معنا",
    startConversation: "ابدأ محادثة",
    homeAria: "الصفحة الرئيسية لمياه مافا",
    navigationAria: "التنقل الرئيسي",
    openMenu: "فتح القائمة",
    closeMenu: "إغلاق القائمة",
    mobileNavigation: "التنقل عبر الهاتف",
    languageButton: "Switch to English",
    languageLabel: "EN",
  },
  en: {
    navigation: {
      home: "Home",
      about: "About MAVA",
      product: "Products",
      quality: "Quality & Safety",
      distribution: "Distribution",
    },
    contact: "Contact Us",
    startConversation: "Start a Conversation",
    homeAria: "MAVA Water home page",
    navigationAria: "Main navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    mobileNavigation: "Mobile navigation",
    languageButton: "التبديل إلى العربية",
    languageLabel: "AR",
  },
};

function NavigationLink({
  item,
  label,
  className = "",
  onClick,
}) {
  return (
    <Link
      className={className}
      to={item.href}
      onClick={onClick}
    >
      {label}
    </Link>
  );
}

function Navbar({ variant = "overlay" }) {
  const [menuOpen, setMenuOpen] =
    useState(false);
  const [scrolled, setScrolled] =
    useState(false);
  const { pathname } = useLocation();
  const {
    language,
    isArabic,
    direction,
    toggleLanguage,
  } = useLanguage();

  const copy = translations[language];

  const translatedNavigation = useMemo(
    () =>
      navigationItems.map((item) => ({
        ...item,
        label: copy.navigation[item.key],
      })),
    [copy],
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    handleScroll();
    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true },
    );

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll,
      );
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, language]);

  useEffect(() => {
    document.body.style.overflow =
      menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isLight = variant === "light";
  const logo = isLight
    ? "/assets/mava-logo-navy.png"
    : "/assets/mava-logo-white.png";

  const checkIsActive = (item) => {
    if (item.key === "product") {
      return pathname.startsWith("/products");
    }

    return pathname === item.href;
  };

  const ContactArrow = isArabic
    ? ArrowUpLeft
    : ArrowUpRight;
  const MenuArrow = isArabic
    ? ArrowLeft
    : ArrowRight;
  const panelStart = isArabic
    ? "100%"
    : "-100%";
  const itemStart = isArabic ? 28 : -28;

  return (
    <>
      <header
        dir={direction}
        className={[
          "navbar",
          `navbar--${variant}`,
          `navbar--language-${language}`,
          scrolled
            ? "navbar--scrolled"
            : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="container navbar__inner">
          <Link
            to="/"
            className="brand"
            aria-label={copy.homeAria}
          >
            <img
              className="brand__logo"
              src={logo}
              alt="MAVA Water"
            />
          </Link>

          <nav
            className="navbar__links"
            aria-label={copy.navigationAria}
          >
            {translatedNavigation.map(
              (item) => (
                <NavigationLink
                  key={item.key}
                  item={item}
                  label={item.label}
                  className={
                    checkIsActive(item)
                      ? "is-active"
                      : ""
                  }
                />
              ),
            )}
          </nav>

          <div className="navbar__actions">
            <button
              type="button"
              className="lang-link navbar__language-button"
              onClick={toggleLanguage}
              aria-label={
                copy.languageButton
              }
              title={copy.languageButton}
            >
              {copy.languageLabel}
            </button>

            <Link
              className="button button--nav"
              to="/contact"
            >
              {copy.contact}
              <ContactArrow size={16} />
            </Link>

            <button
              type="button"
              className="menu-toggle"
              onClick={() =>
                setMenuOpen(true)
              }
              aria-label={copy.openMenu}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              <Menu />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            dir={direction}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() =>
              setMenuOpen(false)
            }
          >
            <motion.aside
              id="mobile-navigation"
              className={`mobile-menu__panel mobile-menu__panel--${language}`}
              aria-label={
                copy.mobileNavigation
              }
              initial={{ x: panelStart }}
              animate={{ x: 0 }}
              exit={{ x: panelStart }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 28,
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              <div className="mobile-menu__head">
                <Link
                  to="/"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  aria-label={copy.homeAria}
                >
                  <img
                    className="mobile-menu__logo"
                    src="/assets/mava-logo-white.png"
                    alt="MAVA Water"
                  />
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    setMenuOpen(false)
                  }
                  aria-label={
                    copy.closeMenu
                  }
                >
                  <X />
                </button>
              </div>

              <div className="mobile-menu__language-row">
                <span>
                  {isArabic
                    ? "اللغة"
                    : "Language"}
                </span>

                <button
                  type="button"
                  onClick={toggleLanguage}
                >
                  {copy.languageLabel}
                </button>
              </div>

              <div className="mobile-menu__links">
                {translatedNavigation.map(
                  (item, index) => {
                    const isActive =
                      checkIsActive(item);

                    return (
                      <motion.div
                        key={item.key}
                        className={
                          isActive
                            ? "is-active"
                            : ""
                        }
                        initial={{
                          opacity: 0,
                          x: itemStart,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay:
                            0.08 +
                            index * 0.06,
                        }}
                      >
                        <NavigationLink
                          item={item}
                          label={item.label}
                          className={
                            isActive
                              ? "is-active"
                              : ""
                          }
                          onClick={() =>
                            setMenuOpen(false)
                          }
                        />

                        <span className="mobile-menu__number">
                          {String(
                            index + 1,
                          ).padStart(2, "0")}
                        </span>

                        <MenuArrow className="mobile-menu__arrow" />
                      </motion.div>
                    );
                  },
                )}
              </div>

              <Link
                className="button button--light button--full"
                to="/contact"
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                {copy.startConversation}
                <MessageCircle size={18} />
              </Link>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;