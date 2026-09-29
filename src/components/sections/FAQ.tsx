import { weddingData } from "../../weddingData";
import { Accordion } from "../ui/Accordion";
import { FadeIn } from "../ui/FadeIn";
import styles from "./FAQ.module.css";

export function FAQ() {
  return (
    <section className="section">
      <FadeIn>
        <header className={styles.header}>
          <h2>Perguntas frequentes</h2>
          <span className="ornament" />
        </header>
      </FadeIn>
      <FadeIn>
        <Accordion items={weddingData.faq} />
      </FadeIn>
    </section>
  );
}
