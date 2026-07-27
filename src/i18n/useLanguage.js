import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "mava-language";
const LANGUAGE_EVENT = "mava-language-change";
const SUPPORTED_LANGUAGES = ["ar", "en"];

function getStoredLanguage() {
  if (typeof window === "undefined") {
    return "ar";
  }

  const storedLanguage = window.localStorage.getItem(STORAGE_KEY);

  if (SUPPORTED_LANGUAGES.includes(storedLanguage)) {
    return storedLanguage;
  }

  return "ar";
}

function updateDocumentLanguage(language) {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.lang = language;
  document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
}

export function useLanguage() {
  const [language, setLanguageState] = useState(getStoredLanguage);

  useEffect(() => {
    updateDocumentLanguage(language);
  }, [language]);

  useEffect(() => {
    const handleLanguageChange = (event) => {
      const nextLanguage = event.detail;

      if (SUPPORTED_LANGUAGES.includes(nextLanguage)) {
        setLanguageState(nextLanguage);
      }
    };

    const handleStorageChange = (event) => {
      if (
        event.key === STORAGE_KEY &&
        SUPPORTED_LANGUAGES.includes(event.newValue)
      ) {
        setLanguageState(event.newValue);
      }
    };

    window.addEventListener(LANGUAGE_EVENT, handleLanguageChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener(LANGUAGE_EVENT, handleLanguageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const setLanguage = useCallback((nextLanguage) => {
    if (!SUPPORTED_LANGUAGES.includes(nextLanguage)) {
      return;
    }

    window.localStorage.setItem(STORAGE_KEY, nextLanguage);
    updateDocumentLanguage(nextLanguage);
    setLanguageState(nextLanguage);

    window.dispatchEvent(
      new CustomEvent(LANGUAGE_EVENT, {
        detail: nextLanguage,
      }),
    );
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === "ar" ? "en" : "ar");
  }, [language, setLanguage]);

  return {
    language,
    isArabic: language === "ar",
    direction: language === "ar" ? "rtl" : "ltr",
    setLanguage,
    toggleLanguage,
  };
}
