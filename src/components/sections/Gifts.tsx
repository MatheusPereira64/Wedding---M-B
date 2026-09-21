import { weddingData } from "../../weddingData";
import { Button } from "../ui/Button";
import { FadeIn } from "../ui/FadeIn";
import { QRCodeCard } from "../ui/QRCodeCard";
import styles from "./Gifts.module.css";

export function Gifts() {
  return (
    <section id="presentes" className="section">
      <FadeIn>
        <header className={styles.header}>
          <p className="eyebrow">Presentes</p>
          <h2>{weddingData.gifts.title}</h2>
          <span className="ornament" />
          <p className={styles.intro}>{weddingData.gifts.intro}</p>
        </header>
      </FadeIn>
      <div className={styles.grid}>
        <FadeIn>
          <article className={styles.card}>
            <p className={styles.emoji} aria-hidden>
              🎁
            </p>
            <h3>{weddingData.gifts.listLabel}</h3>
            <p>{weddingData.gifts.listText}</p>
            <Button href={weddingData.gifts.listUrl} variant="ghost">
              Ver lista de presentes
            </Button>
          </article>
        </FadeIn>
        <FadeIn>
          <QRCodeCard
            value={weddingData.pix.key}
            name={weddingData.pix.name}
            qrImage={weddingData.pix.qrImage}
          />
        </FadeIn>
      </div>
    </section>
  );
}
