import { useEffect, useState } from "react";
import type { NavId } from "../weddingData";

export function useScrollSpy(ids: NavId[], offset = 120) {
  const [active, setActive] = useState<NavId>(ids[0] ?? "inicio");

  useEffect(() => {
    const onScroll = () => {
      let current: NavId = ids[0] ?? "inicio";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - offset <= 0) current = id;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [ids, offset]);

  return active;
}
