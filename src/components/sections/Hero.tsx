import { useEffect, useRef } from "react";
import { weddingData } from "../../weddingData";
import { Button } from "../ui/Button";
import styles from "./Hero.module.css";

export function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const onScroll = () => {
      if (!bgRef.current) return;
      bgRef.current.style.transform = `translateY(${window.scrollY * 0.18}px) scale(1.08)`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="inicio" className={styles.hero}>
      <div
        ref={bgRef}
        className={styles.bg}
        style={{ backgroundImage: `url(${weddingData.hero.image})` }}
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <p className={styles.kicker}>{weddingData.kicker}</p>
        <h1 className={styles.names}>
          {weddingData.couple.groom.firstName}
          <span>&</span>
          {weddingData.couple.bride.firstName}
        </h1>
        <p className={styles.phrase}>{weddingData.headline}</p>
        <p className={styles.date}>{weddingData.dateLabel}</p>
        <div className={styles.actions}>
          <Button href="#rsvp">Confirmar presença</Button>
          <Button href="#local" variant="secondary">
            Ver detalhes
          </Button>
        </div>
      </div>
      <a href="#countdown" className={styles.scroll} aria-label="Ver mais conteúdo">
        <span />
      </a>
    </section>
  );
}
