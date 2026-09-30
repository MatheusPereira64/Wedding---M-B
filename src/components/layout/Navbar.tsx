import { useEffect, useRef, useState } from "react";
import { weddingData, type NavId } from "../../weddingData";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import styles from "./Navbar.module.css";

const ids = weddingData.nav.map((item) => item.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(ids);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => {
      setScrolled(!entry?.isIntersecting);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      // Com o menu aberto, o foco circula entre o botão e os links do menu.
      const links = [...document.querySelectorAll<HTMLElement>("#menu-mobile button")];
      const last = links[links.length - 1];
      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        burgerRef.current?.focus();
      } else if (event.shiftKey && document.activeElement === burgerRef.current) {
        event.preventDefault();
        last?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: NavId) => {
    setOpen(false);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById(id)?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <>
      <div ref={sentinelRef} className={styles.sentinel} aria-hidden />
      <header className={`${styles.header} ${scrolled || open ? styles.solid : ""}`}>
        <div className={styles.bar}>
          <a className={styles.logo} href="#inicio" onClick={() => setOpen(false)}>
            Matheus <span>&</span> Brena
          </a>
          <nav className={styles.desktop} aria-label="Principal">
            {weddingData.nav.map((item) => (
              <button
                key={item.id}
                className={`${styles.link} ${active === item.id ? styles.active : ""}`}
                aria-current={active === item.id ? "true" : undefined}
                onClick={() => go(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <button
            ref={burgerRef}
            className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <div
          id="menu-mobile"
          className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}
          inert={!open}
        >
          <nav className={styles.drawerInner} aria-label="Menu">
            {weddingData.nav.map((item) => (
              <button
                key={item.id}
                className={`${styles.drawerLink} ${active === item.id ? styles.active : ""}`}
                aria-current={active === item.id ? "true" : undefined}
                onClick={() => go(item.id)}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
}
