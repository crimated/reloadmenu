import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Instagram, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Page } from "@/components/Shell";
import { configQuery } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "نبذة عنا — RELOAD CAFÉ | About Us" },
      {
        name: "description",
        content:
          "Where Coffee Meets Energy — RELOAD CAFÉ in Karbala. Address, working hours, phone and Instagram.",
      },
      { property: "og:title", content: "About RELOAD CAFÉ — نبذة عنا" },
      {
        property: "og:description",
        content: "قهوة مختصة - حلويات فاخرة - مشروبات مميزة. كربلاء - مقابل مستشفى الحسيني.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { lang, t, tr } = useLang();
  const { data: config } = useQuery(configQuery);

  const rows: { icon: typeof MapPin; label: string; value: string; ltr?: boolean }[] = [
    { icon: MapPin, label: t("addressLabel"), value: config ? tr(config.address) : "" },
    { icon: Phone, label: t("phoneLabel"), value: config?.phone ?? "", ltr: true },
    { icon: Clock, label: t("hours"), value: config ? tr(config.hours) : "" },
  ];

  return (
    <Page title={t("about")}>
      <div className="flex flex-col items-center text-center">
        <Logo
          src={config?.logo ?? "/images/logo.png"}
          alt="RELOAD CAFÉ"
          className="h-28 w-auto max-w-[55vw]"
        />
        <h1 className="mt-5 font-display text-3xl font-semibold text-foreground">
          {config?.about.headlineEn ?? "Where Coffee Meets Energy"}
        </h1>
        <p className="mt-3 text-sm leading-7 text-muted-foreground">
          {config
            ? lang === "ar"
              ? config.about.descAr
              : config.about.descEn
            : "قهوة مختصة - حلويات فاخرة - مشروبات مميزة"}
        </p>
        <p className="text-brandline mt-4">{config?.brandPhrase ?? "RECHARGE • REFRESH • RELOAD"}</p>
      </div>

      <div className="mt-7 space-y-3">
        {rows.map(({ icon: Icon, label, value, ltr }) => (
          <div key={label} className="card-soft flex items-center gap-3 p-4 text-start">
            <span className="rounded-xl bg-secondary p-2.5 text-primary">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-[0.7rem] uppercase tracking-wider text-muted-foreground">
                {label}
              </span>
              <span
                className="block text-sm font-semibold text-card-foreground"
                dir={ltr ? "ltr" : undefined}
              >
                {value}
              </span>
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        <a
          href={config?.instagram ?? "https://instagram.com/reload.caffe"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-2xl bg-accent px-6 py-4 text-base font-semibold text-accent-foreground shadow-lift transition-transform active:scale-[0.98]"
        >
          <Instagram className="h-5 w-5" aria-hidden="true" />
          Instagram — {config?.instagramHandle ?? "@reload.caffe"}
        </a>

        <a
          href={config?.locationUrl ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 py-4 text-base font-semibold text-card-foreground shadow-soft transition-transform active:scale-[0.98]"
        >
          <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
          {t("openMaps")}
        </a>
      </div>
    </Page>
  );
}
