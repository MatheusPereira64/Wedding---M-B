import { weddingData } from "../../weddingData";
import { useCountdown } from "../../hooks/useCountdown";
import { FadeIn } from "../ui/FadeIn";
import styles from "./Countdown.module.css";

const units = [
  { key: "days", label: "Dias" },
  { key: "hours", label: "Horas" },
  { key: "minutes", label: "Minutos" },
  { key: "seconds", label: "Segundos" },
] as const;

export function Countdown() {
  const value = useCountdown(weddingData.dateISO);

  return (
    <section id="countdown" className={`section ${styles.section}`}>
      <FadeIn>
        {value.arrived ? (
          <p className={styles.arrived}>Hoje é o nosso grande dia! ❤️</p>
        ) : (
          <>
            <p className="eyebrow">Contagem regressiva</p>
            <h2 className={styles.title}>Falta pouco para o sim</h2>
            <span className="ornament" />
            <div className={styles.grid}>
              {units.map((unit) => (
                <div className={styles.cell} key={unit.key}>
                  <strong>{String(value[unit.key]).padStart(2, "0")}</strong>
                  <span>{unit.label}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </FadeIn>
    </section>
  );
}
