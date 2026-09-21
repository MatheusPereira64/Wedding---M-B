import { weddingData } from "../../weddingData";
import { FadeIn } from "../ui/FadeIn";
import styles from "./DressCode.module.css";

export function DressCode() {
  return (
    <section className={`section ${styles.section}`}>
      <FadeIn>
        <header className={styles.header}>
          <p className="eyebrow">Dress code</p>
          <h2>{weddingData.dressCode.title}</h2>
          <span className="ornament" />
          <p className={styles.intro}>{weddingData.dressCode.intro}</p>
        </header>
        <ul className={styles.tips}>
          {weddingData.dressCode.tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      </FadeIn>
    </section>
  );
}
