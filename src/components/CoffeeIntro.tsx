import { useEffect, useState } from "react";

/**
 * Very short (~1.1s) CSS coffee-fill opening animation.
 * Purely presentational: the menu loads in parallel behind it.
 */
export function CoffeeIntro({ onDone }: { onDone: () => void }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      onDone();
      return;
    }
    const a = window.setTimeout(() => setLeaving(true), 900);
    const b = window.setTimeout(onDone, 1150);
    return () => {
      window.clearTimeout(a);
      window.clearTimeout(b);
    };
  }, [onDone]);

  return (
    <div
      className="hero-surface fixed inset-0 z-50 flex flex-col items-center justify-center gap-6"
      style={leaving ? { animation: "rc-out 0.25s ease-in forwards" } : undefined}
      aria-hidden="true"
    >
      <span className="font-display text-xl tracking-[0.4em] text-foreground">RELOAD</span>

      <div className="relative h-24 w-24">
        {/* steam */}
        <div className="absolute inset-x-0 -top-3 flex justify-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-4 w-1 rounded-full bg-muted-foreground/50"
              style={{ animation: `rc-steam 0.7s ${0.45 + i * 0.08}s ease-out both` }}
            />
          ))}
        </div>

        {/* pour stream */}
        <span
          className="absolute left-1/2 top-0 h-8 w-1.5 origin-top -translate-x-1/2 rounded-full bg-accent"
          style={{ animation: "rc-pour 0.55s ease-in both" }}
        />

        {/* cup */}
        <div className="absolute inset-x-2 bottom-2 top-8 overflow-hidden rounded-b-[2rem] rounded-t-md border-2 border-foreground/70 bg-card">
          <div
            className="absolute inset-x-0 bottom-0 h-full bg-accent"
            style={{ animation: "rc-fill 0.6s 0.25s cubic-bezier(.3,.8,.4,1) both" }}
          />
        </div>
        {/* handle */}
        <div className="absolute end-0 top-12 h-7 w-5 rounded-e-full border-2 border-s-0 border-foreground/70" />
        {/* saucer */}
        <div className="absolute inset-x-0 bottom-0 mx-auto h-1.5 w-20 rounded-full bg-foreground/70" />
      </div>

      <span
        className="text-brandline"
        style={{ animation: "rc-flash 1s ease-out both" }}
      >
        RECHARGE • REFRESH • RELOAD
      </span>
    </div>
  );
}
