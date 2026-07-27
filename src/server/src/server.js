import "dotenv/config";

import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import nodemailer from "nodemailer";

const app = express();

const PORT = Number(process.env.PORT || 5000);
const NODE_ENV =
  process.env.NODE_ENV || "development";

const SMTP_HOST =
  process.env.SMTP_HOST ||
  "smtp.hostinger.com";

const SMTP_PORT = Number(
  process.env.SMTP_PORT || 465,
);

const SMTP_SECURE =
  String(
    process.env.SMTP_SECURE ??
      SMTP_PORT === 465,
  ).toLowerCase() === "true";

const SMTP_USER =
  process.env.SMTP_USER || "";

const SMTP_PASS =
  process.env.SMTP_PASS || "";

const MAIL_TO =
  process.env.MAIL_TO || SMTP_USER;

const MAIL_FROM_NAME =
  process.env.MAIL_FROM_NAME ||
  "MAVA Website";

const allowedOrigins = (
  process.env.FRONTEND_ORIGINS ||
  "http://localhost:5173"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

const requiredEnvironmentVariables = [
  ["SMTP_USER", SMTP_USER],
  ["SMTP_PASS", SMTP_PASS],
  ["MAIL_TO", MAIL_TO],
];

const missingEnvironmentVariables =
  requiredEnvironmentVariables
    .filter(([, value]) => !value)
    .map(([name]) => name);

if (
  missingEnvironmentVariables.length > 0
) {
  console.error(
    `Missing required environment variables: ${missingEnvironmentVariables.join(
      ", ",
    )}`,
  );

  process.exit(1);
}

if (NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

app.disable("x-powered-by");

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  }),
);

app.use(
  cors({
    origin(origin, callback) {
      if (
        !origin ||
        allowedOrigins.includes(origin)
      ) {
        callback(null, true);
        return;
      }

      callback(
        new Error(
          "Origin is not allowed by CORS.",
        ),
      );
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  }),
);

app.use(
  express.json({
    limit: "32kb",
  }),
);

const formRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 8,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    success: false,
    message:
      "Too many requests. Please try again later.",
  },
});

app.use(
  "/api/forms",
  formRateLimiter,
);

const transporter =
  nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
    pool: true,
    maxConnections: 3,
    maxMessages: 50,
    connectionTimeout: 15000,
    greetingTimeout: 10000,
    socketTimeout: 30000,
  });

const contactSubjects = {
  general: {
    ar: "استفسار عام",
    en: "General enquiry",
  },
  supply: {
    ar: "طلب توريد",
    en: "Supply request",
  },
  investment: {
    ar: "شراكة استثمارية",
    en: "Investment partnership",
  },
  distribution: {
    ar: "التوزيع",
    en: "Distribution",
  },
  consumer: {
    ar: "خدمة المستهلك",
    en: "Consumer service",
  },
};

const governorates = {
  aleppo: {
    ar: "حلب",
    en: "Aleppo",
  },
  idlib: {
    ar: "إدلب",
    en: "Idlib",
  },
  latakia: {
    ar: "اللاذقية",
    en: "Latakia",
  },
  tartous: {
    ar: "طرطوس",
    en: "Tartous",
  },
  hama: {
    ar: "حماة",
    en: "Hama",
  },
  homs: {
    ar: "حمص",
    en: "Homs",
  },
  damascus: {
    ar: "دمشق",
    en: "Damascus",
  },
  ruralDamascus: {
    ar: "ريف دمشق",
    en: "Rural Damascus",
  },
};

const customerTypes = {
  store: {
    ar: "متجر",
    en: "Retail store",
  },
  restaurant: {
    ar: "مطعم",
    en: "Restaurant",
  },
  hotel: {
    ar: "فندق",
    en: "Hotel",
  },
  company: {
    ar: "شركة",
    en: "Company",
  },
  distributor: {
    ar: "موزع",
    en: "Distributor",
  },
  event: {
    ar: "فعالية أو مناسبة",
    en: "Event or occasion",
  },
};

const productTypes = {
  "plastic-330": {
    ar: "عبوة بلاستيك 330 مل",
    en: "330 ml plastic bottle",
  },
  "plastic-500": {
    ar: "عبوة بلاستيك 500 مل",
    en: "500 ml plastic bottle",
  },
  "plastic-1500": {
    ar: "عبوة بلاستيك 1.5 لتر",
    en: "1.5 L plastic bottle",
  },
  "glass-350": {
    ar: "عبوة زجاج 350 مل",
    en: "350 ml glass bottle",
  },
  "glass-950": {
    ar: "عبوة زجاج 950 مل",
    en: "950 ml glass bottle",
  },
};

function getLanguage(value) {
  return value === "en" ? "en" : "ar";
}

