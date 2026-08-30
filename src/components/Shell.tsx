import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Coffee, ShoppingBag, Info, Moon, Sun, Languages } from "lucide-react";
import type { ReactNode } from "react";
import { useCart } from "@/lib/cart";
import { useLang } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";

export function TopBar({ title }: { title?: string | undefined }) {
  const { lang, setLang } = useLang();
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-lg items-center justify-between px-4">
        <button
          type="button"
          onClick={() => setLang(lang === "ar" ? "en" : "ar")}
          className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground transition-colors active:bg-secondary"
          aria-label="Switch language"
        >
          <Languages className="h-3.5 w-3.5" aria-hidden="true" />
          {lang === "ar" ? "English" : "العربية"}
        </button>

        {title ? (
          <span className="font-display text-lg font-semibold text-foreground">{title}</span>
        ) : null}

        <button
          type="button"
          onClick={toggle}
          className="rounded-full border border-border bg-card p-2 text-foreground transition-colors active:bg-secondary"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Moon className="h-4 w-4" aria-hidden="true" />
          )}
        </button>
      </div>
    </header>
  );
}

export function BottomNav() {
  const { t } = useLang();
  const { count } = useCart();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const items = [
    { to: "/", icon: Home, label: t("home") },
    { to: "/menu", icon: Coffee, label: t("menu") },
    { to: "/cart", icon: ShoppingBag, label: t("cart"), badge: count },
    { to: "/about", icon: Info, label: t("about") },
  ] as const;

  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-border/70 bg-background/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md">
      <ul className="mx-auto flex w-full max-w-lg items-stretch">
        {items.map(({ to, icon: Icon, label, ...rest }) => {
          const active = to === "/menu" ? pathname.startsWith("/menu") : pathname === to;
          const badge = "badge" in rest ? (rest.badge as number) : 0;
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                className={`flex flex-col items-center gap-1 py-2.5 text-[0.68rem] font-medium transition-colors ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <span className="relative">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                  {badge > 0 ? (
                    <span className="absolute -end-2 -top-1.5 min-w-4 rounded-full bg-primary px-1 text-[0.6rem] font-bold leading-4 text-primary-foreground">
                      {badge}
                    </span>
                  ) : null}
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function Page({ title, children }: { title?: string | undefined; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <TopBar title={title} />
      <main className="mx-auto w-full max-w-lg px-4 pb-28 pt-4">{children}</main>
      <BottomNav />
    </div>
  );
}
