import { useId, useState } from "react";
import type { FaqItem } from "../../weddingData";
import styles from "./Accordion.module.css";

type Props = {
  items: readonly FaqItem[];
};

export function Accordion({ items }: Props) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className={styles.list}>
      {items.map((item, index) => {
        const isOpen = open === index;
        const triggerId = `${baseId}-trigger-${index}`;
        const panelId = `${baseId}-panel-${index}`;
        return (
          <div className={styles.item} key={item.question}>
            <h3 className={styles.heading}>
              <button
                id={triggerId}
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
              >
                <span>{item.question}</span>
                <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`} aria-hidden>
                  +
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={triggerId}
              className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}
              inert={!isOpen}
            >
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
