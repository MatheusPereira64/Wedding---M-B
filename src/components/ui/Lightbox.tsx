import styles from "./Lightbox.module.css";

type Props = {
  src: string;
  alt: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export function Lightbox({ src, alt, onClose, onPrev, onNext }: Props) {
  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Galeria">
      <button className={styles.backdrop} onClick={onClose} aria-label="Fechar" />
      <img src={src} alt={alt} className={styles.image} />
      <button className={styles.close} onClick={onClose} aria-label="Fechar">
        ×
      </button>
      <button className={`${styles.nav} ${styles.prev}`} onClick={onPrev} aria-label="Anterior">
        ‹
      </button>
      <button className={`${styles.nav} ${styles.next}`} onClick={onNext} aria-label="Próxima">
        ›
      </button>
    </div>
  );
}
