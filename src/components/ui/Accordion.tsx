import { useState } from "react";
import type { FaqItem } from "../../weddingData";
import styles from "./Accordion.module.css";

type Props = {
  items: readonly FaqItem[];
};

export function Accordion({ items }: Props) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className={styles.list}>
      {items.map((item, index) => {
        const isOpen = open === index;
        return (
          <div className={styles.item} key={item.question}>
            <button
              className={styles.trigger}
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : index)}
            >
              <span>{item.question}</span>
              <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`} aria-hidden>
                +
              </span>
            </button>
            <div className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}>
              <div>
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
