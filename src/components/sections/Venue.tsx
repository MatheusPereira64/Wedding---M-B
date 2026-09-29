import { mapsEmbed, mapsUrl, weddingData } from "../../weddingData";
import { Button } from "../ui/Button";
import { FadeIn } from "../ui/FadeIn";
import styles from "./Venue.module.css";

export function Venue() {
  const { venue, dateLong, timeLabel, durationLabel } = weddingData;

  return (
    <section id="local" className={`section ${styles.section}`}>
      <FadeIn>
        <header className={styles.header}>
          <h2>Local do casamento</h2>
          <span className="ornament" />
        </header>
      </FadeIn>
      <FadeIn>
        <div className={styles.layout}>
          <div className={styles.info}>
            <h3>{venue.name}</h3>
            <p className={styles.meta}>
              {dateLong} · {timeLabel}
            </p>
            <p className={styles.duration}>Duração: {durationLabel}</p>
            <p className={styles.address}>{venue.fullAddress}</p>
            <Button href={mapsUrl(venue.mapsQuery)} className={styles.cta}>
              Como chegar
            </Button>
            <ul className={styles.notes}>
              <li>
                <strong>Estacionamento</strong>
                <span>{venue.parking}</span>
              </li>
              <li>
                <strong>Dress code</strong>
                <span>{weddingData.dressCode.title}</span>
              </li>
              <li>
                <strong>Acessibilidade</strong>
                <span>{venue.accessibility}</span>
              </li>
              <li>
                <strong>Informações adicionais</strong>
                <span>{venue.extra}</span>
              </li>
            </ul>
          </div>
          <div className={styles.map}>
            <iframe
              title={`Mapa de ${venue.name}`}
              src={mapsEmbed(venue.mapsQuery)}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
