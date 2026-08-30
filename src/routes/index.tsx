import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Coffee, Info, MapPin } from "lucide-react";
import { useState } from "react";
import { CoffeeIntro } from "@/components/CoffeeIntro";
import { Logo } from "@/components/Logo";
import { BottomNav, TopBar } from "@/components/Shell";
import { configQuery, menuQuery } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RELOAD CAFÉ — المنيو الرقمي | Digital Menu" },
      {
        name: "description",
        content:
          "RELOAD CAFÉ in Karbala — specialty coffee, fine desserts and signature drinks. Browse the menu and order via WhatsApp.",
      },
      { property: "og:title", content: "RELOAD CAFÉ — Reload Your Mood" },
      {
        property: "og:description",
        content: "قهوة مختصة وحلويات فاخرة في كربلاء. تصفح المنيو واطلب عبر واتساب.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  const { lang, t, tr } = useLang();
  const navigate = useNavigate();
  const { data: config } = useQuery(configQuery);
  // Warm the menu cache so the intro animation never delays the menu.
  useQuery(menuQuery);
  const [intro, setIntro] = useState(false);

  const openMenu = () => {
    void navigate({ to: "/menu" });
  };

  return (
    <div className="hero-surface flex min-h-screen flex-col">
      <TopBar />

      {intro ? (
        <CoffeeIntro
          onDone={() => {
            setIntro(false);
            openMenu();
          }}
        />
      ) : null}

      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center px-6 pb-28 pt-6 text-center">
        <Logo
          src={config?.logo ?? "/images/logo.png"}
          alt="RELOAD CAFÉ"
          className="rc-rise h-40 w-auto max-w-[70vw]"
        />

        <h1 className="rc-rise mt-6 font-display text-4xl font-semibold text-foreground">
          {config ? tr(config.tagline) : lang === "ar" ? "حـَدث مزاجك" : "Reload Your Mood"}
        </h1>
        <p className="rc-rise mt-2 text-sm text-muted-foreground">
          {lang === "ar" ? "Reload Your Mood" : "حـَدث مزاجك"}
        </p>
        <p className="text-brandline mt-4">{config?.brandPhrase ?? "RECHARGE • REFRESH • RELOAD"}</p>

        <div className="rc-rise mt-10 flex w-full flex-col gap-3">
          <button
            type="button"
            onClick={() => setIntro(true)}
            className="flex items-center justify-center gap-2 rounded-2xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-lift transition-transform active:scale-[0.98]"
          >
            <Coffee className="h-5 w-5" aria-hidden="true" />
            Menu - المنيو
          </button>

          <a
            href={config?.locationUrl ?? "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 py-4 text-base font-semibold text-card-foreground shadow-soft transition-transform active:scale-[0.98]"
          >
            <MapPin className="h-5 w-5 text-primary" aria-hidden="true" />
            موقع المحل - Location
          </a>

          <button
            type="button"
            onClick={() => void navigate({ to: "/about" })}
            className="flex items-center justify-center gap-2 rounded-2xl border border-border bg-card px-6 py-4 text-base font-semibold text-card-foreground shadow-soft transition-transform active:scale-[0.98]"
          >
            <Info className="h-5 w-5 text-primary" aria-hidden="true" />
            نبذة عنا - About Us
          </button>
        </div>

        <p className="mt-8 text-xs text-muted-foreground">{config ? tr(config.address) : ""}</p>
        <span className="sr-only">{t("home")}</span>
      </main>

      <BottomNav />
    </div>
  );
}
