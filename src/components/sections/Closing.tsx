import { srcSet, weddingData } from "../../weddingData";
import styles from "./Closing.module.css";

export function Closing() {
  return (
    <section className={styles.closing}>
      <img
        className={styles.bg}
        src={weddingData.closing.image}
        srcSet={srcSet(weddingData.closing.image, [800, 1200, 1600, 2000])}
        sizes="100vw"
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <p className={styles.quote}>{weddingData.closingQuote}</p>
        <p className={styles.names}>{weddingData.names}</p>
        <p className={styles.date}>{weddingData.dateLabel}</p>
      </div>
    </section>
  );
}
