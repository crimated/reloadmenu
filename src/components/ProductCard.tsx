import { Plus } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import type { Extra, Product, SiteConfig } from "@/lib/types";

/** Text-only premium product card, designed for a two-column mobile grid. */
export function ProductCard({
  product,
  config,
  index = 0,
}: {
  product: Product;
  config: SiteConfig;
  index?: number;
}) {
  const { lang, t, tr } = useLang();
  const { add } = useCart();
  const [selected, setSelected] = useState<string[]>([]);

  const extras = product.extras ?? [];
  const chosen: Extra[] = extras.filter((e) => selected.includes(e.id));
  const price = product.price + chosen.reduce((s, e) => s + e.price, 0);

  return (
    <article
      style={{ animationDelay: `${index * 40}ms` }}
      className="card-soft rc-rise relative flex flex-col overflow-hidden p-3.5"
    >
      <span className="pointer-events-none absolute -end-8 -top-8 h-16 w-16 rounded-full bg-primary/10" />

      <h3 className="relative line-clamp-2 font-display text-base font-semibold leading-snug text-card-foreground">
        {tr(product.name)}
      </h3>
      {product.description ? (
        <p className="mt-1 line-clamp-2 text-[0.7rem] leading-relaxed text-muted-foreground">
          {tr(product.description)}
        </p>
      ) : null}

      {extras.length > 0 && product.available ? (
        <div className="mt-2 flex flex-wrap gap-1">
          {extras.map((e) => {
            const on = selected.includes(e.id);
            return (
              <button
                key={e.id}
                type="button"
                onClick={() =>
                  setSelected((prev) => (on ? prev.filter((id) => id !== e.id) : [...prev, e.id]))
                }
                className={`rounded-full border px-2 py-0.5 text-[0.62rem] transition-colors ${
                  on
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-secondary text-secondary-foreground"
                }`}
              >
                {tr(e.name)} +{formatPrice(e.price, lang, config.currency)}
              </button>
            );
          })}
        </div>
      ) : null}

      <div className="mt-3 flex items-end justify-between gap-2 pt-1">
        <span className="min-w-0 truncate text-sm font-bold text-primary">
          {formatPrice(price, lang, config.currency)}
        </span>
        {product.available ? (
          <button
            type="button"
            aria-label={t("add")}
            onClick={() => {
              add(product, chosen);
              setSelected([]);
            }}
            className="flex shrink-0 items-center gap-1 rounded-full bg-primary px-2.5 py-1.5 text-[0.7rem] font-semibold text-primary-foreground shadow-soft transition-transform active:scale-95"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
            {t("add")}
          </button>
        ) : (
          <span className="shrink-0 rounded-full bg-muted px-2.5 py-1.5 text-[0.65rem] font-medium text-muted-foreground">
            {t("soldOut")}
          </span>
        )}
      </div>
    </article>
  );
}
