import type { CartLine } from "./cart";
import { linePrice } from "./cart";
import { formatPrice, normalizeIraqiPhone } from "./format";
import type { SiteConfig } from "./types";

export function buildOrderMessage(opts: {
  lines: CartLine[];
  total: number;
  phone: string;
  address: string;
  notes?: string;
  config: SiteConfig;
}) {
  const { lines, total, phone, address, notes, config } = opts;
  const money = (v: number) => formatPrice(v, "ar", config.currency);

  const items = lines
    .map((l) => {
      const extras = l.extras.length ? ` (${l.extras.map((e) => e.name.ar).join(" + ")})` : "";
      return `${l.qty} × ${l.product.name.ar}${extras} — ${money(linePrice(l))}`;
    })
    .join("\n");

  let msg =
    `طلب جديد - RELOAD CAFÉ\n\n` +
    `👤 رقم الزبون:\n${normalizeIraqiPhone(phone)}\n\n` +
    `📍 العنوان:\n${address}\n\n` +
    `🛒 الطلب:\n${items}\n\n` +
    `💰 الإجمالي:\n${money(total)}`;

  if (notes && notes.trim()) msg += `\n\n📝 الملاحظات:\n${notes.trim()}`;

  return msg;
}

export function whatsappUrl(number: string, message: string) {
  return `https://wa.me/${number.replace(/[^\d]/g, "")}?text=${encodeURIComponent(message)}`;
}
