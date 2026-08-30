import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Coffee } from "lucide-react";
import { useMemo } from "react";
import { MenuHeader } from "@/components/MenuHeader";
import { BottomNav } from "@/components/Shell";
import { menuQuery } from "@/lib/data";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/menu/")({
  head: () => ({
    meta: [
      { title: "المنيو — RELOAD CAFÉ | Menu" },
      {
        name: "description",
        content:
          "Browse the RELOAD CAFÉ menu categories: specialty coffee, desserts and signature drinks.",
      },
      { property: "og:title", content: "RELOAD CAFÉ Menu — المنيو" },
      { property: "og:description", content: "تصفح أقسام منيو ريلود كافيه واطلب عبر واتساب." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MenuCategoriesPage,
});

function MenuCategoriesPage() {
  const { dir, t, tr } = useLang();
  const { data: menu, isLoading } = useQuery(menuQuery);
  const Chevron = dir === "rtl" ? ChevronLeft : ChevronRight;

  const categories = useMemo(
    () =>
      [...(menu?.categories ?? [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [menu],
  );

  return (
    <div className="min-h-screen bg-background">
      <MenuHeader />
      <main className="mx-auto w-full max-w-3xl px-4 pb-28 pt-6">
        <p className="text-brandline">RECHARGE • REFRESH • RELOAD</p>
        <h1 className="mt-1 font-display text-3xl font-semibold text-foreground">{t("menu")}</h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("pickCategory")}</p>

        {isLoading ? (
          <div className="mt-6 grid grid-cols-2 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-28 animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="card-soft rc-rise mt-10 flex flex-col items-center gap-3 px-6 py-16 text-center">
            <Coffee className="h-10 w-10 text-primary" aria-hidden="true" />
            <p className="font-display text-xl font-semibold text-card-foreground">
              {t("menuPreparing")}
            </p>
            <p className="text-sm text-muted-foreground">{t("emptyMenuSub")}</p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {categories.map((cat, i) => (
              <Link
                key={cat.id}
                to="/menu/$category"
                params={{ category: cat.id }}
                style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}
                className="card-soft rc-rise group relative flex min-h-28 flex-col justify-between overflow-hidden p-4 transition-transform active:scale-[0.98]"
              >
                <span className="pointer-events-none absolute -end-6 -top-6 h-20 w-20 rounded-full bg-primary/10 transition-transform group-hover:scale-110" />
                <span className="relative mb-3 block aspect-[4/3] w-full overflow-hidden rounded-xl bg-muted">
                  {cat.image ? (
                    <img
                      src={cat.image}
                      alt={tr(cat.name)}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <span className="flex h-full w-full items-center justify-center bg-primary/5">
                      <Coffee className="h-7 w-7 text-primary/50" aria-hidden="true" />
                    </span>
                  )}
                </span>
                <span className="relative font-display text-lg font-semibold leading-snug text-card-foreground">
                  {tr(cat.name)}
                </span>
                <span className="relative mt-3 flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    {(cat.products ?? []).length} {t("items")}
                  </span>
                  <Chevron className="h-4 w-4 text-primary" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
