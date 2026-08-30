import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Logo } from "@/components/Logo";
import { useCart } from "@/lib/cart";
import { configQuery } from "@/lib/data";
import { useLang } from "@/lib/i18n";

/** Compact sticky header shown while browsing the menu. */
export function MenuHeader() {
  const { data: config } = useQuery(configQuery);
  const { count } = useCart();
  const { tr } = useLang();

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto grid h-14 w-full max-w-3xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <Logo
            src={config?.logo}
            alt={tr(config?.name) || "RELOAD CAFÉ"}
            variant="compact"
            className="h-8 w-8 shrink-0"
          />
          <span className="truncate font-display text-base font-semibold tracking-[0.14em] text-foreground">
            RELOAD CAFÉ
          </span>
        </Link>

        <Link
          to="/cart"
          aria-label="Cart"
          className="relative rounded-full border border-border bg-card p-2 text-foreground transition-colors active:bg-secondary"
        >
          <ShoppingBag className="h-4 w-4" aria-hidden="true" />
          {count > 0 ? (
            <span className="absolute -end-1 -top-1 min-w-4 rounded-full bg-primary px-1 text-[0.6rem] font-bold leading-4 text-primary-foreground">
              {count}
            </span>
          ) : null}
        </Link>
      </div>
    </header>
  );
}
