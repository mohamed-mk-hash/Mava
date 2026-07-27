import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useLanguage } from "../../i18n/useLanguage";
import { submitContactForm } from "../../services/formsApi";

import "../../styles/FormStatus.css";
import "./ContactPage.css";

const easing = [0.22, 1, 0.36, 1];

const translations = {
  ar: {
    pageTitle: "تواصل معنا | مياه مافا",
    hero: {
      kicker: "تواصل معنا",
      title: ["نحن هنا", "للإجابة."],
      description:
        "سواء كنت تبحث عن توريد، شراكة استثمارية، أو ترغب في معرفة المزيد عن مافا، يسعدنا أن نسمع منك.",
      quickLabel: "تواصل سريع",
      whatsappLabel: "عبر واتساب",
      whatsappAction: "ابدأ محادثة الآن",
    },
    info: {
      kicker: "معلومات التواصل",
      title: ["قريبون منك،", "وجاهزون للرد."],
      details: [
        {
          icon: Mail,
          label: "البريد الإلكتروني",
          value: "contact@mava-group.com",
          href: "mailto:contact@mava-group.com",
        },
        {
          icon: Phone,
          label: "رقم الهاتف",
          value: "00963 989 019 635",
          href: "tel:+963989019635",
        },
        {
          icon: MapPin,
          label: "العنوان",
          value: "حلب - قبتان الجبل - وادي الركايا",
          href: "https://www.google.com/maps/search/?api=1&query=Qabtan+al-Jabal+Aleppo+Syria",
        },
        {
          icon: Clock3,
          label: "ساعات التواصل",
          value: "السبت – الخميس، 9:00 ص – 5:00 م",
        },
      ],
    },
    form: {
      eyebrow: "أرسل لنا رسالة",
      title: "دعنا نعرف كيف يمكننا مساعدتك.",
      fields: {
        name: "الاسم الكامل",
        namePlaceholder: "اكتب اسمك",
        phone: "رقم الهاتف",
        phonePlaceholder: "مثال: 09 xxx xxx xx",
        email: "البريد الإلكتروني",
        emailPlaceholder: "name@example.com",
        subject: "موضوع الرسالة",
        message: "رسالتك",
        messagePlaceholder: "اكتب تفاصيل رسالتك هنا...",
      },
      subjects: {
        general: "استفسار عام",
        supply: "طلب توريد",
        investment: "شراكة استثمارية",
        distribution: "التوزيع",
        consumer: "خدمة المستهلك",
      },
      footer:
        "سيتم إرسال رسالتك مباشرة إلى فريق مافا عبر خادم البريد الآمن.",
      submit: "إرسال الرسالة",
      status: {
        sending: "جارٍ إرسال الرسالة...",
        success: "تم إرسال رسالتك بنجاح. سيتواصل معك فريق مافا قريبًا.",
        error: "تعذّر إرسال الرسالة الآن. حاول مرة أخرى بعد قليل.",
      },
      emailSubjectPrefix: "رسالة من موقع مافا",
      emailLabels: {
        name: "الاسم الكامل",
        phone: "رقم الهاتف",
        email: "البريد الإلكتروني",
        subject: "موضوع الرسالة",
        message: "الرسالة",
      },
    },
    map: {
      kicker: "موقعنا",
      title: "قبتان الجبل، حلب.",
      description:
        "يمكنك الوصول إلى موقعنا أو فتح الاتجاهات مباشرة من الخريطة.",
      iframeTitle: "موقع مافا في قبتان الجبل، حلب",
    },
  },
  en: {
    pageTitle: "Contact Us | MAVA Water",
    hero: {
      kicker: "Contact Us",
      title: ["We’re here", "to help."],
      description:
        "Whether you are looking for supply, an investment partnership or more information about MAVA, we would be glad to hear from you.",
      quickLabel: "Quick Contact",
      whatsappLabel: "Via WhatsApp",
      whatsappAction: "Start a conversation",
    },
    info: {
      kicker: "Contact Information",
      title: ["Close to you,", "ready to respond."],
      details: [
        {
          icon: Mail,
          label: "Email Address",
          value: "contact@mava-group.com",
          href: "mailto:contact@mava-group.com",
        },
        {
          icon: Phone,
          label: "Phone Number",
          value: "00963 989 019 635",
          href: "tel:+963989019635",
        },
        {
          icon: MapPin,
          label: "Address",
          value: "Qabtan al-Jabal, Wadi al-Rakaya, Aleppo",
          href: "https://www.google.com/maps/search/?api=1&query=Qabtan+al-Jabal+Aleppo+Syria",
        },
        {
          icon: Clock3,
          label: "Contact Hours",
          value: "Saturday–Thursday, 9:00 AM–5:00 PM",
        },
      ],
    },
    form: {
      eyebrow: "Send Us a Message",
      title: "Tell us how we can help.",
      fields: {
        name: "Full Name",
        namePlaceholder: "Enter your name",
        phone: "Phone Number",
        phonePlaceholder: "Example: 09 xxx xxx xx",
        email: "Email Address",
        emailPlaceholder: "name@example.com",
        subject: "Message Subject",
        message: "Your Message",
        messagePlaceholder: "Write the details of your message here...",
      },
      subjects: {
        general: "General Enquiry",
        supply: "Supply Request",
        investment: "Investment Partnership",
        distribution: "Distribution",
        consumer: "Consumer Service",
      },
      footer:
        "Your message will be sent directly to the MAVA team through our secure mail server.",
      submit: "Send Message",
      status: {
        sending: "Sending your message...",
        success: "Your message was sent successfully. The MAVA team will contact you soon.",
        error: "We could not send your message right now. Please try again shortly.",
      },
      emailSubjectPrefix: "Message from the MAVA website",
      emailLabels: {
        name: "Full name",
        phone: "Phone number",
        email: "Email address",
        subject: "Message subject",
        message: "Message",
      },
    },
    map: {
      kicker: "Our Location",
      title: "Qabtan al-Jabal, Aleppo.",
      description:
        "Find our location or open directions directly from the map.",
      iframeTitle: "MAVA location in Qabtan al-Jabal, Aleppo",
    },
  },
};

