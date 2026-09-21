import { useEffect, useState } from "react";
import { weddingData, type NavId } from "../../weddingData";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import styles from "./Navbar.module.css";

const ids = weddingData.nav.map((item) => item.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useScrollSpy(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id: NavId) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
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
              onClick={() => go(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>
        <button
          className={`${styles.burger} ${open ? styles.burgerOpen : ""}`}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
      <div className={`${styles.drawer} ${open ? styles.drawerOpen : ""}`}>
        {weddingData.nav.map((item) => (
          <button
            key={item.id}
            className={`${styles.drawerLink} ${active === item.id ? styles.active : ""}`}
            onClick={() => go(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
}