function cleanText(
  value,
  {
    maxLength = 500,
    required = false,
  } = {},
) {
  const cleaned = String(value ?? "")
    .replace(/\0/g, "")
    .trim();

  if (required && !cleaned) {
    throw new ValidationError(
      "A required field is missing.",
    );
  }

  if (cleaned.length > maxLength) {
    throw new ValidationError(
      "One of the fields is too long.",
    );
  }

  return cleaned;
}

function cleanKey(
  value,
  allowedValues,
  {
    required = true,
  } = {},
) {
  const key = cleanText(value, {
    maxLength: 80,
    required,
  });

  if (
    key &&
    !Object.hasOwn(allowedValues, key)
  ) {
    throw new ValidationError(
      "An invalid option was selected.",
    );
  }

  return key;
}

function cleanPositiveInteger(
  value,
  {
    max = 1000000,
  } = {},
) {
  const cleaned = cleanText(value, {
    maxLength: 12,
    required: true,
  });

  if (!/^[1-9]\d*$/.test(cleaned)) {
    throw new ValidationError(
      "Quantity must contain positive whole numbers only.",
    );
  }

  const numberValue = Number(cleaned);

  if (
    !Number.isSafeInteger(numberValue) ||
    numberValue > max
  ) {
    throw new ValidationError(
      "Quantity is outside the allowed range.",
    );
  }

  return String(numberValue);
}

function cleanEmail(value) {
  const email = cleanText(value, {
    maxLength: 254,
    required: true,
  }).toLowerCase();

  const emailPattern =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    throw new ValidationError(
      "The email address is invalid.",
    );
  }

  return email;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function textToHtml(value) {
  return escapeHtml(value).replaceAll(
    "\n",
    "<br />",
  );
}

function getLabel(
  collection,
  key,
  language,
) {
  return (
    collection[key]?.[language] ||
    collection[key]?.en ||
    key
  );
}

function localisedMessage(
  language,
  ar,
  en,
) {
  return language === "ar" ? ar : en;
}

