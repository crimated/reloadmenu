import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Localized } from "./types";

export type Lang = "ar" | "en";

const dict = {
  menu: { ar: "المنيو", en: "Menu" },
  menuBtn: { ar: "المنيو", en: "Menu" },
  location: { ar: "موقع المحل", en: "Location" },
  about: { ar: "نبذة عنا", en: "About Us" },
  home: { ar: "الرئيسية", en: "Home" },
  cart: { ar: "السلة", en: "Cart" },
  emptyMenu: { ar: "سيتم إضافة القائمة قريباً", en: "Menu items will be added soon" },
  menuPreparing: { ar: "القائمة قيد الإعداد", en: "The menu is being prepared" },
  pickCategory: { ar: "اختر القسم لعرض المنتجات", en: "Pick a category to view products" },
  emptyMenuSub: {
    ar: "نعمل على تجهيز قائمتنا. تابعنا قريباً",
    en: "We are preparing our menu. Check back soon",
  },
  emptyCart: { ar: "سلتك فارغة", en: "Your cart is empty" },
  emptyCartSub: {
    ar: "أضف منتجات من المنيو لتبدأ طلبك",
    en: "Add items from the menu to start your order",
  },
  browseMenu: { ar: "تصفح المنيو", en: "Browse menu" },
  add: { ar: "إضافة", en: "Add" },
  soldOut: { ar: "نفدت الكمية", en: "Sold out" },
  total: { ar: "الإجمالي", en: "Total" },
  yourInfo: { ar: "معلومات الزبون", en: "Customer information" },
  phone: { ar: "رقم الهاتف", en: "Phone number" },
  address: { ar: "العنوان", en: "Address" },
  notes: { ar: "ملاحظات", en: "Notes" },
  optional: { ar: "اختياري", en: "optional" },
  required: { ar: "مطلوب", en: "required" },
  sendOrder: { ar: "إرسال الطلب عبر واتساب", en: "Send order via WhatsApp" },
  phoneError: { ar: "أدخل رقم هاتف عراقي صحيح", en: "Enter a valid Iraqi phone number" },
  addressError: { ar: "الرجاء إدخال العنوان", en: "Please enter your address" },
  searchAll: { ar: "الكل", en: "All" },
  extras: { ar: "الإضافات", en: "Extras" },
  hours: { ar: "أوقات الدوام", en: "Working hours" },
  phoneLabel: { ar: "الهاتف", en: "Phone" },
  addressLabel: { ar: "العنوان", en: "Address" },
  openMaps: { ar: "فتح الموقع على الخرائط", en: "Open in Google Maps" },
  back: { ar: "رجوع", en: "Back" },
  items: { ar: "منتج", en: "items" },
  clear: { ar: "تفريغ السلة", en: "Clear cart" },
} satisfies Record<string, Localized>;

export type Key = keyof typeof dict;

type Ctx = {
  lang: Lang;
  dir: "rtl" | "ltr";
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  t: (k: Key) => string;
  tr: (v?: Localized) => string;
};

const LangContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ar");

  useEffect(() => {
    const saved = localStorage.getItem("rc-lang");
    if (saved === "en" || saved === "ar") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    localStorage.setItem("rc-lang", l);
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      dir: lang === "ar" ? "rtl" : "ltr",
      setLang,
      toggleLang: () => setLang(lang === "ar" ? "en" : "ar"),
      t: (k: Key) => dict[k][lang],
      tr: (v?: Localized) => (v ? v[lang] || v.ar || v.en : ""),
    }),
    [lang, setLang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider");
  return ctx;
}
