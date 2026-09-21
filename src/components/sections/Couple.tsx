import { weddingData } from "../../weddingData";
import { FadeIn } from "../ui/FadeIn";
import styles from "./Couple.module.css";

export function Couple() {
  const people = [weddingData.couple.groom, weddingData.couple.bride];

  return (
    <section className={`section ${styles.section}`}>
      <FadeIn>
        <header className={styles.header}>
          <p className="eyebrow">Os noivos</p>
          <h2>Sobre nós</h2>
          <span className="ornament" />
        </header>
      </FadeIn>
      <div className={styles.grid}>
        {people.map((person) => (
          <FadeIn key={person.firstName}>
            <article className={styles.card}>
              <img
                src={person.photo}
                alt={person.fullName}
                width={480}
                height={480}
                loading="lazy"
              />
              <h3>{person.firstName}</h3>
              <p>{person.bio}</p>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
