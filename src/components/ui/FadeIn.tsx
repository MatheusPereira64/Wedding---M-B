import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import styles from "./FadeIn.module.css";

type Props = {
  children: ReactNode;
  className?: string;
  /** Atraso em ms para escalonar itens que entram juntos (ex.: linhas de uma lista). */
  delay?: number;
};

export function FadeIn({ children, className, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${styles.fade} ${visible ? styles.visible : ""} ${className ?? ""}`}
      style={delay ? ({ "--fade-delay": `${delay}ms` } as CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
