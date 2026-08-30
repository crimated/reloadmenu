import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Coffee, ShoppingBag } from "lucide-react";
import { useEffect, useMemo, useRef } from "react";
import { MenuHeader } from "@/components/MenuHeader";
import { ProductCard } from "@/components/ProductCard";
import { BottomNav } from "@/components/Shell";
import { useCart } from "@/lib/cart";
import { configQuery, menuQuery } from "@/lib/data";
import { formatPrice } from "@/lib/format";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/menu/$category")({
  head: () => ({
    meta: [
      { title: "قسم المنيو — RELOAD CAFÉ | Menu category" },
      {
        name: "description",
        content: "Browse products in this RELOAD CAFÉ menu category and order via WhatsApp.",
      },
      { property: "og:title", content: "RELOAD CAFÉ — قسم المنيو" },
      { property: "og:description", content: "اختر منتجاتك من هذا القسم واطلب عبر واتساب." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useParams();
  const navigate = useNavigate();
  const { dir, lang, t, tr } = useLang();
  const { data: menu, isLoading } = useQuery(menuQuery);
  const { data: config } = useQuery(configQuery);
  const { count, total } = useCart();
  const activeRef = useRef<HTMLAnchorElement | null>(null);
  const Back = dir === "rtl" ? ArrowRight : ArrowLeft;

  const categories = useMemo(
    () => [...(menu?.categories ?? [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [menu],
  );
  const current = categories.find((c) => c.id === category);
  const products = useMemo(
    () => [...(current?.products ?? [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [current],
  );

  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [category]);

  useEffect(() => {
    if (!isLoading && categories.length > 0 && !current) {
      void navigate({ to: "/menu", replace: true });
    }
  }, [isLoading, categories.length, current, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <MenuHeader />

      {categories.length > 0 ? (
        <div className="sticky top-14 z-20 border-b border-border/70 bg-background/85 backdrop-blur-md">
          <div className="mx-auto flex w-full max-w-3xl gap-2 overflow-x-auto px-4 py-2.5 [scrollbar-width:none]">
            {categories.map((c) => {
              const on = c.id === category;
              return (
                <Link
                  key={c.id}
                  to="/menu/$category"
                  params={{ category: c.id }}
                  ref={on ? activeRef : undefined}
                  className={`whitespace-nowrap rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors ${
                    on
                      ? "border-primary bg-primary text-primary-foreground shadow-soft"
                      : "border-border bg-card text-card-foreground"
                  }`}
                >
                  {tr(c.name)}
                </Link>
              );
            })}
          </div>
        </div>
      ) : null}

      <main className="mx-auto w-full max-w-3xl px-4 pb-32 pt-5">
        <div className="mb-4 flex items-center gap-2">
          <Link
            to="/menu"
            aria-label={t("back")}
            className="rounded-full border border-border bg-card p-2 text-foreground transition-colors active:bg-secondary"
          >
            <Back className="h-4 w-4" aria-hidden="true" />
          </Link>
          <h1 className="min-w-0 truncate font-display text-2xl font-semibold text-foreground">
            {current ? tr(current.name) : t("menu")}
          </h1>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-32 animate-pulse rounded-2xl bg-muted" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="card-soft mt-8 flex flex-col items-center gap-3 px-6 py-14 text-center">
            <Coffee className="h-9 w-9 text-primary" aria-hidden="true" />
            <p className="font-display text-lg font-semibold text-card-foreground">
              {t("menuPreparing")}
            </p>
            <p className="text-sm text-muted-foreground">{t("emptyMenuSub")}</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {products.map((p, i) =>
              config ? (
                <ProductCard
                  key={p.id}
                  product={p}
                  config={config}
                  index={Math.min(i, 8)}
                />
              ) : null,
            )}
          </div>
        )}
      </main>

      {count > 0 && config ? (
        <Link
          to="/cart"
          className="fixed inset-x-4 bottom-20 z-30 mx-auto flex max-w-md items-center justify-between rounded-2xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-lift"
        >
          <span className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            {count} {t("items")}
          </span>
          <span>{formatPrice(total, lang, config.currency)}</span>
        </Link>
      ) : null}

      <BottomNav />
    </div>
  );
}
