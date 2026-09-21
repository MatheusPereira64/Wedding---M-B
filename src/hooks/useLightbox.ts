import { useCallback, useEffect, useState } from "react";

export function useLightbox(length: number) {
  const [index, setIndex] = useState<number | null>(null);
  const open = useCallback((i: number) => setIndex(i), []);
  const close = useCallback(() => setIndex(null), []);
  const prev = useCallback(() => {
    setIndex((current) =>
      current === null ? current : (current + length - 1) % length,
    );
  }, [length]);
  const next = useCallback(() => {
    setIndex((current) =>
      current === null ? current : (current + 1) % length,
    );
  }, [length]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") prev();
      if (event.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = original;
    };
  }, [index, close, prev, next]);

  return { index, open, close, prev, next };
}
