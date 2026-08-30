import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useState } from "react";
import { Page } from "@/components/Shell";
import { linePrice, useCart } from "@/lib/cart";
import { configQuery } from "@/lib/data";
import { formatPrice, isValidIraqiPhone } from "@/lib/format";
import { useLang } from "@/lib/i18n";
import { buildOrderMessage, whatsappUrl } from "@/lib/whatsapp";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "السلة — RELOAD CAFÉ | Cart" },
      {
        name: "description",
        content: "Review your RELOAD CAFÉ order and send it directly through WhatsApp.",
      },
      { property: "og:title", content: "RELOAD CAFÉ Cart — سلة الطلبات" },
      {
        property: "og:description",
        content: "راجع طلبك من ريلود كافيه وأرسله عبر واتساب.",
      },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lang, t, tr } = useLang();
  const { lines, total, inc, dec, remove, clear } = useCart();
  const { data: config } = useQuery(configQuery);

  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [touched, setTouched] = useState(false);

  const phoneOk = isValidIraqiPhone(phone);
  const addressOk = address.trim().length > 2;

  const submit = () => {
    setTouched(true);
    if (!phoneOk || !addressOk || !config || lines.length === 0) return;
    const message = buildOrderMessage({ lines, total, phone, address, notes, config });
    window.open(whatsappUrl(config.whatsapp, message), "_blank", "noopener,noreferrer");
  };

  if (lines.length === 0) {
    return (
      <Page title={t("cart")}>
        <div className="card-soft mt-10 flex flex-col items-center gap-3 px-6 py-14 text-center">
          <ShoppingBag className="h-10 w-10 text-primary" aria-hidden="true" />
          <p className="font-display text-xl font-semibold text-card-foreground">
            {t("emptyCart")}
          </p>
          <p className="text-sm text-muted-foreground">{t("emptyCartSub")}</p>
          <Link
            to="/menu"
            className="mt-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            {t("browseMenu")}
          </Link>
        </div>
      </Page>
    );
  }

  return (
    <Page title={t("cart")}>
      <div className="space-y-3">
        {lines.map((l) => (
          <div key={l.key} className="card-soft flex items-center gap-3 p-3">
            {l.product.image ? (
              <img
                src={l.product.image}
                alt={tr(l.product.name)}
                loading="lazy"
                className="h-16 w-16 shrink-0 rounded-xl object-cover"
              />
            ) : null}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-card-foreground">
                {tr(l.product.name)}
              </p>
              {l.extras.length ? (
                <p className="truncate text-[0.7rem] text-muted-foreground">
                  {l.extras.map((e) => tr(e.name)).join(" + ")}
                </p>
              ) : null}
              {config ? (
                <p className="mt-1 text-xs font-bold text-primary">
                  {formatPrice(linePrice(l), lang, config.currency)}
                </p>
              ) : null}
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => dec(l.key)}
                aria-label="decrease"
                className="rounded-full border border-border p-1.5 text-foreground active:bg-secondary"
              >
                <Minus className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <span className="w-5 text-center text-sm font-bold">{l.qty}</span>
              <button
                type="button"
                onClick={() => inc(l.key)}
                aria-label="increase"
                className="rounded-full border border-border p-1.5 text-foreground active:bg-secondary"
              >
                <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => remove(l.key)}
                aria-label="remove"
                className="ms-1 rounded-full p-1.5 text-destructive active:bg-secondary"
              >
                <Trash2 className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={clear}
        className="mt-3 text-xs font-medium text-muted-foreground underline"
      >
        {t("clear")}
      </button>

      <section className="card-soft mt-5 space-y-3 p-4">
        <h2 className="font-display text-lg font-semibold text-card-foreground">
          {t("yourInfo")}
        </h2>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-foreground">
            {t("phone")} <span className="text-destructive">*</span>
          </span>
          <input
            type="tel"
            inputMode="tel"
            dir="ltr"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="0771 673 5393"
            className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-ring"
          />
          {touched && !phoneOk ? (
            <span className="mt-1 block text-xs text-destructive">{t("phoneError")}</span>
          ) : null}
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-foreground">
            {t("address")} <span className="text-destructive">*</span>
          </span>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-ring"
          />
          {touched && !addressOk ? (
            <span className="mt-1 block text-xs text-destructive">{t("addressError")}</span>
          ) : null}
        </label>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-foreground">
            {t("notes")}{" "}
            <span className="font-normal text-muted-foreground">({t("optional")})</span>
          </span>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full resize-none rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground outline-none focus:border-ring"
          />
        </label>
      </section>

      {config ? (
        <div className="mt-5 flex items-center justify-between rounded-2xl bg-secondary px-4 py-3">
          <span className="text-sm font-semibold text-secondary-foreground">{t("total")}</span>
          <span className="text-lg font-bold text-primary">
            {formatPrice(total, lang, config.currency)}
          </span>
        </div>
      ) : null}

      <button
        type="button"
        onClick={submit}
        className="mt-4 w-full rounded-2xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-lift transition-transform active:scale-[0.98]"
      >
        {t("sendOrder")}
      </button>
    </Page>
  );
}
