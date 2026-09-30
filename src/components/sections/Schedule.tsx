import { weddingData, type ScheduleItem } from "../../weddingData";
import { FadeIn } from "../ui/FadeIn";
import styles from "./Schedule.module.css";

function Icon({ name }: { name: ScheduleItem["icon"] }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    "aria-hidden": true,
  } as const;

  if (name === "rings") {
    return (
      <svg {...common}>
        <circle cx="9" cy="13" r="4.2" />
        <circle cx="15" cy="11" r="4.2" />
      </svg>
    );
  }
  if (name === "cheers") {
    return (
      <svg {...common}>
        <path d="M7 4h4l-.8 8.2a3.2 3.2 0 1 1-6.4 0L3 4h4Z" />
        <path d="M13 4h8l-1.2 6.4a3.4 3.4 0 0 1-3.3 2.6H16" />
        <path d="M8 20v-3M16 20v-7" />
      </svg>
    );
  }
  if (name === "dinner") {
    return (
      <svg {...common}>
        <path d="M4 21h16" />
        <path d="M6 21V9a6 6 0 0 1 12 0v12" />
        <path d="M9 9h6" />
      </svg>
    );
  }
  if (name === "music") {
    return (
      <svg {...common}>
        <path d="M9 18V6l10-2v12" />
        <circle cx="7" cy="18" r="2.4" />
        <circle cx="17" cy="16" r="2.4" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M12 3l1.2 4.2L17.5 8 13.8 11l.9 4.5L12 13.6 9.3 15.5l.9-4.5L6.5 8l4.3-.8L12 3Z" />
    </svg>
  );
}

export function Schedule() {
  return (
    <section id="programacao" className={`section ${styles.section}`}>
      <FadeIn>
        <header className={styles.header}>
          <h2>Programação</h2>
          <span className="ornament" />
          <p className={styles.duration}>
            Chegada até {weddingData.arrivalLabel} · Início às {weddingData.timeLabel} · Duração
            de {weddingData.durationLabel}
          </p>
        </header>
      </FadeIn>
      <ol className={styles.list}>
        {weddingData.schedule.map((item, i) => (
          <li key={item.time}>
            <FadeIn delay={Math.min(i, 4) * 60}>
              <article className={styles.row}>
                <div className={styles.icon}>
                  <Icon name={item.icon} />
                </div>
                <p className={styles.time}>{item.time}</p>
                <div className={styles.body}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            </FadeIn>
          </li>
        ))}
      </ol>
    </section>
  );
}