function emailLayout({
  direction,
  heading,
  intro,
  rows,
  message,
}) {
  const textAlign =
    direction === "rtl" ? "right" : "left";

  const rowsHtml = rows
    .map(
      ({ label, value }) => `
        <tr>
          <td
            style="padding:12px 14px;border-bottom:1px solid #dfeaf1;color:#607b91;font-size:14px;width:34%;vertical-align:top;text-align:${textAlign};overflow-wrap:anywhere;word-break:break-word;"
          >
            ${escapeHtml(label)}
          </td>
          <td
            style="padding:12px 14px;border-bottom:1px solid #dfeaf1;color:#062a49;font-size:15px;font-weight:700;vertical-align:top;text-align:${textAlign};overflow-wrap:anywhere;word-break:break-all;"
          >
            ${escapeHtml(value || "-")}
          </td>
        </tr>
      `,
    )
    .join("");

  const messageHtml = message
    ? `
      <table
        role="presentation"
        width="100%"
        cellpadding="0"
        cellspacing="0"
        style="width:100%;max-width:100%;margin-top:22px;border-collapse:collapse;table-layout:fixed;"
      >
        <tr>
          <td
            style="padding:18px;background:#f3faff;border:1px solid #d8ebf7;box-sizing:border-box;max-width:0;text-align:${textAlign};"
          >
            <div
              style="margin-bottom:10px;color:#159be2;font-size:13px;font-weight:700;overflow-wrap:anywhere;word-break:break-word;"
            >
              ${escapeHtml(message.label)}
            </div>
            <div
              style="max-width:100%;color:#173d5c;font-size:15px;line-height:1.9;white-space:normal;overflow-wrap:anywhere;word-break:break-all;"
            >
              ${textToHtml(message.value || "-")}
            </div>
          </td>
        </tr>
      </table>
    `
    : "";

  return `
    <!doctype html>
    <html lang="${direction === "rtl" ? "ar" : "en"}" dir="${direction}">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </head>
      <body style="width:100%;margin:0;padding:0;background:#edf6fb;font-family:Arial,sans-serif;">
        <table
          role="presentation"
          width="100%"
          cellpadding="0"
          cellspacing="0"
          style="width:100%;border-collapse:collapse;background:#edf6fb;"
        >
          <tr>
            <td style="padding:34px 16px;">
              <table
                role="presentation"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                align="center"
                style="width:100%;max-width:720px;margin:0 auto;border-collapse:collapse;background:#ffffff;border:1px solid #d8e8f2;table-layout:fixed;"
              >
                <tr>
                  <td style="padding:26px 28px;background:#062f53;color:#ffffff;text-align:${textAlign};">
                    <div style="font-size:12px;letter-spacing:2px;color:#63c7f4;">
                      MAVA WATER
                    </div>
                    <h1 style="margin:10px 0 0;font-size:25px;line-height:1.5;overflow-wrap:anywhere;word-break:break-word;">
                      ${escapeHtml(heading)}
                    </h1>
                  </td>
                </tr>

                <tr>
                  <td style="padding:26px 28px;text-align:${textAlign};">
                    <p style="margin:0 0 20px;color:#526f86;font-size:15px;line-height:1.9;overflow-wrap:anywhere;word-break:break-word;">
                      ${escapeHtml(intro)}
                    </p>

                    <table
                      role="presentation"
                      width="100%"
                      cellpadding="0"
                      cellspacing="0"
                      style="width:100%;border-collapse:collapse;table-layout:fixed;background:#fbfdff;border:1px solid #dfeaf1;"
                    >
                      ${rowsHtml}
                    </table>

                    ${messageHtml}
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

async function sendMail(options) {
  return transporter.sendMail({
    from: {
      name: MAIL_FROM_NAME,
      address: SMTP_USER,
    },
    to: MAIL_TO,
    ...options,
  });
}

app.get("/api/health", (request, response) => {
  response.json({
    status: "ok",
    service: "mava-mail-api",
  });
});

app.post(
  "/api/forms/contact",
  async (request, response, next) => {
    try {
      const language = getLanguage(
        request.body.language,
      );

      // Honeypot: return a normal success response
      // without sending anything when a bot fills it.
      if (
        cleanText(request.body.website, {
          maxLength: 200,
        })
      ) {
        response.json({
          success: true,
          message: localisedMessage(
            language,
            "تم إرسال رسالتك بنجاح.",
            "Your message was sent successfully.",
          ),
        });
        return;
      }

      const name = cleanText(
        request.body.name,
        {
          maxLength: 120,
          required: true,
        },
      );

      const phone = cleanText(
        request.body.phone,
        {
          maxLength: 40,
        },
      );

      const email = cleanEmail(
        request.body.email,
      );

      const subjectKey = cleanKey(
        request.body.subject,
        contactSubjects,
      );

      const message = cleanText(
        request.body.message,
        {
          maxLength: 5000,
          required: true,
        },
      );

      const subjectLabel = getLabel(
        contactSubjects,
        subjectKey,
        language,
      );

      const labels =
        language === "ar"
          ? {
              heading:
                "رسالة جديدة من نموذج التواصل",
              intro:
                "تم إرسال هذه الرسالة من صفحة التواصل في موقع مافا.",
              name: "الاسم الكامل",
              phone: "رقم الهاتف",
              email: "البريد الإلكتروني",
              subject: "موضوع الرسالة",
              message: "نص الرسالة",
            }
          : {
              heading:
                "New message from the contact form",
              intro:
                "This message was submitted through the MAVA contact page.",
              name: "Full name",
              phone: "Phone number",
              email: "Email address",
              subject: "Message subject",
              message: "Message",
            };

      const rows = [
        {
          label: labels.name,
          value: name,
        },
        {
          label: labels.phone,
          value: phone || "-",
        },
        {
          label: labels.email,
          value: email,
        },
        {
          label: labels.subject,
          value: subjectLabel,
        },
      ];

      const text = [
        labels.heading,
        "",
        `${labels.name}: ${name}`,
        `${labels.phone}: ${phone || "-"}`,
        `${labels.email}: ${email}`,
        `${labels.subject}: ${subjectLabel}`,
        "",
        `${labels.message}:`,
        message,
      ].join("\n");

      await sendMail({
        replyTo: {
          name,
          address: email,
        },
        subject: `[MAVA Contact] ${subjectLabel} - ${name}`,
        text,
        html: emailLayout({
          direction:
            language === "ar"
              ? "rtl"
              : "ltr",
          heading: labels.heading,
          intro: labels.intro,
          rows,
          message: {
            label: labels.message,
            value: message,
          },
        }),
      });

      response.status(200).json({
        success: true,
        message: localisedMessage(
          language,
          "تم إرسال رسالتك بنجاح. سيتواصل معك فريق مافا قريبًا.",
          "Your message was sent successfully. The MAVA team will contact you soon.",
        ),
      });
    } catch (error) {
      next(error);
    }
  },
);

app.post(
  "/api/forms/distribution",
  async (request, response, next) => {
    try {
      const language = getLanguage(
        request.body.language,
      );

      if (
        cleanText(request.body.website, {
          maxLength: 200,
        })
      ) {
        response.json({
          success: true,
          message: localisedMessage(
            language,
            "تم إرسال طلبك بنجاح.",
            "Your request was sent successfully.",
          ),
        });
        return;
      }

      const name = cleanText(
        request.body.name,
        {
          maxLength: 120,
          required: true,
        },
      );

      const phone = cleanText(
        request.body.phone,
        {
          maxLength: 40,
          required: true,
        },
      );

      const governorateKey = cleanKey(
        request.body.governorate,
        governorates,
      );

      const area = cleanText(
        request.body.area,
        {
          maxLength: 160,
          required: true,
        },
      );

      const customerTypeKey = cleanKey(
        request.body.customerType,
        customerTypes,
      );

      const productKey = cleanKey(
        request.body.product,
        productTypes,
      );

      const quantity = cleanPositiveInteger(
        request.body.quantity,
      );

      const notes = cleanText(
        request.body.notes,
        {
          maxLength: 5000,
        },
      );

      const governorateLabel = getLabel(
        governorates,
        governorateKey,
        language,
      );

      const customerTypeLabel = getLabel(
        customerTypes,
        customerTypeKey,
        language,
      );

      const productLabel = getLabel(
        productTypes,
        productKey,
        language,
      );

      const labels =
        language === "ar"
          ? {
              heading:
                "طلب كمية جديد من موقع مافا",
              intro:
                "تم إرسال هذا الطلب من نموذج التوزيع وطلبات الكميات.",
              name: "الاسم الكامل",
              phone: "رقم الهاتف",
              governorate: "المحافظة",
              area: "المدينة / المنطقة",
              customerType: "نوع العميل",
              product: "المنتج المطلوب",
              quantity: "الكمية المطلوبة",
              notes: "ملاحظات إضافية",
            }
          : {
              heading:
                "New bulk order from the MAVA website",
              intro:
                "This request was submitted through the distribution and bulk-order form.",
              name: "Full name",
              phone: "Phone number",
              governorate: "Governorate",
              area: "City / Area",
              customerType: "Customer type",
              product: "Required product",
              quantity: "Required quantity",
              notes: "Additional notes",
            };

      const rows = [
        {
          label: labels.name,
          value: name,
        },
        {
          label: labels.phone,
          value: phone,
        },
        {
          label: labels.governorate,
          value: governorateLabel,
        },
        {
          label: labels.area,
          value: area,
        },
        {
          label: labels.customerType,
          value: customerTypeLabel,
        },
        {
          label: labels.product,
          value: productLabel,
        },
        {
          label: labels.quantity,
          value: quantity,
        },
      ];

      const text = [
        labels.heading,
        "",
        ...rows.map(
          ({ label, value }) =>
            `${label}: ${value}`,
        ),
        "",
        `${labels.notes}:`,
        notes || "-",
      ].join("\n");

      await sendMail({
        subject: `[MAVA Distribution] ${governorateLabel} - ${name}`,
        text,
        html: emailLayout({
          direction:
            language === "ar"
              ? "rtl"
              : "ltr",
          heading: labels.heading,
          intro: labels.intro,
          rows,
          message: {
            label: labels.notes,
            value: notes || "-",
          },
        }),
      });

      response.status(200).json({
        success: true,
        message: localisedMessage(
          language,
          "تم إرسال طلبك بنجاح. سيتواصل معك فريق التوزيع قريبًا.",
          "Your order request was sent successfully. The distribution team will contact you soon.",
        ),
      });
    } catch (error) {
      next(error);
    }
  },
);

app.use(
  (
    error,
    request,
    response,
    next,
  ) => {
    if (
      error instanceof ValidationError
    ) {
      const language = getLanguage(
        request.body?.language,
      );

      response.status(400).json({
        success: false,
        message: localisedMessage(
          language,
          "تحقق من الحقول المطلوبة والقيم المدخلة ثم حاول مجددًا.",
          "Please check the required fields and submitted values, then try again.",
        ),
      });
      return;
    }

    if (
      error.message ===
      "Origin is not allowed by CORS."
    ) {
      response.status(403).json({
        success: false,
        message: "Origin is not allowed.",
      });
      return;
    }

    console.error(
      "Mail API error:",
      error.message,
    );

    const language = getLanguage(
      request.body?.language,
    );

    response.status(500).json({
      success: false,
      message: localisedMessage(
        language,
        "تعذّر إرسال الرسالة عبر خادم البريد. حاول مرة أخرى بعد قليل.",
        "The mail server could not send the message. Please try again shortly.",
      ),
    });
  },
);

async function startServer() {
  try {
    await transporter.verify();

    console.log(
      `SMTP connection verified: ${SMTP_HOST}:${SMTP_PORT}`,
    );

    app.listen(PORT, () => {
      console.log(
        `MAVA mail API running on http://localhost:${PORT}`,
      );
    });
  } catch (error) {
    console.error(
      "SMTP verification failed:",
      error.message,
    );

    process.exit(1);
  }
}

startServer();
