import { useEffect, useState } from "react";
import styles from "./RsvpBar.module.css";

/**
 * Atalho fixo para a confirmação no celular. Aparece depois que o Hero sai da
 * tela e some quando a seção do RSVP chega (ou já passou), para não competir
 * com o próprio formulário.
 */
export function RsvpBar() {
  const [pastHero, setPastHero] = useState(false);
  const [reachedRsvp, setReachedRsvp] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inicio");
    const rsvp = document.getElementById("rsvp");
    if (!hero || !rsvp) return;

    const heroObserver = new IntersectionObserver(([entry]) => {
      if (entry) setPastHero(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    const rsvpObserver = new IntersectionObserver(([entry]) => {
      if (entry) setReachedRsvp(entry.isIntersecting || entry.boundingClientRect.top < 0);
    });

    heroObserver.observe(hero);
    rsvpObserver.observe(rsvp);
    return () => {
      heroObserver.disconnect();
      rsvpObserver.disconnect();
    };
  }, []);

  const visible = pastHero && !reachedRsvp;

  return (
    <div className={`${styles.bar} ${visible ? styles.visible : ""}`} inert={!visible}>
      <a className={styles.link} href="#rsvp">
        Confirmar presença
      </a>
    </div>
  );
}
