import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { fetchGifts, type GiftList } from "../../api/gifts";
import { weddingData } from "../../weddingData";
import { Button } from "../ui/Button";
import { FadeIn } from "../ui/FadeIn";
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
      <div className={`${styles.grid} ${styles.single}`}>
        {withLink.map((gift) => (
          <FadeIn key={gift.id}>
            <article className={styles.qrCard}>
              <h3>QR Code da lista</h3>
              <div className={styles.qrWrap}>
                <QRCodeSVG
                  value={gift.url}
                  size={196}
                  bgColor="#ffffff"
                  fgColor="#5C1520"
                  level="M"
                  marginSize={2}
                  title="QR Code da lista de presentes"
                />
              </div>
              <p>Aponte a câmera para abrir a lista. No celular, use o botão.</p>
              <Button href={gift.url}>Abrir lista de presentes</Button>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
