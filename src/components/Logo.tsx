import { useEffect, useState } from "react";

/** Renders the real logo PNG when present, otherwise an elegant wordmark fallback. */
export function Logo({
  src,
  alt,
  className = "",
  variant = "full",
}: {
  src?: string | undefined;
  alt: string;
  className?: string;
  variant?: "full" | "compact";
}) {
  const [status, setStatus] = useState<"checking" | "ok" | "missing">("checking");

  useEffect(() => {
    if (!src) {
      setStatus("missing");
      return;
    }
    let cancelled = false;
    const img = new Image();
    img.onload = () => !cancelled && setStatus("ok");
    img.onerror = () => !cancelled && setStatus("missing");
    img.src = src;
    return () => {
      cancelled = true;
    };
  }, [src]);

  if (status === "ok" && src) {
    return (
      <img src={src} alt={alt} className={`object-contain ${className}`} decoding="async" />
    );
  }

  if (variant === "compact") {
    return (
      <span
        aria-label={alt}
        className={`grid place-items-center rounded-full border border-border bg-secondary font-display text-[0.62rem] font-semibold tracking-[0.06em] text-primary ${className}`}
        style={status === "checking" ? { visibility: "hidden" } : undefined}
      >
        RC
      </span>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center ${className}`}
      aria-label={alt}
      style={status === "checking" ? { visibility: "hidden" } : undefined}
    >
      <span className="font-display text-4xl font-semibold tracking-[0.18em] text-foreground">
        RELOAD
      </span>
      <span className="font-display text-xl tracking-[0.42em] text-primary">CAFÉ</span>
    </div>
  );
}
