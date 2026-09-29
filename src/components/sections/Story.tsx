import { srcSet, weddingData } from "../../weddingData";
import { FadeIn } from "../ui/FadeIn";
import styles from "./Story.module.css";

export function Story() {
  return (
    <section id="historia" className={`section ${styles.section}`}>
      <FadeIn>
        <header className={styles.header}>
          <p className="eyebrow">Nossa história</p>
          <h2>Do primeiro olhar ao grande dia</h2>
          <span className="ornament" />
        </header>
      </FadeIn>
      <ol className={styles.timeline}>
        {weddingData.story.map((item, index) => (
          <li key={item.year} className={styles.item}>
            <FadeIn>
              <article className={`${styles.card} ${index % 2 ? styles.reverse : ""}`}>
                <img
                  src={item.photo}
                  srcSet={srcSet(item.photo, [600, 900, 1200])}
                  sizes="(min-width: 860px) 36rem, 100vw"
                  alt={item.title}
                  loading="lazy"
                  width={640}
                  height={800}
                />
                <div className={styles.copy}>
                  <p className={styles.year}>{item.year}</p>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            </FadeIn>
          </li>
        ))}
      </ol>
    </section>
  );
}
