const API_BASE_URL = (
  import.meta.env.VITE_API_URL || ""
).replace(/\/$/, "");

async function postForm(path, payload) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => {
    controller.abort();
  }, 15000);

  try {
    const response = await fetch(
      `${API_BASE_URL}${path}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      },
    );

    const data = await response
      .json()
      .catch(() => ({}));

    if (!response.ok) {
      throw new Error(
        data.message ||
          "The request could not be sent.",
      );
    }

    return data;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(
        payload.language === "ar"
          ? "انتهت مهلة الاتصال بالخادم. حاول مرة أخرى."
          : "The server took too long to respond. Please try again.",
      );
    }

    if (error instanceof TypeError) {
      throw new Error(
        payload.language === "ar"
          ? "تعذّر الاتصال بخادم الإرسال. تأكد من تشغيل الخادم ثم حاول مجددًا."
          : "Could not connect to the mail server. Make sure the API is running and try again.",
      );
    }

    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export function submitContactForm(payload) {
  return postForm(
    "/api/forms/contact",
    payload,
  );
}

export function submitDistributionForm(payload) {
  return postForm(
    "/api/forms/distribution",
    payload,
  );
}
