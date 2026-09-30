import { useEffect, useRef, type CSSProperties } from "react";
import { srcSet, weddingData } from "../../weddingData";
import { useLightbox } from "../../hooks/useLightbox";
import { FadeIn } from "../ui/FadeIn";
import { Lightbox } from "../ui/Lightbox";
import styles from "./Gallery.module.css";

export function Gallery() {
  const { index, open, close, prev, next } = useLightbox(weddingData.gallery.length);
  const current = index === null ? null : weddingData.gallery[index];
  const gridRef = useRef<HTMLDivElement>(null);

  // Revela cada foto uma vez ao entrar na tela. O grid só é "armado" pelo JS,
  // então sem JS (ou sem IntersectionObserver) as fotos ficam visíveis.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealed = "";
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 },
    );
    grid.dataset.armed = "";
    for (const item of grid.children) observer.observe(item);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="galeria" className="section">
      <FadeIn>
        <header className={styles.header}>
          <h2>Galeria</h2>
          <span className="ornament" />
        </header>
      </FadeIn>
      <div ref={gridRef} className={styles.grid}>
        {weddingData.gallery.map((image, i) => (
          <button
            key={image.src + i}
            className={`${styles.item} ${styles[image.span]}`}
            style={{ "--reveal-delay": `${(i % 4) * 70}ms` } as CSSProperties}
            onClick={() => open(i)}
            aria-label={`Abrir foto ${i + 1} de ${weddingData.gallery.length}: ${image.alt}`}
          >
            <img
              src={image.src}
              srcSet={srcSet(image.src, [400, 700, 1000, 1400])}
              sizes={image.span === "wide" ? "50vw" : "(min-width: 720px) 25vw, 50vw"}
              alt=""
              loading="lazy"
              decoding="async"
              width={900}
              height={1100}
            />
          </button>
        ))}
      </div>
      {current && index !== null ? (
        <Lightbox
          src={current.src}
          alt={current.alt}
          index={index}
          total={weddingData.gallery.length}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      ) : null}
    </section>
  );
}