const reveal = {
  hidden: {
    opacity: 0,
    y: 30,
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
      staggerChildren: 0.1,
    },
  },
};

function ContactPage() {
  const reduceMotion = useReducedMotion();
  const { language, isArabic, direction } = useLanguage();
  const copy = translations[language];
  const DirectionArrow = isArabic ? ArrowLeft : ArrowRight;
  const [formStatus, setFormStatus] = useState({
    type: "idle",
    message: "",
  });

  useEffect(() => {
    document.title = copy.pageTitle;
  }, [copy.pageTitle]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formElement = event.currentTarget;
    const formData = new FormData(formElement);

    setFormStatus({
      type: "loading",
      message: copy.form.status.sending,
    });

    try {
      await submitContactForm({
        name: formData.get("name")?.toString().trim() || "",
        phone: formData.get("phone")?.toString().trim() || "",
        email: formData.get("email")?.toString().trim() || "",
        subject: formData.get("subject")?.toString() || "general",
        message: formData.get("message")?.toString().trim() || "",
        website: formData.get("website")?.toString() || "",
        language,
      });

      formElement.reset();

      setFormStatus({
        type: "success",
        message: copy.form.status.success,
      });
    } catch (error) {
      setFormStatus({
        type: "error",
        message: error.message || copy.form.status.error,
      });
    }
  };

  return (
    <div
      className={`contact-page contact-page--${language}`}
      dir={direction}
    >
      <Navbar variant="light" />

      <main>
        <section className="contact-hero">
          <div className="contact-hero__ring contact-hero__ring--one" />
          <div className="contact-hero__ring contact-hero__ring--two" />

          <div className="container contact-hero__grid">
            <motion.div
              className="contact-hero__content"
              variants={stagger}
              initial={reduceMotion ? false : "hidden"}
              animate={reduceMotion ? undefined : "visible"}
            >
              <motion.div className="contact-kicker" variants={reveal}>
                <span>{copy.hero.kicker}</span>
                <span className="contact-kicker__line" />
              </motion.div>

              <motion.h1 className="contact-hero__title" variants={reveal}>
                {copy.hero.title.map((line, index) => (
                  <span key={line}>
                    {line}
                    {index < copy.hero.title.length - 1 && <br />}
                  </span>
                ))}
              </motion.h1>

              <motion.p className="contact-hero__description" variants={reveal}>
                {copy.hero.description}
              </motion.p>
            </motion.div>

            <motion.aside
              className="contact-quick-card"
              initial={
                reduceMotion
                  ? false
                  : {
                      opacity: 0,
                      x: isArabic ? -36 : 36,
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
              transition={{ duration: 0.8, delay: 0.18, ease: easing }}
            >
              <span className="contact-quick-card__label">
                {copy.hero.quickLabel}
              </span>

              <div className="contact-quick-card__divider" />

              <a
                className="contact-quick-card__link"
                href="https://wa.me/963989019635"
                target="_blank"
                rel="noreferrer"
              >
                <span className="contact-quick-card__icon">
                  <MessageCircle size={24} />
                </span>

                <span>
                  <small>{copy.hero.whatsappLabel}</small>
                  <strong>{copy.hero.whatsappAction}</strong>
                </span>

                <DirectionArrow size={17} />
              </a>
            </motion.aside>
          </div>
        </section>

        <section className="contact-main">
          <div className="container contact-main__grid">
            <motion.div
              className="contact-info"
              variants={stagger}
              initial={reduceMotion ? false : "hidden"}
              whileInView={reduceMotion ? undefined : "visible"}
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.div variants={reveal}>
                <div className="contact-kicker">
                  <span>{copy.info.kicker}</span>
                  <span className="contact-kicker__line" />
                </div>

                <h2 className="contact-info__title">
                  {copy.info.title.map((line, index) => (
                    <span key={line}>
                      {line}
                      {index < copy.info.title.length - 1 && <br />}
                    </span>
                  ))}
                </h2>
              </motion.div>

              <div className="contact-info__list">
                {copy.info.details.map((item) => {
                  const Icon = item.icon;

                  const content = (
                    <>
                      <span className="contact-info__icon">
                        <Icon size={22} />
                      </span>

                      <span className="contact-info__text">
                        <small>{item.label}</small>
                        <strong>{item.value}</strong>
                      </span>

                      {item.href && (
                        <DirectionArrow
                          className="contact-info__arrow"
                          size={16}
                        />
                      )}
                    </>
                  );

                  return (
                    <motion.div
                      className="contact-info__item"
                      key={item.label}
                      variants={reveal}
                    >
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                        >
                          {content}
                        </a>
                      ) : (
                        <div>{content}</div>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div
              className="contact-form-card"
              initial={reduceMotion ? false : { opacity: 0, y: 38 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.78, ease: easing }}
            >
              <div className="contact-form-card__header">
                <span>{copy.form.eyebrow}</span>
                <h2>{copy.form.title}</h2>
              </div>

              <form className="contact-form" onSubmit={handleSubmit}>
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
                <div className="contact-form__row">
                  <label className="contact-field">
                    <span>{copy.form.fields.name}</span>
                    <input
                      type="text"
                      name="name"
                      placeholder={copy.form.fields.namePlaceholder}
                      autoComplete="name"
                      maxLength={120}
                      required
                    />
                  </label>

                  <label className="contact-field">
                    <span>{copy.form.fields.phone}</span>
                    <input
                      type="tel"
                      name="phone"
                      placeholder={copy.form.fields.phonePlaceholder}
                      autoComplete="tel"
                      maxLength={40}
                    />
                  </label>
                </div>

                <div className="contact-form__row">
                  <label className="contact-field">
                    <span>{copy.form.fields.email}</span>
                    <input
                      type="email"
                      name="email"
                      placeholder={copy.form.fields.emailPlaceholder}
                      autoComplete="email"
                      maxLength={254}
                      required
                    />
                  </label>

                  <label className="contact-field">
                    <span>{copy.form.fields.subject}</span>
                    <select name="subject" defaultValue="general">
                      {Object.entries(copy.form.subjects).map(([value, label]) => (
                        <option value={value} key={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <label className="contact-field">
                  <span>{copy.form.fields.message}</span>
                  <textarea
                    name="message"
                    rows="7"
                    maxLength={5000}
                    placeholder={copy.form.fields.messagePlaceholder}
                    required
                  />
                </label>

                {formStatus.type !== "idle" && (
                  <div
                    className={`form-status form-status--${formStatus.type}`}
                    role="status"
                    aria-live="polite"
                  >
                    {formStatus.message}
                  </div>
                )}

                <div className="contact-form__footer">
                  <p>{copy.form.footer}</p>

                  <button
                    className="contact-form__submit"
                    type="submit"
                    disabled={formStatus.type === "loading"}
                    aria-busy={formStatus.type === "loading"}
                  >
                    <Send size={19} />
                    <span>
                      {formStatus.type === "loading"
                        ? copy.form.status.sending
                        : copy.form.submit}
                    </span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </section>

        <section className="contact-map-section">
          <div className="container">
            <motion.div
              className="contact-map-section__header"
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: easing }}
            >
              <div className="contact-kicker">
                <span>{copy.map.kicker}</span>
                <span className="contact-kicker__line" />
              </div>

              <h2>{copy.map.title}</h2>
              <p>{copy.map.description}</p>
            </motion.div>

            <motion.div
              className="contact-map"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.8, ease: easing }}
            >
              <iframe
                title={copy.map.iframeTitle}
                src="https://www.google.com/maps?q=Qabtan%20al-Jabal%20Aleppo%20Syria&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ContactPage;