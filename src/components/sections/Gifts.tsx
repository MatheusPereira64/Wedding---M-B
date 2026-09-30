import { useEffect, useState } from "react";
import { fetchGifts, type GiftList } from "../../api/gifts";
import { weddingData } from "../../weddingData";
import { Button } from "../ui/Button";
import { FadeIn } from "../ui/FadeIn";
import { QRCodeCard } from "../ui/QRCodeCard";
import styles from "./Gifts.module.css";

const fallbackGifts: GiftList[] = [
  {
    id: "lista-principal",
    title: weddingData.gifts.listLabel,
    store: "",
    url: "",
    description: weddingData.gifts.listText,
  },
];

export function Gifts() {
  const [gifts, setGifts] = useState<GiftList[]>(fallbackGifts);

  useEffect(() => {
    let active = true;

    fetchGifts()
      .then((response) => {
        if (active && response.gifts.length) setGifts(response.gifts);
      })
      .catch(() => {
        if (active) setGifts(fallbackGifts);
      });

    return () => {
      active = false;
    };
  }, []);

  const withLink = gifts.filter((gift) => gift.url);

  return (
    <section id="presentes" className={`section ${styles.section}`}>
      <FadeIn>
        <header className={styles.header}>
          <p className="eyebrow">Presentes</p>
          <h2>{weddingData.gifts.title}</h2>
          <span className="ornament" />
          <p className={styles.intro}>{weddingData.gifts.intro}</p>
          {withLink.length ? null : (
            <p className={styles.soonLine}>{weddingData.gifts.listLabel}: link em breve.</p>
          )}
        </header>
      </FadeIn>
      <div className={`${styles.grid} ${withLink.length ? "" : styles.single}`}>
        {withLink.length ? (
        <div className={styles.lists}>
          {withLink.map((gift) => (
            <FadeIn key={gift.id}>
              <article className={styles.card}>
                <h3>{gift.title}</h3>
                {gift.store ? <p className={styles.store}>{gift.store}</p> : null}
                <p>{gift.description}</p>
                <Button href={gift.url} variant="ghost">
                  Ver lista de presentes
                </Button>
              </article>
            </FadeIn>
          ))}
        </div>
        ) : null}
        <FadeIn>
          <QRCodeCard
            value={weddingData.pix.key}
            name={weddingData.pix.name}
            qrImage={weddingData.pix.qrImage}
            copyPaste={weddingData.pix.copyPaste}
          />
        </FadeIn>
      </div>
    </section>
  );
}
