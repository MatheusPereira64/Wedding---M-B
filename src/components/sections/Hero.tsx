import { useEffect, useRef, type CSSProperties } from "react";
import { srcSet, weddingData } from "../../weddingData";
import { Button } from "../ui/Button";
import styles from "./Hero.module.css";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

export function Hero() {
  const bgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      if (!bgRef.current || y > window.innerHeight) return;
      bgRef.current.style.transform = `translateY(${y * 0.18}px) scale(1.08)`;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section id="inicio" className={styles.hero}>
      <img
        ref={bgRef}
        className={styles.bg}
        src={weddingData.hero.image}
        srcSet={srcSet(weddingData.hero.image, [800, 1200, 1600, 2000])}
        sizes="100vw"
        alt=""
        aria-hidden
        fetchPriority="high"
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.names} style={step(0)}>
          {weddingData.couple.groom.firstName}
          <span>&</span>
          {weddingData.couple.bride.firstName}
        </h1>
        <p className={styles.phrase} style={step(1)}>
          {weddingData.headline}
        </p>
        <p className={styles.when} style={step(2)}>
          {weddingData.dateLabel} · {weddingData.timeLabel}
        </p>
        <p className={styles.where} style={step(2)}>
          {weddingData.venue.name}, {weddingData.venue.city}
        </p>
        <div className={styles.actions} style={step(3)}>
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
