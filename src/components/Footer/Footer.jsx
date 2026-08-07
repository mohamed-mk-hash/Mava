import { Link } from "react-router-dom";
import {
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";

import { useLanguage } from "../../i18n/useLanguage";

const translations = {
  ar: {
    brandDescription:
      "العلامة الرئيسية لمجموعة مافا ومشروع وطني لإنتاج مياه شرب آمنة، محلاة ومعقمة وعالية الجودة في مدينة حلب.",
    quickLinksTitle: "روابط سريعة",
    contactTitle: "تواصل معنا",
    address: "حلب — قبتان الجبل — وادي الرقايا",
    copyright: "© 2026 MAVA Group. جميع الحقوق محفوظة.",
    locationLine: "MAVA WATER — حلب، سوريا",
    whatsappLabel: "تواصل عبر واتساب",
    floatingContact: "تواصل معنا",
    links: [
      {
        label: "الرئيسية",
        href: "/",
        type: "route",
      },
      {
        label: "عن مافا",
        href: "/about",
        type: "route",
      },
      {
        label: "المنتج",
        href: "/#product",
        type: "anchor",
      },
      {
        label: "الجودة والسلامة",
        href: "/quality",
        type: "route",
      },
      {
        label: "التوزيع",
        href: "/distribution",
        type: "route",
      },
      {
        label: "تواصل معنا",
        href: "/contact",
        type: "route",
      },
    ],
  },
  en: {
    brandDescription:
      "The flagship brand of MAVA Group and a national project producing safe, purified, sanitised and high-quality drinking water in Aleppo.",
    quickLinksTitle: "Quick Links",
    contactTitle: "Contact Us",
    address: "Aleppo — Qabtan Al-Jabal — Wadi Al-Raqaya",
    copyright: "© 2026 MAVA Group. All rights reserved.",
    locationLine: "MAVA WATER — ALEPPO, SYRIA",
    whatsappLabel: "Contact us on WhatsApp",
    floatingContact: "Contact Us",
    links: [
      {
        label: "Home",
        href: "/",
        type: "route",
      },
      {
        label: "About MAVA",
        href: "/about",
        type: "route",
      },
      {
        label: "Products",
        href: "/#product",
        type: "anchor",
      },
      {
        label: "Quality & Safety",
        href: "/quality",
        type: "route",
      },
      {
        label: "Distribution",
        href: "/distribution",
        type: "route",
      },
      {
        label: "Contact Us",
        href: "/contact",
        type: "route",
      },
    ],
  },
};

function FooterLink({ item }) {
  if (item.type === "route") {
    return <Link to={item.href}>{item.label}</Link>;
  }

  return <a href={item.href}>{item.label}</a>;
}

function Footer({ showFloatingContact = true }) {
  const { language, direction } = useLanguage();
  const copy = translations[language];

  return (
    <>
      <footer
        id="footer"
        className={`footer footer--${language}`}
        dir={direction}
      >
        <div className="container footer__top">
          <div className="footer__brand">
            <Link
              to="/"
              className="footer__logo-link"
              aria-label={
                language === "ar"
                  ? "العودة إلى الصفحة الرئيسية"
                  : "Return to the homepage"
              }
            >
              <img
                className="footer__logo"
                src="/assets/mava-logo-white.png"
                alt="MAVA Water"
              />
            </Link>

            <p>{copy.brandDescription}</p>
          </div>

          <nav
            className="footer__links"
            aria-label={copy.quickLinksTitle}
          >
            <h3>{copy.quickLinksTitle}</h3>

            {copy.links.map((item) => (
              <FooterLink
                key={item.href}
                item={item}
              />
            ))}
          </nav>

          <div className="footer__contact">
            <h3>{copy.contactTitle}</h3>

            <a href="mailto:contact@mava-group.com">
              <Mail aria-hidden="true" />
              <span>contact@mava-group.com</span>
            </a>

            <a
              href="tel:+963989019635"
              dir="ltr"
            >
              <Phone aria-hidden="true" />
              <span>+963 989 019 635</span>
            </a>

            <span>
              <MapPin aria-hidden="true" />
              <span>{copy.address}</span>
            </span>
          </div>
        </div>

        <div className="container footer__bottom">
          <span>{copy.copyright}</span>

          <span dir={language === "ar" ? "rtl" : "ltr"}>
            {copy.locationLine}
          </span>
        </div>
      </footer>

      {showFloatingContact && (
        <a
          className={`floating-contact floating-contact--${language}`}
          href="https://wa.me/963989019635"
          target="_blank"
          rel="noreferrer"
          aria-label={copy.whatsappLabel}
          dir={direction}
        >
          <MessageCircle aria-hidden="true" />
          <span>{copy.floatingContact}</span>
        </a>
      )}
    </>
  );
}

export default Footer;