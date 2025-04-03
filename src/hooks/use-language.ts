
import { useState, useEffect } from "react";

export function useLanguage() {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("app-language") || "en";
  });

  useEffect(() => {
    localStorage.setItem("app-language", language);
    document.documentElement.setAttribute("lang", language);
  }, [language]);

  return {
    language,
    setLanguage,
  };
}
