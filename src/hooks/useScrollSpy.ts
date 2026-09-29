import { useEffect, useState } from "react";
import type { NavId } from "../weddingData";

/**
 * Marca como ativa a última seção (na ordem de `ids`) que cruza a faixa entre
 * `offset` px do topo e 40% da altura da tela. `ids` precisa seguir a ordem do DOM.
 */
export function useScrollSpy(ids: NavId[], offset = 120) {
  const [active, setActive] = useState<NavId>(ids[0] ?? "inicio");

  useEffect(() => {
    const visible = new Set<NavId>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = entry.target.id as NavId;
          if (entry.isIntersecting) visible.add(id);
          else visible.delete(id);
        }
        const current = [...ids].reverse().find((id) => visible.has(id));
        if (current) setActive(current);
      },
      { rootMargin: `-${offset}px 0px -60% 0px` },
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids, offset]);

  return active;
}
