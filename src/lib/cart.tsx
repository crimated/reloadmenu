import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { Extra, Product } from "./types";

export type CartLine = {
  key: string;
  product: Product;
  extras: Extra[];
  qty: number;
};

type State = { lines: CartLine[] };

type Action =
  | { type: "add"; product: Product; extras?: Extra[] }
  | { type: "inc"; key: string }
  | { type: "dec"; key: string }
  | { type: "remove"; key: string }
  | { type: "clear" }
  | { type: "hydrate"; lines: CartLine[] };

const lineKey = (p: Product, extras: Extra[]) =>
  `${p.id}::${extras
    .map((e) => e.id)
    .sort()
    .join(",")}`;

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "hydrate":
      return { lines: action.lines };
    case "add": {
      const extras = action.extras ?? [];
      const key = lineKey(action.product, extras);
      const found = state.lines.find((l) => l.key === key);
      if (found) {
        return {
          lines: state.lines.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l)),
        };
      }
      return { lines: [...state.lines, { key, product: action.product, extras, qty: 1 }] };
    }
    case "inc":
      return {
        lines: state.lines.map((l) => (l.key === action.key ? { ...l, qty: l.qty + 1 } : l)),
      };
    case "dec":
      return {
        lines: state.lines
          .map((l) => (l.key === action.key ? { ...l, qty: l.qty - 1 } : l))
          .filter((l) => l.qty > 0),
      };
    case "remove":
      return { lines: state.lines.filter((l) => l.key !== action.key) };
    case "clear":
      return { lines: [] };
    default:
      return state;
  }
}

export const linePrice = (l: CartLine) =>
  (l.product.price + l.extras.reduce((s, e) => s + e.price, 0)) * l.qty;

type Ctx = {
  lines: CartLine[];
  count: number;
  total: number;
  add: (product: Product, extras?: Extra[]) => void;
  inc: (key: string) => void;
  dec: (key: string) => void;
  remove: (key: string) => void;
  clear: () => void;
};

const CartContext = createContext<Ctx | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] });

  // Session-only cart persistence (never used for menu data).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("rc-cart");
      if (raw) dispatch({ type: "hydrate", lines: JSON.parse(raw) as CartLine[] });
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem("rc-cart", JSON.stringify(state.lines));
    } catch {
      /* ignore */
    }
  }, [state.lines]);

  const value = useMemo<Ctx>(
    () => ({
      lines: state.lines,
      count: state.lines.reduce((s, l) => s + l.qty, 0),
      total: state.lines.reduce((s, l) => s + linePrice(l), 0),
      add: (product, extras) => dispatch({ type: "add", product, extras: extras ?? [] }),
      inc: (key) => dispatch({ type: "inc", key }),
      dec: (key) => dispatch({ type: "dec", key }),
      remove: (key) => dispatch({ type: "remove", key }),
      clear: () => dispatch({ type: "clear" }),
    }),
    [state.lines],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
