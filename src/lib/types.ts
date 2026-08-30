export type Localized = { ar: string; en: string };

export type Extra = {
  id: string;
  name: Localized;
  price: number;
};

export type Product = {
  id: string;
  name: Localized;
  description?: Localized;
  price: number;
  image?: string;
  category: string;
  available: boolean;
  extras?: Extra[];
  order?: number;
};

export type Category = {
  id: string;
  name: Localized;
  image?: string;
  order?: number;
  products: Product[];
};

export type Menu = { categories: Category[] };

export type SiteConfig = {
  name: Localized;
  tagline: Localized;
  brandPhrase: string;
  logo: string;
  whatsapp: string;
  phone: string;
  locationUrl: string;
  instagram: string;
  instagramHandle: string;
  address: Localized;
  about: { headlineEn: string; descAr: string; descEn: string };
  hours: Localized;
  currency: Localized;
  colors?: Record<string, string>;
};
