import { weddingData } from "../../weddingData";
import styles from "./Closing.module.css";

export function Closing() {
  return (
    <section className={styles.closing}>
      <div
        className={styles.bg}
        style={{ backgroundImage: `url(${weddingData.closing.image})` }}
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
