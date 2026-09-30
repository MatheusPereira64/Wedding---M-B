import { useEffect, useRef, type KeyboardEvent, type PointerEvent } from "react";
import styles from "./Lightbox.module.css";

type Props = {
  src: string;
  alt: string;
  index: number;
  total: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

const SWIPE_DISTANCE = 50;
const SWIPE_VELOCITY = 0.11;
const SWIPE_MIN = 20;

export function Lightbox({ src, alt, index, total, onClose, onPrev, onNext }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const swipe = useRef<{ x: number; y: number; t: number; id: number } | null>(null);
  const swiped = useRef(false);

  // Foco entra no diálogo ao abrir e volta para a foto que o abriu ao fechar.
  useEffect(() => {
    const trigger = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => trigger?.focus();
  }, []);

  const trapFocus = (event: KeyboardEvent) => {
    if (event.key !== "Tab" || !dialogRef.current) return;
    const focusables = [...dialogRef.current.querySelectorAll<HTMLElement>("button")];
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const onPointerDown = (event: PointerEvent) => {
    if (!event.isPrimary || swipe.current) return;
    swiped.current = false;
    swipe.current = { x: event.clientX, y: event.clientY, t: event.timeStamp, id: event.pointerId };
  };

  const onPointerUp = (event: PointerEvent) => {
    const start = swipe.current;
    swipe.current = null;
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < SWIPE_MIN || Math.abs(dx) < Math.abs(dy)) return;
    const velocity = Math.abs(dx) / Math.max(event.timeStamp - start.t, 1);
    if (Math.abs(dx) >= SWIPE_DISTANCE || velocity > SWIPE_VELOCITY) {
      swiped.current = true;
      if (dx < 0) onNext();
      else onPrev();
    }
  };

  return (
    <div
      ref={dialogRef}
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label={`Galeria, foto ${index + 1} de ${total}`}
      onKeyDown={trapFocus}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        swipe.current = null;
      }}
    >
      <div
        className={styles.backdrop}
        onClick={() => {
          if (!swiped.current) onClose();
        }}
        aria-hidden
      />
      <img key={src} src={src} alt={alt} className={styles.image} draggable={false} />
      <p className={styles.counter} aria-live="polite">
        {index + 1} / {total}
      </p>
      <button ref={closeRef} className={styles.close} onClick={onClose} aria-label="Fechar">
        ×
      </button>
      <button className={`${styles.nav} ${styles.prev}`} onClick={onPrev} aria-label="Foto anterior">
        ‹
      </button>
      <button className={`${styles.nav} ${styles.next}`} onClick={onNext} aria-label="Próxima foto">
        ›
      </button>
    </div>
  );
}
