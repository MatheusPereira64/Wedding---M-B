import { weddingData } from "../../weddingData";
import { useLightbox } from "../../hooks/useLightbox";
import { FadeIn } from "../ui/FadeIn";
import { Lightbox } from "../ui/Lightbox";
import styles from "./Gallery.module.css";

export function Gallery() {
  const { index, open, close, prev, next } = useLightbox(weddingData.gallery.length);
  const current = index === null ? null : weddingData.gallery[index];

  return (
    <section id="galeria" className="section">
      <FadeIn>
        <header className={styles.header}>
          <p className="eyebrow">Memórias</p>
          <h2>Galeria</h2>
          <span className="ornament" />
        </header>
      </FadeIn>
      <div className={styles.grid}>
        {weddingData.gallery.map((image, i) => (
          <button
            key={image.src + i}
            className={`${styles.item} ${styles[image.span]}`}
            onClick={() => open(i)}
          >
            <img src={image.src} alt={image.alt} loading="lazy" width={900} height={1100} />
          </button>
        ))}
      </div>
      {current && index !== null ? (
        <Lightbox
          src={current.src}
          alt={current.alt}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      ) : null}
    </section>
  );
}
